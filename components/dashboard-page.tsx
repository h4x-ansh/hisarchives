"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArchiveFrame, ArchiveHero, ArchiveSection } from "@/components/archive-frame";

const dashboardItems = [
  "Activity",
  "Projects",
  "Timeline",
  "Records",
] as const;

export function DashboardPage() {
  const reduceMotion = useReducedMotion();

  return (
    <ArchiveFrame activePath="/dashboard">
      <ArchiveHero
        eyebrow="Control"
        title="PRIVATE CONTROL ROOM"
        subtitle="A placeholder structure with no authentication, no backend, and no live systems."
      />

      <ArchiveSection eyebrow="Control" title="Private overview.">
        <div className="grid gap-4 sm:grid-cols-2">
          {dashboardItems.map((item, index) => (
            <motion.article
              key={item}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[1.75rem] border border-white/8 bg-surface/70 p-6 backdrop-blur-sm sm:p-7"
            >
              <p className="text-[0.72rem] uppercase tracking-[0.4em] text-muted">{item}</p>
              <p className="mt-4 text-2xl font-light leading-8 text-text sm:text-3xl">Placeholder panel</p>
            </motion.article>
          ))}
        </div>
      </ArchiveSection>
    </ArchiveFrame>
  );
}
