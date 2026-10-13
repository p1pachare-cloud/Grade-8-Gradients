// Difficulty configuration matching TRD §6.3
export const DIFF = {
  1: {
    range: 6,
    gradients: [
      [1, 1], [2, 1], [3, 1], [1, 2], [1, 3]
    ],
    allowNeg: false,
    maxMult: 2,
  },
  2: {
    range: 10,
    gradients: [
      [1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [1, 3], [2, 3], [3, 4], [3, 2], [5, 2]
    ],
    allowNeg: true,
    maxMult: 3,
  },
  3: {
    range: 12,
    gradients: [
      [1, 1], [2, 1], [3, 1], [5, 1], [1, 4], [2, 3], [3, 4], [4, 3], [5, 3], [5, 4], [7, 2]
    ],
    allowNeg: true,
    maxMult: 3,
  },
};
