import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight } from 'lucide-react';
import Mascot from '../Mascot.jsx';

export default function FeedbackOverlay({ feedback, onContinue }) {
  if (!feedback) return null;

  const { isCorrect, xpEarned, explanation, nudge } = feedback;

  useEffect(() => {
    if (isCorrect) {
      try {
        confetti({
          particleCount: 55,
          spread: 65,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [isCorrect]);

  return (
    <div className="feedback-overlay-backdrop">
      <div className={`feedback-modal-card ${isCorrect ? 'correct' : 'incorrect'}`}>
        <Mascot mood={isCorrect ? 'celebrating' : 'thinking'} size="large" />

        <h3 className="feedback-title">
          {isCorrect ? 'Mountain Precision! ⛰️🎉' : 'Keep Exploring! 🤔'}
        </h3>

        {isCorrect && xpEarned > 0 && (
          <div className="feedback-xp-burst">
            <span>+{xpEarned} XP Earned! ⚡</span>
          </div>
        )}

        {nudge && (
          <p style={{ color: '#ffd54f', fontWeight: 700, margin: '6px 0', fontSize: '0.95rem' }}>
            {nudge}
          </p>
        )}

        {explanation && (
          <p className="feedback-explanation">
            {explanation}
          </p>
        )}

        <button className="btn btn-primary" onClick={onContinue} style={{ minWidth: 180, marginTop: 12 }}>
          <span>Continue</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
