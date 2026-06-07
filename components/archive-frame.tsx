"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SiteHeader } from "@/components/site-header";

export function ArchiveFrame({
  activePath,
  timestamp,
  children,
}: {
  activePath:
    | "/"
    | "/archives"
    | "/now"
    | "/identity"
    | "/timeline"
    | "/activity"
  | "/gallery"
  | "/library"
  | "/records"
  | "/birthdays"
  | "/dashboard";
  timestamp?: string;
  children: ReactNode;
}) {
  return (
    <main className="relative isolate overflow-hidden bg-bg text-text">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-archive-grid bg-[length:100%_100%,112px_112px] opacity-[0.08]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_25%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-5 pb-24 pt-5 sm:px-8 lg:pl-[6.75rem] lg:pr-12">
        <SiteHeader activePath={activePath} timestamp={timestamp} />
        {children}
      </div>
    </main>
  );
}

export function ArchiveHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="flex min-h-[52vh] items-end py-18 sm:py-24">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl space-y-6"
      >
        <p className="text-[0.72rem] uppercase tracking-[0.5em] text-muted">{eyebrow}</p>
        <h1 className="text-balance text-6xl font-light tracking-[0.15em] sm:text-8xl lg:text-[8rem]">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">{subtitle}</p>
      </motion.div>
    </section>
  );
}

export function ArchiveSection({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-white/5 py-20 sm:py-28">
      <div className="space-y-6">
        {eyebrow ? <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">{eyebrow}</p> : null}
        {title || subtitle ? (
          <div className="space-y-3">
            {title ? <h2 className="text-balance text-3xl font-light sm:text-5xl">{title}</h2> : null}
            {subtitle ? <p className="max-w-2xl text-sm leading-7 text-muted">{subtitle}</p> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
