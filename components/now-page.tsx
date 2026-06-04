"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SiteHeader } from "@/components/site-header";

const nowItems = [
  {
    label: "Last Updated",
    value: "June 2026",
  },
  {
    label: "Current Phase",
    value: "Class 11",
  },
  {
    label: "Primary Objective",
    value: "JEE 2027",
  },
  {
    label: "Active Build",
    value: "HisArchives",
  },
  {
    label: "Current Focus",
    value: "Physics, Chemistry, Mathematics",
  },
  {
    label: "Current Status",
    value: "Building steadily.",
  },
  {
    label: "Notes",
    value: "This page changes more often than the archive. It reflects the current state rather than the historical record.",
  },
] as const;

function NowRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-3 border-b border-white/5 py-5 sm:grid-cols-[12rem_1fr]"
    >
      <p className="text-[0.72rem] uppercase tracking-[0.35em] text-muted">{label}</p>
      <p className="text-lg font-light leading-8 text-text sm:text-xl">{value}</p>
    </motion.div>
  );
}

export function NowPage() {
  return (
    <main className="relative isolate overflow-hidden bg-bg text-text">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-archive-grid bg-[length:100%_100%,112px_112px] opacity-[0.08]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_25%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-5 pb-24 pt-5 sm:px-8 lg:px-12">
        <SiteHeader activePath="/now" />

        <section className="flex min-h-[52vh] items-end py-18 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl space-y-6"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.5em] text-muted">Now</p>
            <h1 className="text-balance text-6xl font-light tracking-[0.15em] sm:text-8xl lg:text-[8rem]">
              NOW
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              A living status page that changes more often than the archive.
              It reflects the current state rather than the historical record.
            </p>
          </motion.div>
        </section>

        <section className="border-t border-white/5 py-20 sm:py-28">
          <div className="space-y-6">
            <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Status</p>
            <div className="rounded-[2rem] border border-white/8 bg-surface/70 px-6 py-3 backdrop-blur-sm sm:px-8">
              {nowItems.map((item) => (
                <NowRow key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
