export const BADGES = [
  {
    id: 'trail_starter',
    label: '🏅 Trail Starter',
    description: 'Complete the Wonder and Story phases',
    condition: (s) => s.phaseComplete?.wonder && s.phaseComplete?.story,
  },
  {
    id: 'slope_builder',
    label: '🥈 Slope Builder',
    description: 'Complete all 3 simulation stations',
    condition: (s) => s.simStationsComplete?.every(Boolean),
  },
  {
    id: 'gradient_champ',
    label: '🥇 Gradient Champion',
    description: 'Score ≥ 80% across the Practice phase',
    condition: (s) => (s.worldScores || []).reduce((a, v) => a + (v || 0), 0) >= 80,
  },
  {
    id: 'perfect_peak',
    label: '💎 Perfect Peak',
    description: 'Score 10/10 in any single world',
    condition: (s) => (s.worldScores || []).some((v) => v === 10),
  },
  {
    id: 'streak_star',
    label: '🔥 Streak Star',
    description: 'Achieve a streak of 10 consecutive correct answers',
    condition: (s) => (s.maxStreak || 0) >= 10,
  },
  {
    id: 'global_explorer',
    label: '🌍 Global Explorer',
    description: 'Complete all 5 phases of the lesson',
    condition: (s) =>
      s.phaseComplete &&
      s.phaseComplete.wonder &&
      s.phaseComplete.story &&
      s.phaseComplete.simulate &&
      s.phaseComplete.practice &&
      s.phaseComplete.reflect,
  },
  {
    id: 'sharp_eye',
    label: '🎯 Sharp Eye',
    description: 'Complete Station B with no wrong card selections',
    condition: (s) => s.simStationsComplete?.[1] && s.stationBPerfect,
  },
  {
    id: 'sign_navigator',
    label: '🧭 Sign Navigator',
    description: 'Correctly solve 10 negative, zero, or undefined gradient questions',
    condition: (s) => (s.signQuestionsCorrect || 0) >= 10,
  },
];

export const checkBadges = (state) =>
  BADGES.filter((b) => !(state.badges || []).includes(b.id) && b.condition(state)).map(
    (b) => b.id
  );
