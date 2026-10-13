import { createRng, newSessionSeed } from '../utils/rng.js';
import { signatureOf } from '../utils/signature.js';
import { WORLDS } from '../data/worlds.js';
import { NAMES, CITIES, OBJECTS } from '../data/contextPools.js';

import { generate as q01 } from './q01_readGraph.js';
import { generate as q02 } from './q02_twoPoints.js';
import { generate as q03 } from './q03_classify.js';
import { generate as q04 } from './q04_compareSteepness.js';
import { generate as q05 } from './q05_missingCoordinate.js';
import { generate as q06 } from './q06_wordProblem.js';
import { generate as q07 } from './q07_table.js';
import { generate as q08 } from './q08_trueFalse.js';
import { generate as q09 } from './q09_equationForm.js';
import { generate as q10 } from './q10_parallelPerp.js';

const GENERATORS = {
  read_graph: q01,
  two_points: q02,
  classify: q03,
  compare: q04,
  missing_coord: q05,
  word_problem: q06,
  table: q07,
  true_false: q08,
  equation_form: q09,
  parallel_perp: q10,
};

export function generateSession(seed = newSessionSeed(), settings = {}) {
  const rng = createRng(seed);
  const seen = new Set();
  const allQuestions = [];

  const ctx = {
    term: settings.term || 'gradient',
    units: settings.units || 'metric',
    names: NAMES,
    cities: CITIES,
    objects: OBJECTS,
  };

  WORLDS.forEach((world, wIdx) => {
    // Collect question types for this world based on its mix
    const slots = [];
    Object.entries(world.mix).forEach(([type, count]) => {
      for (let i = 0; i < count; i++) {
        slots.push(type);
      }
    });

    const shuffledSlots = rng.shuffle(slots);

    shuffledSlots.forEach((type, qIdxInWorld) => {
      const genFn = GENERATORS[type] || q01;
      let q = null;

      for (let attempt = 0; attempt < 30; attempt++) {
        try {
          const candidate = genFn(rng, world.difficulty, { ...ctx, world: wIdx });
          const sig = signatureOf(candidate);
          if (!seen.has(sig)) {
            seen.add(sig);
            q = candidate;
            q.signature = sig;
            break;
          }
        } catch (e) {
          // Retry
        }
      }

      if (!q) {
        // Fallback without duplicate check
        q = genFn(rng, world.difficulty, { ...ctx, world: wIdx });
      }

      q.id = `${seed}-${wIdx}-${qIdxInWorld}`;
      q.world = wIdx;
      q.indexInWorld = qIdxInWorld;
      q.worldMeta = world;
      allQuestions.push(q);
    });
  });

  return allQuestions;
}
