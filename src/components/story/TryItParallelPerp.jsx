import React, { useState } from 'react';
import { playClick } from '../../utils/audio.js';

export default function TryItParallelPerp({ onDone }) {
  const [relation, setRelation] = useState('parallel'); // 'parallel' | 'perpendicular'

  const handleSelect = (r) => {
    playClick();
    setRelation(r);
    if (onDone) onDone();
  };

  const isParallel = relation === 'parallel';

  return (
    <div className="try-it-container" style={{ width: '100%', padding: '12px' }}>
      <div style={{ fontSize: '0.9rem', color: '#ffd54f', fontWeight: 800, marginBottom: 8 }}>
        🌉 Carlos &amp; Fatima's Bridge: Compare Parallel vs Perpendicular Gradients!
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <button
          className={`btn ${isParallel ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1, padding: '8px 10px', fontSize: '0.85rem' }}
          onClick={() => handleSelect('parallel')}
        >
          Parallel Lines (∥)
        </button>
        <button
          className={`btn ${!isParallel ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1, padding: '8px 10px', fontSize: '0.85rem' }}
          onClick={() => handleSelect('perpendicular')}
        >
          Perpendicular Lines (⊥)
        </button>
      </div>

      <div
        style={{
          background: 'rgba(10,10,46,0.9)',
          borderRadius: 12,
          padding: '12px 16px',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 8 }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Line 1 Gradient</span>
            <span style={{ fontSize: '1.2rem', color: '#00e5ff', fontWeight: 800 }}>m₁ = 2/3</span>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Line 2 Gradient</span>
            <span style={{ fontSize: '1.2rem', color: isParallel ? '#ffd54f' : '#ff4081', fontWeight: 800 }}>
              {isParallel ? 'm₂ = 2/3' : 'm₂ = −3/2'}
            </span>
          </div>
        </div>

        <div style={{ color: '#81c784', fontWeight: 700, fontSize: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 8 }}>
          {isParallel
            ? '✓ Equal gradients (m₁ = m₂) make the lines run parallel forever!'
            : '✓ Negative reciprocals (m₁ × m₂ = 2/3 × (−3/2) = −1) meet at a sharp 90° angle!'}
        </div>
      </div>
    </div>
  );
}
