import { useEffect, useMemo, useState } from 'react';
import { CinematicSection } from '@/components/CinematicSection';
import { loadSections, type SectionContent } from '@/data/loadSections';
import { AtmosphereCanvas } from '@/3d/AtmosphereCanvas';

const isPlaceholder = (section: SectionContent) =>
  section.title === 'Pending extraction' || section.text.includes('Run npm run extract');

function ExtractionHint() {
  return (
    <section className="min-h-screen px-8 py-20 md:px-20 flex items-center">
      <div className="max-w-3xl rounded-2xl border border-white/20 bg-black/40 p-8 backdrop-blur">
        <h2 className="font-display text-4xl mb-4">PDF content has not been generated yet</h2>
        <p className="text-zinc-300 leading-relaxed">
          This deployment is reading placeholder content. To show real catalog copy/images, place
          <code className="mx-1">catalog/DB-General-Catalog-V4.8.pdf</code>
          in the repository and run
          <code className="mx-1">npm run extract</code>
          before deploy (or let GitHub Action extract on <code>main</code>).
        </p>
      </div>
    </section>
  );
}

export function App() {
  const [sections, setSections] = useState<SectionContent[]>([]);

  useEffect(() => {
    loadSections().then(setSections).catch(console.error);
  }, []);

  const visibleSections = useMemo(() => sections.filter((s) => !isPlaceholder(s)), [sections]);
  const onlyPlaceholders = sections.length > 0 && visibleSections.length === 0;

  return (
    <main>
      <AtmosphereCanvas />
      <header className="fixed top-0 left-0 w-full p-6 z-10 backdrop-blur-sm bg-black/20">Luxury Architectural Film</header>
      {onlyPlaceholders ? (
        <ExtractionHint />
      ) : (
        visibleSections.map((section, index) => (
          <CinematicSection key={section.section} title={section.title} text={section.text} index={index} />
        ))
      )}
    </main>
  );
}
