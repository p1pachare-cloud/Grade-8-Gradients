import React, { useState, useEffect } from 'react';
import { Award, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import Mascot from '../Mascot.jsx';
import { BADGES } from '../../utils/badgeEngine.js';
import { getExplorerTitle } from '../../utils/scoring.js';
import { reflectNarration } from '../../utils/narration.js';
import { narrate, playChime } from '../../utils/audio.js';

export default function ReflectPhase({
  onRestart,
  audioEnabled = true,
  xp,
  worldScores = [],
  unlockedBadges = [],
}) {
  const [reflectionText, setReflectionText] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    narrate(reflectNarration(), audioEnabled);
  }, [audioEnabled]);

  const handleSaveJournal = () => {
    playChime();
    setSaved(true);
  };

  const totalCorrect = worldScores.reduce((sum, ws) => sum + (ws || 0), 0);
  const explorerTitle = getExplorerTitle(xp);

  return (
    <div className="phase-container reflect-phase">
      <div className="glass-card phase-card">
        {/* Header */}
        <div className="phase-header">
          <div>
            <span className="phase-tag">PHASE 5 — REFLECT</span>
            <h2>Lesson Completion &amp; Gradient Journal</h2>
          </div>
          <span style={{ color: '#ffd54f', fontWeight: 800 }}>
            Kilimanjaro Beacon Lit! ⛰️🔥
          </span>
        </div>

        {/* Certificate Card */}
        <div className="completion-certificate-card glass-card">
          <div className="cert-header">
            <Mascot mood="celebrating" size="large" />
            <div>
              <span className="phase-tag" style={{ background: 'rgba(255,193,7,0.2)', color: '#ffd54f' }}>
                {explorerTitle}
              </span>
              <h1 className="cert-title">Global Gradient Explorer!</h1>
              <p className="cert-subtitle">Gradients, Rise &amp; Run, and Rate of Change — Grade 8 Mathematics</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="cert-stats-row">
            <div className="cert-stat-box">
              <span className="stat-value">{xp}</span>
              <span className="stat-label">Total XP Earned</span>
            </div>
            <div className="cert-stat-box">
              <span className="stat-value">{totalCorrect}/100</span>
              <span className="stat-label">Questions Correct</span>
            </div>
            <div className="cert-stat-box">
              <span className="stat-value">{unlockedBadges.length}/{BADGES.length}</span>
              <span className="stat-label">Badges Unlocked</span>
            </div>
          </div>

          {/* Badges Panel */}
          <div className="badges-grid-container">
            <h3 style={{ fontFamily: 'var(--font-display)', color: '#ffd54f', fontSize: '1.3rem' }}>
              🏅 Expedition Badges
            </h3>
            <div className="badges-flex-row">
              {BADGES.map((badge) => {
                const isUnlocked = unlockedBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`badge-chip-card ${isUnlocked ? 'badge-unlocked' : 'badge-locked'}`}
                    title={badge.description}
                  >
                    <span>{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reflection Journal Prompt */}
          <div className="reflection-journal-box">
            <h3 style={{ fontFamily: 'var(--font-display)', color: '#ffd54f', fontSize: '1.25rem' }}>
              📓 Explorer's Mountain Journal
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              "Pick one gradient rule you discovered today (Rise over run, positive vs negative uphill/downhill, zero vs undefined, the two-point formula (y₂−y₁)÷(x₂−x₁), or parallel &amp; perpendicular lines). Explain why it works in your own words!"
            </p>
            <textarea
              className="journal-textarea"
              rows="4"
              placeholder="Record your gradient discoveries and insights here..."
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <button
                className="btn btn-primary"
                onClick={handleSaveJournal}
                disabled={!reflectionText.trim() || saved}
              >
                {saved ? <CheckCircle2 size={16} /> : <Sparkles size={16} />}
                <span>{saved ? 'Journal Saved! ✓' : 'Save to Journal'}</span>
              </button>
            </div>
          </div>

          {/* Restart Journey Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <button className="btn btn-secondary" onClick={onRestart}>
              <RotateCcw size={16} />
              <span>Restart Gradient Expedition</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
