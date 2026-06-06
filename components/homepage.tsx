"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Lenis from "lenis";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SiteHeader } from "@/components/site-header";

const objectives = [
  {
    title: "JEE 2027",
    description: "A long arc of discipline, repetition, and sharper thinking.",
  },
  {
    title: "Fitness",
    description: "Training the body so the mind stays honest and durable.",
  },
  {
    title: "Projects",
    description: "Small systems, experiments, and ideas that become proof.",
  },
  {
    title: "Creation",
    description: "The habit of leaving something behind that can be revisited.",
  },
];

const livingRecords = [
  { date: "06 JUN 2026", text: "Identity system updated" },
  { date: "05 JUN 2026", text: "Navigation rebuilt" },
  { date: "04 JUN 2026", text: "hisarchives.xyz launched" },
] as const;

const archiveQuotes = [
  "Every life leaves traces.",
  "Nothing is forgotten.",
  "The archive remains active.",
  "Records continue to accumulate.",
] as const;

function Section({
  eyebrow,
  title,
  id,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <div className="space-y-6">
        {eyebrow ? (
          <p className="text-[0.7rem] uppercase tracking-[0.4em] text-muted">
            {eyebrow}
          </p>
        ) : null}
        {title ? <h2 className="text-balance text-3xl font-light sm:text-5xl">{title}</h2> : null}
        {children}
      </div>
    </section>
  );
}

function ObjectiveCard({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="group relative overflow-hidden rounded-3xl border border-white/8 bg-surface/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_0_24px_rgba(139,92,246,0.08)] sm:p-7"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_45%,rgba(139,92,246,0.08))] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <p className="absolute right-5 top-5 text-[0.62rem] uppercase tracking-[0.4em] text-muted">REC-{String(index).padStart(2, "0")}</p>
      <div className="relative space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-muted">
          ACTIVE OBJECTIVE #{String(index).padStart(2, "0")}
        </p>
        <h3 className="text-2xl font-light tracking-wide text-text">{title}</h3>
        <p className="max-w-xs text-sm leading-7 text-muted">{description}</p>
      </div>
    </motion.article>
  );
}

function ArchiveEntryMarker({
  number,
  line,
}: {
  number: string;
  line: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="py-8 sm:py-10"
    >
      <div className="max-w-xs space-y-2">
        <p className="text-[0.62rem] uppercase tracking-[0.55em] text-muted/65">ENTRY {number}</p>
        <p className="text-sm font-light tracking-wide text-text/80">{line}</p>
      </div>
    </motion.div>
  );
}

