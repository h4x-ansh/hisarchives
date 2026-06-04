"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArchiveFrame, ArchiveHero, ArchiveSection } from "@/components/archive-frame";

const birthdays = [
  { date: "22 Oct", name: "Ansh" },
  { date: "14 Feb", name: "Placeholder Entry" },
  { date: "07 Aug", name: "Future Entry" },
] as const;

export function BirthdaysPage() {
  const reduceMotion = useReducedMotion();

  return (
    <ArchiveFrame activePath="/birthdays">
      <ArchiveHero
        eyebrow="Dates"
        title="IMPORTANT DATES"
        subtitle="A clean list of dates that can expand later without needing a reminder system."
      />

      <ArchiveSection eyebrow="Dates" title="Important entries.">
        <div className="rounded-[2rem] border border-white/8 bg-surface/70 px-6 py-3 backdrop-blur-sm sm:px-8">
          {birthdays.map((item) => (
            <motion.div
              key={`${item.date}-${item.name}`}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-4 border-b border-white/5 py-5 sm:grid-cols-[12rem_1fr]"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-muted">{item.date}</p>
              <p className="text-lg font-light leading-8 text-text sm:text-xl">{item.name}</p>
            </motion.div>
          ))}
        </div>
      </ArchiveSection>
    </ArchiveFrame>
  );
}
