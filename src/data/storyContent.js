export const STORY_PANELS = [
  {
    id: 'panel-1',
    num: 1,
    title: 'The Gradient Explorers Club',
    location: 'Global Basecamp 🌐',
    image: '/assets/story/panel1_basecamp.jpg',
    imageAlt: 'Global Gradient Explorers Club at Alpine Cosmic Basecamp',
    paragraphs: [
      "Sarah, John, Mike, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, Priya, Fatima, and Diego are the Global Gradient Explorers Club.",
      "A Mist of Mix-Ups has hidden the trail markers on the world's famous slopes. Only gradients can bring them back!",
      "Some countries say slope and some say gradient. It is the very same idea!"
    ],
    conceptTaught: 'Gradient measures steepness; "gradient" and "slope" mean the same thing.',
    tryItPrompt: 'Drag the hiker along three different paths. Feel which one is steepest!',
    visualType: 'hikerSteepness',
    misconception: null,
  },
  {
    id: 'panel-2',
    num: 2,
    title: 'Rise and Run',
    location: 'Zermatt, Switzerland 🇨🇭',
    image: '/assets/story/panel2_swiss.jpg',
    imageAlt: 'Scenic Alpine Cable Car ascending Matterhorn slope in Zermatt, Switzerland',
    paragraphs: [
      "Sarah rides a cable car in Switzerland. It climbs three metres up for every four metres across.",
      "The climb is called the rise. The distance across is called the run.",
      "Gradient equals rise divided by run. So the gradient is three quarters!"
    ],
    conceptTaught: 'Gradient = Rise ÷ Run. The ratio stays constant anywhere on a straight line.',
    tryItPrompt: 'Slide the staircase triangle along the line. Notice how rise and run stay in ratio!',
    visualType: 'staircaseRatio',
    misconception: 'Rise goes on top! Run goes on the bottom (never run ÷ rise).',
  },
  {
    id: 'panel-3',
    num: 3,
    title: 'Up-Hill and Down-Hill',
    location: 'Hokkaido, Japan 🇯🇵',
    image: '/assets/story/panel3_hokkaido.jpg',
    imageAlt: 'Yuki skiing downhill on snow slopes in Hokkaido, Japan',
    paragraphs: [
      "Yuki skis down a mountain in Japan. When we read a line from left to right, going down gives a negative gradient.",
      "Going up gives a positive gradient. Which way is Yuki going?"
    ],
    conceptTaught: 'Always read from left to right: uphill is positive (+), downhill is negative (−).',
    tryItPrompt: 'Flip the line orientation. Watch the sign change between positive and negative!',
    visualType: 'signFlip',
    misconception: 'Down-hill to the right means a negative gradient!',
  },
  {
    id: 'panel-4',
    num: 4,
    title: 'Flat Lands and Sheer Cliffs',
    location: 'Cairo, Egypt 🇪🇬',
    image: '/assets/story/panel4_cairo.jpg',
    imageAlt: 'Aisha walking on flat Nile promenade beside vertical ancient stone obelisk in Cairo, Egypt',
    paragraphs: [
      "Aisha walks along a flat promenade by the Nile. It does not rise at all, so the gradient is zero.",
      "Then she reaches a tall wall. It has no run at all, so its gradient is undefined!"
    ],
    conceptTaught: 'Horizontal lines have 0 gradient (0 ÷ run = 0). Vertical lines have undefined gradient (rise ÷ 0).',
    tryItPrompt: 'Rotate the line to horizontal and vertical. Observe the slope meter reading!',
    visualType: 'zeroUndefined',
    misconception: 'Zero gradient is flat like the floor. Undefined is steep like a vertical wall!',
  },
  {
    id: 'panel-5',
    num: 5,
    title: 'The Two-Point Formula',
    location: 'Mumbai, India 🇮🇳',
    image: '/assets/story/panel5_mumbai.jpg',
    imageAlt: 'Priya piloting drone from Point A to Point B over Mumbai coastline',
    paragraphs: [
      "Priya's drone flies from point A at one, two to point B at five, ten.",
      "The rise is ten minus two, which is eight. The run is five minus one, which is four.",
      "Eight divided by four is two. The gradient is two!"
    ],
    conceptTaught: 'Formula: m = (y₂ − y₁) ÷ (x₂ − x₁). Always subtract in the same order.',
    tryItPrompt: 'Drag points A and B on the grid. Watch the formula calculate live!',
    visualType: 'twoPointFormula',
    misconception: 'Subtract in the same order on top and bottom: (y₂ − y₁) over (x₂ − x₁)!',
  },
  {
    id: 'panel-6',
    num: 6,
    title: 'Roads, Ramps & Parallel Lines',
    location: 'London & Dubai 🇬🇧🇦🇪',
    image: '/assets/story/panel6_ramps.jpg',
    imageAlt: 'Futuristic urban highway ramps and parallel bridges crossing at right angles in London and Dubai',
    paragraphs: [
      "Carlos builds a ramp that rises one metre for every twelve metres of run. Engineers call that one in twelve.",
      "Fatima points out that lines with the same gradient are parallel.",
      "Lines that cross at a right angle are perpendicular, and their gradients multiply to negative one."
    ],
    conceptTaught: 'Real-world gradients (1 in n, %); parallel lines have equal gradients; perpendicular gradients multiply to −1.',
    tryItPrompt: 'Drag line 2 until it is parallel to line 1, then until it is perpendicular!',
    visualType: 'parallelPerpendicular',
    misconception: 'Perpendicular lines have negative reciprocal gradients: flip the fraction and flip the sign!',
  },
];
