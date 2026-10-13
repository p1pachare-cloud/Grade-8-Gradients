# Technical Requirements Document (TRD)

## Gradients — Steepness, Rise & Run, and Rate of Change | Grade 8 Math

### Intellia | Global Grade 8 Mathematics Curriculum

---

## 1. Technical Overview

This document specifies the architecture, component design, state management, data models, exact-arithmetic math engine, procedural question generation, simulation logic, gamification, audio pipeline and quality standards for the **"Global Gradient Explorers — Gradients"** lesson module (Grade 8 Math).

The module is a **React 18 application (Vite + JSX)** with **Tailwind + PostCSS**, structured like the reference repository **<https://github.com/p1pachare-cloud/Grade5-Time-Intervals>** (`public/assets`, `scripts`, `src`, `index.html`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`) and styled to match **<https://grade5-time-intervals.vercel.app/>**. It is embedded at:

```
https://intelliasg.com/courses/grade-8-math/lessons/gradients/
```

Audio uses **ElevenLabs exclusively** (no browser Web Speech fallback), implementing `audio_generation_pipeline.md`.

### Three engineering decisions that differ from the reference

1. **Procedural questions, not a fixed bank.** Every question is generated from a template with seeded random values (§6, §9).
2. **Exact rational arithmetic.** Gradients are stored as reduced fractions `{n, d}`. Floating-point is used for drawing only, never for checking answers (§5).
3. **Hybrid audio for random content.** Static narration is pre-generated; number-bearing random questions are voiced on demand through a server-side proxy so the API key is not shipped to browsers (§11).

---

## 2. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| UI framework | React 18 (JSX, Vite) | Matches the reference repo |
| State | `useReducer` + `useState` + small custom hooks | Enough for a single-module app |
| Styling | Tailwind CSS + PostCSS + `App.css` | Matches the reference repo (`tailwind.config.js`, `postcss.config.js`) |
| Icons | `lucide-react` | Lightweight, tree-shakeable |
| Animation | CSS keyframes and transitions; SVG `transform` transitions | No animation library needed |
| Diagrams | Inline SVG React components | Grid, line, staircase, slope meter |
| Drag and drop | Pointer Events (custom `usePointerDrag` hook) | One code path for mouse, touch and pen; no heavy DnD library |
| Randomness | Seeded PRNG (`mulberry32`) | Reproducible bug reports; no `Math.random()` in generators |
| Math | Custom exact-fraction module | No float errors; zero dependencies |
| Persistence | `localStorage` (progress), `IndexedDB` (audio cache) | No backend |
| Audio | ElevenLabs API via proxy + HTML5 `Audio` | Per pipeline file |
| Testing | Vitest + React Testing Library + `@axe-core/react` (dev) | Unit, component and a11y checks |
| Build | Vite | Matches the reference repo |
| Hosting | Vercel (as the reference), embedded or linked from Intellia | Matches the reference deployment |

---

## 3. Project Structure

