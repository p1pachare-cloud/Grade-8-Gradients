import { frac, add, sub, mul, div, neg, eq, cmp, formatFrac } from '../src/utils/fraction.js';
import { gradient, steeper, perpendicularGradient } from '../src/utils/gradientMath.js';
import { parseAnswer, isSimplified } from '../src/utils/answerParser.js';
import { createRng } from '../src/utils/rng.js';
import { generateSession } from '../src/generators/index.js';
import { checkBadges } from '../src/utils/badgeEngine.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ ${message}`);
  }
}

console.log('--- 1. Testing Exact Rational Arithmetic ---');
const f1 = frac(3, 4);
const f2 = frac(6, 8);
assert(eq(f1, f2), 'frac(3,4) equals frac(6,8)');
assert(eq(add(frac(1, 2), frac(1, 3)), frac(5, 6)), '1/2 + 1/3 = 5/6');
assert(eq(sub(frac(3, 4), frac(1, 4)), frac(1, 2)), '3/4 - 1/4 = 1/2');
assert(eq(mul(frac(2, 3), frac(3, 4)), frac(1, 2)), '2/3 * 3/4 = 1/2');
assert(eq(div(frac(1, 2), frac(1, 4)), frac(2, 1)), '1/2 / 1/4 = 2');
assert(eq(neg(frac(3, 5)), frac(-3, 5)), 'neg(3/5) = -3/5');
assert(formatFrac(frac(-3, 2)) === '−3/2', 'formatFrac uses true minus sign');

console.log('--- 2. Testing Gradient Math ---');
const m_pos = gradient({ x: 2, y: 3 }, { x: 6, y: 11 });
assert(eq(m_pos, frac(2, 1)), 'Gradient between (2,3) and (6,11) is 2');
const m_neg = gradient({ x: -1, y: 5 }, { x: 3, y: -3 });
assert(eq(m_neg, frac(-2, 1)), 'Gradient between (-1,5) and (3,-3) is -2');
const m_vert = gradient({ x: 4, y: 2 }, { x: 4, y: 8 });
assert(m_vert === null, 'Vertical line gradient is null (undefined)');
const m_perp = perpendicularGradient(frac(2, 3));
assert(eq(m_perp, frac(-3, 2)), 'Perpendicular to 2/3 is -3/2');
assert(steeper(frac(-3, 1), frac(2, 1)) === 1, '-3 is steeper than 2 by magnitude');

console.log('--- 3. Testing Answer Parser ---');
assert(eq(parseAnswer('3/4'), frac(3, 4)), 'parseAnswer("3/4") = 3/4');
assert(eq(parseAnswer('-3/4'), frac(-3, 4)), 'parseAnswer("-3/4") = -3/4');
assert(eq(parseAnswer('−3/4'), frac(-3, 4)), 'parseAnswer("−3/4") with true minus = -3/4');
assert(eq(parseAnswer('1.5'), frac(3, 2)), 'parseAnswer("1.5") = 3/2');
assert(parseAnswer('undefined') === 'undefined', 'parseAnswer("undefined") = undefined');
assert(isSimplified('3/4') === true, '3/4 is simplified');
assert(isSimplified('6/8') === false, '6/8 is not simplified');

console.log('--- 4. Testing 100 Procedural Questions Session Generation ---');
const session = generateSession(4242);
assert(session.length === 100, `Generated exactly 100 questions (received: ${session.length})`);

const worldsCount = new Set(session.map((q) => q.world)).size;
assert(worldsCount === 10, 'Covered all 10 Worlds (landmarks)');

const typesCount = new Set(session.map((q) => q.type)).size;
assert(typesCount >= 10, 'Covered all 10 Question Types');

// Check reproducibility
const session2 = generateSession(4242);
assert(
  session[0].signature === session2[0].signature &&
  session[99].signature === session2[99].signature,
  'Identical seed 4242 produces identical questions stream'
);

console.log('--- 5. Testing Badge Engine ---');
const badges = checkBadges({
  phaseComplete: { wonder: true, story: true, simulate: true, practice: true, reflect: true },
  simStationsComplete: [true, true, true],
  worldScores: Array(10).fill(10),
  maxStreak: 12,
  badges: [],
  stationBPerfect: true,
  signQuestionsCorrect: 10,
});
assert(badges.includes('trail_starter'), 'Unlocked trail_starter');
assert(badges.includes('slope_builder'), 'Unlocked slope_builder');
assert(badges.includes('perfect_peak'), 'Unlocked perfect_peak');
assert(badges.includes('streak_star'), 'Unlocked streak_star');
assert(badges.includes('global_explorer'), 'Unlocked global_explorer');
assert(badges.includes('sharp_eye'), 'Unlocked sharp_eye');
assert(badges.includes('sign_navigator'), 'Unlocked sign_navigator');

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 All test suites passed successfully!\n');
}
