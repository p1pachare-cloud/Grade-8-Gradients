export function calcXP(attemptNumber, hintsUsed, streak = 0) {
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  return base + (streak >= 5 ? 5 : 0);
}

export function calcStars(correct) {
  if (correct >= 10) return 3;
  if (correct >= 8)  return 2;
  if (correct >= 6)  return 1; // unlock gate
  return 0;
}

export const canUnlockWorld = (score) => score !== null && score >= 6;

export const calcTotalStars = (scores) =>
  scores.reduce((s, v) => s + (v == null ? 0 : calcStars(v)), 0);

export function getExplorerTitle(xp) {
  if (xp >= 1000) return 'Mountain Legend & Gradient Master 🏔️👑';
  if (xp >= 750)  return 'Summit Peak Navigator 🧗‍♂️✨';
  if (xp >= 500)  return 'Alpine Slope Pioneer ⛰️🧭';
  if (xp >= 250)  return 'Gradient Trail Guide 🥾📈';
  return 'Novice Gradient Explorer 🌲';
}
