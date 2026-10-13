import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice
const MODEL_ID = 'eleven_multilingual_v2';

export const STYLE_SETTINGS = {
  celebration:   { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question:      { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis:      { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking:      { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement:     { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction:   { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

// All static educational paragraph strings (strictly no titles)
export const phrases = [
  // Wonder Hook
  { text: "Sarah rides a cable car in the Swiss Alps. It climbs three hundred metres while it travels nine hundred metres across.", style: 'thinking' },
  { text: "Is her ride steep or gentle? Let's discover how gradients measure steepness!", style: 'encouragement' },

  // Story Panel 1
  { text: "Sarah, John, Mike, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, Priya, Fatima, and Diego are the Global Gradient Explorers Club.", style: 'statement' },
  { text: "A Mist of Mix-Ups has hidden the trail markers on the world's famous slopes. Only gradients can bring them back!", style: 'statement' },
  { text: "Some countries say slope and some say gradient. It is the very same idea!", style: 'emphasis' },

  // Story Panel 2
  { text: "Sarah rides a cable car in Switzerland. It climbs three metres up for every four metres across.", style: 'statement' },
  { text: "The climb is called the rise. The distance across is called the run.", style: 'emphasis' },
  { text: "Gradient equals rise divided by run. So the gradient is three quarters!", style: 'emphasis' },

  // Story Panel 3
  { text: "Yuki skis down a mountain in Japan. When we read a line from left to right, going down gives a negative gradient.", style: 'statement' },
  { text: "Going up gives a positive gradient. Which way is Yuki going?", style: 'question' },

  // Story Panel 4
  { text: "Aisha walks along a flat promenade by the Nile. It does not rise at all, so the gradient is zero.", style: 'statement' },
  { text: "Then she reaches a tall wall. It has no run at all, so its gradient is undefined!", style: 'emphasis' },

  // Story Panel 5
  { text: "Priya's drone flies from point A at one, two to point B at five, ten.", style: 'statement' },
  { text: "The rise is ten minus two, which is eight. The run is five minus one, which is four.", style: 'statement' },
  { text: "Eight divided by four is two. The gradient is two!", style: 'emphasis' },

  // Story Panel 6
  { text: "Carlos builds a ramp that rises one metre for every twelve metres of run. Engineers call that one in twelve.", style: 'statement' },
  { text: "Fatima points out that lines with the same gradient are parallel.", style: 'emphasis' },
  { text: "Lines that cross at a right angle are perpendicular, and their gradients multiply to negative one.", style: 'emphasis' },

  // Simulation Stations
  { text: "Drag points A and B on the grid. Watch the rise and the run change!", style: 'instruction' },
  { text: "Can you build a line that matches the mission target?", style: 'question' },
  { text: "Compare the steepness and signs of the paths across the cards!", style: 'instruction' },
  { text: "Fill in the formula one step at a time. Rise goes on top, run goes on the bottom!", style: 'instruction' },

  // Feedback
  { text: "Amazing! You found the gradient perfectly! You are a Gradient Explorer superstar!", style: 'celebration' },
  { text: "Not quite! Let's look at the rise and the run again.", style: 'encouragement' },

  // Reflect
  { text: "What an adventure today! You have lit the Gradient Beacon and mastered steepness across the globe!", style: 'statement' },
  { text: "Can you record one key gradient rule in your explorer journal?", style: 'question' },
];

async function generate() {
  const apiKey = process.env.VITE_ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    console.log('ℹ️ No ElevenLabs API key found in environment. Skipping offline generation.');
    console.log('To generate static audio, set VITE_ELEVENLABS_API_KEY in .env.local');
    return;
  }

  const outputDir = path.join(__dirname, '..', 'public', 'assets', 'audio');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Generating audio for ${phrases.length} phrases...`);
  // Generation logic
}

generate();
