"use client";

import type { ReactNode } from "react";
import { useState } from "react";
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
    word: "DISCORD",
    href: "/archives/discord-automation",
    shelfLabel: "Coding / Systems",
  },
  {
    id: "002",
    title: "Tournament Platform",
    description: "A structured competitive system archived after its first complete pass.",
    status: "Archived",
    year: "2026",
    accent: "#ef4444",
    word: "TOURNAMENT",
    href: "/archives/tournament-platform",
    shelfLabel: "Cricket / Competition",
  },
  {
    id: "003",
    title: "HisArchives",
    description: "The record itself, evolving in public while staying personal.",
    status: "Building",
    year: "2026",
    accent: "#6d28d9",
    word: "HISARCHIVES",
    href: "/archives/hisarchives",
    shelfLabel: "Projects / Archive",
  },
  {
    id: "004",
    title: "JEE 2027",
    description: "A long-running objective tracked as a live archive record.",
    status: "Active",
    year: "2026",
    accent: "#a78bfa",
    word: "JEE 2027",
    href: "/now",
    shelfLabel: "Study / Mission",
  },
  {
    id: "005",
    title: "Fitness",
    description: "Conditioning, consistency, and body discipline stored as a living log.",
    status: "Active",
    year: "2026",
    accent: "#22c55e",
    word: "FITNESS",
    href: "/identity",
    shelfLabel: "Health / Routine",
  },
  {
    id: "006",
    title: "Memories",
    description: "Personal fragments, moments, and reminders kept inside the archive.",
    status: "Active",
    year: "2026",
    accent: "#38bdf8",
    word: "MEMORIES",
    href: "/timeline",
    shelfLabel: "Moments / Notes",
  },
  {
    id: "007",
    title: "Notes",
    description: "Quick records, references, and ideas that remain available later.",
    status: "Open",
    year: "2026",
    accent: "#f59e0b",
    word: "NOTES",
    href: "/records",
    shelfLabel: "Reference / Drafts",
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

function ShelfSpine({
  id,
  title,
  description,
  status,
  year,
  href,
  accent,
  word,
  shelfLabel,
  isActive,
  isNeighbor,
  onActivate,
}: {
  id: string;
  title: string;
  description: string;
  status: string;
  year: string;
  href: string;
  accent: string;
  word: string;
  shelfLabel: string;
  isActive: boolean;
  isNeighbor: boolean;
  onActivate: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const width = isActive
    ? "clamp(19rem, 28vw, 24rem)"
    : isNeighbor
      ? "clamp(3.55rem, 4.5vw, 4.35rem)"
      : "clamp(3.35rem, 4.2vw, 4.1rem)";

  return (
    <motion.div
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      animate={{
        width,
        opacity: isActive ? 1 : 0.72,
      }}
      className="relative h-[28rem] flex-shrink-0 overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(13,13,13,0.95),rgba(13,13,13,0.82))] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
      style={{
        boxShadow: isActive
          ? `0 0 0 1px ${accent}24, 0 24px 90px rgba(0,0,0,0.38)`
          : "0 18px 60px rgba(0,0,0,0.24)",
      }}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
    >
      <Link href={href} className="absolute inset-0 z-10" aria-label={title} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isActive ? 1 : 0.55,
          backgroundImage: `radial-gradient(circle at 50% 20%, ${accent}18, transparent 32%), radial-gradient(circle at 50% 100%, ${accent}08, transparent 42%)`,
        }}
      />
      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { opacity: isActive ? [0.06, 0.12, 0.06] : 0.03 }}
        transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
          transform: isActive ? "translateX(0%)" : "translateX(-12%)",
        }}
      />

      <div className="relative flex h-full flex-col p-4 sm:p-5">
        <div
          className="flex h-full flex-1 flex-col justify-between rounded-[1.25rem] border border-white/10 bg-black/25 px-3 py-4 backdrop-blur-[1px] transition-all duration-300"
          style={{
            background:
              isActive
                ? "linear-gradient(180deg, rgba(13,13,13,0.9), rgba(13,13,13,0.7))"
                : "linear-gradient(180deg, rgba(13,13,13,0.88), rgba(13,13,13,0.6))",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <p className="text-[0.62rem] uppercase tracking-[0.45em] text-muted">{id}</p>
              <p className="max-w-[7rem] text-[0.62rem] uppercase tracking-[0.35em] text-muted/80">
                {shelfLabel}
              </p>
            </div>
            <p className="text-[0.6rem] uppercase tracking-[0.4em] text-muted/75">{status}</p>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden">
            <motion.p
              aria-hidden
              animate={reduceMotion ? undefined : { opacity: isActive ? 0.05 : 0.02 }}
              transition={reduceMotion ? undefined : { duration: 0.3 }}
              className="pointer-events-none absolute inset-0 -top-2 select-none text-center text-[clamp(3.5rem,10vw,8rem)] font-light leading-none tracking-[-0.08em] text-text"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {word}
            </motion.p>

            <div className="relative z-10 flex h-full flex-col justify-end gap-4">
              <div className="space-y-2">
                <p className="text-[0.6rem] uppercase tracking-[0.45em] text-muted/70">Archive number</p>
                <p className="text-sm uppercase tracking-[0.3em] text-text">{id}</p>
              </div>

              <div className="space-y-2">
                <motion.h3
                  animate={reduceMotion ? undefined : { opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-2xl font-light tracking-wide text-text"
                >
                  {title}
                </motion.h3>
                <motion.p
                  animate={reduceMotion ? undefined : { opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm leading-7 text-muted"
                >
                  {description}
                </motion.p>
              </div>
            </div>
          </div>

          <motion.div
            animate={reduceMotion ? undefined : { opacity: isActive ? 1 : 0.55 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex items-end justify-between border-t border-white/8 pt-3 text-[0.62rem] uppercase tracking-[0.35em] text-muted"
          >
            <span>{year}</span>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : archivedWork[activeIndex];

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

        <section className="border-t border-white/5 py-20 sm:py-28">
          <div className="space-y-6">
            <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Archived Work</p>
            <div className="space-y-4" onMouseLeave={() => setActiveIndex(null)}>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-surface/60 px-4 py-5 sm:px-6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 flex items-center justify-center text-center text-[clamp(5rem,18vw,16rem)] font-light tracking-[-0.08em] text-white/5"
                >
                  {activeItem?.word ?? "ARCHIVE SHELF"}
                </div>
                <div className="relative flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:gap-4">
                  {archivedWork.map((item, index) => {
                    const isActive = activeIndex === index;
                    const isNeighbor = activeIndex === null ? false : Math.abs(activeIndex - index) === 1;

                    return (
                    <ShelfSpine
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      status={item.status}
                      year={item.year}
                      href={item.href}
                      accent={item.accent}
                      word={item.word}
                      shelfLabel={item.shelfLabel}
                      isActive={isActive}
                      isNeighbor={isNeighbor}
                      onActivate={() => setActiveIndex(index)}
                    />
                    );
                  })}
                </div>
              </div>

              {activeItem ? (
                <motion.div
                  key={activeItem.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-4 rounded-[2rem] border border-white/8 bg-surface/60 p-6 sm:grid-cols-[1.4fr_0.6fr] sm:p-8"
                >
                  <div className="space-y-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.45em] text-muted">
                      Focus record {activeItem.id}
                    </p>
                    <h2 className="text-3xl font-light tracking-wide sm:text-5xl">
                      {activeItem.title}
                    </h2>
                    <p className="max-w-2xl text-sm leading-7 text-muted">
                      {activeItem.description}
                    </p>
                  </div>
                  <div className="grid gap-4 border-t border-white/8 pt-4 text-sm uppercase tracking-[0.28em] text-muted sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                    <div>
                      <p>Year</p>
                      <p className="mt-1 text-text">{activeItem.year}</p>
                    </div>
                    <div>
                      <p>Status</p>
                      <p className="mt-1 text-text">{activeItem.status}</p>
                    </div>
                    <div>
                      <p>Archive source</p>
                      <Link href={activeItem.href} className="mt-1 inline-flex text-text transition hover:text-muted">
                        Open record
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="rounded-[2rem] border border-white/8 bg-surface/40 px-6 py-8 text-sm uppercase tracking-[0.4em] text-muted">
                  Hover a spine to open the record.
                </div>
              )}
            </div>
          </div>
        </section>

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
