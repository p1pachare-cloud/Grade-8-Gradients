import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, ArrowRight, RotateCcw, Sparkles, Award } from 'lucide-react';
import GradientGrid from '../shared/GradientGrid.jsx';
import SlopeMeter from '../shared/SlopeMeter.jsx';
import Mascot from '../Mascot.jsx';
import { gradient } from '../../utils/gradientMath.js';
import { frac, eq, formatFrac } from '../../utils/fraction.js';
import { playChime, playBuzz, playClick } from '../../utils/audio.js';

const MISSIONS = [
  {
    id: 'm1',
    round: 1,
    text: 'Build a line with a gradient of 2.',
    targetLabel: '2 (Rise 2 for every Run 1)',
    initialA: { x: -4, y: -2 },
    initialB: { x: 2, y: 4 }, // slope = 1 (incorrect initial, student must drag)
    test: (m, rise, run) => (m && eq(m, frac(2, 1))) || (run !== 0 && Math.abs(rise / run - 2) < 0.001),
  },
  {
    id: 'm2',
    round: 2,
    text: 'Build a gradient of one half (1/2).',
    targetLabel: '1/2 (Rise 1 for every Run 2)',
    initialA: { x: -3, y: -2 },
    initialB: { x: 3, y: 4 }, // slope = 1
    test: (m, rise, run) => (m && eq(m, frac(1, 2))) || (run !== 0 && Math.abs(rise / run - 0.5) < 0.001),
  },
  {
    id: 'm3',
    round: 3,
    text: 'Build a negative gradient of −1.',
    targetLabel: '−1 (Falling 1 unit for every Run 1)',
    initialA: { x: -4, y: 1 },
    initialB: { x: 2, y: 3 }, // slope = 1/3
    test: (m, rise, run) => (m && eq(m, frac(-1, 1))) || (run !== 0 && Math.abs(rise / run - (-1)) < 0.001),
  },
  {
    id: 'm4',
    round: 4,
    text: 'Build a horizontal line (gradient of 0).',
    targetLabel: '0 (Flat horizontal line, Rise = 0)',
    initialA: { x: -3, y: -3 },
    initialB: { x: 2, y: 3 }, // slope = 1.2
    test: (m, rise, run) => (m && m.n === 0) || (run !== 0 && rise === 0),
  },
];

