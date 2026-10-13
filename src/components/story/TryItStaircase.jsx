import React, { useState } from 'react';
import { playClick } from '../../utils/audio.js';

export default function TryItStaircase({ onDone }) {
  const [stepMultiplier, setStepMultiplier] = useState(1);

  const baseRise = 3;
  const baseRun = 4;
  const currRise = baseRise * stepMultiplier;
  const currRun = baseRun * stepMultiplier;

  const handleChange = (e) => {
    playClick();
    const val = Number(e.target.value);
    setStepMultiplier(val);
    if (onDone) onDone();
  };

  return (
    <div className="try-it-container" style={{ width: '100%', padding: '12px' }}>
      <div style={{ fontSize: '0.9rem', color: '#ffd54f', fontWeight: 800, marginBottom: 8 }}>
        📐 Scale the staircase triangle! Does the ratio (rise ÷ run) change?
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Staircase Size:</span>
        <span style={{ color: '#00e5ff', fontWeight: 800 }}>×{stepMultiplier}</span>
      </div>
      <input
        type="range"
        min="1"
        max="3"
        step="1"
        value={stepMultiplier}
        onChange={handleChange}
        className="slider-input"
        style={{ width: '100%' }}
      />
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          justifyContent: 'space-around',
          background: 'rgba(10,10,46,0.8)',
          padding: '8px 12px',
          borderRadius: 10,
        }}
      >
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Rise (climb)</span>
          <span style={{ color: '#ff7043', fontWeight: 800, fontSize: '1.1rem' }}>{currRise} m</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Run (across)</span>
          <span style={{ color: '#ffd54f', fontWeight: 800, fontSize: '1.1rem' }}>{currRun} m</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Gradient</span>
          <span style={{ color: '#00e5ff', fontWeight: 800, fontSize: '1.1rem' }}>{currRise}/{currRun} = 3/4</span>
        </div>
      </div>
      <div style={{ marginTop: 8, textAlign: 'center', color: '#81c784', fontSize: '0.85rem', fontWeight: 700 }}>
        ✓ No matter how big the triangle is, the gradient is always 3/4!
      </div>
    </div>
  );
}