```
grade8-gradients/
├── public/
│   └── assets/
│       ├── audio/                          # Pre-generated .mp3 (ElevenLabs)
│       │   ├── audio_wonder_hook_0.mp3
│       │   ├── audio_story_panel1_0.mp3 … audio_story_panel6_2.mp3
│       │   ├── audio_station_a_instruction_0.mp3 …
│       │   ├── audio_stem_read_gradient_graph_0.mp3   # fixed-stem question
│       │   └── … (all static phrases)
│       └── images/
│           ├── grady-idle.svg  grady-happy.svg  grady-thinking.svg
│           ├── grady-celebrate.svg  grady-encourage.svg
│           ├── world-map-bg.svg
│           └── landmarks/ (alps.svg sydney.svg giza.svg rio.svg reykjavik.svg
│                           mumbai.svg paris.svg sanfran.svg london.svg kili.svg)
├── src/
│   ├── main.jsx
│   ├── App.jsx                             # Root, global reducer
│   ├── App.css                             # Global styles (mirrors reference)
│   ├── components/
│   │   ├── IntroScreen.jsx
│   │   ├── ProgressMap.jsx                 # 6-phase dot tracker (top bar)
│   │   ├── SettingsPanel.jsx               # audio, gradient/slope term, units, motion
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx
│   │   │   ├── StoryPhase.jsx              # 6 concept panels + Try-it
│   │   │   ├── SimulatePhase.jsx
│   │   │   ├── PlayPhase.jsx               # IntelliPlay™ engine
│   │   │   └── ReflectPhase.jsx
│   │   ├── simulations/
│   │   │   ├── SlopeClimberStation.jsx     # Station A
│   │   │   ├── SteepestPathStation.jsx     # Station B
│   │   │   └── FormulaBuilderStation.jsx   # Station C
│   │   ├── story/
│   │   │   ├── TryItDragLine.jsx           # panel 1–2 micro-sims
│   │   │   ├── TryItSignFlip.jsx           # panel 3
│   │   │   ├── TryItRotateLine.jsx         # panel 4
│   │   │   ├── TryItTwoPoints.jsx          # panel 5
│   │   │   └── TryItParallelPerp.jsx       # panel 6
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx        # dispatches on question.visual
│   │   │   ├── McqCard.jsx
│   │   │   ├── FractionInputCard.jsx
│   │   │   ├── TrueFalseCard.jsx
│   │   │   ├── TableCard.jsx
│   │   │   ├── EquationCard.jsx
│   │   │   ├── HintOverlay.jsx
│   │   │   └── ConceptReminder.jsx         # "Remind me" sheet
│   │   ├── gamification/
│   │   │   ├── XPTracker.jsx  StarRating.jsx  BadgePanel.jsx
│   │   │   ├── StreakCounter.jsx  WorldMap.jsx
│   │   └── shared/
│   │       ├── Mascot.jsx                  # Grady with mood states
│   │       ├── GradientGrid.jsx            # core SVG coordinate plane
│   │       ├── RiseRunTriangle.jsx         # staircase overlay
│   │       ├── SlopeMeter.jsx              # dial gauge
│   │       ├── SceneCard.jsx               # ramp/roof/ski scene with line
│   │       ├── FractionPad.jsx             # numeric/fraction input
│   │       ├── FeedbackOverlay.jsx
│   │       └── SpeakerButton.jsx           # 🔊 on-demand question audio
│   ├── data/
│   │   ├── storyContent.js                 # panel text, diagrams, try-it config
│   │   ├── worlds.js                       # 10 worlds, type mix, difficulty
│   │   ├── contextPools.js                 # names, cities, objects, units
│   │   └── stationContent.js               # mission cards, Station B rounds
│   ├── generators/
│   │   ├── index.js                        # registry + generateWorld()
│   │   ├── q01_readGraph.js
│   │   ├── q02_twoPoints.js
│   │   ├── q03_classify.js
│   │   ├── q04_compareSteepness.js
│   │   ├── q05_missingCoordinate.js
│   │   ├── q06_wordProblem.js
│   │   ├── q07_table.js
│   │   ├── q08_trueFalse.js
│   │   ├── q09_equationForm.js
│   │   ├── q10_parallelPerp.js
│   │   └── distractors.js
│   ├── hooks/
│   │   ├── useAudio.js
│   │   ├── useGameState.js
│   │   ├── useLocalStorage.js
│   │   └── usePointerDrag.js
│   └── utils/
│       ├── fraction.js                     # exact rational arithmetic
│       ├── gradientMath.js                 # gradient, intercept, parallel, perp
│       ├── answerParser.js                 # "−3/2", "1.5", "3 / 6" → fraction
│       ├── rng.js                          # mulberry32 + helpers
│       ├── signature.js                    # question uniqueness hash
│       ├── scoring.js                      # XP, stars, unlock
│       ├── badgeEngine.js
│       ├── toSpoken.js                     # math → spoken words (audio)
│       ├── terms.js                        # gradient ⇄ slope substitution
│       ├── narration.js                    # phase scripts (segment helpers)
│       ├── audio.js                        # engine: narrate(), stopNarration()
│       └── audioMap.js                     # AUTO-GENERATED text → mp3
├── scripts/
│   ├── generate_audio.js                   # offline pre-generation
│   ├── clean_audio.js                      # remove orphaned mp3s
│   └── check_audio_parity.js               # screen text ⇄ phrases ⇄ narration
├── api/
│   └── elevenlabs.js                       # serverless proxy (Vercel function)
├── tests/                                  # unit/property tests
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

---

## 4. Application State Architecture

### 4.1 Global state (`App.jsx`, `useReducer`)

```js
const initialState = {
  // Navigation
  phase: 'intro',           // 'intro'|'wonder'|'story'|'simulate'|'play'|'reflect'|'results'
  storyPanel: 0,            // 0–5
  tryItDone: Array(6).fill(false),
  currentSimStation: 0,     // 0=SlopeClimber, 1=SteepestPath, 2=FormulaBuilder
  simStationsComplete: [false, false, false],
  simRound: 0,
  stationBPerfect: true,    // flips false on any wrong selection

  // Play
  seed: null,               // 32-bit session seed (set once on LOAD_QUESTIONS)
  questionSet: [],          // 100 generated Question objects (10 per world)
  currentWorld: 0,          // 0–9
  currentQuestion: 0,       // 0–99
  worldScores: Array(10).fill(null),
  bonusUnlocked: Array(10).fill(false),
  attemptCount: 0,          // 0–3 on the current question
  hintsUsed: 0,
  signQuestionsCorrect: 0,  // for Sign Navigator badge

  // Gamification
  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],

  // Session
  phaseComplete: { wonder:false, story:false, simulate:false, play:false, reflect:false },
  sessionId: crypto.randomUUID(),

  // Settings
  audioEnabled: true,
  autoPlayQuestions: false, // number-bearing question audio is tap-to-play by default
  term: 'gradient',         // 'gradient' | 'slope'
  units: 'metric',          // 'metric' | 'imperial'
  reducedMotion: false,
};
```

### 4.2 Reducer actions

```js
export const ACTIONS = {
  SET_PHASE, NEXT_STORY_PANEL, COMPLETE_TRY_IT,
  ADVANCE_SIM_STATION, COMPLETE_SIM_STATION, NEXT_SIM_ROUND, STATION_B_MISS,
  LOAD_QUESTIONS, ANSWER_CORRECT, ANSWER_INCORRECT, USE_HINT, NEXT_QUESTION,
  FINISH_WORLD, UNLOCK_BONUS, UNLOCK_BADGE, COMPLETE_PHASE,
  TOGGLE_AUDIO, SET_TERM, SET_UNITS, TOGGLE_REDUCED_MOTION,
  RESTORE_SESSION, RESET_SESSION,
};
```

### 4.3 Learn-first gate (reducer guard)

```js
case ACTIONS.SET_PHASE: {
  const next = action.payload;
  const learnDone =
    state.phaseComplete.story && state.simStationsComplete.every(Boolean);
  if (next === 'play' && !learnDone) return state; // Play is locked until learning is done
  return { ...state, phase: next };
}
```

### 4.4 Key reducer logic

```js
case ACTIONS.ANSWER_CORRECT: {
  const q = state.questionSet[state.currentQuestion];
  const xpEarned = calcXP(state.attemptCount + 1, state.hintsUsed, state.streak);
  const newStreak = state.streak + 1;
  const scores = [...state.worldScores];
  scores[q.world] = (scores[q.world] ?? 0) + 1;
  return {
    ...state,
    xp: state.xp + xpEarned,
    streak: newStreak,
    maxStreak: Math.max(state.maxStreak, newStreak),
    worldScores: scores,
    totalStars: calcTotalStars(scores),
    signQuestionsCorrect: state.signQuestionsCorrect + (q.tags.includes('sign') ? 1 : 0),
    attemptCount: 0,
    hintsUsed: 0,
  };
}
case ACTIONS.ANSWER_INCORRECT:
  return { ...state, streak: 0, attemptCount: state.attemptCount + 1 };
```

> A world score is stored as `null` until its first question is answered, and `(null ?? 0) + 1` handles the first correct answer. Worlds with zero correct answers are set to `0` by `FINISH_WORLD`.

---

## 5. Exact Math Engine

All gradient arithmetic uses reduced fractions. Floating-point appears only when drawing (SVG coordinates, needle angle).

### 5.1 `utils/fraction.js`

```js
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
export const div = (a, b) => frac(a.n * b.d, a.d * b.n);   // throws if b is 0
export const neg = (a) => frac(-a.n, a.d);
export const eq  = (a, b) => a.n === b.n && a.d === b.d;   // valid because both are normalised
export const cmp = (a, b) => a.n * b.d - b.n * a.d;         // <0, 0, >0
export const abs = (a) => frac(Math.abs(a.n), a.d);
export const toNumber = (a) => a.n / a.d;                   // drawing only
export const isInt = (a) => a.d === 1;

const MINUS = '\u2212'; // true minus sign for display
export const formatFrac = (a) => {
  const sign = a.n < 0 ? MINUS : '';
  const n = Math.abs(a.n);
  return a.d === 1 ? `${sign}${n}` : `${sign}${n}/${a.d}`;
};
```

### 5.2 `utils/gradientMath.js`

```js
import { frac, sub, mul, div, add, neg, eq } from './fraction';

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

// Perpendicular: negative reciprocal; special cases for horizontal ⇄ vertical
export function perpendicularGradient(m) {
  if (m === null) return frac(0, 1);       // vertical → horizontal
  if (m.n === 0) return null;              // horizontal → vertical (undefined)
  return frac(-m.d, m.n);
}

// y-intercept c for a line through (x, y) with gradient m: c = y − m·x
export const yIntercept = (m, p) => sub(frac(p.y, 1), mul(m, frac(p.x, 1)));

// y value at x on the line through p with gradient m
export const yAt = (m, p, x) => add(frac(p.y, 1), mul(m, frac(x - p.x, 1)));

// Percentage gradient (rise/run × 100) as a fraction; display rounds to 1 d.p. if needed
export const percentGradient = (m) => mul(m, frac(100, 1));

// "1 in n" form for gradients whose |numerator| is 1 after reduction
export const oneInN = (m) => (m && Math.abs(m.n) === 1 ? m.d : null);

