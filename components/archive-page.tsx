"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const archiveNumber = id.padStart(4, "0");
  const spineTitle = getSpineTitle(title);
  const width = isActive
    ? "clamp(22rem, 60vw, 40rem)"
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
      animate={{ width, opacity: isActive ? 1 : 0.72 }}
      className="relative h-[28rem] flex-shrink-0 overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(13,13,13,0.95),rgba(13,13,13,0.82))]"
      style={{
        boxShadow: isActive
          ? `0 0 0 1px ${accent}20, 0 18px 60px rgba(0,0,0,0.22)`
          : "0 12px 36px rgba(0,0,0,0.14)",
      }}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
    >
      <Link href={href} className="absolute inset-0 z-10" aria-label={title} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: isActive ? 1 : 0.35,
          backgroundImage: `radial-gradient(circle at 50% 20%, ${accent}12, transparent 34%), radial-gradient(circle at 50% 100%, ${accent}05, transparent 44%)`,
        }}
      />

      <div className="relative flex h-full flex-col p-4 sm:p-5">
        <div
          className="relative flex h-full flex-1 flex-col justify-between overflow-hidden rounded-[1.1rem] bg-black/15 px-3 py-4"
          style={{
            background: isActive
              ? "linear-gradient(180deg, rgba(13,13,13,0.92), rgba(13,13,13,0.66))"
              : "linear-gradient(180deg, rgba(13,13,13,0.86), rgba(13,13,13,0.54))",
          }}
        >
          <motion.p
            aria-hidden
            animate={reduceMotion ? undefined : { opacity: isActive ? 0.022 : 0 }}
            transition={reduceMotion ? undefined : { duration: 0.3 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none text-center text-[clamp(6rem,22vw,18rem)] font-light tracking-[-0.08em] text-white"
          >
            {archiveNumber}
          </motion.p>

          <motion.p
            aria-hidden
            animate={reduceMotion ? undefined : { opacity: isActive ? 0.02 : 0 }}
            transition={reduceMotion ? undefined : { duration: 0.28 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none text-center text-[clamp(7rem,20vw,18rem)] font-light leading-none tracking-[-0.1em] text-white"
          >
            {itemWordFromTitle(title)}
          </motion.p>

          <motion.div
            aria-hidden
            animate={reduceMotion ? undefined : { opacity: isActive ? 0.95 : 0.8 }}
            transition={reduceMotion ? undefined : { duration: 0.28 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="flex select-none flex-col items-center justify-center gap-[0.12em] text-center text-[0.7rem] font-medium uppercase tracking-[0.55em] text-text/90">
              {spineTitle.split("").map((character, index) => (
                <span key={`${character}-${index}`} className="block leading-none">
                  {character === " " ? "\u00a0" : character}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="relative z-10 flex h-full flex-col justify-between gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <p className="text-[0.62rem] uppercase tracking-[0.45em] text-muted">{id}</p>
                <p className="max-w-[7rem] text-[0.62rem] uppercase tracking-[0.35em] text-muted/80">
                  {shelfLabel}
                </p>
              </div>
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-muted/75">{status}</p>
            </div>

            <motion.div
              animate={reduceMotion ? undefined : { x: isActive ? [0, 6, 0] : 0, y: isActive ? [0, -2, 0] : 0 }}
              transition={reduceMotion ? undefined : { duration: 9, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
              className="space-y-2"
            >
              {isActive ? (
                <>
                  <motion.h3
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl font-light tracking-wide text-text"
                  >
                    {title}
                  </motion.h3>
                  <motion.p
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-md text-sm leading-7 text-muted"
                  >
                    {description}
                  </motion.p>
                </>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="flex select-none flex-col items-center justify-center gap-[0.14em] text-center text-[0.72rem] font-medium uppercase tracking-[0.45em] text-text/90">
                    {spineTitle.split("").map((character, index) => (
                      <span key={`${character}-${index}`} className="block leading-none">
                        {character === " " ? "\u00a0" : character}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              animate={reduceMotion ? undefined : { opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 pt-1"
            >
              <div className="grid grid-cols-2 gap-4 text-[0.62rem] uppercase tracking-[0.35em] text-muted">
                <div>
                  <p>Status</p>
                  <p className="mt-1 inline-flex items-center gap-2 text-sm tracking-[0.2em] text-text">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }} />
                    {status.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p>Year</p>
                  <p className="mt-1 text-sm tracking-[0.2em] text-text">{year}</p>
                </div>
              </div>
              <div className="grid gap-2 text-[0.62rem] uppercase tracking-[0.35em] text-muted">
                <div>
                  <p>Archive number</p>
                  <p className="mt-1 text-sm tracking-[0.3em] text-text">{id}</p>
                </div>
                <div>
                  <p>Source</p>
                  <Link href={href} className="mt-1 inline-flex text-sm tracking-[0.25em] text-text transition hover:text-muted">
                    Learn more →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function itemWordFromTitle(title: string) {
  if (title === "Discord Automation") return "DISCORD";
  if (title === "Tournament Platform") return "TOURNAMENT";
  if (title === "HisArchives") return "HISARCHIVES";
  if (title === "JEE 2027") return "JEE 2027";
  if (title === "Fitness") return "FITNESS";
  if (title === "Memories") return "MEMORIES";
  return "NOTES";
}

function getSpineTitle(title: string) {
  if (title === "JEE 2027") {
    return title;
  }

  const [firstWord] = title.split(" ");
  return firstWord.toUpperCase();
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
  const [showLoader, setShowLoader] = useState(false);
  const [loaderStep, setLoaderStep] = useState(0);
  const activeItem = activeIndex === null ? null : archivedWork[activeIndex];

  useEffect(() => {
    const seen = window.sessionStorage.getItem("hisarchives-archives-visited");

    if (!seen) {
      window.sessionStorage.setItem("hisarchives-archives-visited", "1");
      setShowLoader(true);
      setLoaderStep(0);

      const stepTimer = window.setInterval(() => {
        setLoaderStep((current) => Math.min(current + 1, 3));
      }, 280);

      const doneTimer = window.setTimeout(() => {
        setShowLoader(false);
        window.clearInterval(stepTimer);
      }, 1320);

      return () => {
        window.clearInterval(stepTimer);
        window.clearTimeout(doneTimer);
      };
    }

    setShowLoader(false);
  }, []);

  return (
    <main className="relative isolate overflow-hidden bg-bg text-text">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-archive-grid bg-[length:100%_100%,112px_112px] opacity-[0.08]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_25%)]" />

      <AnimatePresence>
        {showLoader ? (
          <motion.div
            key="archive-loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-bg/96 px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md space-y-4 text-center"
            >
              {[
                "ACCESSING ARCHIVE...",
                "LOADING RECORDS...",
                "VERIFYING INDEX...",
                "11 RECORDS FOUND",
              ].map((line, index) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: loaderStep >= index ? 1 : 0.12, y: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="text-sm uppercase tracking-[0.45em] text-text"
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

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

        <section className="relative border-t border-white/5 py-20 sm:py-28">
          <div className="space-y-6">
            <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Archived Work</p>
            <div className="space-y-4" onMouseLeave={() => setActiveIndex(null)}>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-surface/60 px-4 py-5 sm:px-6">
                <AnimatePresence mode="wait">
                  {activeItem ? (
                    <motion.div
                      key={activeItem.word}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.05 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      aria-hidden
                      className="pointer-events-none absolute inset-0 flex items-center justify-center text-center text-[clamp(6rem,22vw,18rem)] font-light tracking-[-0.08em] text-white"
                    >
                      {activeItem.word}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="archive-shelf"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.03 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      aria-hidden
                      className="pointer-events-none absolute inset-0 flex items-center justify-center text-center text-[clamp(4rem,16vw,14rem)] font-light tracking-[-0.08em] text-white"
                    >
                      ARCHIVE SHELF
                    </motion.div>
                  )}
                </AnimatePresence>

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