export function Homepage() {
  const reduceMotion = useReducedMotion();
  const [statusIndex, setStatusIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [heroShift, setHeroShift] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.55,
      smoothWheel: true,
      lerp: 0.18,
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setStatusIndex((current) => (current + 1) % livingRecords.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setStoryIndex((current) => (current + 1) % archiveQuotes.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <main className="relative isolate overflow-hidden bg-bg text-text">
      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { x: ["-1.5%", "1.5%", "-1.5%"], y: ["-1%", "1%", "-1%"] }}
        transition={reduceMotion ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_28%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-archive-grid bg-[length:100%_100%,112px_112px] opacity-[0.06]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:28px_28px] opacity-[0.02]" />
      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { opacity: [0.18, 0.24, 0.18] }}
        transition={reduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0))]"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-5 pb-24 pt-5 sm:px-8 lg:px-12">
        <SiteHeader activePath="/" timestamp="last updated 05 jun 2026" />

        <section
          ref={heroRef}
          id="hero"
          onMouseMove={(event) => {
            if (reduceMotion || !heroRef.current) {
              return;
            }

            const bounds = heroRef.current.getBoundingClientRect();
            const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
            const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 12;
            setHeroShift({ x, y });
          }}
          onMouseLeave={() => setHeroShift({ x: 0, y: 0 })}
          className="relative flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center text-center"
        >
          <motion.div
            aria-hidden
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-[22%] -z-10 -translate-x-1/2 select-none text-[clamp(8rem,22vw,18rem)] font-light tracking-[-0.12em] text-text/20 blur-2xl opacity-[0.02]"
            style={{ transform: `translate(calc(-50% + ${heroShift.x * 0.45}px), ${heroShift.y * 0.45}px)` }}
          >
            ARCHIVE_001
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 top-8 hidden h-full sm:block">
            <motion.p
              aria-hidden
              className="absolute left-0 top-6 text-[0.62rem] uppercase tracking-[0.45em] text-muted/70"
              style={{ transform: `translate(${heroShift.x * 0.2}px, ${heroShift.y * 0.2}px)` }}
            >
              REC-001
            </motion.p>
            <motion.p
              aria-hidden
              className="absolute right-2 top-16 text-[0.62rem] uppercase tracking-[0.45em] text-muted/70"
              style={{ transform: `translate(${heroShift.x * 0.16}px, ${heroShift.y * 0.16}px)` }}
            >
              EST. 2026
            </motion.p>
            <motion.p
              aria-hidden
              className="absolute left-1/2 bottom-10 -translate-x-1/2 text-[0.62rem] uppercase tracking-[0.45em] text-muted/70"
              style={{ transform: `translate(-50%, ${heroShift.y * 0.18}px)` }}
            >
              STATUS: ACTIVE
            </motion.p>
            <motion.p
              aria-hidden
              className="absolute bottom-1 right-0 text-[0.62rem] uppercase tracking-[0.45em] text-muted/70"
              style={{ transform: `translate(${heroShift.x * 0.18}px, ${heroShift.y * 0.18}px)` }}
            >
              NODE: INDIA
            </motion.p>
          </div>

          <div style={{ transform: `translate3d(${heroShift.x}px, ${heroShift.y}px, 0)` }} className="will-change-transform">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-7"
            >
              <p className="text-[0.72rem] uppercase tracking-[0.5em] text-muted">
                a living archive
              </p>
              <h1 className="text-balance text-6xl font-light tracking-[0.15em] sm:text-8xl lg:text-[8.75rem]">
                THE ARCHIVES
              </h1>
              <p className="mx-auto max-w-xs text-sm uppercase leading-8 tracking-[0.35em] text-muted sm:max-w-none sm:text-base">
                projects.
                <br />
                thoughts.
                <br />
                progress.
                <br />
                memories.
              </p>
            </motion.div>

            <div className="mt-10 flex min-h-[9rem] w-full max-w-md flex-col items-center justify-center gap-4 text-center sm:mt-12">
              <p className="text-[0.68rem] uppercase tracking-[0.55em] text-muted">Live Record</p>
              <AnimatePresence mode="wait">
              <motion.div
                  key={`${livingRecords[statusIndex].date}-${livingRecords[statusIndex].text}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3"
                >
                  <p className="text-sm uppercase tracking-[0.35em] text-muted">{livingRecords[statusIndex].date}</p>
                  <p className="text-base font-light tracking-wide text-text sm:text-lg">
                    {livingRecords[statusIndex].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-20 right-0 hidden sm:block"
            >
              <div className="group relative">
                <button
                  type="button"
                  className="text-[0.6rem] uppercase tracking-[0.45em] text-muted/60 transition-colors hover:text-text/90"
                  title="Domain purchased. 04 Jun 2026."
                >
                  ARCHIVE FRAGMENT #04
                </button>
                <span className="pointer-events-none absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-[0.62rem] uppercase tracking-[0.3em] text-text opacity-0 transition-opacity group-hover:opacity-100">
                  Domain purchased. 04 Jun 2026.
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <ArchiveEntryMarker number="#003" line="Discipline compounds." />

        <Section className="border-t border-white/5">
          <div className="max-w-5xl space-y-4 sm:space-y-6">
            <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Archive quote</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={archiveQuotes[storyIndex]}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-balance text-4xl font-light leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl"
              >
                {archiveQuotes[storyIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </Section>

        <ArchiveEntryMarker number="#007" line="Systems beat motivation." />

        <Section id="beginning" className="relative border-t border-white/5">
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div className="space-y-5">
              <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Archive Entry #0001</p>
              <h2 className="text-[clamp(4.5rem,16vw,11rem)] font-light leading-none tracking-[-0.08em]">
                2026
              </h2>
            </div>
            <p className="max-w-md text-2xl font-light leading-tight text-muted sm:text-3xl">
              Restarted.
              <br />
              Rebuilding.
              <br />
              Class 11.
              <br />
              JEE 2027 initiated.
            </p>
          </div>
        </Section>

        <ArchiveEntryMarker number="#011" line="The archive remains active." />

        <Section id="identity" className="relative border-t border-white/5">
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="space-y-5">
              <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Identity record</p>
              <h2 className="text-[clamp(4rem,10vw,8rem)] font-light leading-none tracking-[-0.08em]">
                ANSH
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-muted">Recorded in</p>
                <p className="text-3xl font-light">India</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-muted">Current phase</p>
                <p className="text-3xl font-light">Class 11</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-muted">Primary objective</p>
                <p className="text-xl font-light text-muted sm:text-2xl">JEE 2027</p>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.35em] text-muted">Status</p>
                <p className="text-xl font-light text-text sm:text-2xl">Building</p>
                <p className="max-w-lg text-2xl font-light leading-tight text-muted sm:text-3xl">
                  Classified record in motion.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <ArchiveEntryMarker number="#014" line="Progress is recorded." />

        <Section id="objectives" className="border-t border-white/5">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-4">
              <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Active record</p>
              <h2 className="text-3xl font-light sm:text-5xl">What is being carried forward.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted">
              A current register of work, discipline, and unfinished ambition.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {objectives.map((objective, index) => (
              <ObjectiveCard
                index={index + 1}
                key={objective.title}
                title={objective.title}
                description={objective.description}
              />
            ))}
          </div>
        </Section>

        <Section id="archives" className="border-t border-white/5 pb-10">
          <div className="relative flex flex-col items-start gap-6 rounded-[2rem] border border-white/8 bg-surface/70 p-8 shadow-glow backdrop-blur-sm sm:p-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Enter Archives</p>
              <h2 className="text-balance text-4xl font-light tracking-[-0.04em] sm:text-6xl">
                Open the archive index.
              </h2>
            </div>
            <Link
              href="/archives"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.3em] text-text transition duration-300 hover:border-accent/50 hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              ENTER ARCHIVES
              <span aria-hidden className="text-lg leading-none">
                {"->"}
              </span>
            </Link>
          </div>
        </Section>
      </div>
    </main>
  );
}
