import React, { useState, useEffect } from 'react';
import { Volume2, BookOpen } from 'lucide-react';
import DiagramFor from './DiagramFor.jsx';
import HintOverlay from './HintOverlay.jsx';
import FractionPad from '../shared/FractionPad.jsx';
import ConceptReminder from './ConceptReminder.jsx';
import { resolveTerms } from '../../utils/terms.js';
import { narrate } from '../../utils/audio.js';
import { questionNarration } from '../../utils/narration.js';

export default function QuestionRenderer({
  question,
  onSelectAnswer,
  attemptCount = 0,
  term = 'gradient',
  audioEnabled = true,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
  }, [question?.id]);

  if (!question) return null;

  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
    onSelectAnswer(opt);
  };

  const handleListen = () => {
    narrate(questionNarration(question), true);
  };

  const resolvedTitle = resolveTerms(question.displayText || question.questionText || '', term);

  return (
    <div className="question-renderer-card glass-card">
      <ConceptReminder isOpen={showReminder} onClose={() => setShowReminder(false)} />

      {/* Top Bar */}
      <div className="question-top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="question-type-badge">
          <span>{question.type?.toUpperCase().replace(/_/g, ' ')}</span>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="listen-btn"
            onClick={() => setShowReminder(true)}
            title="Open gradient cheat sheet"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 999,
              padding: '4px 12px',
              color: '#00e5ff',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 700,
            }}
          >
            <BookOpen size={15} />
            <span>Remind Me</span>
          </button>

          <button
            className="listen-btn"
            onClick={handleListen}
            title="Listen to question narration"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 999,
              padding: '4px 12px',
              color: '#ffd54f',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 700,
            }}
          >
            <Volume2 size={16} />
            <span>Listen</span>
          </button>
        </div>
      </div>

      {/* Question Text Title */}
      <h3 className="question-text-title" style={{ margin: '14px 0', fontSize: '1.25rem', lineHeight: 1.5 }}>
        {resolvedTitle}
      </h3>

      {/* Visual Diagram Scaffold if available */}
      {question.visual && question.visual.kind !== 'none' && (
        <div className="question-visual-scaffold">
          <DiagramFor visual={question.visual} />
        </div>
      )}

      {/* Answer Inputs */}
      {question.answerKind === 'fraction' ? (
        <FractionPad
          onSubmit={(val) => onSelectAnswer(val)}
          allowUndefined={question.acceptNull || question.tags?.includes('undefined')}
        />
      ) : (
        <div className="mcq-options-grid">
          {question.options &&
            question.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={idx}
                  className={`mcq-option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + idx)}.</span>
                  <span className="option-text">{resolveTerms(String(option), term)}</span>
                </button>
              );
            })}
        </div>
      )}

      {/* Graduated Hints */}
      <HintOverlay
        hint1={question.hint1}
        hint2={question.hint2}
        explanation={question.explanation}
        attemptCount={attemptCount}
      />
    </div>
  );
}
