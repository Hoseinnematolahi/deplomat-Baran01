export type SectionContent = {
  section: string;
  title: string;
  text: string;
};

const keys = [
  'hero',
  'philosophy',
  'amenities',
  'residences',
  'penthouse',
  'smart-living',
  'architecture',
  'location'
] as const;

const isPlaceholder = (payload: SectionContent) =>
  payload?.title === 'Pending extraction' ||
  payload?.text?.includes('Run npm run extract');

export async function loadSections(): Promise<SectionContent[]> {
  const modules = await Promise.all(
    keys.map(async (key) => {
      const response = await fetch(`/content/${key}.json`, {
        cache: 'no-store'
      });

      if (!response.ok) {
        return {
          section: key,
          title: 'Content unavailable',
          text: 'PDF-derived content was not generated at build time.'
        };
      }

      return response.json();
    })
  );

  const allPlaceholder = modules.every(isPlaceholder);

  if (allPlaceholder) {
    console.warn(
      'PDF content is still placeholder. Ensure PDF exists and run extraction pipeline before deployment.'
    );
  }

  return modules;
}