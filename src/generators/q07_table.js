import { frac, formatFrac } from '../utils/fraction.js';
import { misconceptionOptions } from './distractors.js';

export function generate(rng, difficulty = 2, ctx = {}) {
  // Linear table: y = m * x + c
  const mVal = rng.pick([1, 2, 3, 4, 5, -2, -3, -1]);
  const m = frac(mVal, 1);
  const c = rng.int(-4, 8);
  const step = rng.pick([1, 2]);

  const x0 = rng.int(0, 2);
  const xs = [x0, x0 + step, x0 + 2 * step, x0 + 3 * step];
  const ys = xs.map((x) => mVal * x + c);

  const { options, correctOption, misconceptions } = misconceptionOptions(m, ctx, rng);
  const formattedAns = formatFrac(m);

  const text = `The table shows values for a linear relationship. What is the {{gradient}} (rate of change)?`;

  return {
    type: 'table',
    difficulty,
    tags: ['table', 'rate_of_change', mVal < 0 ? 'sign' : 'positive'],
    questionText: text,
    displayText: text,
    spokenText: `The table shows values for a linear relationship. What is the gradient or rate of change?`,
    audioKind: 'dynamic',
    visual: {
      kind: 'table',
      xs,
      ys,
    },
    answerKind: 'mcq',
    options,
    correctAnswer: correctOption,
    answer: m,
    hint1: `Rate of change = change in y ÷ change in x. Pick any two columns!`,
    hint2: `When x changes by ${xs[1] - xs[0]}, y changes by ${ys[1] - ys[0]}. Divide: (${ys[1] - ys[0]}) ÷ (${xs[1] - xs[0]}).`,
    explanation: `Change in y = ${ys[1]} − ${ys[0]} = ${ys[1] - ys[0]}. Change in x = ${xs[1]} − ${xs[0]} = ${xs[1] - xs[0]}. Gradient = ${ys[1] - ys[0]} ÷ ${xs[1] - xs[0]} = ${formattedAns}.`,
    misconceptions,
    params: { core: [mVal, c, step] },
  };
}
