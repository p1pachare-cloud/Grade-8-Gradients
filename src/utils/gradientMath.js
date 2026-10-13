import { frac, sub, mul, div, add, neg, eq, formatFrac } from './fraction.js';

// Returns a fraction, or null when the gradient is undefined (vertical line)
export function gradient(p1, p2) {
  const run = p2.x - p1.x;
  const rise = p2.y - p1.y;
  if (run === 0) return null;
  return frac(rise, run);
}

export const classify = (m) =>
  m === null ? 'undefined' : m.n === 0 ? 'zero' : m.n > 0 ? 'positive' : 'negative';

// Gradient of a line parallel to one with gradient m
export const parallelGradient = (m) => m;

// Perpendicular: negative reciprocal; horizontal (0) <-> vertical (null)
export function perpendicularGradient(m) {
  if (m === null) return frac(0, 1);
  if (m.n === 0) return null;
  return frac(-m.d, m.n);
}

// y-intercept c for line through (x, y) with gradient m: c = y - m*x
export const yIntercept = (m, p) => {
  if (m === null) return null;
  return sub(frac(p.y, 1), mul(m, frac(p.x, 1)));
};

// y value at x on line through p with gradient m
export const yAt = (m, p, x) => {
  if (m === null) return null;
  return add(frac(p.y, 1), mul(m, frac(x - p.x, 1)));
};

// Percentage gradient (rise/run * 100)
export const percentGradient = (m) => (m ? mul(m, frac(100, 1)) : null);

// "1 in n" form for gradients whose |numerator| is 1
export const oneInN = (m) => (m && Math.abs(m.n) === 1 ? m.d : null);

// Steepness comparison uses magnitude only (|m1| vs |m2|)
export const steeper = (m1, m2) => {
  if (m1 === null && m2 === null) return 0;
  if (m1 === null) return 1; // vertical is steepest
  if (m2 === null) return -1;
  const a = Math.abs(m1.n) * m2.d;
  const b = Math.abs(m2.n) * m1.d;
  return a === b ? 0 : a > b ? 1 : -1;
};
