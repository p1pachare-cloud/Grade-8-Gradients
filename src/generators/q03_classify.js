import { frac } from '../utils/fraction.js';

export function generate(rng, difficulty = 1) {
  const classes = ['positive', 'negative', 'zero', 'undefined'];
  const weights = difficulty === 1
    ? ['positive', 'positive', 'negative', 'zero']
    : ['positive', 'negative', 'zero', 'undefined'];
  const targetClass = rng.pick(weights);

  let p1, p2, m;
  if (targetClass === 'zero') {
    const y = rng.int(-5, 5);
    const x1 = rng.int(-6, 0);
    const x2 = rng.int(1, 6);
    p1 = { x: x1, y };
    p2 = { x: x2, y };
    m = frac(0, 1);
  } else if (targetClass === 'undefined') {
    const x = rng.int(-5, 5);
    const y1 = rng.int(-6, 0);
    const y2 = rng.int(1, 6);
    p1 = { x, y: y1 };
    p2 = { x, y: y2 };
    m = null;
  } else if (targetClass === 'positive') {
    const x1 = rng.int(-5, 1);
    const y1 = rng.int(-5, 1);
    const dx = rng.int(2, 5);
    const dy = rng.int(1, 5);
    p1 = { x: x1, y: y1 };
    p2 = { x: x1 + dx, y: y1 + dy };
    m = frac(dy, dx);
  } else {
    // negative
    const x1 = rng.int(-5, 1);
    const y1 = rng.int(0, 6);
    const dx = rng.int(2, 5);
    const dy = rng.int(-5, -1);
    p1 = { x: x1, y: y1 };
    p2 = { x: x1 + dx, y: y1 + dy };
    m = frac(dy, dx);
  }

  const showGraph = rng.chance(0.65);
  const text = `A line passes through (${p1.x}, ${p1.y}) and (${p2.x}, ${p2.y}). What type of {{gradient}} does it have?`;

  return {
    type: 'classify',
    difficulty,
    tags: ['classify', targetClass, targetClass !== 'positive' ? 'sign' : 'positive'],
    questionText: text,
    displayText: text,
    spokenText: `A line passes through point ${p1.x}, ${p1.y} and point ${p2.x}, ${p2.y}. Is its gradient positive, negative, zero, or undefined?`,
    audioKind: 'static',
    visual: showGraph ? {
      kind: 'grid',
      points: [
        { x: p1.x, y: p1.y, label: `(${p1.x}, ${p1.y})`, color: '#00e5ff' },
        { x: p2.x, y: p2.y, label: `(${p2.x}, ${p2.y})`, color: '#ffd54f' },
      ],
      line: { m, p: p1, color: '#00e5ff' },
    } : { kind: 'none' },
    answerKind: 'mcq',
    options: classes,
    correctAnswer: targetClass,
    answer: targetClass,
    hint1: `Read the direction left to right. Uphill = positive, downhill = negative, flat = zero, vertical = undefined.`,
    hint2: `y changes from ${p1.y} to ${p2.y} (rise = ${p2.y - p1.y}). x changes from ${p1.x} to ${p2.x} (run = ${p2.x - p1.x}).`,
    explanation: targetClass === 'zero'
      ? `The line is horizontal (y stays ${p1.y}). Rise is 0, so the gradient is zero.`
      : targetClass === 'undefined'
      ? `The line is vertical (x stays ${p1.x}). Run is 0, and division by zero is undefined!`
      : targetClass === 'positive'
      ? `From left to right, the line rises as x increases. The gradient is positive.`
      : `From left to right, the line falls as x increases. The gradient is negative.`,
    misconceptions: {},
    params: { core: [p1.x, p1.y, p2.x, p2.y, targetClass] },
  };
}
