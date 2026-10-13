import React from 'react';
import { toNumber, formatFrac } from '../../utils/fraction.js';

export default function SlopeMeter({ m, size = 200, showReadout = true }) {
  // Needle angle: −90° to +90°
  let angle = 0;
  let statusText = 'zero';
  let signIcon = '→';
  let statusColor = '#ffd54f';

  if (m === null) {
    angle = 90; // Pin to vertical
    statusText = 'undefined';
    signIcon = '↑';
    statusColor = '#ef4444';
  } else {
    const val = toNumber(m);
    // Math.atan returns −PI/2 to PI/2
    angle = Math.atan(val) * (180 / Math.PI);
    if (val > 0) {
      statusText = 'positive';
      signIcon = '↗';
      statusColor = '#00e5ff';
    } else if (val < 0) {
      statusText = 'negative';
      signIcon = '↘';
      statusColor = '#ff4081';
    } else {
      statusText = 'zero';
      signIcon = '→';
      statusColor = '#ffd54f';
    }
  }

  const w = size;
  const h = size * 0.65;
  const cx = w / 2;
  const cy = h - 16;
  const r = (w / 2) - 24;

  return (
    <div
      className="slope-meter-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(18, 14, 52, 0.85)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 16,
        padding: '12px 16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{ width: w, height: h, position: 'relative' }}>
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%">
          <defs>
            <linearGradient id="meterArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff4081" />   {/* Steep Downhill */}
              <stop offset="50%" stopColor="#ffd54f" />  {/* Flat (zero) */}
              <stop offset="100%" stopColor="#00e5ff" /> {/* Steep Uphill */}
            </linearGradient>
            <filter id="meterGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Semicircular Arc Path */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="url(#meterArcGrad)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Dial labels */}
          <text x={cx - r} y={cy + 14} fill="#ff4081" fontSize="9" fontWeight="bold" textAnchor="middle">
            Downhill (−)
          </text>
          <text x={cx} y={cy - r - 8} fill="#ffd54f" fontSize="9" fontWeight="bold" textAnchor="middle">
            Flat (0)
          </text>
          <text x={cx + r} y={cy + 14} fill="#00e5ff" fontSize="9" fontWeight="bold" textAnchor="middle">
            Uphill (+)
          </text>

          {/* Needle */}
          <g transform={`rotate(${angle} ${cx} ${cy})`} style={{ transition: 'transform 0.4s ease-out' }}>
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - r + 4}
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#meterGlow)"
            />
            <polygon
              points={`${cx - 4},${cy - r + 14} ${cx + 4},${cy - r + 14} ${cx},${cy - r}`}
              fill="#ffffff"
            />
          </g>

          {/* Center Hub */}
          <circle cx={cx} cy={cy} r="7" fill="#ffffff" stroke="#0a0a2e" strokeWidth="2.5" />
        </svg>
      </div>

      {showReadout && (
        <div style={{ textAlign: 'center', marginTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <span style={{ fontSize: '1.2rem', color: statusColor, fontWeight: 900 }}>{signIcon}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              {m === null ? 'Undefined' : formatFrac(m)}
            </span>
          </div>
          <span
            style={{
              display: 'inline-block',
              marginTop: 4,
              padding: '2px 10px',
              borderRadius: 999,
              background: `rgba(${statusColor === '#00e5ff' ? '0,229,255' : statusColor === '#ff4081' ? '255,64,129' : '255,213,79'}, 0.2)`,
              color: statusColor,
              fontSize: '0.82rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {statusText}
          </span>
        </div>
      )}
    </div>
  );
}
