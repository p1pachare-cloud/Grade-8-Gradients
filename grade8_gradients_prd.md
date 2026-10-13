# Product Requirements Document (PRD)

## Gradients — Steepness, Rise & Run, and Rate of Change | Grade 8 Math

### Intellia SG | Global Grade 8 Mathematics Curriculum

---

## 1. Executive Summary

This document defines the product requirements for **"Global Gradient Explorers — Gradients"**, an interactive, gamified, simulation-based lesson module for **Grade 8 students (age 13–14)**. The module teaches the concept of the **gradient (slope) of a straight line**: what it measures, how to calculate it from a graph, from two points, from a table and from a real-world situation, how its sign and size describe a line, and how it connects to `y = mx + c`, parallel lines and perpendicular lines.

The module is a standalone **React (Vite + JSX)** web application. It **strictly mirrors the structure, visual language and UX patterns** of the reference product:

- Reference site: **<https://grade5-time-intervals.vercel.app/>**
- Reference repository: **<https://github.com/p1pachare-cloud/Grade5-Time-Intervals>**

The module is uploaded to the Intellia course catalogue alongside the Grade 3 course page (`https://intelliasg.com/courses/grade-3-math`), restructured for Grade 8:

```
https://intelliasg.com/courses/grade-8-math/lessons/gradients/
```

> **Assumption to confirm:** the final lesson URL slug follows the same pattern as the Grade 3 course page. The course page could not be opened automatically, so confirm the exact path with the Intellia team before upload.

Audio narration follows the **ElevenLabs pipeline** in `audio_generation_pipeline.md` (Voice **Alice**, Voice ID `Xb7hH8MSUJpSbSDYk0k2`, Model `eleven_multilingual_v2`), using the same hybrid pre-generation plus dynamic-fallback design, the same per-style voice-settings table, and the same rule that **only paragraph text and questions are narrated, never titles or headings**.

The module follows Intellia's **6-phase learner journey**: `INTRO → WONDER → STORY → SIMULATE → PLAY → REFLECT`, with a **learn-first** rule: no practice question is shown until the student has completed the story-based concept lessons and all three simulation stations.

### What is different from the Grade 5 reference

| Area | Grade 5 Time Intervals (reference) | Grade 8 Gradients (this module) |
|---|---|---|
| Core visual | Analog clock + timeline bar | Coordinate grid + rise/run staircase + slope meter |
| Questions | 100 fixed questions, shuffled | **Procedurally generated: every question is random**, every session (see §8) |
| Narrative | Time Explorers Club | Gradient Explorers Club climbing global landmarks |
| Mascot | Chrono (clock-robot) | **Grady** (a mountain goat) |
| Math checks | Minute arithmetic | Exact fraction arithmetic (no floating-point errors) |

---

## 2. Product Vision & Goals

**Vision:** Make gradient feel like something students can *see, feel and steer*, not a formula to memorise. A Grade 8 learner should leave able to look at any line, ramp, road or table of values and say how steep it is, which way it goes, and why.

**Goals**

| Goal | Metric |
|---|---|
| Learning completion | ≥85% of students complete all 6 phases |
| Practice engagement | ≥90% attempt at least 20 practice questions |
| Score achievement | Average Play score ≥70% on first attempt |
| Session duration | Average engagement ≥20 minutes per session |
| Curriculum alignment | 100% of Learning Objectives (LO1–LO10) covered by at least one simulation round and 10 generated questions |
| Phase progression | ≥80% reach Play phase in a single session |
| Simulation interaction | ≥95% attempt all 3 simulation stations |
| Randomisation integrity | 0 duplicate questions within a session; no two sessions share the same 100-question sequence |
| Misconception reduction | ≥30% drop in "rise/run flipped" and "sign error" mistakes between World 1 and World 10 |

---

## 3. Target Users

**Primary: Grade 8 students (age 13–14)**

- Comfortable with the coordinate plane, integers and fractions; ready for ratio-based reasoning
- Learn best by manipulating a line first and naming the formula afterwards
- Motivated by progression maps, streaks, badges and a story with stakes
- Global classrooms: some know it as **gradient** (UK, Singapore, Australia, India, much of Africa), others as **slope** (USA, Canada). The module teaches both words (see §4.5).

**Secondary: Parents and teachers**

- Assign as classwork, homework or revision
- Expect alignment to recognised global standards (§4)
- Monitor completion through the phase indicators and end-of-lesson summary

---

## 4. Curriculum Alignment — Global Grade 8 Mathematics

**Topic:** Gradient (slope) of a straight line
**Programme:** Intellia Grade 8 Math — Algebra & Coordinate Geometry
**Lesson URL:** `https://intelliasg.com/courses/grade-8-math/lessons/gradients/`

### 4.1 Source frameworks (only gradient-related strands used)