// Steepness comparison uses magnitude only
export const steeper = (m1, m2) => {
  const a = Math.abs(m1.n) * m2.d;
  const b = Math.abs(m2.n) * m1.d;
  return a === b ? 0 : a > b ? 1 : -1; // 1 → m1 steeper, −1 → m2 steeper
};
```

### 5.3 `utils/answerParser.js`

```js
// Accepts: "3", "-3", "−3", "3/4", "-3 / 4", "0.75", "1.5", ".5"
// Rejects: empty, letters, more than one '/', denominators of 0
export function parseAnswer(raw) {
  const s = String(raw).replace(/\u2212/g, '-').replace(/\s+/g, '');
  if (!s) return null;

  if (/^-?\d+\/-?\d+$/.test(s)) {
    const [a, b] = s.split('/').map(Number);
    return b === 0 ? null : frac(a, b);
  }
  if (/^-?\d*\.\d+$/.test(s)) {                  // terminating decimals
    const [i, f] = s.replace('-', '').split('.');
    const scale = 10 ** f.length;
    const num = Number((i || '0') + f);
    return frac(s.startsWith('-') ? -num : num, scale);
  }
  if (/^-?\d+$/.test(s)) return frac(Number(s), 1);
  return null;
}

export function isSimplified(raw) {
  const s = String(raw).replace(/\u2212/g, '-').replace(/\s+/g, '');
  const m = s.match(/^(-?\d+)\/(-?\d+)$/);
  return !m || gcd(Number(m[1]), Number(m[2])) === 1;
}
```

**Checking rule:** `eq(parseAnswer(input), question.answer)` decides correctness. If correct but `!isSimplified(input)`, show the "Can you simplify it?" nudge. XP is **not** reduced.

---

## 6. Procedural Question System

### 6.1 Question schema

```ts
interface Question {
  id: string;                      // `${seed}-${world}-${index}`
  type: QuestionType;              // 'read_graph' | 'two_points' | 'classify' | 'compare'
                                   // | 'missing_coord' | 'word_problem' | 'table'
                                   // | 'true_false' | 'equation_form' | 'parallel_perp'
  world: number;                   // 0–9
  difficulty: 1 | 2 | 3;
  tags: string[];                  // e.g. ['sign','negative','fraction','word']

  // Content
  displayText: string;             // exactly what is shown; may contain {{terms}} tokens
  spokenText: string | null;       // output of toSpoken(displayText); null for stem-only audio
  audioKind: 'static' | 'dynamic'; // static → in audioMap; dynamic → API on demand
  visual: Visual;                  // see below

  // Answer
  answerKind: 'mcq' | 'fraction' | 'boolean' | 'choice';
  options?: Option[];              // for mcq/choice; always includes the correct one
  answer: Fraction | boolean | string | null;   // exact value; null for "undefined" gradients
  acceptNull?: boolean;            // true when "undefined" is the answer in a fraction input

  // Teaching
  hint1: string;
  hint2: string;                   // triggers the animated staircase
  explanation: string;             // worked solution (read aloud after attempt 3)
  misconceptions: Record<string, string>; // wrongOptionValue → misconception key

  // Randomisation record
  params: Record<string, unknown>; // the exact random values used (for reproducibility)
  signature: string;               // uniqueness hash
}

type Visual =
  | { kind: 'grid'; points?: Point[]; line?: LineSpec; hideLabels?: boolean; staircase?: boolean }
  | { kind: 'twoLines'; lines: LineSpec[] }
  | { kind: 'scene'; scene: 'ramp'|'roof'|'ski'|'cable'|'road'|'stairs'; rise: number; run: number; unit: string }
  | { kind: 'table'; xs: number[]; ys: (number|'?')[] }
  | { kind: 'equation'; text: string }
  | { kind: 'none' };
```

### 6.2 Generator contract

Each generator is a pure function of `(rng, difficulty, ctx)`:

```js
// ctx: { world, term, units, names, cities, objects }
export function generate(rng, difficulty, ctx) → Question
```

Rules for every generator:

1. **Construct, don't reject.** Choose the answer first, then build inputs that produce it (see §6.3). This guarantees exact, valid results.
2. **Stay on the grid.** All plotted points satisfy `|x|,|y| ≤ cfg.range`.
3. **No accidental undefined.** `run ≠ 0` unless the question type is *intentionally* about vertical lines (Q3, Q8 and Q10, flagged by the `'undefined'` tag).
4. **Record `params`** so any question can be regenerated from `(seed, index)`.
5. **Compute distractors from misconceptions** (§6.5), not from random numbers.

### 6.3 Difficulty configuration

```js
export const DIFF = {
  1: { range: 6,  gradients: [[1,1],[2,1],[3,1],[1,2],[1,3]], allowNeg: false, maxMult: 2 },
  2: { range: 10, gradients: [[1,1],[2,1],[3,1],[4,1],[1,2],[1,3],[2,3],[3,4],[3,2],[5,2]], allowNeg: true, maxMult: 3 },
  3: { range: 12, gradients: [[1,1],[2,1],[3,1],[5,1],[1,4],[2,3],[3,4],[4,3],[5,3],[5,4],[7,2]], allowNeg: true, maxMult: 3 },
};
```

Each tuple is `[numerator, denominator]` of a reduced target gradient. A **multiplier** `k` scales it into raw rise/run, so students see unsimplified numbers such as `6/9` and must reduce.

### 6.4 Example generator — Q2 (two points)

```js
// generators/q02_twoPoints.js
import { frac } from '../utils/fraction';
import { gradient } from '../utils/gradientMath';
import { DIFF } from './config';
import { misconceptionOptions } from './distractors';

