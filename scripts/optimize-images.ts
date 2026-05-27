import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const RAW_DIR = path.resolve('assets/raw');
const OPTIMIZED_DIR = path.resolve('assets/optimized');
const THUMB_DIR = path.resolve('assets/thumbnails');

async function main() {
  await fs.mkdir(OPTIMIZED_DIR, { recursive: true });
  await fs.mkdir(THUMB_DIR, { recursive: true });
  const files = (await fs.readdir(RAW_DIR)).filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f));

  for (const file of files) {
    const input = path.join(RAW_DIR, file);
    const basename = file.replace(/\.[^.]+$/, '');
    await sharp(input).avif({ quality: 55 }).toFile(path.join(OPTIMIZED_DIR, `${basename}.avif`));
    await sharp(input).webp({ quality: 75 }).toFile(path.join(OPTIMIZED_DIR, `${basename}.webp`));
    await sharp(input).resize({ width: 480 }).webp({ quality: 60 }).toFile(path.join(THUMB_DIR, `${basename}_thumb.webp`));
  }

  console.log(`Optimized ${files.length} files.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
