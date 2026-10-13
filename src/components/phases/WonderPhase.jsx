import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import Mascot from '../Mascot.jsx';
import SlopeMeter from '../shared/SlopeMeter.jsx';
import { frac } from '../../utils/fraction.js';
import { wonderNarration } from '../../utils/narration.js';
import { narrate, playClick, playChime } from '../../utils/audio.js';

export default function WonderPhase({ onNext, audioEnabled = true }) {
  const [rise, setRise] = useState(300);
  const [run, setRun] = useState(900);
  const [revealed, setRevealed] = useState(false);

  const m = frac(rise, run);

  useEffect(() => {
    narrate(wonderNarration(), audioEnabled);
  }, [audioEnabled]);

  const handleReveal = () => {
    playChime();
    setRevealed(true);
  };

  return (
    <div className="phase-container wonder-phase">
      <div className="glass-card phase-card">
        <div className="phase-header">
          <div>
            <span className="phase-tag">PHASE 1 — WONDER</span>
            <h2>The Mystery of the Alpine Cable Car</h2>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>
            Zermatt, Swiss Alps 🇨🇭
          </span>
        </div>

        <div className="wonder-content-grid">
          {/* Visual Interactive Mountain & Cable Car Stage */}
          <div className="wonder-visual-panel">
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffd54f' }}>
              Sarah's Alpine Ascent · Matterhorn Cable Track
            </span>

            <div className="interactive-svg-stage" style={{ width: 340, height: 260, position: 'relative' }}>
              <svg viewBox="0 0 340 260" width="100%" height="100%">
                <defs>
                  <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="60%" stopColor="#1e3a8a" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="snowCap" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#93c5fd" />
                  </linearGradient>
                </defs>

                {/* Distant Mountain Peak */}
                <polygon points="20,220 180,40 320,220" fill="url(#mountainGrad)" opacity="0.6" />
                <polygon points="140,90 180,40 220,90 190,105 180,95 160,105" fill="url(#snowCap)" opacity="0.8" />

                {/* Ground Base */}
                <line x1="20" y1="220" x2="320" y2="220" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4,4" />

                {/* Cable Cable Line */}
                <line x1="40" y1="210" x2="300" y2="90" stroke="#00e5ff" strokeWidth="4" strokeLinecap="round" />

                {/* Cable Car Cabin */}
                <g transform="translate(150, 130)">
                  {/* Hanger arm */}
                  <line x1="15" y1="-8" x2="15" y2="8" stroke="#ffffff" strokeWidth="2" />
                  <rect x="0" y="8" width="30" height="20" rx="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Window */}
                  <rect x="4" y="12" width="22" height="8" rx="2" fill="#00e5ff" opacity="0.8" />
                  <text x="15" y="24" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">🚡</text>
                </g>

                {/* Run & Rise arrows */}
                {/* Run */}
                <line x1="40" y1="235" x2="300" y2="235" stroke="#ffd54f" strokeWidth="2" />
                <text x="170" y="250" fill="#ffd54f" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Horizontal Run: {run} m
                </text>

                {/* Rise */}
                <line x1="310" y1="210" x2="310" y2="90" stroke="#ff7043" strokeWidth="2" />
                <text x="318" y="155" fill="#ff7043" fontSize="11" fontWeight="bold" dominantBaseline="middle">
                  Rise: {rise} m
                </text>
              </svg>
            </div>

            {/* Live Slope Meter Dial */}
            <div style={{ marginTop: 10, width: '100%', display: 'flex', justifyContent: 'center' }}>
              <SlopeMeter m={m} size={180} />
            </div>

            {/* Slider adjuster */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '90%', marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Adjust Ascent Rise:</span>
                <span style={{ color: '#00e5ff', fontWeight: 800 }}>{rise} metres</span>
              </div>
              <input
                type="range"
                min="100"
                max="900"
                step="50"
                value={rise}
                onChange={(e) => {
                  playClick();
                  setRise(Number(e.target.value));
                  setRevealed(false);
                }}
                className="slider-input"
              />
            </div>
          </div>

          {/* Wonder Story Hook & Question Card */}
          <div className="wonder-text-panel">
            <div className="wonder-speech-bubble">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Mascot mood={revealed ? 'happy' : 'curious'} size="small" />
                <span style={{ fontWeight: 800, color: '#ffd54f' }}>Grady asks:</span>
              </div>
              <p className="wonder-lead-text">
                "Sarah rides a cable car in the Swiss Alps. It climbs <strong>{rise} metres up</strong> while it travels <strong>{run} metres across</strong>."
              </p>
              <p className="wonder-question-text" style={{ color: '#ffd54f', fontSize: '1.2rem', marginTop: 10 }}>
                🤔 Is her ride steep or gentle? Can we measure its steepness with exact math?
              </p>
            </div>

            <div className="mystery-angle-box glass-card" style={{ padding: 18, textAlign: 'center', margin: '14px 0' }}>
              <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: 'block' }}>
                Gradient (Rise ÷ Run):
              </span>
              <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#00e5ff', margin: '6px 0' }}>
                {revealed ? `${m.n}/${m.d} (${(rise / run).toFixed(2)})` : '?'}
              </div>
              {revealed && (
                <div style={{ color: '#81c784', fontWeight: 700, fontSize: '0.95rem', marginTop: 4 }}>
                  {rise / run <= 0.4 ? 'Gentle incline! (Climbs only 1m for every 3m across)' : 'Steep climb!'}
                </div>
              )}
            </div>

            {!revealed ? (
              <button className="btn btn-primary" onClick={handleReveal} style={{ width: '100%', padding: '14px' }}>
                <Sparkles size={18} />
                <span>Reveal Steepness Formula!</span>
              </button>
            ) : (
              <button className="btn btn-primary" onClick={onNext} style={{ width: '100%', padding: '14px' }}>
                <span>Continue to Story Phase</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