export function generate(rng, difficulty, ctx) {
  const cfg = DIFF[difficulty];
  for (let attempt = 0; attempt < 50; attempt++) {
    const [n0, d0] = rng.pick(cfg.gradients);
    const sign = cfg.allowNeg && rng.chance(0.4) ? -1 : 1;
    const k = rng.int(1, cfg.maxMult);
    const run = d0 * k;
    const rise = sign * n0 * k;

    // choose point 1 so that point 2 also stays on the grid
    const x1 = rng.int(-cfg.range, cfg.range - run);
    const yMin = Math.max(-cfg.range, -cfg.range - rise);
    const yMax = Math.min(cfg.range, cfg.range - rise);
    if (yMin > yMax) continue;
    const y1 = rng.int(yMin, yMax);

    const p1 = { x: x1, y: y1 };
    const p2 = { x: x1 + run, y: y1 + rise };
    const m = gradient(p1, p2);                      // exact fraction
    const text = `Find the {{gradient}} of the line through (${p1.x}, ${p1.y}) and (${p2.x}, ${p2.y}).`;

    return {
      type: 'two_points', difficulty, tags: [sign < 0 ? 'sign' : 'positive', 'fraction'],
      displayText: text,
      audioKind: 'dynamic',
      visual: difficulty === 1 ? { kind: 'grid', points: [p1, p2] } : { kind: 'none' },
      answerKind: 'fraction', answer: m,
      hint1: 'Rise goes on top. Subtract the y values: y₂ − y₁.',
      hint2: 'Now subtract the x values in the same order, then divide the rise by the run.',
      explanation: `Rise = ${p2.y} − ${p1.y} = ${rise}. Run = ${p2.x} − ${p1.x} = ${run}. Gradient = ${rise}/${run}, which simplifies to ${formatFrac(m)}.`,
      params: { p1, p2, k },
    };
  }
  throw new Error('q02: could not generate a valid question');
}
```

> The `{{gradient}}` token is replaced by the user's term setting at render time (§12.2).

### 6.5 Distractors (`generators/distractors.js`)

```js
// Returns 4 unique options (1 correct + 3 misconception-based) with a map option → misconception
export function misconceptionOptions(m, ctx, rng) {
  const cands = [
    [frac(m.d, m.n),            'inverted'],      // run ÷ rise   (skip if m.n === 0)
    [neg(m),                    'sign'],          // sign error
    [frac(m.n + 1, m.d),        'miscount'],      // off by one in rise
    [frac(m.n, m.d + 1),        'miscount_run'],  // off by one in run
    [frac(m.n + m.d, 1),        'added'],         // added instead of divided
  ].filter(([v]) => v && !eq(v, m));
  // de-duplicate by value, shuffle, take 3
  …
}
```

Selection rules: values are unique; none equals the correct answer; at least one **sign** or **inverted** distractor is included whenever applicable; options are shuffled with the session RNG.

### 6.6 Generator specifications for all ten types

| Type | Construction (answer first) | Answer kind | Visual | Audio |
|---|---|---|---|---|
| **Q1 read_graph** | Choose target `m` and `k`; choose a start grid point; draw line through lattice points; staircase hidden until hint 2 | mcq | `grid` | **static** stem |
| **Q2 two_points** | See §6.4 | fraction | `none` (D1: `grid`) | dynamic |
| **Q3 classify** | Choose class (positive, negative, zero, undefined) with weights favouring harder classes by world; build 2 points (same y → zero; same x → undefined) | choice (4 fixed options) | `grid` for D1–D2, `none` for D3 | **static** stem for graph versions, dynamic otherwise |
| **Q4 compare** | Pick two distinct magnitudes `|m₁| ≠ |m₂|` (ensure one is negative in ≥ 50% of D2–D3 items); show graph or values | mcq (Line A / Line B / equal) | `twoLines` | static stem for graph version |
| **Q5 missing_coord** | Choose `m`, `p1`, and `Δx` (multiple of `m.d`); target `y = y1 + m·Δx` is an integer; hide `y2` as `k` (D3 may hide `x2`) | fraction | `none` or `grid` | dynamic |
| **Q6 word_problem** | Choose a scene, `rise`, `run`, unit; ask for fraction, decimal, "1 in n" or percent (by world); D3 asks for a missing rise/run given a stated gradient | fraction (or mcq for "1 in n" / % forms) | `scene` | dynamic |
| **Q7 table** | Choose `m` and an intercept; 4–5 equally spaced `x` values; hide one `y` (D1: ask for `m`; D2+: ask for missing `y` or for the rate in context) | fraction or mcq | `table` | dynamic |
| **Q8 true_false** | Pick from 14 statement templates with random parameters, half true, half false; false versions come from known misconceptions (e.g. "−3 is less steep than 2") | boolean | `none` or `grid` | dynamic (short) |
| **Q9 equation_form** | D2: read `m` or `c` from `y = mx + c`; D3: rearrange `ax + by = c` (construct from chosen `m` and `c` so division is exact, then multiply through); also "which equation has gradient 3?" | fraction or mcq | `equation` | dynamic |
| **Q10 parallel_perp** | Choose `m`; ask for parallel gradient, perpendicular gradient, "are these parallel / perpendicular / neither?", or a missing constant `k` that makes two lines parallel | fraction or mcq | `none` or `twoLines` | dynamic |

> Statement templates for Q8 are stored in `generators/q08_trueFalse.js`. Each template has `makeTrue(rng)` and `makeFalse(rng)` functions and a `misconception` key. No template depends on a float comparison.

### 6.7 Worked sample outputs (for QA fixtures)

| Input (random) | Computed answer |
|---|---|
| Points (2, 3) and (6, 11) | 8/4 → **2** |
| Points (−1, 5) and (3, −3) | −8/4 → **−2** |
| Ramp rise 1.2 m, run 12 m | 1.2/12 = **1/10** (10%, "1 in 10") |
| Gradient 3 through (1, 2), find k at (4, k) | k = 2 + 3·3 = **11** |
| Table x: 0, 2, 4, 6; y: 5, 11, 17, 23 | **3** |
| `y = −3x + 5` | gradient **−3**, y-intercept **5** |
| `3x + 2y = 12` | 2y = −3x + 12 → gradient **−3/2**, y-intercept **6** |
| Perpendicular to gradient 2/3 | **−3/2** |
| Perpendicular to horizontal line | **undefined** (vertical) |

> For decimal inputs such as 1.2 m, the generator converts to integer centimetres or millimetres internally, builds the fraction exactly and renders the decimal only for display.

---

## 7. SVG Components

### 7.1 `GradientGrid.jsx`

```jsx
const GradientGrid = ({
  xRange = [-10, 10], yRange = [-10, 10],
  size = 480,
  points = [],              // [{x, y, label, draggable, color}]
  lines = [],               // [{ m: Fraction|null, p: Point, color, dashed }]
  staircase = null,         // { from, to, showLabels, animate }
  hideAxisLabels = false,
  onPointMove,              // (index, {x, y}) => void; snaps to integers
  ariaDescription,          // required: text alternative
}) => { /* returns <svg viewBox="0 0 W H" role="img" aria-label={ariaDescription}> … */ };
```

**Coordinate mapping** (pure function; unit-tested):

```js
export const makeScale = ([xmin, xmax], [ymin, ymax], w, h, pad = 24) => ({
  sx: (x) => pad + ((x - xmin) / (xmax - xmin)) * (w - 2 * pad),
  sy: (y) => h - pad - ((y - ymin) / (ymax - ymin)) * (h - 2 * pad),
  ix: (px) => Math.round(xmin + ((px - pad) / (w - 2 * pad)) * (xmax - xmin)),
  iy: (py) => Math.round(ymin + ((h - pad - py) / (h - 2 * pad)) * (ymax - ymin)),
});
```

**Drawing a line across the full plot:** compute the two intersection points of `y = y₀ + m(x − x₀)` with the plot box (for vertical lines, draw `x = x₀`). Clip using `toNumber(m)` (float, drawing only).

**Dragging:** `usePointerDrag` captures the pointer on `pointerdown`, converts `clientX/Y` to SVG coordinates with `svg.getScreenCTM().inverse()`, snaps via `ix/iy`, and calls `onPointMove`. Keyboard: arrow keys move the focused point by 1; `Shift+Arrow` by 2.

**Animations:** line draws with `stroke-dashoffset`; staircase segments fade in with a 120 ms stagger; hands and needles use CSS `transform` transitions (disabled under `prefers-reduced-motion` or the in-app setting).

### 7.2 `RiseRunTriangle.jsx`

Draws the horizontal run segment (teal) then the vertical rise segment (orange) between two grid points, with arrowheads and labels `run = 4`, `rise = −3`. Negative rises draw downward and use the coral colour. Labels are placed outside the triangle to avoid overlapping the line.

### 7.3 `SlopeMeter.jsx`

```jsx
// Needle angle uses atan of the gradient, drawing only (not for answer checking)
const angle = m === null ? 90 : Math.atan(toNumber(m)) * (180 / Math.PI); // −90…90
```

- Dial spans −90° to +90° (left = steep downhill, centre = flat, right = steep uphill)
- Under the dial: `gradient = 3/4`, sign icon (↗ ↘ → ↑), and the word "positive", "negative", "zero" or "undefined"
- Vertical lines pin the needle to the top with an "undefined" label

### 7.4 `SceneCard.jsx`

Renders a scene illustration (ramp, roof, ski slope, cable car, road, stairs) from SVG symbols, then overlays a rise/run triangle scaled to the given numbers. Width is fixed; height scales with `rise/run` clamped to a visible range.

---

## 8. Simulation Station Specifications

### 8.1 Station A — `SlopeClimberStation.jsx`

```js
const [A, setA] = useState({ x: -4, y: -2 });
const [B, setB] = useState({ x: 2,  y: 4 });
const m = gradient(A, B);        // Fraction | null
```

- Both points are draggable; snapping and clamping to the grid
- Live panel: `rise`, `run`, `gradient` (fraction and decimal), sign chip, `SlopeMeter`
- **Mission check** runs on every move; the mission completes after the target condition has held for 600 ms (prevents accidental passes mid-drag)

```js
// stationContent.js — mission predicates (exact math only)
{ id:'m1', text:'Build a line with a gradient of 2.',               test:(m)=> m && eq(m, frac(2,1)) }
{ id:'m5', text:'Build a gradient of one half.',                    test:(m)=> m && eq(m, frac(1,2)) }
{ id:'m6', text:'Build a line that is steeper than 1 but positive.',test:(m)=> m && m.n>0 && cmp(m, frac(1,1))>0 }
{ id:'m8', text:'Build a negative gradient.',                       test:(m)=> m && m.n<0 }
{ id:'m11',text:'Build a horizontal line.',                         test:(m)=> m && m.n===0 }
{ id:'m12',text:'Build a vertical line.',                           test:(m)=> m===null }
```

- 4 rounds are drawn from the 12-mission pool by difficulty tier using the session RNG
- Completion awards 20 XP per round (once)

### 8.2 Station B — `SteepestPathStation.jsx`

**Three modes**, one per round:

1. **Match:** `generateMatchCards(rng, round)` → 4 `SceneCard`s, each with a printed claim; 2–3 correct, the rest mismatched by a misconception. Student multi-selects, then presses "Check".
2. **Rank:** 4 lines with distinct magnitudes; student orders gentlest → steepest using drag-reorder (tap-to-swap fallback). Correct order is computed by `steeper()`.
3. **Spot the sign:** 4 cards; 1–2 have the wrong sign; student taps the wrong ones.

```js
const onCheck = () => {
  const wrongPick = selected.some((i) => !cards[i].isCorrect) || missedCorrect;
  if (wrongPick) dispatch({ type: ACTIONS.STATION_B_MISS }); // clears Sharp Eye
  …
};
```

### 8.3 Station C — `FormulaBuilderStation.jsx`

Three-step guided state machine:

```
step 0: fill numerator (y₂ − y₁) → check → step 1
step 1: fill denominator (x₂ − x₁) → check → step 2
step 2: enter simplified gradient → check (via parseAnswer + eq)
```

- Numerator and denominator are checked as integers; the final answer is checked as an exact fraction
- If the denominator equals 0, the final step shows "undefined" choice buttons instead of the fraction pad
- Round 3 hides one coordinate and requires solving for it (uses `yAt()`)
- "Show me the graph" toggles a `GradientGrid` scaffold with the staircase

---

## 9. Randomisation Engine

### 9.1 Seeded PRNG (`utils/rng.js`)

```js
export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createRng(seed) {
  const next = mulberry32(seed);
  return {
    seed,
    float: next,
    int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),   // inclusive
    chance: (p) => next() < p,
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    shuffle(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
  };
}

