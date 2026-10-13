import React from 'react';

const PHASE_CARDS = [
  {
    id: 'wonder',
    emoji: '🤔',
    title: 'Wonder',
    subtitle: 'The Alpine Cable Car Mystery!',
  },
  {
    id: 'story',
    emoji: '📖',
    title: 'Story',
    subtitle: 'The Gradient Trail Expedition',
  },
  {
    id: 'simulate',
    emoji: '🧪',
    title: 'Simulate',
    subtitle: '3 Station Gradient Lab',
  },
  {
    id: 'practice',
    emoji: '🎮',
    title: 'Practice',
    subtitle: '100 Random Challenges (10 Worlds)',
  },
  {
    id: 'reflect',
    emoji: '📓',
    title: 'Reflect',
    subtitle: 'Summit Badges & Explorer Journal',
  },
];

export default function IntroScreen({ onStart, onSelectPhase }) {
  return (
    <div className="intro-screen-layout">
      {/* Top Grade Pill */}
      <div className="grade-badge-pill">
        <span>✨ Grade 8 Math • Global Coordinate Geometry</span>
      </div>

      {/* Main Title & Subtitle */}
      <h1 className="hero-main-title">Global Gradient Explorers — Gradients</h1>
      <h2 className="hero-subtitle">Steepness, Rise &amp; Run, and Rate of Change! ⛰️📈</h2>

      {/* Intro Description Box */}
      <div className="hero-description-box">
        <p>
          Stop guessing steepness by eye and start calculating by rules! Join Grady the mountain goat and the Global Explorers Club to discover rise over run, positive &amp; negative slopes, the two-point formula, and linear relationships across global landmarks. 🥾🏔️
        </p>
      </div>

      {/* 5 Phase Cards Row */}
      <div className="phase-cards-row">
        {PHASE_CARDS.map((card) => (
          <div
            key={card.id}
            className="home-phase-card"
            onClick={() => (onSelectPhase ? onSelectPhase(card.id) : onStart())}
          >
            <div className="phase-card-emoji">{card.emoji}</div>
            <h3 className="phase-card-title">{card.title}</h3>
            <span className="phase-card-subtitle">{card.subtitle}</span>
          </div>
        ))}
      </div>

      {/* Main CTA Button */}
      <button className="btn-begin-journey" onClick={onStart}>
        <span className="rocket-icon">🚀</span>
        <span>Begin Your Expedition!</span>
      </button>

      {/* Bottom Feature Tags */}
      <div className="bottom-feature-tags">
        <div className="feature-tag-pill">
          <span>🎯 100 Random Questions</span>
        </div>
        <div className="feature-tag-pill">
          <span>🧪 3 Interactive Simulation Stations</span>
        </div>
        <div className="feature-tag-pill">
          <span>🏆 8 Badges &amp; XP Streak System</span>
        </div>
      </div>
    </div>
  );
}
