import { frac, formatFrac } from '../utils/fraction.js';
import { misconceptionOptions } from './distractors.js';

export function generate(rng, difficulty = 2, ctx = {}) {
  // y = mx + c or ax + by = c
  const isRearrange = difficulty >= 3 && rng.chance(0.5);

  if (!isRearrange) {
    const mVal = rng.pick([2, 3, 4, 5, -2, -3, -4, -1, 1]);
    const cVal = rng.int(-7, 9);
    const m = frac(mVal, 1);
    const mStr = formatFrac(m);
    const eqStr = `y = ${mVal === 1 ? '' : mVal === -1 ? '−' : mVal}x ${cVal >= 0 ? '+ ' + cVal : '− ' + Math.abs(cVal)}`;

    const { options, correctOption, misconceptions } = misconceptionOptions(m, ctx, rng);

    const text = `State the {{gradient}} of the line given by the equation: ${eqStr}`;

    return {
      type: 'equation_form',
      difficulty,
      tags: ['equation', 'y_mx_c', mVal < 0 ? 'sign' : 'positive'],
      questionText: text,
      displayText: text,
      spokenText: `State the gradient of the line given by the equation y equals ${mVal} x plus ${cVal}.`,
      audioKind: 'dynamic',
      visual: { kind: 'equation', text: eqStr },
      answerKind: 'mcq',
      options,
      correctAnswer: correctOption,
      answer: m,
      hint1: `Compare with the slope-intercept form y = mx + c. What number is in front of x?`,
      hint2: `In y = mx + c, the coefficient of x is the gradient m.`,
      explanation: `In the equation y = mx + c, m is the gradient. Here, the number multiplying x is ${mStr}.`,
      misconceptions,
      params: { core: [mVal, cVal, 'explicit'] },
    };
  } else {
    // ax + by = c -> by = -ax + c -> y = (-a/b)x + c/b
    const a = rng.pick([2, 3, 4, 6]);
    const b = rng.pick([2, 3]);
    const c = rng.int(6, 24);
    const m = frac(-a, b);
    const mStr = formatFrac(m);
    const eqStr = `${a}x + ${b}y = ${c}`;

    const { options, correctOption, misconceptions } = misconceptionOptions(m, ctx, rng);

    const text = `Rearrange the equation ${eqStr} into y = mx + c and find its {{gradient}}.`;

    return {
      type: 'equation_form',
      difficulty,
      tags: ['equation', 'rearrange', 'sign'],
      questionText: text,
      displayText: text,
      spokenText: `Rearrange the equation ${a} x plus ${b} y equals ${c} into y equals m x plus c and find its gradient.`,
      audioKind: 'dynamic',
      visual: { kind: 'equation', text: eqStr },
      answerKind: 'mcq',
      options,
      correctAnswer: correctOption,
      answer: m,
      hint1: `Isolate y on one side: first subtract ${a}x from both sides, then divide everything by ${b}.`,
      hint2: `${b}y = −${a}x + ${c} → divide by ${b}: y = (−${a}/${b})x + ${c}/${b}.`,
      explanation: `${eqStr} becomes ${b}y = −${a}x + ${c}. Dividing by ${b} gives y = (−${a}/${b})x + ${c / b}. The gradient is ${mStr}.`,
      misconceptions,
      params: { core: [a, b, c, 'rearrange'] },
    };
  }
}