// Fresh seed per session from a cryptographic source
export const newSessionSeed = () => crypto.getRandomValues(new Uint32Array(1))[0];
```

### 9.2 World assembly (`generators/index.js`)

```js
export function generateSession(seed, settings) {
  const rng = createRng(seed);
  const seen = new Set();
  const all = [];

  WORLDS.forEach((world, w) => {
    const slots = Object.entries(world.mix)                // e.g. { read_graph: 4, classify: 3, … }
      .flatMap(([type, count]) => Array(count).fill(type));

    const worldQs = rng.shuffle(slots).map((type, i) => {
      const diff = world.difficultyFor(i, rng);            // e.g. W3 → mostly 1, some 2
      for (let tries = 0; tries < 30; tries++) {
        const q = GENERATORS[type](rng, diff, { ...settings, world: w, names: NAMES, cities: CITIES });
        q.signature = signatureOf(q);
        if (!seen.has(q.signature)) {
          seen.add(q.signature);
          return finalise(q, { seed, world: w, index: i });
        }
      }
      throw new Error(`Could not generate unique ${type} for world ${w}`);
    });
    all.push(...worldQs);
  });
  return all;                       // 100 questions: world 0 first … world 9 last
}
```

- `worlds.js` encodes the PRD §8.3 matrix (`mix` per world) and each world's difficulty profile.
- **Order inside a world** is shuffled. **World order is fixed** (progression is part of the learning design).
- Because each world is generated from the same session RNG stream, questions are deterministic given the seed. A support request can include the seed to reproduce any session.

### 9.3 Uniqueness (`utils/signature.js`)

```js
// Same type + same numeric parameters = duplicate (names and scenes don't count)
export const signatureOf = (q) =>
  `${q.type}|${JSON.stringify(q.params.core)}`;
```

Each generator places only the mathematically meaningful values in `params.core` (e.g. `[p1.x, p1.y, p2.x, p2.y]`), so two questions with the same numbers but different names are still treated as duplicates.

### 9.4 Option order and answer position

Option arrays are shuffled with the session RNG after distractors are chosen, with a constraint that the **correct answer position is spread evenly** (no more than 3 same-position answers in a row within a world).

### 9.5 Bonus Challenge

On a 3-star world, `generateBonus(rng, worldIndex)` creates 3 additional questions using that world's types; they use a derived seed (`seed ^ (worldIndex + 1) * 0x9e3779b1`) so they are reproducible and not duplicates of the world's main set.

### 9.6 Session persistence

```js
const SESSION_KEY = 'intellia_gradients_v1';
// On mount: restore if < 24 h old; the seed is saved so the same 100 questions regenerate
localStorage.setItem(SESSION_KEY, JSON.stringify({
  seed: state.seed, phase: state.phase, storyPanel: state.storyPanel,
  tryItDone: state.tryItDone, simStationsComplete: state.simStationsComplete,
  stationBPerfect: state.stationBPerfect,
  currentWorld: state.currentWorld, currentQuestion: state.currentQuestion,
  worldScores: state.worldScores, bonusUnlocked: state.bonusUnlocked,
  xp: state.xp, streak: state.streak, maxStreak: state.maxStreak,
  badges: state.badges, signQuestionsCorrect: state.signQuestionsCorrect,
  phaseComplete: state.phaseComplete, settings: pickSettings(state),
  timestamp: Date.now(),
}));
```

Only the seed and progress are stored, not the questions themselves. Wrap all storage access in `try/catch` and degrade to in-memory state if storage is unavailable.

---

## 10. Gamification Implementation

### 10.1 XP, stars and unlock (`utils/scoring.js`)

```js
export function calcXP(attemptNumber, hintsUsed, streak) {
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  return base + (streak >= 5 ? 5 : 0);
}

export function calcStars(correct) {
  if (correct >= 10) return 3;
  if (correct >= 8)  return 2;
  if (correct >= 6)  return 1;   // unlock gate
  return 0;
}

export const canUnlockWorld = (score) => score !== null && score >= 6;
export const calcTotalStars = (scores) =>
  scores.reduce((s, v) => s + (v == null ? 0 : calcStars(v)), 0);
