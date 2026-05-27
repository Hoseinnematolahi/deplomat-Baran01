import fs from 'node:fs/promises';

const sectionMap = ['hero', 'philosophy', 'amenities', 'residences', 'penthouse', 'smart-living', 'architecture', 'location'];

async function writeBoth(section: string, payload: unknown) {
  await fs.mkdir('content', { recursive: true });
  await fs.mkdir('public/content', { recursive: true });
  const json = JSON.stringify(payload, null, 2);
  await fs.writeFile(`content/${section}.json`, json);
  await fs.writeFile(`public/content/${section}.json`, json);
}

async function main() {
  const data = JSON.parse(await fs.readFile('content/sections.json', 'utf8'));
  const sections = Array.isArray(data.sections) ? data.sections : [];

  for (const section of sectionMap) {
    const pages = sections.filter((s: any) => Array.isArray(s.tags) && s.tags.includes(section));
    const payload = {
      section,
      title: pages[0]?.heading ?? 'Pending extraction',
      subtitle: pages.length ? 'Extracted dynamically from PDF catalog' : 'Awaiting PDF extraction output',
      text: pages.length ? pages.map((p: any) => p.body).join('\n\n') : 'Run npm run extract',
      images: [],
      motion: 'cinematic-horizontal',
      theme: 'dark-luxury',
      layout: 'immersive-gallery'
    };
    await writeBoth(section, payload);
  }

  await writeBoth('sections', data);
  console.log('Built section content JSON files for content/ and public/content/.');
}

main();
