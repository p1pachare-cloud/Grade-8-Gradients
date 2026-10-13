export function generate(rng, difficulty = 1) {
  const templates = [
    {
      statement: 'A line that falls from left to right has a positive gradient.',
      ans: false,
      hint: 'Lines falling left to right have negative gradients.',
      exp: 'False. A line that falls from left to right has a negative gradient.',
    },
    {
      statement: 'A horizontal line has a gradient of zero.',
      ans: true,
      hint: 'Think about rise ÷ run when rise is 0.',
      exp: 'True. A horizontal line has 0 rise, so 0 ÷ run = 0.',
    },
    {
      statement: 'A vertical line has an undefined gradient.',
      ans: true,
      hint: 'Think about rise ÷ run when run is 0.',
      exp: 'True. A vertical line has 0 run, and division by zero is undefined.',
    },
    {
      statement: 'A line with gradient −4 is steeper than a line with gradient 2.',
      ans: true,
      hint: 'Steepness compares magnitude |m|, ignoring the sign.',
      exp: 'True. Steepness is measured by magnitude. |−4| = 4 is greater than |2| = 2.',
    },
    {
      statement: 'Parallel lines have gradients that multiply to −1.',
      ans: false,
      hint: 'Parallel lines have EQUAL gradients. Perpendicular lines multiply to −1.',
      exp: 'False. Parallel lines have equal gradients (m₁ = m₂). Perpendicular lines multiply to −1.',
    },
    {
      statement: 'In the equation y = mx + c, the letter m represents the y-intercept.',
      ans: false,
      hint: 'm is the gradient and c is the y-intercept.',
      exp: 'False. m represents the gradient and c represents the y-intercept.',
    },
    {
      statement: 'Gradient is calculated as run divided by rise.',
      ans: false,
      hint: 'Remember the staircase: rise goes on top!',
      exp: 'False. Gradient is rise divided by run (rise ÷ run).',
    },
    {
      statement: 'Two perpendicular lines with gradients 2 and −1/2 multiply to −1.',
      ans: true,
      hint: '2 × (−1/2) = −1.',
      exp: 'True. The product of perpendicular gradients is 2 × (−1/2) = −1.',
    },
  ];

  const item = rng.pick(templates);
  const correctOption = item.ans ? 'True' : 'False';

  return {
    type: 'true_false',
    difficulty,
    tags: ['true_false', 'concepts'],
    questionText: `True or False: "${item.statement}"`,
    displayText: `True or False: "${item.statement}"`,
    spokenText: `True or False: ${item.statement}`,
    audioKind: 'dynamic',
    visual: { kind: 'none' },
    answerKind: 'mcq',
    options: ['True', 'False'],
    correctAnswer: correctOption,
    answer: correctOption,
    hint1: item.hint,
    hint2: `Check the core mathematical definitions of gradients and lines.`,
    explanation: item.exp,
    misconceptions: {},
    params: { core: [item.statement] },
  };
}
