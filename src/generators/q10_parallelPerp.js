import { frac, formatFrac } from '../utils/fraction.js';
import { perpendicularGradient } from '../utils/gradientMath.js';
import { misconceptionOptions } from './distractors.js';

export function generate(rng, difficulty = 3, ctx = {}) {
  const isPerp = rng.chance(0.65);

  const [n, d] = rng.pick([
    [2, 1], [3, 1], [1, 2], [3, 4], [2, 3], [4, 3], [5, 2]
  ]);
  const sign = rng.chance(0.5) ? -1 : 1;
  const m = frac(sign * n, d);
  const mStr = formatFrac(m);

  if (!isPerp) {
    // Parallel lines
    const target = m;
    const { options, correctOption, misconceptions } = misconceptionOptions(target, ctx, rng);
    const text = `A line has {{gradient}} ${mStr}. What is the {{gradient}} of any line parallel to it?`;

    return {
      type: 'parallel_perp',
      difficulty,
      tags: ['parallel', 'lines'],
      questionText: text,
      displayText: text,
      spokenText: `A line has gradient ${mStr}. What is the gradient of any line parallel to it?`,
      audioKind: 'dynamic',
      visual: {
        kind: 'twoLines',
        lines: [
          { m, p: { x: 0, y: 0 }, color: '#00e5ff', label: 'Line 1' },
          { m, p: { x: 0, y: 3 }, color: '#ffd54f', label: 'Parallel Line' },
        ],
      },
      answerKind: 'mcq',
      options,
      correctAnswer: correctOption,
      answer: target,
      hint1: `Parallel lines run in the exact same direction and never intersect.`,
      hint2: `Parallel lines have EQUAL gradients: m₁ = m₂.`,
      explanation: `Lines that are parallel have identical gradients. Therefore, the parallel gradient is ${mStr}.`,
      misconceptions,
      params: { core: [m.n, m.d, 'parallel'] },
    };
  } else {
    // Perpendicular lines
    const target = perpendicularGradient(m);
    const targetStr = formatFrac(target);
    const { options, correctOption, misconceptions } = misconceptionOptions(target, ctx, rng);
    const text = `A line has {{gradient}} ${mStr}. What is the {{gradient}} of a line perpendicular to it?`;

    return {
      type: 'parallel_perp',
      difficulty,
      tags: ['perpendicular', 'lines', 'sign'],
      questionText: text,
      displayText: text,
      spokenText: `A line has gradient ${mStr}. What is the gradient of a line perpendicular to it?`,
      audioKind: 'dynamic',
      visual: {
        kind: 'twoLines',
        lines: [
          { m, p: { x: 0, y: 0 }, color: '#00e5ff', label: `Line 1 (m = ${mStr})` },
          { m: target, p: { x: 0, y: 0 }, color: '#ff4081', label: `Perpendicular (m = ${targetStr})` },
        ],
      },
      answerKind: 'mcq',
      options,
      correctAnswer: correctOption,
      answer: target,
      hint1: `Perpendicular lines meet at 90°. Take the negative reciprocal: flip the fraction and change the sign!`,
      hint2: `m₁ × m₂ = −1. If m₁ = ${mStr}, then m₂ = −1 ÷ (${mStr}) = ${targetStr}.`,
      explanation: `The gradient of a perpendicular line is the negative reciprocal: m_perp = −1 / m = ${targetStr}.`,
      misconceptions,
      params: { core: [m.n, m.d, 'perpendicular'] },
    };
  }
}
