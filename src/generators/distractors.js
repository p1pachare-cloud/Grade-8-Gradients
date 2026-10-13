import { frac, neg, eq, formatFrac } from '../utils/fraction.js';

export function misconceptionOptions(m, ctx, rng) {
  if (!m) {
    return {
      options: ['undefined', '0', '1', '−1'],
      correctOption: 'undefined',
      misconceptions: {}
    };
  }

  const cands = [
    m.n !== 0 ? [frac(m.d, m.n), 'inverted'] : null,
    [neg(m), 'sign'],
    [frac(m.n + (m.n >= 0 ? 1 : -1), m.d), 'miscount_rise'],
    [frac(m.n, m.d + 1), 'miscount_run'],
    [frac(Math.abs(m.n) + m.d, 1), 'added'],
    [frac(m.n, Math.max(1, m.d - 1)), 'miscount_run_sub']
  ].filter(Boolean);

  const correctStr = formatFrac(m);
  const seen = new Set([correctStr]);
  const wrongOptions = [];
  const misMap = {};

  for (const [cand, misKey] of cands) {
    if (cand && !eq(cand, m)) {
      const formatted = formatFrac(cand);
      if (!seen.has(formatted)) {
        seen.add(formatted);
        wrongOptions.push(formatted);
        misMap[formatted] = misKey;
      }
    }
    if (wrongOptions.length >= 3) break;
  }

  // Fallbacks if fewer than 3
  const fallbacks = [
    formatFrac(neg(m)),
    formatFrac(frac(m.d, Math.max(1, Math.abs(m.n)))),
    formatFrac(frac(1, 1)),
    formatFrac(frac(2, 1)),
    formatFrac(frac(1, 2)),
    '0',
  ];
  for (const fb of fallbacks) {
    if (wrongOptions.length >= 3) break;
    if (!seen.has(fb)) {
      seen.add(fb);
      wrongOptions.push(fb);
    }
  }

  const all = rng.shuffle([correctStr, ...wrongOptions.slice(0, 3)]);
  return {
    options: all,
    correctOption: correctStr,
    misconceptions: misMap,
  };
}
