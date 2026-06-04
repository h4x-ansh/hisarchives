"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArchiveFrame, ArchiveHero, ArchiveSection } from "@/components/archive-frame";

const activityEntries = [
  { date: "2026.06.05", text: "Studied Physics" },
  { date: "2026.06.05", text: "Worked on HisArchives" },
  { date: "2026.06.05", text: "Workout Completed" },
] as const;

export function ActivityPage() {
  const reduceMotion = useReducedMotion();

  return (
    <ArchiveFrame activePath="/activity">
      <ArchiveHero
        eyebrow="Activity"
        title="ACTIVITY RECORD"
        subtitle="Placeholder logs preserved in a structure that can accept future manual entries."
      />

      <ArchiveSection eyebrow="Record" title="Daily entries.">
        <div className="rounded-[2rem] border border-white/8 bg-surface/70 px-6 py-3 backdrop-blur-sm sm:px-8">
          {activityEntries.map((entry) => (
            <motion.div
              key={`${entry.date}-${entry.text}`}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-4 border-b border-white/5 py-5 sm:grid-cols-[12rem_1fr]"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-muted">{entry.date}</p>
              <p className="text-lg font-light leading-8 text-text sm:text-xl">{entry.text}</p>
            </motion.div>
          ))}
        </div>
      </ArchiveSection>
    </ArchiveFrame>
  );
}