- **U.S. Common Core, Grade 8:** 8.EE.B.5 (graph proportional relationships, interpret unit rate as slope), 8.EE.B.6 (similar triangles explain slope; derive `y = mx` and `y = mx + b`), 8.F.B.4 (rate of change and initial value of a linear function)
- **Singapore MOE, Lower Secondary:** gradient of a straight line, linear graphs, gradient as rate of change
- **England National Curriculum, KS3/KS4 bridge:** gradient as rate of change; `y = mx + c`; parallel and perpendicular gradients
- **Australian Curriculum, Years 8–9:** linear relationships, gradient and intercepts, parallel and perpendicular lines
- **India (CBSE/NCERT), Classes 8–10:** linear equations and graphs in Class 8–9, with slope formally treated in Class 10 coordinate geometry (used as extension, hard-level content)
- **IB MYP Year 3:** rate of change and linear functions in context

> The framework codes above are listed for orientation. Before publishing, the curriculum owner should verify them against the currently published documents for each country.

### 4.2 Learning Objectives

| LO | Description |
|---|---|
| LO1 | Explain gradient as a measure of steepness and as a rate of change (rise ÷ run) |
| LO2 | Calculate the gradient of a line from a graph using rise and run on grid points |
| LO3 | Calculate the gradient from two coordinates: `m = (y₂ − y₁) ÷ (x₂ − x₁)` |
| LO4 | Classify a gradient as positive, negative, zero or undefined, and link each to the line's direction |
| LO5 | Compare the steepness of two or more lines (using the size of the gradient, ignoring sign) |
| LO6 | Find a gradient from a table of values, and interpret it as a rate of change in context |
| LO7 | Solve real-world gradient problems: ramps, roofs, roads (including "1 in n" and percentage gradients) |
| LO8 | Find a missing coordinate given a gradient and a point |
| LO9 | Read gradient and y-intercept from `y = mx + c`; rearrange simple forms such as `ax + by = c` |
| LO10 | Use gradient relationships: parallel lines (equal gradients) and perpendicular lines (product = −1) |

### 4.3 Concrete → Pictorial → Abstract (CPA) progression

- **Concrete:** drag points on a live grid and watch rise, run and gradient update; guide a hiker up a slope
- **Pictorial:** compare lines, ramps and staircase triangles side by side; read gradients off pictures
- **Abstract:** build and fill in the formula `m = (y₂ − y₁) ÷ (x₂ − x₁)` with signed numbers and fractions

### 4.4 Number ranges by difficulty

| Level | Coordinates | Gradient types | Extras |
|---|---|---|---|
| Easy | −6 to 6 | Whole numbers and unit fractions (e.g. 2, ½), positive first | Graph-based, rise/run counted on grid |
| Medium | −10 to 10 | Any simple fraction (denominator ≤ 6), negatives, zero | Two-point formula, tables, word problems |
| Hard | −12 to 12 | Negative fractions, undefined (vertical lines), percentages | Missing coordinates, `y = mx + c`, parallel/perpendicular, multi-step |

### 4.5 Vocabulary focus

"gradient", "slope", "rise", "run", "steepness", "rate of change", "positive", "negative", "zero gradient", "undefined gradient", "horizontal", "vertical", "y-intercept", "parallel", "perpendicular", "negative reciprocal", "simplify", "ratio".

**Global terminology toggle (Settings):** *Gradient* ⇄ *Slope*. The chosen word replaces the other everywhere on screen, and the learner sees both words once in the Story phase ("Some countries say slope, some say gradient: it is the same idea!"). Units can be toggled between **metres** and **feet** in word problems; the gradient value is unit-free either way.

---

