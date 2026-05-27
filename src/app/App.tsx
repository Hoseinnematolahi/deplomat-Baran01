import { useEffect, useMemo, useState } from 'react';
import { CinematicSection } from '@/components/CinematicSection';
import { loadSections, type SectionContent } from '@/data/loadSections';
import { AtmosphereCanvas } from '@/3d/AtmosphereCanvas';

const isValid = (s: SectionContent) =>
  Boolean(s.title) &&
  !s.title.includes('Pending extraction') &&
  Boolean(s.text) &&
  !s.text.includes('Run npm run extract');

export function App() {
  const [sections, setSections] = useState<SectionContent[]>([]);

  useEffect(() => {
    loadSections().then(setSections).catch(console.error);
  }, []);

  const visibleSections = useMemo(() => sections.filter(isValid), [sections]);

  return (
    <main>
      <AtmosphereCanvas />
      <header className="fixed top-0 left-0 w-full p-6 z-10 backdrop-blur-sm bg-black/20">Luxury Architectural Film</header>
      {visibleSections.length === 0 ? (
        <section className="min-h-screen px-8 py-20 md:px-20 flex items-center">
          <p className="text-xl text-zinc-300">Content not available. Please check pipeline logs.</p>
        </section>
      ) : (
        visibleSections.map((section, index) => (
          <CinematicSection key={section.section} title={section.title} text={section.text} index={index} />
        ))
      )}
    </main>
  );
}
