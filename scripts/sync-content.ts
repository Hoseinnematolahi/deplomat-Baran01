import fs from 'node:fs/promises';
import path from 'node:path';

const sections = ['hero','philosophy','amenities','residences','penthouse','smart-living','architecture','location','sections'];

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function main() {
  await ensureDir('public/content');
  for (const name of sections) {
    const src = path.resolve(`content/${name}.json`);
    const dst = path.resolve(`public/content/${name}.json`);
    await fs.copyFile(src, dst);
  }
  console.log('Synced content/*.json to public/content/*.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
