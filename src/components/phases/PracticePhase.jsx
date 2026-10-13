import React, { useState, useEffect } from 'react';
import { Flame, Zap, Star, ArrowRight } from 'lucide-react';
import WorldMap from '../quiz/WorldMap.jsx';
import QuestionRenderer from '../quiz/QuestionRenderer.jsx';
import FeedbackOverlay from '../shared/FeedbackOverlay.jsx';
import { WORLDS } from '../../data/worlds.js';
import { generateSession } from '../../generators/index.js';
import { calcXP, calcStars } from '../../utils/scoring.js';
import { parseAnswer, isSimplified } from '../../utils/answerParser.js';
import { eq, formatFrac } from '../../utils/fraction.js';
import { narrate, playChime, playBuzz } from '../../utils/audio.js';
import { correctNarration, incorrectNarration } from '../../utils/narration.js';

export default function PracticePhase({
  onNext,
  audioEnabled = true,
  term = 'gradient',
  xp,
  setXp,
  streak,
  setStreak,
  maxStreak,
  setMaxStreak,
  worldScores,
  setWorldScores,
  onSignQuestionSolved,
}) {
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentWorld, setCurrentWorld] = useState(0);
  const [questionIdxInWorld, setQuestionIdxInWorld] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [feedback, setFeedback] = useState(null);

  // Generate 100-question session
  useEffect(() => {
    const questions = generateSession(undefined, { term });
    setSessionQuestions(questions);
  }, [term]);

  const worldQuestions = sessionQuestions.slice(currentWorld * 10, (currentWorld + 1) * 10);
  const currentQuestion = worldQuestions[questionIdxInWorld] || worldQuestions[0];
  const worldMeta = WORLDS[currentWorld] || WORLDS[0];

  const handleSelectAnswer = (userRaw) => {
    if (!currentQuestion) return;

    let isCorrect = false;
    let nudge = null;

    // Check correctness
    if (currentQuestion.answerKind === 'mcq' || currentQuestion.answerKind === 'choice') {
      isCorrect =
        String(userRaw).trim().toLowerCase() ===
        String(currentQuestion.correctAnswer).trim().toLowerCase();
    } else {
      // Fraction/numeric input
      const parsedUser = parseAnswer(userRaw);
      const targetAns = currentQuestion.answer;

      if (parsedUser === 'undefined' && (targetAns === null || targetAns === 'undefined')) {
        isCorrect = true;
      } else if (parsedUser && targetAns && typeof targetAns === 'object' && targetAns.n !== undefined) {
        isCorrect = eq(parsedUser, targetAns);
        if (isCorrect && !isSimplified(userRaw)) {
          nudge = `Can you simplify it? Equivalent fraction accepted!`;
        }
      } else {
        isCorrect =
          String(userRaw).trim().toLowerCase() ===
          String(currentQuestion.correctAnswer || targetAns).trim().toLowerCase();
      }
    }

    if (isCorrect) {
      playChime();
      const xpEarned = calcXP(attemptCount + 1, 0, streak);
      setXp((prev) => prev + xpEarned);

      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const updatedScores = [...worldScores];
      updatedScores[currentWorld] = (updatedScores[currentWorld] || 0) + 1;
      setWorldScores(updatedScores);

      if (currentQuestion.tags?.includes('sign') && onSignQuestionSolved) {
        onSignQuestionSolved();
      }

      narrate(correctNarration(), audioEnabled);
      setFeedback({
        isCorrect: true,
        xpEarned,
        explanation: currentQuestion.explanation,
        nudge,
      });
    } else {
      playBuzz();
      setStreak(0);
      const nextAttempt = attemptCount + 1;
      setAttemptCount(nextAttempt);

      narrate(incorrectNarration(), audioEnabled);
      if (nextAttempt >= 3) {
        setFeedback({
          isCorrect: false,
          xpEarned: 0,
          explanation: currentQuestion.explanation,
        });
      }
    }
  };

  const handleContinueFeedback = () => {
    setFeedback(null);
    setAttemptCount(0);

    if (questionIdxInWorld < worldQuestions.length - 1) {
      setQuestionIdxInWorld((prev) => prev + 1);
    } else {
      // Completed current world
      if (currentWorld < 9) {
        setCurrentWorld((prev) => prev + 1);
        setQuestionIdxInWorld(0);
      } else {
        onNext();
      }
    }
  };

  const currentWorldScore = worldScores[currentWorld] || 0;
  const stars = calcStars(currentWorldScore);

  return (
    <div className="phase-container practice-phase">
      <div className="glass-card phase-card">
        {/* Header Stats Bar */}
        <div className="play-stats-bar">
          <div className="stat-pill xp-pill">
            <Zap size={18} />
            <span>{xp} XP</span>
          </div>

          <div className="stat-pill streak-pill">
            <Flame size={18} className="flame-icon" />
            <span>{streak} Streak</span>
          </div>

          <div className="stat-pill" style={{ color: '#ffd54f' }}>
            <Star size={18} className="star-filled" />
            <span>{stars} Stars</span>
          </div>

          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Q{questionIdxInWorld + 1} of 10 ({worldMeta.landmark})
          </div>
        </div>

        {/* 10 World Map Selector */}
        <WorldMap
          worldScores={worldScores}
          currentWorld={currentWorld}
          onSelectWorld={(w) => {
            setCurrentWorld(w);
            setQuestionIdxInWorld(0);
            setAttemptCount(0);
          }}
        />

        {/* Current Question */}
        {currentQuestion ? (
          <QuestionRenderer
            question={currentQuestion}
            onSelectAnswer={handleSelectAnswer}
            attemptCount={attemptCount}
            term={term}
            audioEnabled={audioEnabled}
          />
        ) : (
          <div style={{ padding: 40, textAlign: 'center', color: '#00e5ff' }}>
            Generating unique gradient blueprints...
          </div>
        )}

        {/* Feedback Overlay */}
        <FeedbackOverlay
          feedback={feedback}
          onContinue={handleContinueFeedback}
        />
      </div>
    </div>
  );
}
