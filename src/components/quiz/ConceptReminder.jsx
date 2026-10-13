import React from 'react';
import { X, BookOpen } from 'lucide-react';
import Mascot from '../Mascot.jsx';

export default function ConceptReminder({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="feedback-overlay-backdrop" style={{ zIndex: 250 }}>
      <div
        className="glass-card feedback-modal-card"
        style={{
          maxWidth: 500,
          width: '92%',
          textAlign: 'left',
          position: 'relative',
          padding: '24px',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <BookOpen size={22} color="#00e5ff" />
          <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', color: '#ffd54f', fontSize: '1.3rem' }}>
            Gradient Cheat Sheet 📐
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.92rem' }}>
          <div style={{ background: 'rgba(10,10,46,0.85)', padding: '10px 14px', borderRadius: 10 }}>
            <strong style={{ color: '#00e5ff' }}>1. Rise &amp; Run: </strong>
            <span>Gradient = Rise ÷ Run. Always rise (vertical) over run (horizontal).</span>
          </div>

          <div style={{ background: 'rgba(10,10,46,0.85)', padding: '10px 14px', borderRadius: 10 }}>
            <strong style={{ color: '#ffd54f' }}>2. Two-Point Formula: </strong>
            <span>m = (y₂ − y₁) ÷ (x₂ − x₁). Always subtract in the same order.</span>
          </div>

          <div style={{ background: 'rgba(10,10,46,0.85)', padding: '10px 14px', borderRadius: 10 }}>
            <strong style={{ color: '#ff4081' }}>3. Direction &amp; Signs: </strong>
            <span>Uphill = Positive (+); Downhill = Negative (−); Horizontal = 0; Vertical = Undefined.</span>
          </div>

          <div style={{ background: 'rgba(10,10,46,0.85)', padding: '10px 14px', borderRadius: 10 }}>
            <strong style={{ color: '#81c784' }}>4. Parallel &amp; Perpendicular: </strong>
            <span>Parallel: m₁ = m₂. Perpendicular: m₁ × m₂ = −1 (negative reciprocal: flip &amp; negate).</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
          <button className="btn btn-primary" onClick={onClose} style={{ minWidth: 140 }}>
            Got it! Return
          </button>
        </div>
      </div>
    </div>
  );
}
