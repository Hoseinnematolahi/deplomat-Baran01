import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const INPUT = path.resolve('assets/optimized');
const OUTPUT = path.resolve('assets/placeholders');

async function main() {
  await fs.mkdir(OUTPUT, { recursive: true });
  const files = (await fs.readdir(INPUT)).filter((f) => f.endsWith('.webp') || f.endsWith('.avif'));
  for (const file of files) {
    const src = path.join(INPUT, file);
    const dst = path.join(OUTPUT, file.replace(/\.(webp|avif)$/, '.jpg'));
    await sharp(src).resize(32).blur(8).jpeg({ quality: 30 }).toFile(dst);
  }
  console.log(`Generated ${files.length} placeholders.`);
}
main();
