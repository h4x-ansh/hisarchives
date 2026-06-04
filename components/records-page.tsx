"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArchiveFrame, ArchiveHero, ArchiveSection } from "@/components/archive-frame";

const recordCategories = [
  { label: "Identity", value: "Personal archive entries" },
  { label: "Goals", value: "JEE 2027, long-term growth" },
  { label: "Favorites", value: "Books, tools, routines" },
  { label: "Milestones", value: "Key steps preserved in sequence" },
  { label: "Statistics", value: "Placeholder counts and observations" },
] as const;

export function RecordsPage() {
  const reduceMotion = useReducedMotion();

  return (
    <ArchiveFrame activePath="/records">
      <ArchiveHero
        eyebrow="Records"
        title="PERSONAL RECORDS"
        subtitle="Placeholder categories that hold identity, goals, favorites, milestones, and statistics."
      />

      <ArchiveSection eyebrow="Categories" title="Record index.">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recordCategories.map((item, index) => (
            <motion.article
              key={item.label}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[1.75rem] border border-white/8 bg-surface/70 p-6 backdrop-blur-sm sm:p-7"
            >
              <p className="text-[0.72rem] uppercase tracking-[0.4em] text-muted">{item.label}</p>
              <p className="mt-4 text-2xl font-light leading-8 text-text sm:text-3xl">{item.value}</p>
            </motion.article>
          ))}
        </div>
      </ArchiveSection>
    </ArchiveFrame>
  );
}
