import React, { useState } from 'react';
import { playClick } from '../../utils/audio.js';

export default function TryItDragLine({ onDone }) {
  const [selectedPath, setSelectedPath] = useState(null);

  const paths = [
    { id: 1, name: 'Path A', rise: 1, run: 5, m: '1/5', desc: 'Gentle footpath' },
    { id: 2, name: 'Path B', rise: 3, run: 4, m: '3/4', desc: 'Moderate slope' },
    { id: 3, name: 'Path C', rise: 4, run: 2, m: '2', desc: 'Steep rocky scramble' },
  ];

  const handleSelect = (p) => {
    playClick();
    setSelectedPath(p);
    if (onDone) onDone();
  };

  return (
    <div className="try-it-container" style={{ width: '100%', padding: '12px' }}>
      <div style={{ fontSize: '0.9rem', color: '#ffd54f', fontWeight: 800, marginBottom: 10 }}>
        🧗 Drag the hiker onto each trail! Which one is the steepest?
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {paths.map((p) => {
          const isSel = selectedPath?.id === p.id;
          return (
            <div
              key={p.id}
              onClick={() => handleSelect(p)}
              style={{
                background: isSel ? 'rgba(0,229,255,0.2)' : 'rgba(18,14,52,0.85)',
                border: isSel ? '2px solid #00e5ff' : '1px solid rgba(255,255,255,0.15)',
                borderRadius: 12,
                padding: '10px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '1.4rem' }}>🧗‍♂️</div>
              <div style={{ fontWeight: 800, color: '#ffffff', marginTop: 4 }}>{p.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#00e5ff' }}>Gradient: {p.m}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.desc}</div>
            </div>
          );
        })}
      </div>
      {selectedPath && (
        <div style={{ marginTop: 10, textAlign: 'center', color: '#81c784', fontWeight: 700, fontSize: '0.88rem' }}>
          {selectedPath.id === 3 ? 'Path C has gradient 2 — that is the steepest climb!' : `You selected ${selectedPath.name}. Notice how gradient matches steepness!`}
        </div>
      )}
    </div>
  );
}