## 5. The 6-Phase Learner Journey (Intellia Model)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ INTRO SCREEN → Progress Map (6-step visual tracker, top bar)               │
│ "Hello, Explorer! Ready to climb the world of Gradients? ⛰️📈"             │
│ Lesson badge shown (locked). 6 glowing phase dots visible.                 │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1 — WONDER (≈1–2 min)                                                │
│ Hook: "Sarah rides a cable car in the Swiss Alps. It climbs 300 metres     │
│ while it travels 900 metres across. Is her ride steep or gentle?"          │
│ Visual: animated cable car gliding up a mountain, a slope meter needle     │
│ wobbling between "Gentle" and "Steep"                                      │
│ Mascot Grady the goat looks up, curious: "Can we measure steepness?"       │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2 — STORY + LEARN (≈4–5 min) — "The Gradient Trail Expedition"       │
│ 6 illustrated story panels. Each panel TEACHES one idea and ends with a    │
│ "Try it!" micro-interaction (no scoring). See §6 and §10.                  │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3 — SIMULATE (≈6–8 min) — 3 stations, all must be completed          │
│ A: Slope Climber (Concrete)      B: Steepest Path (Pictorial)              │
│ C: Gradient Formula Builder (Abstract)                                     │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4 — PLAY (≈10–15 min) — IntelliPlay™                                 │
│ 100 randomly generated questions across 10 worlds (global landmarks)       │
│ 10 questions per world; world unlocks at ≥6/10 correct                     │
│ Stars (1–3), XP, badges and streak fire active                             │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 5 — REFLECT (≈1–2 min)                                               │
│ Journal prompt + mascot chat; lesson-complete badge; XP/badge summary;     │
│ "Share with your teacher" export                                           │
└────────────────────────────────────────────────────────────────────────────┘
```

### 5.1 Learn-first gate rules

1. The **Play** phase is locked until Story (all 6 panels) and all 3 Simulation stations are complete.
2. Every Story panel must be viewed in order; "Try it!" interactions are required to continue but never scored.
3. Students can **re-open any concept card** from the Play phase through a "Remind me" button (opens a one-screen summary with the panel's diagram; costs no XP).

---

## 6. Phase 2 — Story & Concept Lessons (Learning First)

Each panel pairs a short story beat with one concept, a live diagram, and a "Try it!" micro-task.

| Panel | Story beat | Concept taught | Try it! (not scored) |
|---|---|---|---|
| 1 | The Gradient Explorers Club forms; mission is set | Gradient measures steepness; "gradient" and "slope" mean the same | Drag a hiker along three paths; pick which is steepest by feel |
| 2 | Sarah's cable car in Switzerland | **Rise and run**; gradient = rise ÷ run | Move a staircase triangle along a line; see rise and run values stay in the same ratio |
| 3 | Yuki skis down a slope in Hokkaido | **Positive vs negative**: up-hill left-to-right is positive, down-hill is negative | Flip a line with a slider; watch the sign and colour change |
| 4 | Aisha walks the flat Nile promenade, then faces a wall | **Zero** (horizontal) and **undefined** (vertical) gradient | Rotate a line to horizontal and vertical; the meter shows 0 and "undefined" |
| 5 | Priya's drone flies between two marker points | **Two-point formula** `(y₂ − y₁) ÷ (x₂ − x₁)` | Drag points A and B; watch the formula fill in step by step |
| 6 | Carlos and Fatima compare a ramp and a road | Real-world gradients ("1 in 12", percentages), **parallel** and **perpendicular** lines | Drag a second line until it is parallel; then until it is perpendicular |

**Key vocabulary** is highlighted the first time it appears and defined in a tap-to-reveal tooltip. A "Misconception Alert" speech bubble from Grady appears on panels 2, 3 and 5:

- Panel 2: "Rise goes on top! Run goes on the bottom."
- Panel 3: "Down-hill to the right means a negative gradient."
- Panel 5: "Subtract in the same order on top and bottom."

---

## 7. Phase 3 — Simulation Design (Detailed)

### 7.1 Station A — "Slope Climber" (Concrete)

**Visual:** A large coordinate grid (−10 to 10) with a hiker standing on a line. A **slope meter** (a semicircular dial with a needle) and a live readout: `rise = ?  run = ?  gradient = ?`.

**Interaction:**

- Drag points **A** and **B** anywhere on the grid (snaps to whole numbers). A staircase triangle draws the run (horizontal) and rise (vertical) between them.
- Rise and run labels update live; the gradient appears as a simplified fraction and a decimal.
- Mission cards set targets, for example "Make a line with gradient 2", "Make a line steeper than 1 but still positive", "Make a negative gradient". The mission is complete when the live gradient matches the target.
- Tap-tap fallback: select a point, then tap the grid cell to move it (no dragging required).

**Feedback:** correct mission, so the hiker walks up the line and Grady cheers; wrong submit, so a gentle shake and a hint highlighting the rise/run triangle.

**4 randomised missions per session**, drawn from a pool of 12 (difficulty ramps across the four rounds):

- Round 1: Build a gradient of a given positive whole number
- Round 2: Build a given unit fraction or a "steeper than / gentler than" target
- Round 3: Build a given negative gradient
- Round 4: Build a horizontal line, then a vertical line (zero and undefined)

### 7.2 Station B — "Steepest Path" (Pictorial)

**Visual:** A 2×2 grid of cards. Each card shows a mini scene (ramp, roof, ski slope or trail) with a drawn line and a printed claim, e.g. "Gradient: 3/4".

**Interaction:**

- **Mode 1 (Match):** tap every card whose printed gradient is correct.
- **Mode 2 (Rank):** drag four lines into order from gentlest to steepest.
- **Mode 3 (Spot the sign):** tap the cards whose sign is wrong.

**Distractor design (misconception-driven):**

- Rise and run swapped (e.g. 4/3 instead of 3/4)
- Sign dropped on a downhill line
- Unsimplified or miscounted rise or run (off by 1)
- Steepness confused with height (a long, gentle ramp that ends higher than a short, steep one)

**3 rounds** with increasing complexity: whole-number gradients, then fractions, then mixed positive and negative.

### 7.3 Station C — "Gradient Formula Builder" (Abstract)

**Visual:**

```
Point A (x₁, y₁) = ( __ , __ )    Point B (x₂, y₂) = ( __ , __ )

        y₂ − y₁       __ − __
  m  =  ───────   =   ───────   =   ___
        x₂ − x₁       __ − __
