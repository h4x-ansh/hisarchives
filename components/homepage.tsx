"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import Link from "next/link";
import Lenis from "lenis";
import { motion, useReducedMotion } from "framer-motion";

const storyLines = ["Every life leaves traces.", "Most disappear.", "Some are archived."];

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

function Section({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-20 sm:py-28 ${className}`}>
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
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      className="group relative overflow-hidden rounded-3xl border border-white/8 bg-surface/80 p-6 shadow-glow backdrop-blur-sm sm:p-7"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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

export function Homepage() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      lerp: 0.085,
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

  return (
    <main className="relative isolate overflow-hidden bg-bg text-text">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-archive-grid bg-[length:100%_100%,112px_112px] opacity-[0.08]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_25%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-5 pb-24 pt-5 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/5 py-4 text-[0.72rem] uppercase tracking-[0.38em] text-muted">
          <span>hisarchives.xyz</span>
          <span>last updated 05 jun 2026</span>
        </header>

        <section className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
        </section>

        <Section className="border-t border-white/5">
          <div className="max-w-5xl space-y-4 sm:space-y-6">
            {storyLines.map((line, index) => (
              <motion.p
                key={line}
                initial={reduceMotion ? false : { opacity: 0, y: 34 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="text-balance text-4xl font-light leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </Section>

        <Section className="border-t border-white/5">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div className="space-y-5">
              <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Beginning</p>
              <h2 className="text-[clamp(6rem,18vw,13rem)] font-light leading-none tracking-[-0.08em]">
                2026
              </h2>
            </div>
            <p className="max-w-md text-2xl font-light leading-tight text-muted sm:text-3xl">
              The beginning.
            </p>
          </div>
        </Section>

        <Section className="border-t border-white/5">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="space-y-5">
              <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">
                Identity record
              </p>
              <h2 className="text-[clamp(4rem,10vw,8rem)] font-light leading-none tracking-[-0.08em]">
                ANSH
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-muted">Archive age</p>
                <p className="text-3xl font-light">18</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-muted">Recorded in</p>
                <p className="text-3xl font-light">India</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-muted">Current phase</p>
                <p className="text-xl font-light text-muted sm:text-2xl">Class 11</p>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.35em] text-muted">Current state</p>
                <p className="text-xl font-light text-muted sm:text-2xl">Building</p>
                <p className="max-w-lg text-2xl font-light leading-tight text-text sm:text-3xl">
                  Studying.
                  <br />
                  Creating.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section className="border-t border-white/5">
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

        <Section className="border-t border-white/5 pb-10">
          <div className="flex flex-col items-start gap-6 rounded-[2rem] border border-white/8 bg-surface/70 p-8 shadow-glow backdrop-blur-sm sm:p-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Enter Archives</p>
              <h2 className="text-balance text-4xl font-light tracking-[-0.04em] sm:text-6xl">
                Step inside the record.
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
