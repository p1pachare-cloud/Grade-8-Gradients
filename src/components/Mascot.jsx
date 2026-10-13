import React from 'react';

export default function Mascot({ mood = 'idle', size = 'medium', className = '' }) {
  const sizePx = size === 'large' ? 120 : size === 'medium' ? 80 : 50;

  return (
    <div
      className={`mascot-robot mascot-mood-${mood} ${className}`}
      style={{ width: sizePx, height: sizePx, position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      title={`Grady the Mountain Goat (${mood})`}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <linearGradient id="gradyFur" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="60%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="gradyHorn" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd54f" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="gradyBackpack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <filter id="gradyGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Explorer Backpack behind */}
        <rect x="22" y="44" width="16" height="26" rx="4" fill="url(#gradyBackpack)" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="28" cy="52" r="2.5" fill="#ffd54f" />

        {/* Goat Horns (Curved Mountain Horns) */}
        {/* Left Horn */}
        <path
          d="M 38 32 C 32 18, 22 14, 18 20 C 16 26, 26 28, 34 35"
          fill="url(#gradyHorn)"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Right Horn */}
        <path
          d="M 62 32 C 68 18, 78 14, 82 20 C 84 26, 74 28, 66 35"
          fill="url(#gradyHorn)"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Goat Ears */}
        {/* Left Ear */}
        <ellipse cx="26" cy="40" rx="9" ry="4.5" transform="rotate(-20 26 40)" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
        <ellipse cx="26" cy="40" rx="6" ry="2.5" transform="rotate(-20 26 40)" fill="#fbcfe8" />
        {/* Right Ear */}
        <ellipse cx="74" cy="40" rx="9" ry="4.5" transform="rotate(20 74 40)" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
        <ellipse cx="74" cy="40" rx="6" ry="2.5" transform="rotate(20 74 40)" fill="#fbcfe8" />

        {/* Head / Face */}
        <path
          d="M 35 32 C 45 28, 55 28, 65 32 C 72 40, 70 62, 58 72 C 54 75, 46 75, 42 72 C 30 62, 28 40, 35 32 Z"
          fill="url(#gradyFur)"
          filter="url(#gradyGlow)"
          stroke="#ffffff"
          strokeWidth="2"
        />

        {/* Goat Beard Tuft */}
        <polygon points="46,72 54,72 50,84" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" strokeLinejoin="round" />

        {/* Snout & Nose */}
        <ellipse cx="50" cy="62" rx="11" ry="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <ellipse cx="46" cy="61" rx="1.8" ry="1.2" fill="#475569" />
        <ellipse cx="54" cy="61" rx="1.8" ry="1.2" fill="#475569" />

        {/* Eyes based on mood */}
        {mood === 'happy' || mood === 'celebrating' ? (
          <>
            <path d="M 39 46 Q 44 40 49 46" stroke="#00e5ff" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 51 46 Q 56 40 61 46" stroke="#00e5ff" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : mood === 'thinking' || mood === 'curious' ? (
          <>
            <circle cx="43" cy="46" r="3.5" fill="#ffd54f" />
            <ellipse cx="57" cy="44" rx="4.5" ry="2.5" fill="#ffd54f" />
            {/* Thinking eyebrow */}
            <line x1="53" y1="39" x2="62" y2="38" stroke="#ffd54f" strokeWidth="1.8" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="43" cy="46" rx="3.5" ry="4" fill="#0f172a" />
            <ellipse cx="57" cy="46" rx="3.5" ry="4" fill="#0f172a" />
            <circle cx="44" cy="44.5" r="1.3" fill="#ffffff" />
            <circle cx="58" cy="44.5" r="1.3" fill="#ffffff" />
          </>
        )}

        {/* Mouth based on mood */}
        {mood === 'celebrating' || mood === 'happy' ? (
          <path d="M 44 65 Q 50 72 56 65" stroke="#ff4081" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        ) : mood === 'thinking' ? (
          <line x1="46" y1="65" x2="54" y2="64" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        ) : mood === 'encouraging' ? (
          <path d="M 45 65 Q 50 69 55 65" stroke="#00e5ff" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M 45 65 Q 50 68 55 65" stroke="#475569" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        )}

        {/* Tiny Explorer Flag / Compass badge on head */}
        <circle cx="50" cy="33" r="3" fill="#ffd54f" stroke="#ffffff" strokeWidth="1" />
        <path d="M 50 31 L 52 35 L 50 34 L 48 35 Z" fill="#ef4444" />
      </svg>
    </div>
  );
}
