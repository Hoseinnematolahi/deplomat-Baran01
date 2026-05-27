export type SectionContent = { section: string; title: string; text: string };

const keys = ['hero','philosophy','amenities','residences','penthouse','smart-living','architecture','location'] as const;

export async function loadSections(): Promise<SectionContent[]> {
  const modules = await Promise.all(keys.map((key) => fetch(`/content/${key}.json`).then((r) => r.json())));
  return modules;
}
