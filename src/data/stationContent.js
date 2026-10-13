import { frac, eq, cmp } from '../utils/fraction.js';

export const STATIONS = [
  {
    id: 'station-a',
    num: 1,
    name: 'Slope Climber',
    icon: '🧗‍♂️',
    tag: 'Station A · Concrete',
    desc: 'Drag coordinate points on the live grid to steer the hiker and reach target gradients.',
  },
  {
    id: 'station-b',
    num: 2,
    name: 'Steepest Path',
    icon: '⛰️',
    tag: 'Station B · Pictorial',
    desc: 'Match, rank, and spot sign errors across real-world slopes, ramps, and mountain trails.',
  },
  {
    id: 'station-c',
    num: 3,
    name: 'Formula Builder',
    icon: '📐',
    tag: 'Station C · Abstract',
    desc: 'Construct the two-point gradient formula step by step with the interactive fraction pad.',
  },
];

export const STATION_A_MISSIONS = [
  { id: 'm1', text: 'Build a line with a gradient of 2.', test: (m) => m && eq(m, frac(2, 1)) },
  { id: 'm2', text: 'Build a line with a gradient of 1.', test: (m) => m && eq(m, frac(1, 1)) },
  { id: 'm3', text: 'Build a line with a gradient of 3.', test: (m) => m && eq(m, frac(3, 1)) },
  { id: 'm4', text: 'Build a gradient of one half (1/2).', test: (m) => m && eq(m, frac(1, 2)) },
  { id: 'm5', text: 'Build a line steeper than 1 but positive.', test: (m) => m && m.n > 0 && cmp(m, frac(1, 1)) > 0 },
  { id: 'm6', text: 'Build a line gentler than 1 but positive.', test: (m) => m && m.n > 0 && cmp(m, frac(1, 1)) < 0 },
  { id: 'm7', text: 'Build a negative gradient of −1.', test: (m) => m && eq(m, frac(-1, 1)) },
  { id: 'm8', text: 'Build a negative gradient of −2.', test: (m) => m && eq(m, frac(-2, 1)) },
  { id: 'm9', text: 'Build any negative gradient.', test: (m) => m && m.n < 0 },
  { id: 'm10', text: 'Build a horizontal line (gradient of 0).', test: (m) => m && m.n === 0 },
  { id: 'm11', text: 'Build a vertical line (undefined gradient).', test: (m) => m === null },
  { id: 'm12', text: 'Build a gradient of three quarters (3/4).', test: (m) => m && eq(m, frac(3, 4)) },
];
