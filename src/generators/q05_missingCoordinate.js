import { frac, formatFrac } from '../utils/fraction.js';

export function generate(rng, difficulty = 2) {
  // Line with gradient m passes through (x1, y1) and (x2, k)
  // k = y1 + m * (x2 - x1)
  const d = rng.pick([1, 1, 2, 3]);
  const n = rng.int(1, 4);
  const sign = rng.chance(0.35) ? -1 : 1;
  const m = frac(sign * n, d);

  const x1 = rng.int(-5, 2);
  const y1 = rng.int(-5, 5);
  const mult = rng.int(1, 3);
  const dx = d * mult; // ensures integer k
  const x2 = x1 + dx;
  const k = y1 + sign * n * mult;

  const mStr = formatFrac(m);
  const text = `A line with {{gradient}} ${mStr} passes through (${x1}, ${y1}) and (${x2}, k). Find the value of k.`;

  // Distractors around k
  const wrongK1 = k + (sign * n);
  const wrongK2 = k - (sign * n);
  const wrongK3 = y1 + (x2 - x1);
  const seen = new Set([String(k)]);
  const wrongList = [];
  [wrongK1, wrongK2, wrongK3, k + 1, k - 1].forEach((val) => {
    if (!seen.has(String(val)) && wrongList.length < 3) {
      seen.add(String(val));
      wrongList.push(String(val));
    }
  });

  const options = rng.shuffle([String(k), ...wrongList]);

  return {
    type: 'missing_coord',
    difficulty,
    tags: ['missing_coordinate', sign < 0 ? 'sign' : 'positive'],
    questionText: text,
    displayText: text,
    spokenText: `A line with gradient ${mStr} passes through point ${x1}, ${y1} and point ${x2}, k. Find the value of k.`,
    audioKind: 'dynamic',
    visual: {
      kind: 'grid',
      points: [
        { x: x1, y: y1, label: `(${x1}, ${y1})`, color: '#00e5ff' },
        { x: x2, y: k, label: `(${x2}, k)`, color: '#ffd54f' },
      ],
      line: { m, p: { x: x1, y: y1 }, color: '#00e5ff' },
    },
    answerKind: 'mcq',
    options,
    correctAnswer: String(k),
    answer: String(k),
    hint1: `Use gradient = rise ÷ run. Here, run = ${x2} − (${x1}) = ${dx}.`,
    hint2: `Rise = k − (${y1}). Set (k − ${y1}) ÷ ${dx} = ${mStr}, so rise = ${mStr} × ${dx} = ${k - y1}.`,
    explanation: `Run = ${x2} − ${x1} = ${dx}. Rise = gradient × run = ${mStr} × ${dx} = ${k - y1}. Therefore k = ${y1} + (${k - y1}) = ${k}.`,
    misconceptions: {},
    params: { core: [m.n, m.d, x1, y1, x2, k] },
  };
}
