import React, { useState } from 'react';
import FractionPad from '../shared/FractionPad.jsx';
import GradientGrid from '../shared/GradientGrid.jsx';
import Mascot from '../Mascot.jsx';
import { parseAnswer, isSimplified } from '../../utils/answerParser.js';
import { frac, formatFrac, eq } from '../../utils/fraction.js';
import { playChime, playBuzz } from '../../utils/audio.js';

export default function FormulaBuilderStation({ onComplete }) {
  const [round, setRound] = useState(0);
  const [step, setStep] = useState(0); // 0: numerator, 1: denominator, 2: final gradient
  const [showGraph, setShowGraph] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const rounds = [
    // Round 1: Positive whole number
    { p1: { x: 1, y: 3 }, p2: { x: 4, y: 9 }, rise: 6, run: 3, m: frac(2, 1), targetStr: '2' },
    // Round 2: Fractional negative
    { p1: { x: -2, y: 5 }, p2: { x: 2, y: 2 }, rise: -3, run: 4, m: frac(-3, 4), targetStr: '−3/4' },
    // Round 3: Positive fraction
    { p1: { x: 0, y: 1 }, p2: { x: 5, y: 4 }, rise: 3, run: 5, m: frac(3, 5), targetStr: '3/5' },
  ];

  const curr = rounds[round] || rounds[0];

  const handleSubmitValue = (rawInput) => {
    if (step === 0) {
      // Check numerator (rise: y2 - y1)
      const num = Number(rawInput.replace(/[\u2212-]/g, '-'));
      if (num === curr.rise) {
        playChime();
        setFeedback({ success: true, text: `Correct numerator: ${curr.p2.y} − ${curr.p1.y} = ${curr.rise}!` });
        setTimeout(() => {
          setFeedback(null);
          setStep(1);
        }, 1200);
      } else {
        playBuzz();
        setFeedback({ success: false, text: `Subtract y values: y₂ − y₁ = ${curr.p2.y} − (${curr.p1.y}).` });
      }
    } else if (step === 1) {
      // Check denominator (run: x2 - x1)
      const num = Number(rawInput.replace(/[\u2212-]/g, '-'));
      if (num === curr.run) {
        playChime();
        setFeedback({ success: true, text: `Correct denominator: ${curr.p2.x} − ${curr.p1.x} = ${curr.run}!` });
        setTimeout(() => {
          setFeedback(null);
          setStep(2);
        }, 1200);
      } else {
        playBuzz();
        setFeedback({ success: false, text: `Subtract x values: x₂ − x₁ = ${curr.p2.x} − (${curr.p1.x}).` });
      }
    } else if (step === 2) {
      // Check final simplified gradient
      const parsed = parseAnswer(rawInput);
      if (parsed && eq(parsed, curr.m)) {
        playChime();
        const simplified = isSimplified(rawInput);
        setFeedback({
          success: true,
          text: simplified
            ? `Formula Complete! Gradient = ${formatFrac(curr.m)}.`
            : `Correct! Can you simplify it to ${formatFrac(curr.m)}? Great job!`,
        });
        setTimeout(() => {
          setFeedback(null);
          setStep(0);
          if (round < rounds.length - 1) {
            setRound((r) => r + 1);
          } else {
            onComplete();
          }
        }, 1500);
      } else {
        playBuzz();
        setFeedback({
          success: false,
          text: `Divide rise by run: ${curr.rise} ÷ ${curr.run} = ${formatFrac(curr.m)}.`,
        });
      }
    }
  };

  return (
    <div className="station-container glass-card" style={{ padding: '20px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <span className="phase-tag">STATION C · ABSTRACT LAB</span>
          <h3 style={{ margin: '4px 0', fontFamily: 'var(--font-display)', color: '#ffffff' }}>
            Gradient Formula Builder
          </h3>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Formula Round:</span>
          <div style={{ color: '#ffd54f', fontWeight: 800, fontSize: '1.1rem' }}>
            Round {round + 1} of 3
          </div>
        </div>
      </div>

      {/* Points & Formula Stage */}
      <div
        style={{
          background: 'rgba(10,10,46,0.9)',
          borderRadius: 14,
          padding: '16px 20px',
          marginBottom: 16,
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ color: '#00e5ff', fontWeight: 800, fontSize: '1.1rem' }}>
            Point A (x₁, y₁) = ({curr.p1.x}, {curr.p1.y})
          </div>
          <div style={{ color: '#ffd54f', fontWeight: 800, fontSize: '1.1rem' }}>
            Point B (x₂, y₂) = ({curr.p2.x}, {curr.p2.y})
          </div>
          <button
            className="btn btn-secondary"
            style={{ padding: '4px 12px', fontSize: '0.8rem' }}
            onClick={() => setShowGraph(!showGraph)}
          >
            {showGraph ? 'Hide Graph' : 'Show Graph Scaffold 📐'}
          </button>
        </div>

        {/* Step-by-step interactive formula breakdown */}
        <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.2rem', margin: '14px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span>m = </span>
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ color: step === 0 ? '#ff4081' : '#ffffff', borderBottom: '2px solid #ffffff', padding: '0 8px' }}>
                {step > 0 ? curr.rise : 'y₂ − y₁'}
              </span>
              <span style={{ color: step === 1 ? '#00e5ff' : '#ffffff', padding: '0 8px' }}>
                {step > 1 ? curr.run : 'x₂ − x₁'}
              </span>
            </div>
            {step === 2 && (
              <span style={{ color: '#ffd54f', fontWeight: 800 }}> = ?</span>
            )}
          </div>
        </div>

        {/* Instruction badge for current step */}
        <div style={{ textAlign: 'center', color: '#ffd54f', fontWeight: 700, fontSize: '0.9rem' }}>
          {step === 0 && `Step 1: Enter the numerator (y₂ − y₁ = ${curr.p2.y} − (${curr.p1.y}))`}
          {step === 1 && `Step 2: Enter the denominator (x₂ − x₁ = ${curr.p2.x} − (${curr.p1.x}))`}
          {step === 2 && `Step 3: Enter the simplified gradient (rise ÷ run)`}
        </div>
      </div>

      {/* Optional Graph Scaffold */}
      {showGraph && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <GradientGrid
            size={320}
            points={[
              { x: curr.p1.x, y: curr.p1.y, label: 'A', color: '#00e5ff' },
              { x: curr.p2.x, y: curr.p2.y, label: 'B', color: '#ffd54f' },
            ]}
            lines={[{ m: curr.m, p: curr.p1, color: '#00e5ff' }]}
            staircase={{ from: curr.p1, to: curr.p2 }}
          />
        </div>
      )}

      {/* Interactive Fraction Pad */}
      <FractionPad
        onSubmit={handleSubmitValue}
        placeholder={step === 0 ? 'Enter rise (y₂ − y₁)' : step === 1 ? 'Enter run (x₂ − x₁)' : 'Enter simplified m'}
      />

      {/* Station Actions */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
        <button
          className="btn btn-secondary"
          onClick={() => {
            if (step < 2) {
              setStep((s) => s + 1);
            } else if (round < rounds.length - 1) {
              setRound((r) => r + 1);
              setStep(0);
            } else {
              onComplete();
            }
          }}
          style={{ padding: '8px 18px', fontSize: '0.9rem' }}
        >
          Next ➔
        </button>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div
          style={{
            marginTop: 14,
            textAlign: 'center',
            padding: '10px 14px',
            borderRadius: 10,
            background: feedback.success ? 'rgba(76,175,80,0.2)' : 'rgba(239,68,68,0.2)',
            color: feedback.success ? '#81c784' : '#ef9a9a',
            fontWeight: 700,
          }}
        >
          {feedback.text}
        </div>
      )}
    </div>
  );
}
