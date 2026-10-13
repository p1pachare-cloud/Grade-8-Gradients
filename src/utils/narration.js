import { say, ask, cheer, emphasize, think, celebrate, instruct } from './audio.js';
import { toSpoken } from './toSpoken.js';

export function wonderNarration() {
  return [
    think("Sarah rides a cable car in the Swiss Alps. It climbs three hundred metres while it travels nine hundred metres across."),
    cheer("Is her ride steep or gentle? Let's discover how gradients measure steepness!"),
  ];
}

export function getStoryNarration(panelIndex) {
  switch (panelIndex) {
    case 0:
      return [
        say("Sarah, John, Mike, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, Priya, Fatima, and Diego are the Global Gradient Explorers Club."),
        say("A Mist of Mix-Ups has hidden the trail markers on the world's famous slopes. Only gradients can bring them back!"),
        emphasize("Some countries say slope and some say gradient. It is the very same idea!"),
      ];
    case 1:
      return [
        say("Sarah rides a cable car in Switzerland. It climbs three metres up for every four metres across."),
        emphasize("The climb is called the rise. The distance across is called the run."),
        emphasize("Gradient equals rise divided by run. So the gradient is three quarters!"),
      ];
    case 2:
      return [
        say("Yuki skis down a mountain in Japan. When we read a line from left to right, going down gives a negative gradient."),
        ask("Going up gives a positive gradient. Which way is Yuki going?"),
      ];
    case 3:
      return [
        say("Aisha walks along a flat promenade by the Nile. It does not rise at all, so the gradient is zero."),
        emphasize("Then she reaches a tall wall. It has no run at all, so its gradient is undefined!"),
      ];
    case 4:
      return [
        say("Priya's drone flies from point A at one, two to point B at five, ten."),
        say("The rise is ten minus two, which is eight. The run is five minus one, which is four."),
        emphasize("Eight divided by four is two. The gradient is two!"),
      ];
    case 5:
      return [
        say("Carlos builds a ramp that rises one metre for every twelve metres of run. Engineers call that one in twelve."),
        emphasize("Fatima points out that lines with the same gradient are parallel."),
        emphasize("Lines that cross at a right angle are perpendicular, and their gradients multiply to negative one."),
      ];
    default:
      return [];
  }
}

export function stationInstructionNarration(stationIdx) {
  if (stationIdx === 0) {
    return [
      instruct("Drag points A and B on the grid. Watch the rise and the run change!"),
      ask("Can you build a line that matches the mission target?"),
    ];
  }
  if (stationIdx === 1) {
    return [
      instruct("Compare the steepness and signs of the paths across the cards!"),
    ];
  }
  if (stationIdx === 2) {
    return [
      instruct("Fill in the formula one step at a time. Rise goes on top, run goes on the bottom!"),
    ];
  }
  return [];
}

export function correctNarration() {
  return [celebrate("Amazing! You found the gradient perfectly! You are a Gradient Explorer superstar!")];
}

export function incorrectNarration() {
  return [cheer("Not quite! Let's look at the rise and the run again.")];
}

export function reflectNarration() {
  return [
    say("What an adventure today! You have lit the Gradient Beacon and mastered steepness across the globe!"),
    ask("Can you record one key gradient rule in your explorer journal?"),
  ];
}

export function questionNarration(q) {
  if (!q) return [];
  const text = q.spokenText || toSpoken(q.displayText || q.questionText || '');
  return [ask(text)];
}
