"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArchiveFrame, ArchiveHero, ArchiveSection } from "@/components/archive-frame";

const timelineEntries = [
  {
    date: "2026.06.04",
    title: "Purchased hisarchives.xyz",
    note: "The archive received its permanent home.",
  },
  {
    date: "2026.06.04",
    title: "Built the first version of the archive",
    note: "The first structure was assembled and published.",
  },
  {
    date: "2026.06.05",
    title: "Connected the custom domain",
    note: "The archive became reachable through its own name.",
  },
] as const;

function TimelineCard({
  date,
  title,
  note,
  index,
}: {
  date: string;
  title: string;
  note: string;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="grid gap-4 sm:grid-cols-[12rem_1fr] sm:gap-8"
    >
      <div className="flex items-start gap-4 sm:justify-end sm:pt-1">
        <div className="relative flex w-full items-center gap-4 sm:w-auto sm:flex-col sm:items-end sm:gap-3">
          <span className="hidden h-px w-12 bg-white/10 sm:block" />
          <p className="text-sm uppercase tracking-[0.35em] text-muted">{date}</p>
        </div>
      </div>

      <div className="relative pl-6 sm:pl-8">
        <span className="absolute left-0 top-3 h-3 w-3 rounded-full border border-accent/70 bg-accent/20 shadow-[0_0_0_6px_rgba(139,92,246,0.08)] sm:top-4" />
        <div className="rounded-[2rem] border border-white/8 bg-surface/80 p-5 shadow-glow sm:p-6">
          <p className="text-lg font-light tracking-wide text-text sm:text-2xl">{title}</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">{note}</p>
        </div>
      </div>
    </motion.article>
  );
}

export function TimelinePage() {
  return (
    <ArchiveFrame activePath="/timeline">
      <ArchiveHero
        eyebrow="Archive Log"
        title="TIMELINE"
        subtitle="A chronological record of the archive's formation, with room for the next entries."
      />

      <ArchiveSection eyebrow="Archive Log" title="Recorded Moments" subtitle="Each entry is preserved as a dated record. Future moments can be added without changing the structure.">
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-3 top-1 h-full w-px bg-gradient-to-b from-white/0 via-white/10 to-white/0 sm:left-[12rem]"
          />
          <div className="space-y-4 sm:space-y-6">
            {timelineEntries.map((entry, index) => (
              <TimelineCard key={`${entry.date}-${entry.title}`} index={index} {...entry} />
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-[12rem_1fr] sm:gap-8">
            <div className="hidden sm:block" />
            <div className="relative pl-6 sm:pl-8">
              <span className="absolute left-0 top-3 h-3 w-3 rounded-full border border-white/20 bg-white/5" />
              <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] p-5 sm:p-6">
                <p className="text-[0.68rem] uppercase tracking-[0.45em] text-muted">Future</p>
                <p className="mt-3 text-lg font-light leading-8 text-text sm:text-xl">
                  Reserved for the next recorded moments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ArchiveSection>
    </ArchiveFrame>
  );
}
