import React from 'react';

const SYMBOLS = [
  'm = rise ÷ run',
  'Δy ÷ Δx',
  'y = mx + c',
  '(y₂−y₁) ÷ (x₂−x₁)',
  'm₁ = m₂ (∥)',
  'm₁·m₂ = −1 (⊥)',
  'rise 3 · run 4',
  '1 in 12',
  'slope 2/3',
  'positive ↗',
  'negative ↘',
  'zero → 0',
  'undefined ↑',
  '100%',
];

export default function FloatingGeometry() {
  return (
    <div className="floating-numbers" aria-hidden="true">
      {SYMBOLS.map((sym, i) => {
        const top = (i * 8 + 3) % 92;
        const left = (i * 14 + 5) % 94;
        const duration = 22 + (i % 6) * 4;
        const delay = (i * 1.9) % 12;
        return (
          <span
            key={i}
            className="floating-number"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            {sym}
          </span>
        );
      })}
    </div>
  );
}
