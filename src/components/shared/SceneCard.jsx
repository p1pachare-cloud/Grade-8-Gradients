import React from 'react';

export default function SceneCard({
  scene = 'ramp',
  rise = 3,
  run = 4,
  unit = 'm',
  claim = null,
  selected = false,
  onSelect,
  width = 240,
  height = 170,
}) {
  const pad = 24;
  const startX = pad;
  const endX = width - pad;
  const baseY = height - pad;

  // Scale height proportionally to rise/run, clamped
  const slopeRatio = Math.abs(rise) / Math.max(1, Math.abs(run));
  const maxRiseHeight = height - 2 * pad - 20;
  const renderedRise = Math.min(maxRiseHeight, Math.max(16, slopeRatio * 80));
  const topY = baseY - (rise >= 0 ? renderedRise : -renderedRise);

  const getEmoji = () => {
    switch (scene) {
      case 'ski': return '⛷️';
      case 'cable': return '🚡';
      case 'roof': return '🏠';
      case 'trail': return '🥾';
      case 'road': return '🚗';
      default: return '🛹';
    }
  };

  return (
    <div
      className={`scene-card glass-card ${selected ? 'is-selected' : ''}`}
      onClick={onSelect}
      style={{
        width,
        padding: '12px',
        cursor: onSelect ? 'pointer' : 'default',
        border: selected ? '2px solid #00e5ff' : '1px solid rgba(255,255,255,0.15)',
        background: selected ? 'rgba(0, 229, 255, 0.15)' : 'rgba(18, 14, 52, 0.85)',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'all 0.2s ease',
        boxShadow: selected ? '0 0 20px rgba(0,229,255,0.4)' : '0 4px 16px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 6 }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffd54f' }}>
          {getEmoji()} {scene.toUpperCase()}
        </span>
        {claim && (
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#00e5ff' }}>
            {claim}
          </span>
        )}
      </div>

      <div style={{ width: '100%', height, position: 'relative' }}>
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
          <defs>
            <linearGradient id="sceneRampGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3f51b5" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Ground baseline */}
          <line x1={startX - 10} y1={baseY} x2={endX + 10} y2={baseY} stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="3,3" />

          {/* Incline Triangle Fill */}
          <polygon
            points={`${startX},${baseY} ${endX},${baseY} ${endX},${topY}`}
            fill="url(#sceneRampGrad)"
          />

          {/* Incline Hypotenuse Slope Line */}
          <line
            x1={startX}
            y1={baseY}
            x2={endX}
            y2={topY}
            stroke="#00e5ff"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Horizontal Run Marker */}
          <line
            x1={startX}
            y1={baseY + 8}
            x2={endX}
            y2={baseY + 8}
            stroke="#ffd54f"
            strokeWidth="2"
          />
          <text
            x={(startX + endX) / 2}
            y={baseY + 22}
            fill="#ffd54f"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
          >
            run = {run} {unit}
          </text>

          {/* Vertical Rise Marker */}
          <line
            x1={endX + 8}
            y1={baseY}
            x2={endX + 8}
            y2={topY}
            stroke="#ff7043"
            strokeWidth="2"
          />
          <text
            x={endX + 14}
            y={(baseY + topY) / 2}
            fill="#ff7043"
            fontSize="10"
            fontWeight="bold"
            dominantBaseline="middle"
          >
            rise = {rise} {unit}
          </text>
        </svg>
      </div>
    </div>
  );
}