export default function SlopeClimberStation({ onComplete, audioEnabled = true }) {
  const [round, setRound] = useState(0);
  const [pointA, setPointA] = useState(MISSIONS[0].initialA);
  const [pointB, setPointB] = useState(MISSIONS[0].initialB);
  const [hikerPos, setHikerPos] = useState(0);
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const animationIntervalRef = useRef(null);

  const currentMission = MISSIONS[round] || MISSIONS[0];
  const run = pointB.x - pointA.x;
  const rise = pointB.y - pointA.y;
  const m = gradient(pointA, pointB);

  const handlePointMove = (idx, newPt) => {
    // Clear feedback when user adjusts points to encourage interactive checking
    if (feedback && feedback.type === 'error') {
      setFeedback(null);
    }
    if (idx === 0) setPointA(newPt);
    if (idx === 1) setPointB(newPt);
  };

  const handleCheckAnswer = () => {
    // Validate based on the current actual coordinates
    const currentRun = pointB.x - pointA.x;
    const currentRise = pointB.y - pointA.y;
    const currentM = gradient(pointA, pointB);

    const isCorrect = currentMission.test(currentM, currentRise, currentRun);

    if (isCorrect) {
      if (audioEnabled) playChime();
      setSuccess(true);
      setFeedback({
        type: 'success',
        message: 'Excellent! Mission Complete! 🎉',
      });

      // Confetti burst
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}

      // Animate hiker climbing up the staircase
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
      let p = 0;
      setHikerPos(0);
      animationIntervalRef.current = setInterval(() => {
        p += 0.1;
        setHikerPos(Math.min(1, p));
        if (p >= 1) {
          clearInterval(animationIntervalRef.current);
          animationIntervalRef.current = null;
        }
      }, 50);
    } else {
      if (audioEnabled) playBuzz();
      setSuccess(false);

      if (currentRun === 0) {
        setFeedback({
          type: 'error',
          message: 'Not quite! This is a vertical line (undefined gradient). Adjust your points and try again.',
        });
      } else if (currentRise === 0 && currentMission.round !== 4) {
        setFeedback({
          type: 'error',
          message: 'Not quite! This is a horizontal line (gradient of 0). Adjust your points and try again.',
        });
      } else {
        const calculatedSlope = (currentRise / currentRun).toFixed(2);
        setFeedback({
          type: 'error',
          message: `Not quite! Current gradient is ${currentRise} ÷ ${currentRun} = ${calculatedSlope}. Adjust your points and try again.`,
        });
      }
    }
  };

  const handleNextRound = () => {
    if (audioEnabled) playClick();
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }

    if (round < MISSIONS.length - 1) {
      const nextRound = round + 1;
      setRound(nextRound);
      setPointA(MISSIONS[nextRound].initialA);
      setPointB(MISSIONS[nextRound].initialB);
      setSuccess(false);
      setFeedback(null);
      setHikerPos(0);
    } else {
      // Completed Round 4: show completion screen
      setIsFinished(true);
      try {
        confetti({
          particleCount: 100,
          spread: 85,
          origin: { y: 0.5 },
        });
      } catch (e) {}
    }
  };

  const handleReplay = () => {
    if (audioEnabled) playClick();
    setRound(0);
    setPointA(MISSIONS[0].initialA);
    setPointB(MISSIONS[0].initialB);
    setSuccess(false);
    setFeedback(null);
    setHikerPos(0);
    setIsFinished(false);
  };

  // Final Completion Screen
  if (isFinished) {
    return (
      <div className="station-container glass-card" style={{ padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <Mascot mood="celebrating" size="large" />
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 20, background: 'rgba(255, 213, 79, 0.2)', border: '1px solid #ffd54f', color: '#ffd54f', fontWeight: 800, fontSize: '0.85rem', marginBottom: 12 }}>
          <Award size={16} />
          <span>CONCRETE LAB MASTERED</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', color: '#ffffff', fontSize: '1.9rem', margin: '0 0 10px 0' }}>
          Expedition Accomplished! 🏆
        </h2>
        <p style={{ maxWidth: 560, margin: '0 auto 24px auto', color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.5 }}>
          Outstanding work! You successfully constructed positive, fractional, negative, and zero gradients on the live coordinate grid. Grady the mountain goat reached every peak!
        </p>

        {/* Recap Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, maxWidth: 580, margin: '0 auto 28px auto' }}>
          <div style={{ background: 'rgba(10,10,46,0.85)', padding: '12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mission 1</div>
            <div style={{ color: '#00e5ff', fontWeight: 800, fontSize: '1.05rem' }}>m = 2 ✓</div>
          </div>
          <div style={{ background: 'rgba(10,10,46,0.85)', padding: '12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mission 2</div>
            <div style={{ color: '#ffd54f', fontWeight: 800, fontSize: '1.05rem' }}>m = 1/2 ✓</div>
          </div>
          <div style={{ background: 'rgba(10,10,46,0.85)', padding: '12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mission 3</div>
            <div style={{ color: '#ff7043', fontWeight: 800, fontSize: '1.05rem' }}>m = −1 ✓</div>
          </div>
          <div style={{ background: 'rgba(10,10,46,0.85)', padding: '12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mission 4</div>
            <div style={{ color: '#81c784', fontWeight: 800, fontSize: '1.05rem' }}>m = 0 ✓</div>
          </div>
        </div>

        {/* Completion Action Buttons */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn btn-secondary"
            onClick={handleReplay}
            style={{ padding: '12px 22px', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <RotateCcw size={18} />
            <span>Replay Expedition ↺</span>
          </button>
          <button
            className="btn btn-primary"
            onClick={onComplete}
            style={{ padding: '12px 24px', fontSize: '0.98rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <Sparkles size={18} />
            <span>Proceed to Next Station ➔</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="station-container glass-card" style={{ padding: '20px' }}>
      {/* Station Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <span className="phase-tag">STATION A · CONCRETE LAB</span>
          <h3 style={{ margin: '4px 0', fontFamily: 'var(--font-display)', color: '#ffffff' }}>
            Slope Climber Expedition
          </h3>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mission Round:</span>
          <div style={{ color: '#ffd54f', fontWeight: 800, fontSize: '1.1rem' }}>
            Round {round + 1} of 4
          </div>
        </div>
      </div>

      {/* Target Mission Card */}
      <div
        style={{
          background: success ? 'rgba(76,175,80,0.2)' : 'rgba(0,229,255,0.15)',
          border: success ? '1.5px solid #4caf50' : '1.5px solid rgba(0,229,255,0.4)',
          borderRadius: 12,
          padding: '12px 18px',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Mascot mood={success ? 'celebrating' : feedback && feedback.type === 'error' ? 'thinking' : 'curious'} size="small" />
          <div>
            <div style={{ fontSize: '0.8rem', color: '#ffd54f', fontWeight: 800, textTransform: 'uppercase' }}>
              Target Mission:
            </div>
            <div style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 800 }}>
              {currentMission.text}
            </div>
          </div>
        </div>

        {/* Header Action: Only Next appears after success */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {success ? (
            <button
              className="btn btn-primary"
              onClick={handleNextRound}
              style={{
                padding: '8px 20px',
                fontSize: '0.92rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 0 16px rgba(0, 229, 255, 0.4)',
              }}
            >
              <span>{round === 3 ? 'Finish Expedition 🎓' : 'Next Mission ➔'}</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
              Drag points A & B, then click Check Answer
            </div>
          )}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Interactive SVG Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <GradientGrid
            size={380}
            xRange={[-10, 10]}
            yRange={[-10, 10]}
            points={[
              { x: pointA.x, y: pointA.y, label: `A (${pointA.x}, ${pointA.y})`, color: '#00e5ff' },
              { x: pointB.x, y: pointB.y, label: `B (${pointB.x}, ${pointB.y})`, color: '#ffd54f' },
            ]}
            lines={[
              { m, p: pointA, color: success ? '#4caf50' : '#00e5ff' },
            ]}
            staircase={{ from: pointA, to: pointB }}
            onPointMove={handlePointMove}
            showHiker={true}
            hikerPosition={hikerPos}
          />
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 8, textAlign: 'center' }}>
            💡 Drag points A and B anywhere on the grid!
          </div>
        </div>

        {/* Readout Side Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 240, maxWidth: 300, flex: 1 }}>
          <SlopeMeter m={m} size={180} />

          {/* Measurements Box */}
          <div
            style={{
              background: 'rgba(10,10,46,0.85)',
              borderRadius: 12,
              padding: '12px 16px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Horizontal Run:</span>
              <span style={{ color: '#00e5ff', fontWeight: 800 }}>{run}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Vertical Rise:</span>
              <span style={{ color: '#ff7043', fontWeight: 800 }}>{rise}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 6 }}>
              <span style={{ color: '#ffffff', fontWeight: 800 }}>Gradient (m):</span>
              <span style={{ color: '#ffd54f', fontWeight: 900, fontSize: '1.1rem' }}>
                {m === null ? 'Undefined' : `${formatFrac(m)} (${(rise / (run || 1)).toFixed(2)})`}
              </span>
            </div>
          </div>

          {/* Action Button: Check Answer (initial) or Next (after success) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {!success ? (
              <button
                className="btn btn-primary"
                onClick={handleCheckAnswer}
                style={{
                  padding: '12px 20px',
                  fontSize: '1rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 4px 14px rgba(0, 229, 255, 0.35)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                <CheckCircle size={18} />
                <span>Check Answer ✓</span>
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleNextRound}
                style={{
                  padding: '12px 20px',
                  fontSize: '1rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00e5ff 0%, #00b0ff 100%)',
                  color: '#0a0a2e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 4px 18px rgba(0, 229, 255, 0.5)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                <span>{round === 3 ? 'Finish Expedition 🎓' : 'Next Mission ➔'}</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>

          {/* Feedback Message Banner */}
          {feedback && (
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 10,
                background: feedback.type === 'success' ? 'rgba(76,175,80,0.22)' : 'rgba(239,68,68,0.22)',
                border: `1.5px solid ${feedback.type === 'success' ? '#4caf50' : '#ef5350'}`,
                color: feedback.type === 'success' ? '#a5d6a7' : '#ffcdd2',
                fontWeight: 700,
                fontSize: '0.88rem',
                lineHeight: 1.4,
                textAlign: 'center',
                animation: 'fadeIn 0.25s ease',
              }}
            >
              {feedback.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