```

**Interaction:**

- The formula is filled in **step by step**: first the numerator, then the denominator, then the final simplified gradient.
- Input uses a large **fraction pad** (digits, minus sign, fraction slash, backspace); minimum 44×44 px targets.
- A "Show me the graph" button reveals the grid with the two points and the staircase as a scaffold.
- Equivalent answers (e.g. 6/4 for 3/2) are accepted with a friendly "Can you simplify it?" nudge; no penalty.

**Variants (rotated across 3 rounds):**

- Round 1: Both points given, find `m` (positive, whole-number answer)
- Round 2: Both points given, find `m` (negative or fractional answer)
- Round 3: One coordinate missing, so find it from a given gradient

---

## 8. Phase 4 — Question System (100 Random Questions)

### 8.1 Every question is random

Unlike a fixed bank, **every question is generated from a template with random values**, so no two students (and no two sessions) see the same set. Randomness covers:

- **Numbers:** points, rises, runs, intercepts, table values
- **Scenarios:** landmarks, objects (ramp, roof, cable car, trail, skate park), character names, units
- **Presentation:** which graph orientation, which answer position, which distractor set
- **Question order within each world**

Guard rails keep random questions *fair*: no duplicates in a session, no accidental divide-by-zero (except deliberate "undefined" items), coordinates always stay on the visible grid, and each world's difficulty profile is respected (§8.4). The technical design is in the TRD (§6 and §9).

### 8.2 Question types (10 types × 10 questions = 100)

| Type | Description | Example (random values shown) |
|---|---|---|
| Q1 | Read the gradient from a graph (count rise and run) | "Look at the line on the graph. What is its gradient?" |
| Q2 | Gradient from two points | "Find the gradient of the line through (2, 3) and (6, 11)." |
| Q3 | Classify the gradient (positive, negative, zero, undefined) | "Line through (−3, 4) and (−3, 9). What type of gradient is this?" |
| Q4 | Compare steepness | "Line A has gradient −3 and line B has gradient 2. Which is steeper?" |
| Q5 | Find the missing coordinate | "A line with gradient 3 passes through (1, 2) and (4, k). Find k." |
| Q6 | Real-world word problem | "Diego's skate ramp rises 1.2 m over a horizontal run of 12 m. What is its gradient?" |
| Q7 | Table of values → gradient / rate of change | "x: 0, 2, 4, 6 and y: 5, 11, 17, 23. What is the gradient?" |
| Q8 | True or False | "A line that falls from left to right has a positive gradient." |
| Q9 | `y = mx + c` skills | "State the gradient of `y = −3x + 5`." / "Rearrange `3x + 2y = 12` and find the gradient." |
| Q10 | Parallel and perpendicular lines | "A line has gradient 2/3. What is the gradient of a line perpendicular to it?" |

> Note on Q4: steepness compares the **size** of the gradient (magnitude). −3 is steeper than 2 because |−3| > |2|. This is a known trap and is built into the distractors.

### 8.3 Distribution by world (questions per type)

| World | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Total |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 4 | – | 3 | 1 | – | – | – | 2 | – | – | 10 |
| 2 | 3 | 3 | 1 | 2 | – | – | – | 1 | – | – | 10 |
| 3 | 2 | 4 | 2 | 1 | – | – | – | 1 | – | – | 10 |
| 4 | 1 | 2 | 2 | 2 | – | 3 | – | – | – | – | 10 |
| 5 | – | 1 | 2 | 2 | 2 | 2 | – | 1 | – | – | 10 |
| 6 | – | – | – | 2 | 2 | 2 | 3 | 1 | – | – | 10 |
| 7 | – | – | – | – | 2 | 2 | 4 | 1 | 1 | – | 10 |
| 8 | – | – | – | – | 2 | 1 | 2 | 1 | 3 | 1 | 10 |
| 9 | – | – | – | – | 1 | – | 1 | 1 | 3 | 4 | 10 |
| 10 | – | – | – | – | 1 | – | – | 1 | 3 | 5 | 10 |
| **Total** | **10** | **10** | **10** | **10** | **10** | **10** | **10** | **10** | **10** | **10** | **100** |

### 8.4 World map — global landmarks (IntelliPlay™ progression)

| # | World | Gradient focus | Difficulty |
|---|---|---|---|
| 1 | **Swiss Alps Cable Car** | Read gradient from graphs; positive vs negative | Easy |
| 2 | **Sydney Harbour Bridge Climb** | Rise/run fractions; two points (first steps) | Easy |
| 3 | **Giza Pyramid Ramp** | Two-point formula with positive results | Easy → Medium |
| 4 | **Rio Sugarloaf Descent** | Negative gradients; first real-world problems | Medium |
| 5 | **Reykjavik Ice Slide** | Zero and undefined; missing coordinates (intro) | Medium |
| 6 | **Mumbai Flyover** | Comparing steepness; tables of values | Medium |
| 7 | **Paris Montmartre Funicular** | Rate of change in context; `y = mx + c` basics | Medium → Hard |
| 8 | **San Francisco Steep Streets** | Percentage and "1 in n" gradients; rearranging | Hard |
| 9 | **London Tower Bridge** | Parallel and perpendicular lines | Hard |
| 10 | **Kilimanjaro Summit** | Mixed multi-step problems, all types | Hardest |

**Unlock gate:** ≥ 6/10 correct (1 star minimum) to enter the next world.
**Bonus Challenge:** 3 stars in a world unlocks 3 extra random questions from that world's types (extra XP; no effect on world score).

### 8.5 Context pools

**Names (global set):** John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, Priya, Fatima, Diego, Chloe, Ravi, Amara, Hiro, Olivia, Mateo, Zara

**Cities and landmarks:** Zermatt, Sydney, Giza, Rio de Janeiro, Reykjavik, Mumbai, Paris, San Francisco, London, Kilimanjaro, Tokyo, Cape Town, Toronto, Dubai

**Objects:** cable car, ramp, roof, ski slope, staircase, hiking trail, skate park, wheelchair ramp, funicular, road

### 8.6 Notation and language rules

- Gradient is written as an integer, a fraction `a/b` (displayed with a true minus sign `−`), or a decimal where the context calls for it
- Answers on the graph use grid points only; "rise" and "run" are always labelled with arrows
- Coordinates are written `(x, y)`; equations in the form `y = mx + c`
- Percent gradient is shown as `gradient × 100%`; "1 in n" means rise 1 for every n of run
- The Gradient/Slope toggle swaps terms consistently, including in narration

### 8.7 Distractor design (misconception-driven)

Every multiple-choice set includes plausible wrong answers built from real student errors:

| Misconception | Example distractor for m = 3/4 |
|---|---|
| Run ÷ rise (inverted) | 4/3 |
| Sign error | −3/4 |
| Subtracted in mixed order | wrong sign or wrong magnitude from (y₂ − y₁)/(x₁ − x₂) |
| Did not simplify / miscounted by one | 6/9 → shown as 2/3, or 3/5 |
| Added instead of divided | 7 |

---

## 9. Gamification Design

### 9.1 Reward system

- **Stars (⭐):** per world, 1–3 based on score (6–7 correct = 1, 8–9 = 2, 10 = 3)
- **XP points:** 10 XP correct first try, 7 XP second try, 5 XP with a hint used
- **Streak 🔥:** fire counter for consecutive correct answers
- **Streak bonus:** +5 XP per correct answer when streak ≥ 5
- **Simulation XP:** 20 XP per completed station round (one-time)

### 9.2 Badges (unlockable)

| Badge | Condition |
|---|---|
| 🏅 **Trail Starter** | Complete Wonder + Story phases |
| 🥈 **Slope Builder** | Complete all 3 Simulation stations |
| 🥇 **Gradient Champion** | Score ≥ 80% across the Play phase |
| 💎 **Perfect Peak** | Score 10/10 in any world |
| 🔥 **Streak Star** | Streak of 10 consecutive correct answers |
| 🌍 **Global Explorer** | Complete all 6 phases (lesson-complete badge) |
| 🎯 **Sharp Eye** | Station B with no wrong selections in any round |
| 🧭 **Sign Navigator** | Correctly answer 10 questions involving negative, zero or undefined gradients |

### 9.3 Feedback mechanics

**✅ Correct:** bounce on the answer card, Grady celebrates, XP floats up, streak increments, celebration audio.

**❌ Attempt 1:** gentle shake, Hint 1 (highlight the rise and run on the graph, or the two points in the formula).

**❌ Attempt 2:** stronger shake, Hint 2 (animated staircase counts the rise and run step by step).

**❌ Attempt 3:** the answer is revealed with an animated worked solution, read aloud. **No score penalty.**

No negative scoring. Encouragement-first, always.

**Misconception-aware hints:** if the wrong answer matches a known misconception (§8.7), Hint 1 names it gently, for example "Check which number goes on top: rise or run?"

### 9.4 Mascot — Grady the Mountain Goat

- **Character:** a friendly, sure-footed mountain goat with a tiny explorer's backpack and a flag
- **Mood states:** idle | curious | happy | thinking | celebrating | encouraging
- **Appears in:** Wonder hook, Story panels, Simulation feedback, Play feedback, Reflect phase
- **Audio:** all mascot speech uses the ElevenLabs Alice voice (pre-generated `.mp3` where possible)

---

## 10. The Story — "The Gradient Trail Expedition"

### 10.1 Premise

Every year the **Global Gradient Explorers Club**, a video-call group of friends from around the world, climbs to a different summit to light the **Gradient Beacon**, which guides hikers home. This year a **Mist of Mix-Ups** has settled over the world's famous slopes and erased the trail markers. To light the beacon on **Kilimanjaro**, the Club must restore the markers at ten famous landmarks. Each landmark has a gradient puzzle, and every correct answer clears a little more mist.

### 10.2 Cast

| Name | From | Role in the story |
|---|---|---|
| **Sarah** | Sydney, Australia | Club leader; first to spot the mist |
| **John** | London, UK | The careful measurer; loves rulers |
| **Mike** | New York, USA | The speed-lover who forgets signs (comic misconception source) |
| **Emma** | Toronto, Canada | The map reader; plans the route |
| **Liam** | Dublin, Ireland | The storyteller; narrates the hikes |
| **Sofia** | Rio de Janeiro, Brazil | The daredevil; takes the steepest path |
| **Noah** | Cape Town, South Africa | The photographer; spots patterns |
| **Aisha** | Cairo, Egypt | The calm problem-solver |
| **Carlos** | Mexico City, Mexico | The engineer; builds ramps and bridges |
| **Yuki** | Tokyo, Japan | The skier; loves downhill |
| **Priya** | Mumbai, India | The drone pilot; plots points |
| **Fatima** | Dubai, UAE | The inventor; builds the Gradient Beacon |
| **Diego** | Madrid, Spain | The skater; always asking "how steep is that?" |
| **Grady** | The Alps | The mascot goat who guides every climb |

### 10.3 Story panels (narration text, paragraphs only)

> These strings are the exact on-screen text and the exact narration script (1:1 parity). Titles are not narrated.

**Panel 1 — The Club forms (style: statement)**
> "Sarah, John, Mike, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, Priya, Fatima, and Diego are the Global Gradient Explorers Club."
> "A Mist of Mix-Ups has hidden the trail markers on the world's famous slopes. Only gradients can bring them back!"
> "Some countries say slope and some say gradient. It is the very same idea!"

**Panel 2 — Rise and run (style: statement, with emphasis on key terms)**
> "Sarah rides a cable car in Switzerland. It climbs three metres up for every four metres across."
> "The climb is called the rise. The distance across is called the run."
> "Gradient equals rise divided by run. So the gradient is three quarters!"

**Panel 3 — Up and down (style: statement)**
> "Yuki skis down a mountain in Japan. When we read a line from left to right, going down gives a negative gradient."
> "Going up gives a positive gradient. Which way is Yuki going?"

**Panel 4 — Flat and vertical (style: statement)**
> "Aisha walks along a flat promenade by the Nile. It does not rise at all, so the gradient is zero."
> "Then she reaches a tall wall. It has no run at all, so its gradient is undefined!"

**Panel 5 — The two-point formula (style: statement)**
> "Priya's drone flies from point A at one, two to point B at five, ten."
> "The rise is ten minus two, which is eight. The run is five minus one, which is four."
> "Eight divided by four is two. The gradient is two!"

**Panel 6 — Roads, ramps and relatives (style: emphasis)**
> "Carlos builds a ramp that rises one metre for every twelve metres of run. Engineers call that one in twelve."
> "Fatima points out that lines with the same gradient are parallel."
> "Lines that cross at a right angle are perpendicular, and their gradients multiply to negative one."

> **On-screen vs spoken form:** the screen shows symbols (`3/4`, `(1, 2)`, `−1`), and the narration script uses the spoken form ("three quarters", "one, two", "negative one"). The parity checker compares the screen text after it is converted to spoken form (see TRD §11.6).

### 10.4 World micro-stories (shown on the world intro card, narrated as paragraphs)

| World | Micro-story |
|---|---|
| 1 Swiss Alps | "Sarah's cable car stops halfway. The marker is covered in mist. Read the gradient to restart it!" |
| 2 Sydney | "John measures the bridge arch with his ruler. Which marker shows the right gradient?" |
| 3 Giza | "Aisha says the pyramid builders used a ramp. Use two points to find its gradient." |
| 4 Rio | "Sofia zooms down the Sugarloaf cable line. Careful, her gradient is negative!" |
| 5 Reykjavik | "On the ice slide, a flat patch and a frozen wall block the way. Zero or undefined?" |
| 6 Mumbai | "Priya's drone compares two flyovers. Which one is steeper?" |
| 7 Paris | "Emma rides the Montmartre funicular. Every minute it climbs the same amount. What is the rate?" |
| 8 San Francisco | "Mike loves steep streets. Convert the gradient into a percentage!" |
| 9 London | "Tower Bridge's lifting roads must be parallel to open, and its supports perpendicular to hold." |
| 10 Kilimanjaro | "The final climb mixes everything you have learned. Light the Gradient Beacon!" |

### 10.5 Wonder hook (Phase 1)

> "Sarah rides a cable car in the Swiss Alps. It climbs three hundred metres while it travels nine hundred metres across."
> "Is her ride steep or gentle? Let's discover how gradients measure steepness!"

### 10.6 Reflect prompts (Phase 5)

> "What an adventure today! Can you tell me one thing you learned about gradients?"
> "Think of a slope in your own town. Is its gradient gentle or steep? Tell Grady!"

---

## 11. Audio & Narration Design

Fully aligned with `audio_generation_pipeline.md`.

### 11.1 Pipeline summary

- **Voice provider:** ElevenLabs only (no browser Web Speech fallback)
- **Voice:** Alice (Clear, Engaging Educator), Voice ID `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`
- **Pre-generation:** `scripts/generate_audio.js` writes static `.mp3` files into `public/assets/audio/`
- **Mapping:** auto-generated `src/utils/audioMap.js` (exact spoken text → file path)
- **Cleanup:** `scripts/clean_audio.js` removes orphaned files
- **Dynamic fallback:** text not in the map is generated on the fly through a serverless proxy (`/api/elevenlabs`)

### 11.2 Content policy — paragraphs and questions only

> **IMPORTANT:** audio is generated ONLY for paragraph/story text and question text. Titles, headings, world names and section labels are **never** narrated.

### 11.3 Speech styles (per pipeline file)

| Style | Stability | Similarity Boost | Style | Speaker Boost | Use case |
|---|---|---|---|---|---|
| `celebration` | 0.12 | 0.45 | 0.75 | ✅ | Badge unlock, world complete |
| `encouragement` | 0.16 | 0.50 | 0.65 | ✅ | Correct feedback, hints |
| `question` | 0.20 | 0.55 | 0.55 | ✅ | Practice question read-aloud |
| `emphasis` | 0.16 | 0.50 | 0.60 | ✅ | Key vocabulary and formula moments |
| `thinking` | 0.24 | 0.60 | 0.35 | ✅ | Wonder hook, reflect, mascot musing |
| `statement` / `instruction` | 0.20 | 0.55 | 0.50 | ✅ | Story narration, station instructions |

### 11.4 What is pre-generated vs generated on demand

Because every practice question is random, not every question can be pre-recorded. The plan:

| Content | How it is voiced |
|---|---|
| Wonder hook, all 6 story panels, station instructions, feedback lines, badge lines, world micro-stories, reflect prompts | **Pre-generated** static `.mp3` (zero latency) |
| **Fixed-stem questions** (Q1, Q3-from-graph, Q4-from-graph: "Look at the line on the graph. What is its gradient?") | **Pre-generated** (the stem never changes; the picture carries the numbers) |
| **Number-bearing questions** (Q2, Q5–Q10) | **Dynamic**: generated on first play via the proxy, cached in memory and IndexedDB |

Number-bearing questions are voiced when the student taps the 🔊 button on the question card (auto-play can be enabled in Settings). If audio cannot load, the question stays fully readable and the app never blocks.

### 11.5 Narration script examples

**Phase 3 (Station A) — style: instruction**
> "Drag points A and B on the grid. Watch the rise and the run change!"
> "Can you build a line with a gradient of two?"

**Phase 3 (Station C) — style: instruction**
> "Fill in the formula one step at a time. Rise goes on top, run goes on the bottom!"

**Phase 4 (correct feedback) — style: celebration**
> "Amazing! You found the gradient perfectly! You are a Gradient Explorer superstar!"

**Phase 4 (incorrect, attempt 1) — style: encouragement**
> "Not quite! Let's look at the rise and the run again."

**Phase 4 (incorrect, attempt 2) — style: thinking**
> "Watch the steps climb! Can you count the rise and the run with me?"

**Phase 5 (Reflect) — style: thinking**
> "What an adventure today! Can you tell me one thing you learned about gradients?"

### 11.6 Strict 1:1 parity rule

Every narrated string must match the on-screen text exactly (same words and punctuation). For math content, the on-screen symbols are converted to spoken words by a single shared function (`toSpoken()`), and the parity checker compares the converted screen text with `narration.js` and the `phrases` array. Any UI text change requires updating `generate_audio.js` and `narration.js` together.

---

## 12. UX & Visual Design Requirements

### 12.1 Visual theme

- **Brand:** Intellia, "Think. Explore. Become."
- **Reference UI (strict match):** `https://grade5-time-intervals.vercel.app/` and the repo `p1pachare-cloud/Grade5-Time-Intervals`
- **Matching rule:** reuse the same top bar, phase-dot tracker, bottom bar, card styling, button styles, spacing scale, typography, colour tokens, animation timings and illustration style as the reference. Only the topic-specific visuals change (grid, slope meter, landmarks, mascot).
- **Colours:** inherit the reference palette: primary brand blue, accent gold/yellow for rewards, soft coral/red for wrong-answer states, white card backgrounds, soft drop shadows, distinct phase-band colours. Extra semantic colours for gradient sign: **positive = green, negative = coral, zero = blue, undefined = purple** (always paired with an icon or label, never colour alone).
- **Typography:** the rounded, playful face used by the reference (Nunito or Fredoka)
- **Illustrations:** cartoon-style, globally inclusive characters and landmark backdrops (Matterhorn, Sydney Harbour Bridge, Giza pyramids, Sugarloaf Mountain, Hallgrímskirkja, Mumbai skyline, Montmartre, Golden Gate hills, Tower Bridge, Kilimanjaro)