```

> The reference docs list two different unlock thresholds (PRD: ≥6/10; TRD: ≥5/10). This module uses **≥ 6/10 everywhere**, and the same constant is imported by the UI, the reducer and the tests.

### 10.2 Badge engine (`utils/badgeEngine.js`)

```js
export const BADGES = [
  { id:'trail_starter',  label:'🏅 Trail Starter',     condition:(s)=> s.phaseComplete.wonder && s.phaseComplete.story },
  { id:'slope_builder',  label:'🥈 Slope Builder',     condition:(s)=> s.simStationsComplete.every(Boolean) },
  { id:'gradient_champ', label:'🥇 Gradient Champion', condition:(s)=> s.worldScores.reduce((a,v)=>a+(v||0),0) >= 80 },
  { id:'perfect_peak',   label:'💎 Perfect Peak',      condition:(s)=> s.worldScores.some(v=>v===10) },
  { id:'streak_star',    label:'🔥 Streak Star',       condition:(s)=> s.maxStreak >= 10 },
  { id:'global_explorer',label:'🌍 Global Explorer',   condition:(s)=> Object.values(s.phaseComplete).every(Boolean) },
  { id:'sharp_eye',      label:'🎯 Sharp Eye',         condition:(s)=> s.simStationsComplete[1] && s.stationBPerfect },
  { id:'sign_navigator', label:'🧭 Sign Navigator',    condition:(s)=> s.signQuestionsCorrect >= 10 },
];
export const checkBadges = (s) =>
  BADGES.filter(b => !s.badges.includes(b.id) && b.condition(s)).map(b => b.id);
```

Questions tagged `'sign'` are those with negative, zero or undefined answers or sign-focused classification. Badge-unlock lines are static pre-generated phrases (one per badge).

---

## 11. Audio Pipeline (ElevenLabs — matching `audio_generation_pipeline.md`)

### 11.1 Voice configuration

- **Voice:** Alice, `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`
- **Local scripts key:** `VITE_ELEVENLABS_API_KEY` in `.env.local` (used only by `scripts/generate_audio.js`, which runs in Node and is never bundled)
- **Runtime key:** `ELEVENLABS_API_KEY` as a **server-side** environment variable on the proxy (not prefixed with `VITE_`, so Vite never bundles it)

### 11.2 Style settings

Identical to the pipeline file:

| Style | Stability | Similarity Boost | Style | Speaker Boost |
|---|---|---|---|---|
| `celebration` | 0.12 | 0.45 | 0.75 | ✅ |
| `encouragement` | 0.16 | 0.50 | 0.65 | ✅ |
| `question` | 0.20 | 0.55 | 0.55 | ✅ |
| `emphasis` | 0.16 | 0.50 | 0.60 | ✅ |
| `thinking` | 0.24 | 0.60 | 0.35 | ✅ |
| `statement` / `instruction` | 0.20 | 0.55 | 0.50 | ✅ |

### 11.3 Offline generation (`scripts/generate_audio.js`)

- Reads the `phrases` array (exact spoken text and style)
- Applies per-style voice settings
- Calls the ElevenLabs text-to-speech endpoint, saves `.mp3` files to `public/assets/audio/` with slugified names
- Writes `src/utils/audioMap.js` automatically
- Rate-limits to 500 ms between calls

```js
const phrases = [
  // Wonder
  { text: "Sarah rides a cable car in the Swiss Alps. It climbs three hundred metres while it travels nine hundred metres across.", style: 'thinking' },
  { text: "Is her ride steep or gentle? Let's discover how gradients measure steepness!", style: 'encouragement' },

  // Story panel 1
  { text: "Sarah, John, Mike, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, Priya, Fatima, and Diego are the Global Gradient Explorers Club.", style: 'statement' },
  { text: "A Mist of Mix-Ups has hidden the trail markers on the world's famous slopes. Only gradients can bring them back!", style: 'statement' },
  { text: "Some countries say slope and some say gradient. It is the very same idea!", style: 'emphasis' },

  // Story panel 2
  { text: "Sarah rides a cable car in Switzerland. It climbs three metres up for every four metres across.", style: 'statement' },
  { text: "The climb is called the rise. The distance across is called the run.", style: 'emphasis' },
  { text: "Gradient equals rise divided by run. So the gradient is three quarters!", style: 'emphasis' },

  // Story panels 3–6 … (see PRD §10.3 for the full strings)

  // Stations
  { text: "Drag points A and B on the grid. Watch the rise and the run change!", style: 'instruction' },
  { text: "Can you build a line with a gradient of two?", style: 'question' },
  { text: "Fill in the formula one step at a time. Rise goes on top, run goes on the bottom!", style: 'instruction' },

  // Fixed-stem questions (graph-based)
  { text: "Look at the line on the graph. What is its gradient?", style: 'question' },
  { text: "Look at the line on the graph. Is its gradient positive, negative, zero, or undefined?", style: 'question' },
  { text: "Look at the two lines on the graph. Which line is steeper?", style: 'question' },

  // Feedback
  { text: "Amazing! You found the gradient perfectly! You are a Gradient Explorer superstar!", style: 'celebration' },
  { text: "Not quite! Let's look at the rise and the run again.", style: 'encouragement' },
  { text: "Watch the steps climb! Can you count the rise and the run with me?", style: 'thinking' },

  // Badges (one per badge), reflect, world micro-stories …
];
```

> The full `phrases` array is assembled by importing the same string constants used by `narration.js` and `storyContent.js`, so the script and the UI can never drift apart.

### 11.4 Math-to-speech (`utils/toSpoken.js`)

All spoken strings for number-bearing text go through one function.

| On screen | Spoken |
|---|---|
| `−3` | "negative three" |
| `3/4` | "three quarters"; other denominators: "five over six" |
| `(2, 3)` | "two, three" (preceded by the word "point" in the sentence) |
| `y = −3x + 5` | "y equals negative three x plus five" |
| `3x + 2y = 12` | "three x plus two y equals twelve" |
| `1.2 m` | "one point two metres" |
| `12%` | "twelve percent" |
| `1 in 12` | "one in twelve" |
| `m₁ · m₂ = −1` | "m one times m two equals negative one" |

```js
export function toSpoken(text) {
  return text
    .replace(/\u2212|-(?=\d)/g, 'negative ')
    .replace(/(\d+)\/(\d+)/g, (_, n, d) => fractionWords(+n, +d))
    .replace(/(\d+)/g, (m) => numberToWords(+m))
    …;
}
```

The `{{gradient}}` token is resolved to "gradient" or "slope" **before** `toSpoken()`. Static phrases for both terms are pre-generated where the word appears in the static script (a small, bounded set).

### 11.5 Frontend audio engine (`utils/audio.js`)

Implements the pipeline-file API: segment helpers (`say`, `ask`, `cheer`, `emphasize`, `think`, `celebrate`, `instruct`), `getAudioUrl(text, style)`, `narrate(segments, isPhase)`, `stopNarration()`, and eager preload of segment `i+1`.

```js
export async function getAudioUrl(text, style = 'statement') {
  // 1. Static map (fastest)
  if (audioMap[text]) return audioMap[text];

  // 2. Memory cache, then IndexedDB cache
  const key = await hashKey(`${text}::${style}`);
  if (memCache.has(key)) return memCache.get(key);
  const stored = await idbGet(key);
  if (stored) { const url = URL.createObjectURL(stored); memCache.set(key, url); return url; }

  // 3. Dynamic request via the server-side proxy (never directly from the browser)
  if (!navigator.onLine || text.length > 260) return null;
  try {
    const res = await fetch('/api/elevenlabs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, style }),
    });
    if (!res.ok) return null;
    const blob = await res.blob();
    idbSet(key, blob);
    const url = URL.createObjectURL(blob);
    memCache.set(key, url);
    return url;
  } catch { return null; }          // silent: audio never blocks the lesson
}
```

- **Queue management:** `narrate()` uses a `currentQueue` symbol so a new narration cancels the old one; `stopNarration()` halts playback immediately and is called in every phase component's effect cleanup.
- **Preloading:** while segment `i` plays, `getAudioUrl` is called for segment `i+1`.
- **Autoplay policy:** the first audio starts after the user's first click (the Intro "Start" button), satisfying browser autoplay rules.

### 11.6 Serverless proxy (`api/elevenlabs.js`)

```js
// Vercel serverless function
import { STYLE_SETTINGS } from '../src/utils/styleSettings.js';
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { text, style = 'statement' } = req.body ?? {};
  if (typeof text !== 'string' || !text.trim() || text.length > 260) return res.status(400).end();
  // origin allow-list + per-IP rate limit (e.g. 30 req / minute) go here

  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text, model_id: 'eleven_multilingual_v2',
      voice_settings: STYLE_SETTINGS[style] ?? STYLE_SETTINGS.statement,
    }),
  });
  if (!r.ok) return res.status(502).end();
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.send(Buffer.from(await r.arrayBuffer()));
}
```

> The reference pipeline allows calling ElevenLabs directly from the browser with a `VITE_` key. That exposes the key to anyone who opens dev tools. For a public lesson with dynamic audio, the proxy above is strongly recommended. Keep the `VITE_` key for the offline script only.

### 11.7 Which questions use which path

| `audioKind` | Behaviour |
|---|---|
| `static` | Stem is in `audioMap`; plays instantly through the speaker button or autoplay |
| `dynamic` | Speaker button requests audio on first tap; shows a short loading ring; falls back silently if it fails |

### 11.8 Parity checking (`scripts/check_audio_parity.js`)

1. Collects every narrated string from `narration.js`, `storyContent.js`, `worlds.js` micro-stories and the fixed question stems
2. Runs each through the term resolver (`gradient` and `slope`) and `toSpoken()` where applicable
3. Fails CI if any string is missing from `generate_audio.js`'s `phrases` or from `audioMap.js`
4. Fails CI if any `phrases` entry has no matching usage (orphan)

### 11.9 Content policy

Titles, headings, world names and section labels are **never** narrated. Only paragraph text, instructions, feedback and question text are voiced.

### 11.10 Workflow for adding or changing narration

1. Add the exact text and style to `phrases` in `scripts/generate_audio.js`
2. Run `node scripts/generate_audio.js`
3. Optionally run `node scripts/clean_audio.js`
4. Add the same string to `narration.js` using the matching helper (`say`, `ask`, …)
5. In the component: `useEffect(() => { if (audioEnabled) narrate(xNarration(), true); return () => stopNarration(); }, [audioEnabled]);`

---

## 12. Terminology, Units and Localisation

### 12.1 Settings

| Setting | Values | Effect |
|---|---|---|
| `term` | `gradient` (default) / `slope` | Replaces `{{gradient}}` everywhere, including narration |
| `units` | `metric` / `imperial` | Switches metres ⇄ feet in word problems (values are generated in the chosen unit; gradients are unit-free) |
| `audioEnabled` | boolean | Master audio switch |
| `autoPlayQuestions` | boolean | Auto-voices questions when audio is available |
| `reducedMotion` | boolean | Disables sweeping animations (also follows the OS setting) |

### 12.2 Term resolver (`utils/terms.js`)

```js
const TERMS = {
  gradient: { gradient: 'gradient', Gradient: 'Gradient', gradients: 'gradients' },
  slope:    { gradient: 'slope',    Gradient: 'Slope',    gradients: 'slopes'    },
};
export const resolveTerms = (text, term) =>
  text.replace(/\{\{(gradient|Gradient|gradients)\}\}/g, (_, k) => TERMS[term][k]);
