import fs from 'node:fs/promises';

const sectionMap = ['hero','philosophy','amenities','residences','penthouse','smart-living','architecture','location'];

async function main() {
  const data = JSON.parse(await fs.readFile('content/sections.json', 'utf8'));
  for (const section of sectionMap) {
    const pages = data.sections.filter((s: any) => s.tags.includes(section));
    const payload = {
      section,
      title: pages[0]?.heading ?? section,
      subtitle: 'Extracted dynamically from PDF catalog',
      text: pages.map((p: any) => p.body).join('\n\n'),
      images: [],
      motion: 'cinematic-horizontal',
      theme: 'dark-luxury',
      layout: 'immersive-gallery'
    };
    await fs.writeFile(`content/${section}.json`, JSON.stringify(payload, null, 2));
  }
  console.log('Built section content JSON files.');
}
main();
