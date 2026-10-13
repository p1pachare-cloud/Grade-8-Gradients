import React, { useState } from 'react';
import SlopeMeter from '../shared/SlopeMeter.jsx';
import { frac } from '../../utils/fraction.js';
import { playClick } from '../../utils/audio.js';

export default function TryItRotateLine({ onDone }) {
  const [orientation, setOrientation] = useState('horizontal'); // 'horizontal' | 'slanted' | 'vertical'

  const handleSelect = (mode) => {
    playClick();
    setOrientation(mode);
    if (onDone) onDone();
  };

  const getM = () => {
    if (orientation === 'horizontal') return frac(0, 1);
    if (orientation === 'vertical') return null;
    return frac(1, 1);
  };

  const m = getM();

  return (
    <div className="try-it-container" style={{ width: '100%', padding: '12px' }}>
      <div style={{ fontSize: '0.9rem', color: '#ffd54f', fontWeight: 800, marginBottom: 8 }}>
        🏛️ Rotate the path! Test Aisha's flat Nile promenade vs the vertical wall.
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <button
          className={`btn ${orientation === 'horizontal' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1, padding: '6px 8px', fontSize: '0.85rem' }}
          onClick={() => handleSelect('horizontal')}
        >
          Flat Promenade (0)
        </button>
        <button
          className={`btn ${orientation === 'slanted' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1, padding: '6px 8px', fontSize: '0.85rem' }}
          onClick={() => handleSelect('slanted')}
        >
          Slope (+1)
        </button>
        <button
          className={`btn ${orientation === 'vertical' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1, padding: '6px 8px', fontSize: '0.85rem' }}
          onClick={() => handleSelect('vertical')}
        >
          Tall Wall (Undefined)
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SlopeMeter m={m} size={170} />
      </div>
    </div>
  );
}
