import fs from 'node:fs/promises';
import path from 'node:path';
import pdf from 'pdf-parse';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = path.resolve('catalog/DB-General-Catalog-V4.8.pdf');
const OUTPUT_JSON = path.resolve('content/sections.json');

type Section = {
  page: number;
  heading: string;
  body: string;
  tags: string[];
};

const classifyPage = (text: string): string[] => {
  const t = text.toLowerCase();
  const tags: string[] = [];
  if (/penthouse/.test(t)) tags.push('penthouse');
  if (/amenit|wellness|spa|gym/.test(t)) tags.push('amenities');
  if (/smart|automation|intelligent/.test(t)) tags.push('smart-living');
  if (/residence|unit|floor/.test(t)) tags.push('residences');
  if (/location|neighborhood|district/.test(t)) tags.push('location');
  if (/architecture|material|design/.test(t)) tags.push('architecture');
  if (/philosophy|vision|living/.test(t)) tags.push('philosophy');
  if (!tags.length) tags.push('cinematic-transition');
  return tags;
};

async function writePlaceholder(reason: string) {
  const payload = {
    source: 'catalog/DB-General-Catalog-V4.8.pdf',
    pages: 0,
    warning: reason,
    textPreview: '',
    sections: [] as Section[]
  };
  await fs.mkdir('content', { recursive: true });
  await fs.writeFile(OUTPUT_JSON, JSON.stringify(payload, null, 2));
  console.warn(reason);
}

async function main() {
  let bytes: Buffer;
  try {
    bytes = await fs.readFile(PDF_PATH);
  } catch {
    await writePlaceholder('PDF missing at catalog/DB-General-Catalog-V4.8.pdf. Placeholder content generated.');
    return;
  }

  const parsed = await pdf(bytes);
  const doc = await getDocument({ data: bytes }).promise;
  const sections: Section[] = [];

  for (let pageNo = 1; pageNo <= doc.numPages; pageNo++) {
    const page = await doc.getPage(pageNo);
    const textContent = await page.getTextContent();
    const lines = textContent.items
      .map((item: any) => ('str' in item ? item.str : ''))
      .filter(Boolean);

    const heading = lines[0] ?? `Page ${pageNo}`;
    const body = lines.slice(1).join(' ').trim();
    sections.push({ page: pageNo, heading, body, tags: classifyPage(lines.join(' ')) });
  }

  await fs.writeFile(
    OUTPUT_JSON,
    JSON.stringify({
      source: 'catalog/DB-General-Catalog-V4.8.pdf',
      pages: doc.numPages,
      textPreview: parsed.text.slice(0, 4000),
      sections
    }, null, 2)
  );

  console.log(`Extracted ${sections.length} pages into ${OUTPUT_JSON}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
