"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const archivedWork = [
  {
    id: "001",
    title: "Discord Automation",
    description: "Utility tooling and workflow automation preserved as an active line of work.",
    status: "Active",
    year: "2026",
    accent: "#8b5cf6",
    coverLabel: "Discord-inspired visual",
  },
  {
    id: "002",
    title: "Tournament Platform",
    description: "A structured competitive system archived after its first complete pass.",
    status: "Archived",
    year: "2026",
    accent: "#ef4444",
    coverLabel: "Competitive / esports visual",
  },
  {
    id: "003",
    title: "HisArchives",
    description: "The record itself, evolving in public while staying personal.",
    status: "Building",
    year: "2026",
    accent: "#6d28d9",
    coverLabel: "Archive aesthetic",
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
  href,
  accent,
  coverLabel,
}: {
  id: string;
  title: string;
  description: string;
  status: string;
  year: string;
  href: string;
  accent: string;
  coverLabel: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden rounded-[2rem] border border-white/8 bg-surface/70 backdrop-blur-sm transition-colors duration-300 hover:border-white/14"
      style={{ boxShadow: `0 0 0 1px ${accent}22, 0 30px 100px rgba(0, 0, 0, 0.35)` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 bg-[#090909]" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 10%, ${accent}35, transparent 32%), radial-gradient(circle at 80% 90%, ${accent}14, transparent 38%)`,
          }}
        />
        <Image
          src="/record-placeholder.svg"
          alt={title}
          fill
          className="object-cover opacity-70 mix-blend-screen transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={id === "001"}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28"
          style={{
            background: `linear-gradient(to top, rgba(5,5,5,0.92), transparent), linear-gradient(135deg, ${accent}24, transparent 60%)`,
          }}
        />
        <div className="absolute left-6 top-6 inline-flex rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.35em] text-text backdrop-blur-sm">
          {coverLabel}
        </div>
      </div>
      <div className="space-y-5 p-6 sm:p-7">
        <div className="space-y-3">
          <p className="text-[0.72rem] uppercase tracking-[0.4em] text-muted">{id}</p>
          <h3 className="text-2xl font-light tracking-wide text-text sm:text-3xl">
            <Link href={href} className="transition-colors hover:text-muted">
              {title}
            </Link>
          </h3>
          <p className="max-w-2xl text-sm leading-7 text-muted">{description}</p>
        </div>
        <div className="grid gap-4 border-t border-white/5 pt-5 text-sm uppercase tracking-[0.25em] text-muted sm:grid-cols-2">
          <div>
            <p>Status</p>
            <p className="mt-1 text-text">{status}</p>
          </div>
          <div className="sm:text-right">
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
        <SiteHeader activePath="/archives" />

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
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-2">
            {archivedWork.map((item) => (
              <CatalogItem
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                status={item.status}
                year={item.year}
                href={`/archives/${item.id === "001" ? "discord-automation" : item.id === "002" ? "tournament-platform" : "hisarchives"}`}
                accent={item.accent}
                coverLabel={item.coverLabel}
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