> **Design-input note:** the live reference site renders client-side, so the build team should supply screenshots or a Figma export of the reference for pixel-level matching. The repo contains reference screenshots at its root. Use those as the visual source of truth.

### 12.2 Layout structure (mirrors the reference)

- **Top bar:** Intellia logo | lesson title "Gradients" | 6-phase dot tracker
- **Main area:** phase content (responsive, smooth phase transitions)
- **Bottom bar:** XP counter | star count | streak fire | phase navigation arrows
- **Sidebar:** hidden on mobile; vertical phase map on tablet and up

### 12.3 Primary visual components

- **Gradient grid:** SVG coordinate plane with gridlines, labelled axes, a line, draggable points, a rise/run staircase and animated drawing
- **Slope meter:** semicircular dial; needle sweeps to the gradient's angle; shows value and sign icon
- **Rise/run triangle:** arrows and labels in contrasting colours (rise = orange, run = teal)
- **Scene cards:** ramp, roof, ski slope and cable-car illustrations with an overlaid line
- **Table card:** x/y value table with "+2, +6" step arrows for rate of change
- **Landmark backdrops:** one per world, shown behind the world map node and the question card header

### 12.4 Accessibility

- Large tap targets (minimum 44×44 px)
- WCAG AA colour contrast; colour is never the only signal (icons and text labels for sign)
- Keyboard-navigable (Tab + Enter; arrow keys nudge a selected grid point by 1)
- Text alternative for every graph ("A line rising from (−2, −1) to (4, 3)") for screen readers
- No mandatory time pressure (optional timer toggle in Play only)
- Reduced-motion setting disables sweeping animations
- Drag interactions always have a tap-tap equivalent

