import React from 'react';
import { X, Volume2, VolumeX, Sparkles, Settings } from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  term,
  onSetTerm,
  units,
  onSetUnits,
  audioEnabled,
  onToggleAudio,
  reducedMotion,
  onToggleReducedMotion,
}) {
  if (!isOpen) return null;

  return (
    <div className="feedback-overlay-backdrop" style={{ zIndex: 300 }}>
      <div
        className="glass-card feedback-modal-card"
        style={{
          maxWidth: 440,
          width: '90%',
          textAlign: 'left',
          position: 'relative',
          padding: '24px 28px',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <Settings size={22} color="#00e5ff" />
          <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', color: '#ffffff', fontSize: '1.4rem' }}>
            Expedition Settings
          </h3>
        </div>

        {/* Terminology Toggle */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 8 }}>
            Terminology (Global Standard):
          </label>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className={`btn ${term === 'gradient' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.9rem' }}
              onClick={() => onSetTerm('gradient')}
            >
              Gradient (UK/SG/AU/IN)
            </button>
            <button
              className={`btn ${term === 'slope' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.9rem' }}
              onClick={() => onSetTerm('slope')}
            >
              Slope (USA/CA)
            </button>
          </div>
        </div>

        {/* Units Toggle */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 8 }}>
            Units of Measurement:
          </label>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className={`btn ${units === 'metric' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.9rem' }}
              onClick={() => onSetUnits('metric')}
            >
              Metric (metres)
            </button>
            <button
              className={`btn ${units === 'imperial' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.9rem' }}
              onClick={() => onSetUnits('imperial')}
            >
              Imperial (feet)
            </button>
          </div>
        </div>

        {/* Audio Toggle */}
        <div style={{ marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, color: '#ffffff' }}>Sound Effects &amp; Chimes</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Audio cues and celebration chimes</div>
          </div>
          <button
            className={`btn ${audioEnabled ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '6px 14px' }}
            onClick={onToggleAudio}
          >
            {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span style={{ marginLeft: 6 }}>{audioEnabled ? 'On' : 'Off'}</span>
          </button>
        </div>

        {/* Close Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
          <button className="btn btn-primary" onClick={onClose} style={{ minWidth: 120 }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
