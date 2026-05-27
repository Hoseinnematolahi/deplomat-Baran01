import { useEffect, useState } from 'react';
import { CinematicSection } from '@/components/CinematicSection';
import { loadSections, type SectionContent } from '@/data/loadSections';
import { AtmosphereCanvas } from '@/3d/AtmosphereCanvas';

export function App() {
  const [sections, setSections] = useState<SectionContent[]>([]);

  useEffect(() => {
    loadSections().then(setSections).catch(console.error);
  }, []);

  return (
    <main>
      <AtmosphereCanvas />
      <header className="fixed top-0 left-0 w-full p-6 z-10 backdrop-blur-sm bg-black/20">Luxury Architectural Film</header>
      {sections.map((section, index) => (
        <CinematicSection key={section.section} title={section.title} text={section.text} index={index} />
      ))}
    </main>
  );
}
