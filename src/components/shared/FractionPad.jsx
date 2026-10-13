import React, { useState } from 'react';
import { Delete, Check } from 'lucide-react';
import { playClick } from '../../utils/audio.js';

export default function FractionPad({
  onSubmit,
  unit = '',
  allowUndefined = false,
  placeholder = 'Enter gradient...',
}) {
  const [val, setVal] = useState('');

  const handleChar = (char) => {
    playClick();
    if (val.length < 12) {
      setVal((prev) => prev + char);
    }
  };

  const handleMinus = () => {
    playClick();
    if (!val.startsWith('−') && !val.startsWith('-')) {
      setVal((prev) => '−' + prev);
    } else {
      setVal((prev) => prev.slice(1));
    }
  };

  const handleSlash = () => {
    playClick();
    if (!val.includes('/') && val.length > 0 && !val.endsWith('/')) {
      setVal((prev) => prev + '/');
    }
  };

  const handleDelete = () => {
    playClick();
    setVal((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    playClick();
    setVal('');
  };

  const handleUndefined = () => {
    playClick();
    setVal('undefined');
  };

  const handleSubmit = () => {
    if (val.trim()) {
      onSubmit(val.trim());
      setVal('');
    }
  };

  return (
    <div className="fraction-pad-container" style={{ width: '100%', maxWidth: 360, margin: '0 auto' }}>
      {/* Display Box */}
      <div
        className="numpad-display-box"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 54,
          background: 'rgba(10,10,46,0.9)',
          border: '2px solid rgba(0,229,255,0.4)',
          borderRadius: 12,
          padding: '8px 16px',
          marginBottom: 14,
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          fontWeight: 800,
          color: val ? '#00e5ff' : 'var(--text-muted)',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)',
        }}
      >
        <span>{val || placeholder}</span>
        {unit && <span style={{ fontSize: '1.1rem', color: '#ff7043', marginLeft: 6 }}>{unit}</span>}
      </div>

      {/* Keys Grid */}
      <div
        className="numpad-keys-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
          marginBottom: 12,
        }}
      >
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
          <button
            key={digit}
            className="numpad-key"
            onClick={() => handleChar(digit)}
          >
            {digit}
          </button>
        ))}
        <button className="numpad-key" onClick={handleMinus} title="Minus / Negative">
          −
        </button>
        <button className="numpad-key" onClick={() => handleChar('0')}>
          0
        </button>
        <button className="numpad-key" onClick={handleSlash} title="Fraction slash">
          /
        </button>
      </div>

      {/* Undefined button if applicable */}
      {allowUndefined && (
        <div style={{ marginBottom: 10 }}>
          <button
            className="btn btn-secondary"
            style={{ width: '100%', padding: '8px', fontSize: '0.9rem' }}
            onClick={handleUndefined}
          >
            Undefined (Vertical)
          </button>
        </div>
      )}

      {/* Action Row */}
      <div style={{ display: 'flex', gap: 10, width: '100%' }}>
        <button
          className="btn btn-secondary"
          style={{ flex: 1, padding: '10px 14px' }}
          onClick={handleDelete}
          title="Backspace"
        >
          <Delete size={18} />
          <span>Delete</span>
        </button>
        <button
          className="btn btn-secondary"
          style={{ flex: 1, padding: '10px 14px' }}
          onClick={handleClear}
        >
          Clear
        </button>
        <button
          className="btn btn-primary"
          style={{ flex: 2, padding: '10px 14px' }}
          onClick={handleSubmit}
          disabled={!val}
        >
          <Check size={18} />
          <span>Submit</span>
        </button>
      </div>
    </div>
  );
}
