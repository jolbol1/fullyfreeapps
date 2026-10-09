// Regenerates the optimised screenshots, icons and sounds in public/ from the
// app repositories. Run with `npm run images`. Paths default to sibling
// checkouts; override with SLATE_DIR and CUE_DIR.
import { execFileSync } from 'node:child_process';
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const slateDir = process.env.SLATE_DIR ?? resolve(root, '../slate');
const cueDir = process.env.CUE_DIR ?? resolve(root, '../md-teleprompter');
const out = join(root, 'public/images');

/** name → [source, widths] */
const slate = {
  'ipad-landscape': [
    'build/app-store/ipad-landscape/01-landscape.png',
    [1800, 1000],
  ],
  'ipad-details': ['build/app-store/ipad/02-details.png', [1100, 640]],
  'iphone-landscape': ['docs/screenshots/iphone-landscape.png', [1600, 900]],
  'iphone-locked': [
    'build/shots/readme-iphone-landscape-locked.png',
    [1600, 900],
  ],
  'iphone-portrait': ['docs/screenshots/iphone-portrait.png', [760, 420]],
  'iphone-settings': ['docs/screenshots/iphone-settings.png', [760, 420]],
  icon: ['Slate/Assets.xcassets/AppIcon.appiconset/AppIcon.png', [512, 192]],
};

const cue = {
  main: ['docs/screenshots/main.png', [1600, 900]],
  output: ['docs/screenshots/output.png', [1600, 900]],
  pedal: ['docs/screenshots/pedal-settings.png', [648, 400]],
};

async function emit(dir, name, src, widths) {
  mkdirSync(join(out, dir), { recursive: true });
  for (const width of widths) {
    const file = join(out, dir, `${name}-${width}.webp`);
    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, alphaQuality: 90, effort: 6 })
      .toFile(file);
    console.log('wrote', file.replace(`${root}/`, ''));
  }
}

for (const [name, [src, widths]] of Object.entries(slate)) {
  await emit('slate', name, join(slateDir, src), widths);
}
for (const [name, [src, widths]] of Object.entries(cue)) {
  await emit('cue', name, join(cueDir, src), widths);
}

// Cue's icon only ships as .icns; let sips extract the 1024px PNG.
const scratch = mkdtempSync(join(tmpdir(), 'ffa-icons-'));
const cuePng = join(scratch, 'cue.png');
execFileSync(
  'sips',
  ['-s', 'format', 'png', join(cueDir, 'Resources/Cue.icns'), '--out', cuePng],
  {
    stdio: 'ignore',
  },
);
await emit('cue', 'icon', cuePng, [512, 192]);
rmSync(scratch, { recursive: true });

// Slate's own clap and beep, used by the interactive slate demo.
mkdirSync(join(root, 'public/audio'), { recursive: true });
for (const sound of ['clap', 'beep']) {
  copyFileSync(
    join(slateDir, `Slate/Sounds/${sound}.wav`),
    join(root, `public/audio/${sound}.wav`),
  );
}
console.log('copied clap and beep sounds');

// Site icons, rendered from the favicon mark. The touch icon is full-bleed
// because iOS applies its own corner mask.
const mark = readFileSync(join(root, 'public/favicon.svg'), 'utf8');
const square = mark
  .replace(
    /<rect width="64" height="64" rx="15"/,
    '<rect width="64" height="64"',
  )
  .replace(/<rect x="\.75"[^>]*\/>/, '');
await sharp(Buffer.from(square), { density: 900 })
  .resize(180, 180)
  .png()
  .toFile(join(root, 'public/apple-touch-icon.png'));

// favicon.ico holding 16, 32 and 48px PNGs.
const sizes = [16, 32, 48];
const pngs = await Promise.all(
  sizes.map((s) =>
    sharp(Buffer.from(mark), { density: 600 }).resize(s, s).png().toBuffer(),
  ),
);
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const at = 6 + 16 * i;
  header.writeUInt8(s, at);
  header.writeUInt8(s, at + 1);
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(pngs[i].length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += pngs[i].length;
});
writeFileSync(
  join(root, 'public/favicon.ico'),
  Buffer.concat([header, ...pngs]),
);
console.log('wrote favicon.ico and apple-touch-icon.png');
