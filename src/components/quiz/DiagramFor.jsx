import React from 'react';
import GradientGrid from '../shared/GradientGrid.jsx';
import SceneCard from '../shared/SceneCard.jsx';

export default function DiagramFor({ visual }) {
  if (!visual || visual.kind === 'none') return null;

  if (visual.kind === 'grid') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
        <GradientGrid
          size={320}
          xRange={[-8, 8]}
          yRange={[-8, 8]}
          points={visual.points || []}
          lines={visual.line ? [visual.line] : []}
          staircase={visual.staircase || null}
        />
      </div>
    );
  }

  if (visual.kind === 'twoLines') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
        <GradientGrid
          size={320}
          xRange={[-8, 8]}
          yRange={[-8, 8]}
          lines={visual.lines || []}
        />
      </div>
    );
  }

  if (visual.kind === 'scene') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
        <SceneCard
          scene={visual.scene}
          rise={visual.rise}
          run={visual.run}
          unit={visual.unit}
          width={280}
          height={180}
        />
      </div>
    );
  }

  if (visual.kind === 'table') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
        <div
          style={{
            background: 'rgba(10, 10, 46, 0.85)',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.15)',
            overflow: 'hidden',
          }}
        >
          <table style={{ borderCollapse: 'collapse', textAlign: 'center', fontSize: '1.05rem' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,229,255,0.1)' }}>
                <th style={{ padding: '8px 14px', color: '#00e5ff', fontWeight: 800 }}>x</th>
                {visual.xs.map((x, i) => (
                  <td key={i} style={{ padding: '8px 14px', color: '#ffffff', fontWeight: 700 }}>{x}</td>
                ))}
              </tr>
              <tr>
                <th style={{ padding: '8px 14px', color: '#ffd54f', fontWeight: 800 }}>y</th>
                {visual.ys.map((y, i) => (
                  <td key={i} style={{ padding: '8px 14px', color: '#ffd54f', fontWeight: 700 }}>{y}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (visual.kind === 'equation') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
        <div
          style={{
            background: 'rgba(10,10,46,0.85)',
            padding: '12px 24px',
            borderRadius: 12,
            border: '1.5px solid rgba(0,229,255,0.4)',
            fontSize: '1.4rem',
            fontFamily: 'monospace',
            color: '#00e5ff',
            fontWeight: 800,
            letterSpacing: 1,
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          {visual.text}
        </div>
      </div>
    );
  }

  return null;
}
