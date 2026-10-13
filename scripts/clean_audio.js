import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { audioMap } from '../src/utils/audioMap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const audioDir = path.join(__dirname, '..', 'public', 'assets', 'audio');

if (fs.existsSync(audioDir)) {
  const activeFiles = new Set(Object.values(audioMap).map((p) => path.basename(p)));
  const diskFiles = fs.readdirSync(audioDir);

  let removed = 0;
  diskFiles.forEach((file) => {
    if (file.endsWith('.mp3') && !activeFiles.has(file)) {
      fs.unlinkSync(path.join(audioDir, file));
      removed++;
      console.log(`Removed orphaned audio: ${file}`);
    }
  });

  console.log(`Cleaned ${removed} orphaned audio files.`);
} else {
  console.log('No audio directory found to clean.');
}
