import React from 'react';
import { Lightbulb, AlertCircle } from 'lucide-react';

export default function HintOverlay({ hint1, hint2, explanation, attemptCount }) {
  if (attemptCount <= 0) return null;

  return (
    <div className="hint-overlay-container" style={{ marginTop: 14 }}>
      {attemptCount >= 1 && hint1 && (
        <div className="hint-card hint-level-1 glass-card" style={{ padding: '10px 14px', marginBottom: 8 }}>
          <div className="hint-header" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Lightbulb size={16} color="#ffd54f" />
            <span style={{ fontWeight: 800, color: '#ffd54f', fontSize: '0.85rem' }}>Hint 1</span>
          </div>
          <p className="hint-text" style={{ margin: 0, fontSize: '0.9rem', color: '#ffffff' }}>{hint1}</p>
        </div>
      )}

      {attemptCount >= 2 && hint2 && (
        <div className="hint-card hint-level-2 glass-card" style={{ padding: '10px 14px', marginBottom: 8 }}>
          <div className="hint-header" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Lightbulb size={16} color="#00e5ff" />
            <span style={{ fontWeight: 800, color: '#00e5ff', fontSize: '0.85rem' }}>Hint 2 — Worked Step</span>
          </div>
          <p className="hint-text" style={{ margin: 0, fontSize: '0.9rem', color: '#ffffff' }}>{hint2}</p>
        </div>
      )}

      {attemptCount >= 3 && explanation && (
        <div className="hint-card hint-level-3 glass-card" style={{ padding: '10px 14px', marginBottom: 8 }}>
          <div className="hint-header" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <AlertCircle size={16} color="#ff4081" />
            <span style={{ fontWeight: 800, color: '#ff4081', fontSize: '0.85rem' }}>Full Solution &amp; Explanation</span>
          </div>
          <p className="hint-text" style={{ margin: 0, fontSize: '0.9rem', color: '#ffffff' }}>{explanation}</p>
        </div>
      )}
    </div>
  );
}