### 12.5 Responsive design

- Primary: desktop (1024 px+) and tablet (768 px+) for the classroom
- Tertiary: mobile (375 px+) with a stacked single-column layout; grid scales to fit width, minimum cell size 20 px

---

## 13. Content Requirements

- **Concept cards:** 6 story panels with diagrams and Try-it micro-interactions (§6)
- **Simulation content:** 12 mission cards (Station A), 3 rounds of cards in 3 modes (Station B), 3 rounds of formula tasks (Station C)
- **Question content:** 10 generators (one per type) producing 100 questions per session, with hints and worked explanations written as templates
- **World content:** 10 world intro cards, 10 backdrops, 10 micro-stories
- **Audio content:** all static phrases pre-generated; dynamic fallback for number-bearing questions
- **Glossary:** a tap-to-open vocabulary list (gradient/slope, rise, run, parallel, perpendicular, etc.)

---

## 14. Success Criteria (v1.0)

| Criterion | Target |
|---|---|
| 100 questions generated randomly, with no duplicates in a session | ✅ Required |
| All 3 simulation stations functional | ✅ Required |
| All 6 phases navigable end to end | ✅ Required |
| Learn-first gate enforced (Play locked until Story and Simulate complete) | ✅ Required |
| Gamification (XP, stars, 8 badges, streaks) working | ✅ Required |
| 10-world progression and unlock logic correct | ✅ Required |
| ElevenLabs audio plays for all phase narration | ✅ Required |
| Audio pipeline (pre-gen + dynamic fallback) functional | ✅ Required |
| All gradient answers verified by exact fraction math (no float errors) | ✅ Required |
| Gradient/Slope term toggle works everywhere, including audio | ✅ Required |
| Mobile, tablet and desktop responsive layout | ✅ Required |
| Global Grade 8 syllabus coverage confirmed (LO1–LO10) | ✅ Required |
| Loads in < 3 seconds (Vite production build) | ✅ Required |
| WCAG AA accessible | ✅ Required |
| UI matches the Grade 5 Time Intervals reference structure | ✅ Required |
| Hosted at the Intellia Grade 8 lesson URL | ✅ Required |