```

### 12.3 Future languages

All user-visible strings live in `data/` and `utils/narration.js`; no strings are hard-coded inside JSX except trivial labels. This keeps a later move to an i18n library straightforward, and `eleven_multilingual_v2` already supports additional languages.

---

## 13. CSS Animation Keyframes (match the reference style)

```css
@keyframes bounceIn   { 0%{transform:scale(.3);opacity:0} 50%{transform:scale(1.05);opacity:1} 70%{transform:scale(.9)} 100%{transform:scale(1)} }
@keyframes shake      { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
@keyframes floatUp    { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-60px) scale(1.5);opacity:0} }
@keyframes pulseGlow  { 0%,100%{box-shadow:0 0 0 0 rgba(74,144,217,.4)} 50%{box-shadow:0 0 0 12px rgba(74,144,217,0)} }
@keyframes celebrate  { 0%{transform:rotate(-5deg) scale(1)} 25%{transform:rotate(5deg) scale(1.1)} 50%{transform:rotate(-3deg) scale(1.05)} 75%{transform:rotate(3deg) scale(1.1)} 100%{transform:rotate(0) scale(1)} }
@keyframes slideInUp  { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }
@keyframes drawLine   { from{stroke-dashoffset:var(--len)} to{stroke-dashoffset:0} }
@keyframes stairStep  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
@keyframes mistClear  { from{opacity:.85} to{opacity:0} }          /* world completion: mist lifts */
@keyframes needleSweep{ from{transform:rotate(var(--from))} to{transform:rotate(var(--to))} }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
/* Stagger: each staircase step gets animation-delay: calc(var(--i) * 120ms) */
```

> Colours, spacing and easing values must be copied from the reference repo's `App.css` and Tailwind config rather than re-invented. The `rgba(74,144,217,…)` blue above is the value used in the reference TRD and should be confirmed against the repo.

---

## 14. Component Prop Contracts

| Component | Props | Returns |
|---|---|---|
| `GradientGrid` | `{ xRange?, yRange?, size?, points?, lines?, staircase?, hideAxisLabels?, onPointMove?, ariaDescription }` | Interactive SVG plane |
| `RiseRunTriangle` | `{ from, to, scale, showLabels?, animate? }` | SVG group (staircase with labels) |
| `SlopeMeter` | `{ m: Fraction \| null, showReadout? }` | Dial + readout + sign chip |
| `SceneCard` | `{ scene, rise, run, unit, claim?, selected?, onSelect? }` | Illustrated card with overlay triangle |
| `FractionPad` | `{ value, onChange, onSubmit, allowFraction?, allowUndefined? }` | Large tap-friendly keypad (min 44×44 px) |
| `Mascot` | `{ mood: 'idle'\|'curious'\|'happy'\|'thinking'\|'celebrating'\|'encouraging' }` | SVG + mood animation |
| `QuestionRenderer` | `{ question, onAnswer, attempt, hintLevel }` | Type-specific card |
| `FeedbackOverlay` | `{ isCorrect, explanation?, xpEarned, nudge?, onContinue }` | Animated modal |
| `WorldMap` | `{ worldScores, currentWorld, onSelectWorld }` | Horizontally scrollable world list with stars, locks and mist overlay on locked worlds |
| `BadgePanel` | `{ badges, newBadgeId? }` | Badge grid with unlock toast |
| `SpeakerButton` | `{ text, style, kind }` | 🔊 control with loading and error states |
| `ConceptReminder` | `{ panelIndex, onClose }` | One-screen recap sheet |

---

## 15. Accessibility Implementation

- Every `GradientGrid` receives an `ariaDescription` generated from its data, e.g. *"A line passing through (−2, −1) and (4, 3). It rises from left to right."* Hidden labels in "find the gradient" questions still describe the shape, not the answer.
- Draggable points are focusable (`role="slider"`-style semantics with `aria-valuetext="x 2, y 4"`); arrow keys move them.
- `FractionPad` is operable by keyboard (digits, `/`, `-`, Backspace, Enter).
- Colour is never the only signal: sign chips carry arrows and words.
- Focus is moved to the question heading after each transition and to the feedback overlay's primary button when it opens.
- Live regions announce feedback (`aria-live="polite"`) and XP changes.
- Minimum touch target: 44×44 px; AA contrast for all text and for the line against the grid.

---

## 16. Performance, Browsers & Devices

### 16.1 Performance targets

| Metric | Target |
|---|---|
| Initial load | < 2 s (Vite production build, broadband) |
| First meaningful paint | < 1 s |
| Animation frame rate | 60 fps; dragging a point re-renders only the grid |
| Memory | < 80 MB |
| Bundle (gzipped) | < 600 KB JS + CSS (audio and images excluded) |
| Lighthouse Performance / Accessibility | ≥ 90 / ≥ 90 |
| Question generation (all 100) | < 50 ms |
| Static audio TTFB | ~0 ms (cached static assets) |
| Dynamic audio TTFB | < 2 s (API latency) |

**Techniques:** code-split each phase with `React.lazy`; preload only the next phase's audio; `memo` on `GradientGrid` with stable props; SVG landmark art as inline symbols or optimised files; throttle pointer-move to animation frames.

### 16.2 Browser support

| Environment | Support |
|---|---|
| Chrome 110+ (desktop, Android) | Full |
| Safari 15+ (macOS, iPadOS, iOS) | Full |
| Firefox 110+ | Full |
| Edge 110+ | Full |
| IE 11 | Not supported |

Primary test devices: desktop Chrome (1280 px+), iPad Safari (768 px, touch), and a mid-range Android phone (375 px).

---

## 17. Quality & Testing Standards

**Unit tests (Vitest)**

- `fraction.js`: reduction, sign normalisation, zero numerator, arithmetic identities, `cmp`
- `gradientMath.js`: gradient for all quadrant combinations; vertical → `null`; horizontal → `0`; perpendicular of every special case; `yIntercept` and `yAt` round-trips
- `answerParser.js`: `"3/4"`, `"−3/4"`, `"-3 / 4"`, `"0.75"`, `".5"`, `"6/8"` (equivalent but unsimplified), invalid inputs
- `toSpoken.js`: table in §11.4 as test fixtures

**Property-based and statistical tests**

- **Validity:** for 1,000 random seeds, `generateSession()` returns 100 questions; every point is within its range; no `Infinity` or `NaN`; every `answer` recomputed independently from `params` matches the stored `answer`
- **Uniqueness:** zero duplicate `signature` values per session
- **Distribution:** each type appears exactly 10 times and each world matches the §8.3 matrix
- **Randomisation integrity:** across 1,000 seeds, no two sessions share an identical ordered sequence of signatures
- **Distractors:** every MCQ has exactly one correct option, no duplicate option values, and no distractor equal to the answer
- **Position balance:** correct-option position is within ±8% of uniform over 1,000 sessions

**Component tests (React Testing Library)**

- Learn-first gate: `SET_PHASE('play')` is rejected until Story and all stations complete
- Station A mission predicates fire only after the 600 ms hold
- Station B sets `stationBPerfect = false` on any miss
- Unsimplified-but-equal answers are accepted with a nudge, and XP is unchanged
- Term toggle replaces every `{{gradient}}` token on screen

**Accessibility**

- Automated axe checks on all 6 phases and all question types; manual keyboard-only pass; screen-reader pass of one graph question per type

**Audio**

- `check_audio_parity.js` runs in CI (see §11.8)
- Manual: verify spoken output of 20 random dynamic questions for correct number pronunciation

**Visual regression**

- Snapshots of `GradientGrid`, `RiseRunTriangle`, `SlopeMeter` and each `SceneCard` at 3 sizes

---

## 18. Build, Deployment & Embedding

### 18.1 Build

```bash
npm install
npm run dev          # local development
npm run test         # Vitest
npm run audio        # node scripts/generate_audio.js
npm run audio:clean  # node scripts/clean_audio.js
npm run audio:check  # node scripts/check_audio_parity.js
npm run build        # Vite production build
```

### 18.2 Hosting

- Deploy to **Vercel** (as the reference), with `api/elevenlabs.js` as a serverless function.
- Environment variables (Vercel): `ELEVENLABS_API_KEY` (server only). Local `.env.local`: `VITE_ELEVENLABS_API_KEY` (generation script only; git-ignored).
- Set Vite `base` to match the final path if the lesson is served under a sub-path.

### 18.3 Embedding in the Intellia course page

Two supported options; confirm which the Intellia team uses:

1. **Direct link / new tab** to the Vercel deployment from the lesson card
2. **Iframe embed** at `/courses/grade-8-math/lessons/gradients/`. In this case set the response header `Content-Security-Policy: frame-ancestors 'self' https://intelliasg.com https://*.intelliasg.com` (and avoid `X-Frame-Options: DENY`), and allow microphone/autoplay only if later features need them.

