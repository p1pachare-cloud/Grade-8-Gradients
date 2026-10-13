import { frac, formatFrac } from '../utils/fraction.js';
import { steeper } from '../utils/gradientMath.js';

export function generate(rng, difficulty = 1) {
  // Pick two distinct gradient magnitudes
  const pool = [
    [1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [1, 3], [2, 3], [3, 2], [3, 4], [5, 2]
  ];
  const [n1, d1] = rng.pick(pool);
  let [n2, d2] = rng.pick(pool);
  while (n1 * d2 === n2 * d1) {
    [n2, d2] = rng.pick(pool);
  }

  const sign1 = rng.chance(0.5) ? -1 : 1;
  const sign2 = rng.chance(0.5) ? -1 : 1;

  const m1 = frac(sign1 * n1, d1);
  const m2 = frac(sign2 * n2, d2);

  const cmpResult = steeper(m1, m2);
  const correct = cmpResult > 0 ? 'Line A' : cmpResult < 0 ? 'Line B' : 'Equal steepness';

  const m1Str = formatFrac(m1);
  const m2Str = formatFrac(m2);

  const text = `Line A has {{gradient}} ${m1Str} and Line B has {{gradient}} ${m2Str}. Which line is steeper?`;

  return {
    type: 'compare_steepness',
    difficulty,
    tags: ['compare', 'steepness', (sign1 < 0 || sign2 < 0) ? 'sign' : 'positive'],
    questionText: text,
    displayText: text,
    spokenText: `Line A has gradient ${m1Str} and Line B has gradient ${m2Str}. Which line is steeper?`,
    audioKind: 'dynamic',
    visual: {
      kind: 'twoLines',
      lines: [
        { m: m1, p: { x: 0, y: 0 }, color: '#00e5ff', label: `Line A (m = ${m1Str})` },
        { m: m2, p: { x: 0, y: 0 }, color: '#ff4081', label: `Line B (m = ${m2Str})` },
      ],
    },
    answerKind: 'mcq',
    options: ['Line A', 'Line B', 'Equal steepness'],
    correctAnswer: correct,
    answer: correct,
    hint1: `Steepness compares the SIZE (absolute value |m|) of the gradient, ignoring the plus or minus sign!`,
    hint2: `|Line A| = |${m1Str}| = ${Math.abs(m1.n)}/${m1.d}. |Line B| = |${m2Str}| = ${Math.abs(m2.n)}/${m2.d}. Which value is larger?`,
    explanation: `Steepness depends on magnitude. |${m1Str}| = ${Math.abs(m1.n)/m1.d} and |${m2Str}| = ${Math.abs(m2.n)/m2.d}. Since ${Math.abs(m1.n)/m1.d > Math.abs(m2.n)/m2.d ? Math.abs(m1.n)/m1.d : Math.abs(m2.n)/m2.d} is greater, ${correct} is steeper!`,
    misconceptions: {
      [cmpResult > 0 ? 'Line B' : 'Line A']: 'sign_trap',
    },
    params: { core: [m1.n, m1.d, m2.n, m2.d] },
  };
}