---

## 15. Out of Scope (v1.0)

- Teacher dashboard and backend analytics
- Student accounts and cross-device persistence
- Multiplayer or class competition
- Parent progress emails
- Printable worksheets
- Curved graphs, tangents and calculus ideas (reserved for later grades)
- Full equation-of-a-line construction from two points (`y − y₁ = m(x − x₁)`); only `y = mx + c` reading and simple rearranging are in scope
- Non-English narration (the multilingual model supports it later)

---

## 16. Risks & Assumptions

| Risk / assumption | Mitigation |
|---|---|
| Live reference UI could not be inspected visually | Use repo screenshots and PRD/TRD structure; request a Figma or screenshot pack before UI build |
| Intellia course page could not be opened | Confirm the Grade 8 lesson path with the Intellia team |
| Dynamic audio for random questions adds API cost and latency | Pre-generate all fixed content; voice number-bearing questions on tap; cache aggressively; proxy keeps the key off the client |
| Random generation could create awkward or unfair questions | Constraint-based generators, validity checks, and a 1,000-run property test (TRD §17) |
| Framework codes may change | Curriculum owner verifies references before launch |
| Gradient vs slope terminology differs by country | Settings toggle and dual-term introduction in Story panel 1 |

---

**Document Version:** 1.0 | October 2026
**Product:** Intellia — Grade 8 Math, Gradients
**Lesson Title:** Global Gradient Explorers — Gradients
**Curriculum:** Global Grade 8 Mathematics (Common Core, Singapore MOE, England NC, Australian Curriculum, CBSE/NCERT and IB MYP cross-aligned)
**Reference UI:** <https://grade5-time-intervals.vercel.app/>
**Reference Repo:** <https://github.com/p1pachare-cloud/Grade5-Time-Intervals>
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`), per `audio_generation_pipeline.md`
**Parent Course Page pattern:** <https://intelliasg.com/courses/grade-3-math>
**Lesson URL (proposed):** <https://intelliasg.com/courses/grade-8-math/lessons/gradients/>
