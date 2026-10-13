import { frac, formatFrac } from '../utils/fraction.js';
import { misconceptionOptions } from './distractors.js';
import { NAMES } from '../data/contextPools.js';

export function generate(rng, difficulty = 2, ctx = {}) {
  const name = rng.pick(NAMES);
  const scenarios = [
    { scene: 'skate ramp', rise: 1.5, run: 6, unit: 'm', m: frac(1, 4), desc: 'skate ramp' },
    { scene: 'wheelchair ramp', rise: 1, run: 12, unit: 'm', m: frac(1, 12), desc: 'wheelchair ramp' },
    { scene: 'cable car', rise: 300, run: 900, unit: 'm', m: frac(1, 3), desc: 'cable car mountain lift' },
    { scene: 'roof pitch', rise: 2, run: 8, unit: 'm', m: frac(1, 4), desc: 'house roof' },
    { scene: 'hiking trail', rise: 500, run: 2000, unit: 'm', m: frac(1, 4), desc: 'mountain trail' },
    { scene: 'ski slope', rise: 120, run: 400, unit: 'm', m: frac(3, 10), desc: 'ski run' },
  ];

  const s = rng.pick(scenarios);
  const { options, correctOption, misconceptions } = misconceptionOptions(s.m, ctx, rng);
  const formattedAns = formatFrac(s.m);

  const text = `${name}'s ${s.desc} rises ${s.rise} ${s.unit} over a horizontal run of ${s.run} ${s.unit}. What is its {{gradient}}?`;

  return {
    type: 'word_problem',
    difficulty,
    tags: ['word_problem', 'real_world'],
    questionText: text,
    displayText: text,
    spokenText: `${name}'s ${s.desc} rises ${s.rise} metres over a horizontal run of ${s.run} metres. What is its gradient?`,
    audioKind: 'dynamic',
    visual: {
      kind: 'scene',
      scene: s.scene,
      rise: s.rise,
      run: s.run,
      unit: s.unit,
    },
    answerKind: 'mcq',
    options,
    correctAnswer: correctOption,
    answer: s.m,
    hint1: `Gradient = rise ÷ run. Make sure rise is the top number and run is the bottom number.`,
    hint2: `Divide ${s.rise} by ${s.run}, then simplify the fraction.`,
    explanation: `Gradient = rise ÷ run = ${s.rise} / ${s.run} = ${formattedAns}.`,
    misconceptions,
    params: { core: [s.rise, s.run, s.m.n, s.m.d] },
  };
}
