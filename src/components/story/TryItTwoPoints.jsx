import React, { useState } from 'react';
import { frac, formatFrac } from '../../utils/fraction.js';
import { playClick } from '../../utils/audio.js';

export default function TryItTwoPoints({ onDone }) {
  const [p1, setP1] = useState({ x: 1, y: 2 });
  const [p2, setP2] = useState({ x: 5, y: 10 });

  const rise = p2.y - p1.y;
  const run = p2.x - p1.x;
  const m = run !== 0 ? frac(rise, run) : null;

  const handleShift = (coord, delta) => {
    playClick();
    if (coord === 'p2y') setP2((prev) => ({ ...prev, y: Math.max(0, Math.min(12, prev.y + delta)) }));
    if (coord === 'p2x') setP2((prev) => ({ ...prev, x: Math.max(2, Math.min(10, prev.x + delta)) }));
    if (onDone) onDone();
  };

  return (
    <div className="try-it-container" style={{ width: '100%', padding: '12px' }}>
      <div style={{ fontSize: '0.9rem', color: '#ffd54f', fontWeight: 800, marginBottom: 8 }}>
        🛸 Adjust Drone Point B! Watch the two-point formula calculate in real-time.
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: '0.88rem' }}>
        <span style={{ color: '#00e5ff', fontWeight: 700 }}>Point A = ({p1.x}, {p1.y})</span>
        <span style={{ color: '#ffd54f', fontWeight: 700 }}>Point B = ({p2.x}, {p2.y})</span>
      </div>

      {/* Adjust Buttons */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 12 }}>
        <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={() => handleShift('p2y', -2)}>
          B y − 2
        </button>
        <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={() => handleShift('p2y', 2)}>
          B y + 2
        </button>
        <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={() => handleShift('p2x', -1)}>
          B x − 1
        </button>
        <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={() => handleShift('p2x', 1)}>
          B x + 1
        </button>
      </div>

      {/* Live Formula Display */}
      <div
        style={{
          background: 'rgba(10,10,46,0.9)',
          borderRadius: 12,
          padding: '12px',
          textAlign: 'center',
          fontFamily: 'monospace',
          fontSize: '1rem',
        }}
      >
        <div style={{ color: '#ffffff' }}>
          m = <span style={{ color: '#ff7043' }}>y₂ − y₁</span> ÷ <span style={{ color: '#00e5ff' }}>x₂ − x₁</span>
        </div>
        <div style={{ margin: '6px 0', color: 'var(--text-muted)' }}>
          = ({p2.y} − {p1.y}) ÷ ({p2.x} − {p1.x})
        </div>
        <div style={{ color: '#ffd54f', fontWeight: 800, fontSize: '1.25rem' }}>
          = {rise} ÷ {run} = {m ? formatFrac(m) : 'undefined'}
        </div>
      </div>
    </div>
  );
}
