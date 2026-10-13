import React, { useState } from 'react';
import { playClick } from '../../utils/audio.js';

export default function TryItSignFlip({ onDone }) {
  const [direction, setDirection] = useState('down'); // 'up' or 'down'

  const handleToggle = (dir) => {
    playClick();
    setDirection(dir);
    if (onDone) onDone();
  };

  const isUp = direction === 'up';

  return (
    <div className="try-it-container" style={{ width: '100%', padding: '12px' }}>
      <div style={{ fontSize: '0.9rem', color: '#ffd54f', fontWeight: 800, marginBottom: 8 }}>
        ⛷️ Flip Yuki's ski trail direction! Watch the sign and gradient update.
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <button
          className={`btn ${!isUp ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1, padding: '8px 12px', fontSize: '0.9rem' }}
          onClick={() => handleToggle('down')}
        >
          Downhill ⛷️ (Negative −)
        </button>
        <button
          className={`btn ${isUp ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1, padding: '8px 12px', fontSize: '0.9rem' }}
          onClick={() => handleToggle('up')}
        >
          Uphill 🧗 (Positive +)
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          background: 'rgba(10,10,46,0.85)',
          padding: '12px',
          borderRadius: 12,
        }}
      >
        <div style={{ fontSize: '2rem' }}>{isUp ? '📈' : '📉'}</div>
        <div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: isUp ? '#00e5ff' : '#ff4081' }}>
            {isUp ? 'Gradient: +2 (Positive Uphill)' : 'Gradient: −2 (Negative Downhill)'}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {isUp ? 'Line rises from left to right.' : 'Line falls from left to right.'}
          </div>
        </div>
      </div>
    </div>
  );
}
