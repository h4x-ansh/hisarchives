"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const archivedWork = [
  {
    id: "001",
    title: "Discord Automation",
    description: "Utility tooling and workflow automation preserved as an active line of work.",
    status: "Active",
    year: "2026",
  },
  {
    id: "002",
    title: "Tournament Platform",
    description: "A structured competitive system archived after its first complete pass.",
    status: "Archived",
    year: "2026",
  },
  {
    id: "003",
    title: "HisArchives",
    description: "The record itself, evolving in public while staying personal.",
    status: "Building",
    year: "2026",
  },
];

const archiveLogs = [
  {
    date: "2026.06.04",
    text: "Purchased hisarchives.xyz",
  },
  {
    date: "2026.06.04",
    text: "Built the first version of the archive",
  },
  {
    date: "2026.06.04",
    text: "Started documenting the journey",
  },
];

function Section({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-white/5 py-20 sm:py-28">
      <div className="space-y-6">
        <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">{eyebrow}</p>
        <div className="space-y-3">
          <h2 className="text-balance text-3xl font-light sm:text-5xl">{title}</h2>
          {subtitle ? <p className="max-w-2xl text-sm leading-7 text-muted">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function CatalogItem({
  id,
  title,
  description,
  status,
  year,
}: {
  id: string;
  title: string;
  description: string;
  status: string;
  year: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-[1.75rem] border border-white/8 bg-surface/70 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/14 sm:p-7"
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-4">
          <p className="text-[0.72rem] uppercase tracking-[0.4em] text-muted">{id}</p>
          <h3 className="text-2xl font-light tracking-wide text-text sm:text-3xl">{title}</h3>
          <p className="max-w-2xl text-sm leading-7 text-muted">{description}</p>
        </div>
        <div className="grid gap-4 text-sm uppercase tracking-[0.25em] text-muted sm:text-right">
          <div>
            <p>Status</p>
            <p className="mt-1 text-text">{status}</p>
          </div>
          <div>
            <p>Year</p>
            <p className="mt-1 text-text">{year}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function TimelineEntry({
  date,
  text,
}: {
  date: string;
  text: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-4 border-b border-white/5 py-5 sm:grid-cols-[9rem_1fr]"
    >
      <p className="text-sm uppercase tracking-[0.35em] text-muted">{date}</p>
      <p className="text-lg font-light leading-8 text-text sm:text-xl">{text}</p>
    </motion.div>
  );
}

function StatusCard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.aside
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[2rem] border border-white/8 bg-surface/70 p-7 shadow-glow backdrop-blur-sm sm:p-8"
    >
      <div className="space-y-5">
        <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Active record</p>
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Active build</p>
            <p className="mt-2 text-2xl font-light">HisArchives</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Primary objective</p>
            <p className="mt-2 text-2xl font-light">JEE 2027</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Record status</p>
            <p className="mt-2 text-2xl font-light">In Progress</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Current phase</p>
            <p className="mt-2 text-2xl font-light">Class 11</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

export function ArchivePage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative isolate overflow-hidden bg-bg text-text">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-archive-grid bg-[length:100%_100%,112px_112px] opacity-[0.08]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_25%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-5 pb-24 pt-5 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/5 py-4 text-[0.72rem] uppercase tracking-[0.38em] text-muted">
          <span>hisarchives.xyz</span>
          <Link href="/" className="transition-colors hover:text-text">
            Back to home
          </Link>
        </header>

        <section className="flex min-h-[52vh] items-end py-18 sm:py-24">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl space-y-6"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.5em] text-muted">Archives</p>
            <h1 className="text-balance text-6xl font-light tracking-[0.15em] sm:text-8xl lg:text-[8rem]">
              ARCHIVES
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              A record of projects, lessons, experiments, and moments preserved over time.
            </p>
          </motion.div>
        </section>

        <Section
          eyebrow="Archived Work"
          title="Catalogued entries."
          subtitle="Each item is treated as a record, not a showcase."
        >
          <div className="grid gap-4">
            {archivedWork.map((item) => (
              <CatalogItem
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                status={item.status}
                year={item.year}
              />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Archive Logs"
          title="Timeline notes."
          subtitle="A clean log that can grow into a larger record without changing its structure."
        >
          <div className="rounded-[2rem] border border-white/8 bg-surface/70 px-6 py-3 backdrop-blur-sm sm:px-8">
            {archiveLogs.map((entry) => (
              <TimelineEntry key={`${entry.date}-${entry.text}`} date={entry.date} text={entry.text} />
            ))}
          </div>
        </Section>

          <Section eyebrow="Active Record" title="RECORD IN PROGRESS">
            <StatusCard />
          </Section>

      </div>
    </main>
  );
}
