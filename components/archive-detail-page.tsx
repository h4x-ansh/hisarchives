"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SiteHeader } from "@/components/site-header";

type ArchiveDetail = {
  title: string;
  overview: string;
  status: string;
  year: string;
  whyItExists: string;
  lessonsLearned: string;
  futurePlans: string;
};

const archiveDetails: Record<string, ArchiveDetail> = {
  "discord-automation": {
    title: "Discord Automation",
    overview: "Utility tooling and workflow automation kept as a working record.",
    status: "Active",
    year: "2026",
    whyItExists: "It exists to reduce friction around repetitive tasks and preserve time for higher-value work.",
    lessonsLearned: "Small automations are more durable when they stay narrow, observable, and easy to revise.",
    futurePlans: "Expand the tooling only where it clearly improves the record without turning it into a system for its own sake.",
  },
  "tournament-platform": {
    title: "Tournament Platform",
    overview: "A structured competitive platform archived after its first complete pass.",
    status: "Archived",
    year: "2026",
    whyItExists: "It documents a finished build and the shape of a working competition flow.",
    lessonsLearned: "Clear constraints and simple structure usually matter more than added complexity.",
    futurePlans: "Keep the record intact and add notes only when a future version demands a new chapter.",
  },
  hisarchives: {
    title: "HisArchives",
    overview: "The archive itself, recorded as an evolving personal project.",
    status: "Building",
    year: "2026",
    whyItExists: "It exists to hold the journey as it happens, not after it is polished into hindsight.",
    lessonsLearned: "A living archive works best when it stays honest, sparse, and easy to extend.",
    futurePlans: "Continue documenting changes, preserving context, and expanding the archive universe with care.",
  },
};

export function ArchiveDetailPage({ slug }: { slug: keyof typeof archiveDetails }) {
  const reduceMotion = useReducedMotion();
  const detail = archiveDetails[slug];

  return (
    <main className="relative isolate overflow-hidden bg-bg text-text">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-archive-grid bg-[length:100%_100%,112px_112px] opacity-[0.08]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_25%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-5 pb-24 pt-5 sm:px-8 lg:px-12">
        <SiteHeader activePath="/archives" />

        <section className="flex min-h-[52vh] items-end py-18 sm:py-24">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl space-y-6"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.5em] text-muted">Archive Detail</p>
            <h1 className="text-balance text-6xl font-light tracking-[0.15em] sm:text-8xl lg:text-[8rem]">
              {detail.title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">{detail.overview}</p>
          </motion.div>
        </section>

        <section className="border-t border-white/5 py-20 sm:py-28">
          <div className="rounded-[2rem] border border-white/8 bg-surface/70 px-6 py-3 backdrop-blur-sm sm:px-8">
            {[
              { label: "Overview", value: detail.overview },
              { label: "Status", value: detail.status },
              { label: "Year", value: detail.year },
              { label: "Why it exists", value: detail.whyItExists },
              { label: "Lessons learned", value: detail.lessonsLearned },
              { label: "Future plans", value: detail.futurePlans },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-4 border-b border-white/5 py-5 sm:grid-cols-[12rem_1fr]"
              >
                <p className="text-[0.72rem] uppercase tracking-[0.35em] text-muted">{item.label}</p>
                <p className="text-lg font-light leading-8 text-text sm:text-xl">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
