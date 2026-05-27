import { motion } from 'framer-motion';
import { CINEMATIC_EASE } from '@/animations/easings';

type Props = { title: string; text: string; index: number };

export function CinematicSection({ title, text, index }: Props) {
  return (
    <section className="min-h-screen px-8 py-20 md:px-20 flex items-center" id={`section-${index}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: CINEMATIC_EASE }}
        className="max-w-4xl"
      >
        <h2 className="font-display text-5xl mb-6">{title}</h2>
        <p className="text-lg text-zinc-300 leading-relaxed whitespace-pre-line">{text}</p>
      </motion.div>
    </section>
  );
}
