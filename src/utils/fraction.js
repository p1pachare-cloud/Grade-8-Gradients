// Exact rational arithmetic module
export const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

// Always normalised: d > 0, gcd(n, d) = 1
export function frac(n, d = 1) {
  if (d === 0) throw new RangeError('Zero denominator');
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
}

export const add = (a, b) => frac(a.n * b.d + b.n * a.d, a.d * b.d);
export const sub = (a, b) => frac(a.n * b.d - b.n * a.d, a.d * b.d);
export const mul = (a, b) => frac(a.n * b.n, a.d * b.d);
export const div = (a, b) => {
  if (b.n === 0) throw new RangeError('Division by zero fraction');
  return frac(a.n * b.d, a.d * b.n);
};
export const neg = (a) => frac(-a.n, a.d);
export const eq  = (a, b) => a != null && b != null && a.n === b.n && a.d === b.d;
export const cmp = (a, b) => a.n * b.d - b.n * a.d;
export const abs = (a) => frac(Math.abs(a.n), a.d);
export const toNumber = (a) => a.n / a.d;
export const isInt = (a) => a.d === 1;

export const MINUS = '\u2212';
export const formatFrac = (a) => {
  if (!a) return 'undefined';
  const sign = a.n < 0 ? MINUS : '';
  const n = Math.abs(a.n);
  return a.d === 1 ? `${sign}${n}` : `${sign}${n}/${a.d}`;
};
