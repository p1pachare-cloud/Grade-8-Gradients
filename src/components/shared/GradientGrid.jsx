import React, { useRef, useState, useCallback } from 'react';
import { toNumber } from '../../utils/fraction.js';

export default function GradientGrid({
  xRange = [-10, 10],
  yRange = [-10, 10],
  size = 460,
  points = [],
  lines = [],
  staircase = null,
  onPointMove,
  showHiker = false,
  hikerPosition = 0.5, // 0 to 1 along segment
  ariaDescription = 'Interactive coordinate grid showing a line and points',
}) {
  const svgRef = useRef(null);
  const [draggingIdx, setDraggingIdx] = useState(null);

  const pad = 36;
  const w = size;
  const h = size;

  const [xmin, xmax] = xRange;
  const [ymin, ymax] = yRange;

  const sx = useCallback((x) => pad + ((x - xmin) / (xmax - xmin)) * (w - 2 * pad), [xmin, xmax, w, pad]);
  const sy = useCallback((y) => h - pad - ((y - ymin) / (ymax - ymin)) * (h - 2 * pad), [ymin, ymax, h, pad]);

  const ix = useCallback((px) => {
    const raw = xmin + ((px - pad) / (w - 2 * pad)) * (xmax - xmin);
    return Math.max(xmin, Math.min(xmax, Math.round(raw)));
  }, [xmin, xmax, w, pad]);

  const iy = useCallback((py) => {
    const raw = ymin + ((h - pad - py) / (h - 2 * pad)) * (ymax - ymin);
    return Math.max(ymin, Math.min(ymax, Math.round(raw)));
  }, [ymin, ymax, h, pad]);

  const handlePointerDown = (index, e) => {
    if (!onPointMove) return;
    e.preventDefault();
    e.stopPropagation();
    setDraggingIdx(index);
    if (e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (draggingIdx === null || !onPointMove || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * w;
    const py = ((e.clientY - rect.top) / rect.height) * h;
    const newX = ix(px);
    const newY = iy(py);
    onPointMove(draggingIdx, { x: newX, y: newY });
  };

  const handlePointerUp = (e) => {
    if (draggingIdx !== null) {
      if (e.target.releasePointerCapture) {
        try { e.target.releasePointerCapture(e.pointerId); } catch (_) {}
      }
      setDraggingIdx(null);
    }
  };

  // Generate grid lines
  const gridLinesX = [];
  for (let x = xmin; x <= xmax; x++) {
    gridLinesX.push(x);
  }
  const gridLinesY = [];
  for (let y = ymin; y <= ymax; y++) {
    gridLinesY.push(y);
  }

  // Compute extended line ends for clipping across grid box
  const renderLine = (lineSpec, idx) => {
    const { m, p, color = '#00e5ff', dashed = false } = lineSpec;
    if (!p) return null;

    let x1, y1, x2, y2;
    if (m === null) {
      // Vertical line
      x1 = p.x;
      y1 = ymin;
      x2 = p.x;
      y2 = ymax;
    } else {
      const slopeVal = toNumber(m);
      if (Math.abs(slopeVal) < 0.0001) {
        // Horizontal
        x1 = xmin;
        y1 = p.y;
        x2 = xmax;
        y2 = p.y;
      } else {
        // Find box boundary intersections
        const cand = [
          { x: xmin, y: p.y + slopeVal * (xmin - p.x) },
          { x: xmax, y: p.y + slopeVal * (xmax - p.x) },
          { x: p.x + (ymin - p.y) / slopeVal, y: ymin },
          { x: p.x + (ymax - p.y) / slopeVal, y: ymax },
        ].filter((pt) => pt.x >= xmin - 0.01 && pt.x <= xmax + 0.01 && pt.y >= ymin - 0.01 && pt.y <= ymax + 0.01);

        if (cand.length >= 2) {
          x1 = cand[0].x;
          y1 = cand[0].y;
          x2 = cand[cand.length - 1].x;
          y2 = cand[cand.length - 1].y;
        } else {
          x1 = xmin;
          y1 = p.y;
          x2 = xmax;
          y2 = p.y;
        }
      }
    }

    return (
      <line
        key={idx}
        x1={sx(x1)}
        y1={sy(y1)}
        x2={sx(x2)}
        y2={sy(y2)}
        stroke={color}
        strokeWidth={3}
        strokeDasharray={dashed ? '6,6' : 'none'}
        strokeLinecap="round"
      />
    );
  };

  return (
    <div className="gradient-grid-container" style={{ display: 'inline-block', position: 'relative' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        height="100%"
        style={{
          maxWidth: size,
          maxHeight: size,
          aspectRatio: '1/1',
          background: 'rgba(10, 10, 46, 0.75)',
          borderRadius: 16,
          border: '1.5px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          touchAction: 'none',
          userSelect: 'none',
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="img"
        aria-label={ariaDescription}
      >
        <defs>
          <marker
            id="arrowRun"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#00e5ff" />
          </marker>
          <marker
            id="arrowRise"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#ff7043" />
          </marker>
          <filter id="gridGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Subtle grid lines */}
        {gridLinesX.map((x) => (
          <line
            key={`gx-${x}`}
            x1={sx(x)}
            y1={sy(ymin)}
            x2={sx(x)}
            y2={sy(ymax)}
            stroke={x === 0 ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.08)'}
            strokeWidth={x === 0 ? 1.8 : 1}
          />
        ))}
        {gridLinesY.map((y) => (
          <line
            key={`gy-${y}`}
            x1={sx(xmin)}
            y1={sy(y)}
            x2={sx(xmax)}
            y2={sy(y)}
            stroke={y === 0 ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.08)'}
            strokeWidth={y === 0 ? 1.8 : 1}
          />
        ))}

        {/* X Axis Numbers */}
        {gridLinesX.filter((x) => x !== 0 && x % 2 === 0).map((x) => (
          <text
            key={`tx-${x}`}
            x={sx(x)}
            y={sy(0) + 16}
            fill="rgba(255,255,255,0.55)"
            fontSize="10"
            fontFamily="var(--font-body)"
            textAnchor="middle"
          >
            {x}
          </text>
        ))}

        {/* Y Axis Numbers */}
        {gridLinesY.filter((y) => y !== 0 && y % 2 === 0).map((y) => (
          <text
            key={`ty-${y}`}
            x={sx(0) - 8}
            y={sy(y) + 4}
            fill="rgba(255,255,255,0.55)"
            fontSize="10"
            fontFamily="var(--font-body)"
            textAnchor="end"
          >
            {y}
          </text>
        ))}

        {/* Render lines */}
        {lines.map((l, idx) => renderLine(l, idx))}

        {/* Staircase (Rise & Run triangle) */}
        {staircase && staircase.from && staircase.to && (
          <g className="staircase-group">
            {/* Run: Horizontal segment */}
            <line
              x1={sx(staircase.from.x)}
              y1={sy(staircase.from.y)}
              x2={sx(staircase.to.x)}
              y2={sy(staircase.from.y)}
              stroke="#00e5ff"
              strokeWidth={3}
              strokeDasharray="4,4"
              markerEnd="url(#arrowRun)"
            />
            {/* Rise: Vertical segment */}
            <line
              x1={sx(staircase.to.x)}
              y1={sy(staircase.from.y)}
              x2={sx(staircase.to.x)}
              y2={sy(staircase.to.y)}
              stroke="#ff7043"
              strokeWidth={3}
              strokeDasharray="4,4"
              markerEnd="url(#arrowRise)"
            />
            {/* Run Label */}
            <text
              x={(sx(staircase.from.x) + sx(staircase.to.x)) / 2}
              y={sy(staircase.from.y) + (staircase.to.y >= staircase.from.y ? 16 : -8)}
              fill="#00e5ff"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              run = {staircase.to.x - staircase.from.x}
            </text>
            {/* Rise Label */}
            <text
              x={sx(staircase.to.x) + (staircase.to.x >= staircase.from.x ? 12 : -12)}
              y={(sy(staircase.from.y) + sy(staircase.to.y)) / 2}
              fill="#ff7043"
              fontSize="12"
              fontWeight="bold"
              textAnchor={staircase.to.x >= staircase.from.x ? 'start' : 'end'}
            >
              rise = {staircase.to.y - staircase.from.y}
            </text>
          </g>
        )}

        {/* Hiker climbing */}
        {showHiker && staircase && staircase.from && staircase.to && (
          <g
            transform={`translate(${
              sx(staircase.from.x + (staircase.to.x - staircase.from.x) * hikerPosition) - 12
            }, ${
              sy(staircase.from.y + (staircase.to.y - staircase.from.y) * hikerPosition) - 26
            })`}
          >
            <text fontSize="22">🧗‍♂️</text>
          </g>
        )}

        {/* Plotted Points */}
        {points.map((pt, idx) => {
          const isDraggable = Boolean(onPointMove);
          const isBeingDragged = draggingIdx === idx;
          const px = sx(pt.x);
          const py = sy(pt.y);
          const col = pt.color || '#00e5ff';

          return (
            <g
              key={idx}
              className={`grid-point ${isDraggable ? 'draggable' : ''}`}
              style={{ cursor: isDraggable ? 'grab' : 'default' }}
              onPointerDown={(e) => isDraggable && handlePointerDown(idx, e)}
            >
              {/* Outer glow ring */}
              <circle
                cx={px}
                cy={py}
                r={isBeingDragged ? 14 : 10}
                fill="none"
                stroke={col}
                strokeWidth={isBeingDragged ? 3 : 2}
                opacity={0.65}
              />
              {/* Center point */}
              <circle
                cx={px}
                cy={py}
                r={6}
                fill={col}
                stroke="#ffffff"
                strokeWidth={2}
                filter="url(#gridGlow)"
              />
              {/* Point Label */}
              {pt.label && (
                <text
                  x={px}
                  y={py - 14}
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                >
                  {pt.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
