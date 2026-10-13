import { frac, gcd } from './fraction.js';

// Accepts: "3", "-3", "−3", "3/4", "-3 / 4", "0.75", "1.5", ".5", "undefined"
export function parseAnswer(raw) {
  if (raw === null || raw === undefined) return null;
  const s = String(raw).trim().toLowerCase().replace(/\u2212/g, '-').replace(/\s+/g, '');
  if (!s) return null;

  if (s === 'undefined' || s === 'none' || s === 'null') {
    return 'undefined';
  }

  if (/^-?\d+\/-?\d+$/.test(s)) {
    const [a, b] = s.split('/').map(Number);
    return b === 0 ? null : frac(a, b);
  }
  if (/^-?\d*\.\d+$/.test(s)) {
    const parts = s.replace('-', '').split('.');
    const i = parts[0];
    const f = parts[1];
    const scale = 10 ** f.length;
    const num = Number((i || '0') + f);
    return frac(s.startsWith('-') ? -num : num, scale);
  }
  if (/^-?\d+$/.test(s)) {
    return frac(Number(s), 1);
  }
  return null;
}

export function isSimplified(raw) {
  const s = String(raw).replace(/\u2212/g, '-').replace(/\s+/g, '');
  const m = s.match(/^(-?\d+)\/(-?\d+)$/);
  return !m || gcd(Number(m[1]), Number(m[2])) === 1;
}
