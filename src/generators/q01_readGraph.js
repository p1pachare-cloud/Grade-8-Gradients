import { frac, formatFrac } from '../utils/fraction.js';
import { gradient } from '../utils/gradientMath.js';
import { DIFF } from './config.js';
import { misconceptionOptions } from './distractors.js';

export function generate(rng, difficulty = 1, ctx = {}) {
  const cfg = DIFF[Math.min(3, Math.max(1, Math.round(difficulty)))];
  for (let attempt = 0; attempt < 50; attempt++) {
    const [n0, d0] = rng.pick(cfg.gradients);
    const sign = cfg.allowNeg && rng.chance(0.4) ? -1 : 1;
    const k = rng.int(1, cfg.maxMult);
    const run = d0 * k;
    const rise = sign * n0 * k;

    const x1 = rng.int(-cfg.range, cfg.range - run);
    const yMin = Math.max(-cfg.range, -cfg.range - rise);
    const yMax = Math.min(cfg.range, cfg.range - rise);
    if (yMin > yMax) continue;
    const y1 = rng.int(yMin, yMax);

    const p1 = { x: x1, y: y1 };
    const p2 = { x: x1 + run, y: y1 + rise };
    const m = gradient(p1, p2);

    const { options, correctOption, misconceptions } = misconceptionOptions(m, ctx, rng);
    const formattedAns = formatFrac(m);

    return {
      type: 'read_graph',
      difficulty,
      tags: [sign < 0 ? 'sign' : 'positive', 'graph'],
      questionText: `Look at the line on the grid. What is its {{gradient}}?`,
      displayText: `Look at the line on the grid. What is its {{gradient}}?`,
      spokenText: `Look at the line on the graph. What is its gradient?`,
      audioKind: 'static',
      visual: {
        kind: 'grid',
        points: [
          { x: p1.x, y: p1.y, label: `(${p1.x}, ${p1.y})`, color: '#00e5ff' },
          { x: p2.x, y: p2.y, label: `(${p2.x}, ${p2.y})`, color: '#ffd54f' },
        ],
        line: { m, p: p1, color: '#00e5ff' },
        staircase: { from: p1, to: p2 },
      },
      answerKind: 'mcq',
      options,
      correctAnswer: correctOption,
      answer: m,
      hint1: `Find two clear grid points. Rise is vertical change; Run is horizontal change.`,
      hint2: `Rise = ${rise > 0 ? '+' : ''}${rise}, Run = ${run}. Divide Rise by Run: ${rise} ÷ ${run}.`,
      explanation: `From (${p1.x}, ${p1.y}) to (${p2.x}, ${p2.y}), the line moves across by ${run} (run) and rises by ${rise} (rise). Gradient = rise / run = ${rise}/${run} = ${formattedAns}.`,
      misconceptions,
      params: { core: [p1.x, p1.y, p2.x, p2.y] },
    };
  }
  throw new Error('q01: generator retry limit exceeded');
}
