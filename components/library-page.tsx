"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArchiveFrame, ArchiveHero, ArchiveSection } from "@/components/archive-frame";

const shelfSections = {
  Reading: ["Notes on discipline", "Archived essays", "Mathematics references"],
  Watching: ["Lecture series", "Design breakdowns", "Study sessions"],
  Listening: ["Focus playlists", "Ambient soundscapes", "Quiet loops"],
  Learning: ["Physics problems", "Chemistry drills", "Memory systems"],
} as const;

export function LibraryPage() {
  const reduceMotion = useReducedMotion();

  return (
    <ArchiveFrame activePath="/library">
      <ArchiveHero
        eyebrow="Reference"
        title="REFERENCE SHELF"
        subtitle="A minimal shelf of placeholder references that can expand later without changing the structure."
      />

      <ArchiveSection>
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(shelfSections).map(([section, items], index) => (
            <motion.article
              key={section}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[1.75rem] border border-white/8 bg-surface/70 p-6 backdrop-blur-sm sm:p-7"
            >
              <p className="text-[0.72rem] uppercase tracking-[0.4em] text-muted">{section}</p>
              <ul className="mt-5 space-y-3 text-lg font-light leading-8 text-text sm:text-xl">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </ArchiveSection>
    </ArchiveFrame>
  );
}