### 18.4 CI checks (pull requests)

`lint` → `test` → `audio:check` → `build` → size-budget check (< 600 KB gzipped JS+CSS).

---

## 19. Security & Privacy

- No accounts, no personal data collected; progress lives in the browser only
- API key never ships in the client bundle (proxy only)
- Proxy validates input length and origin and rate-limits by IP; responses are immutable-cached
- Names in stories and questions are fictional; no real student data appears
- Third-party calls: ElevenLabs (via proxy) only; no analytics in v1 unless Intellia supplies an approved script

---

## 20. Delivery Milestones

| Milestone | Deliverables |
|---|---|
| M1 — Foundations | Repo scaffold matching the reference, Tailwind theme copied from the reference, math engine + tests, RNG |
| M2 — Core visuals | `GradientGrid`, `RiseRunTriangle`, `SlopeMeter`, `SceneCard`, Grady mascot states |
| M3 — Learn phases | Wonder, Story (6 panels + Try-its), concept reminders, learn-first gate |
| M4 — Simulation | Stations A, B, C with rounds, missions, feedback |
| M5 — Question engine | 10 generators, distractors, session assembly, uniqueness and distribution tests |
| M6 — Play + gamification | World map, XP, stars, streaks, badges, bonus challenge, Reflect phase |
| M7 — Audio | Static phrase generation, proxy, dynamic caching, parity checker |
| M8 — Hardening | Accessibility pass, performance budget, cross-browser, upload to Intellia |

---

**Document Version:** 1.0 | October 2026
**Product:** Intellia — Grade 8 Math, Gradients
**Reference UI:** <https://grade5-time-intervals.vercel.app/>
**Reference Repo:** <https://github.com/p1pachare-cloud/Grade5-Time-Intervals>
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`), per `audio_generation_pipeline.md`
