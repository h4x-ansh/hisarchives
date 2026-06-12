"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode, WheelEvent as ReactWheelEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { seedTimelineEntries } from "@/lib/timeline/seed";
import type { TimelineEntry } from "@/lib/timeline/types";

const palette = {
  background: "#212842",
  card: "#E7DECC",
  text: "#F0E7D5",
  muted: "#C5B8A0",
  accent: "#212842",
  highlight: "#3A4367",
} as const;

function formatDisplayDate(value: string) {
  const parsedDate = new Date(`${value}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(parsedDate)
    .replace(/,/g, "");
}

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
    <section className="border-t border-white/5 py-14 sm:py-28">
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

function MuseumVisual({ entry }: { entry: TimelineEntry }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.2rem] bg-[linear-gradient(180deg,#f8f2e2,#e8dbc0)]">
      <div className="absolute inset-0 hidden md:block bg-[radial-gradient(circle_at_top_right,rgba(33,40,66,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(58,67,103,0.08),transparent_25%)]" />
      <div className="absolute inset-0 hidden md:block opacity-[0.14] bg-[linear-gradient(rgba(33,40,66,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(33,40,66,0.04)_1px,transparent_1px)] bg-[size:18px_18px]" />
      <div className="relative flex h-full flex-col justify-between p-4 text-[#212842]">
        <div className="flex items-start justify-between text-[0.62rem] uppercase tracking-[0.45em] text-[#6f675b]">
          <span>{entry.category}</span>
          <span>archive visual</span>
        </div>
        <div className="flex flex-1 items-center justify-center">
          {entry.coverImageUrl ? (
            <img
              src={entry.coverImageUrl}
              alt={entry.title}
              className="h-full w-full rounded-[1.1rem] object-cover shadow-[0_14px_30px_rgba(33,40,66,0.08)]"
            />
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-3 rounded-[1.2rem] bg-white/45 px-4 py-5 text-center shadow-[0_12px_30px_rgba(33,40,66,0.08)]">
              <p className="text-[0.62rem] uppercase tracking-[0.45em] text-[#6f675b]">{entry.year}</p>
              <div className="rounded-[1.35rem] bg-white/45 px-4 py-5 shadow-[0_12px_30px_rgba(33,40,66,0.08)]">
                <p className="text-3xl font-light tracking-[0.2em] text-[#212842]">{entry.word}</p>
              </div>
              <p className="max-w-[12rem] text-sm leading-7 text-[#5f574c]">{entry.category}</p>
            </div>
          )}
        </div>
        <div className="flex items-end justify-between text-[0.62rem] uppercase tracking-[0.45em] text-[#6f675b]">
          <span>archival plate</span>
          <span>{entry.title}</span>
        </div>
      </div>
    </div>
  );
}

function TimelineRuler({ startLabel, endLabel }: { startLabel: string; endLabel: string }) {
  return (
    <div className="flex items-center gap-2 overflow-hidden sm:hidden">
      <span className="shrink-0 text-[0.62rem] uppercase tracking-[0.4em] text-[#E7DECC]">{startLabel}</span>
      <div className="flex min-w-0 flex-1 items-center gap-1">
        <span className="h-px min-w-0 flex-1 bg-gradient-to-r from-transparent via-[#3A4367]/45 to-transparent" />
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3A4367]" />
        ))}
        <span className="h-px min-w-0 flex-1 bg-gradient-to-r from-transparent via-[#3A4367]/45 to-transparent" />
      </div>
      <span className="shrink-0 text-[0.62rem] uppercase tracking-[0.4em] text-[#E7DECC]">{endLabel}</span>
    </div>
  );
}

function TimelineHero({
  entry,
  isTouchDevice,
}: {
  entry: TimelineEntry;
  isTouchDevice: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={entry.title}
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.78fr)] xl:items-start"
      >
        <div className="space-y-4">
          <p className="text-[0.68rem] uppercase tracking-[0.5em] text-[#c5b8a0]">Selected record</p>
          <div className="relative flex items-end gap-4">
            <p className="pointer-events-none absolute left-0 top-[-0.6rem] select-none text-[clamp(6rem,15vw,9rem)] leading-none tracking-[-0.08em] text-[#f6f0e2] opacity-[0.08]">
              {entry.year}
            </p>
            <p className="relative text-[clamp(4.1rem,10vw,7rem)] leading-none tracking-[-0.06em] text-[#fbf6eb] drop-shadow-[0_1px_0_rgba(0,0,0,0.12)]">
              {entry.year}
            </p>
            <div className="pb-2">
              <p className="text-[0.66rem] uppercase tracking-[0.45em] text-[#c5b8a0]">You are here</p>
              <div className="mt-2 h-3 w-3 rounded-full bg-[#3A4367] shadow-[0_0_0_9px_rgba(58,67,103,0.12),0_0_26px_rgba(58,67,103,0.38)]" />
            </div>
          </div>
          <h2 className="max-w-3xl text-[clamp(2.3rem,5vw,5rem)] font-light leading-[0.92] tracking-[-0.04em] text-[#fbf6eb]">
            {entry.title}
          </h2>
          <p className="max-w-3xl text-lg leading-8 text-[#e4dac8] sm:text-xl sm:leading-9">{entry.summary}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <span className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[0.62rem] uppercase tracking-[0.38em] text-[#c5b8a0]">
              {entry.category}
            </span>
            <span className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[0.62rem] uppercase tracking-[0.38em] text-[#c5b8a0]">
              {formatDisplayDate(entry.date)}
            </span>
            <span className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[0.62rem] uppercase tracking-[0.38em] text-[#c5b8a0]">
              {entry.status}
            </span>
          </div>
        </div>

        <motion.div
          animate={reduceMotion || isTouchDevice ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: reduceMotion || isTouchDevice ? 0 : Infinity, ease: "easeInOut" }}
          className="relative mx-auto h-[12.25rem] w-full max-w-[12.5rem] overflow-hidden rounded-[1.65rem] bg-[#f5ebd6] shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:h-[18rem] sm:max-w-[18rem]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.84),transparent_30%),radial-gradient(circle_at_50%_68%,rgba(33,40,66,0.12),transparent_34%)]" />
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(33,40,66,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(33,40,66,0.07)_1px,transparent_1px)] bg-[size:18px_18px]" />
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
            {entry.coverImageUrl ? (
              <img src={entry.coverImageUrl} alt={entry.title} className="h-full w-full object-cover" />
            ) : (
              <div className="max-w-[11rem] rounded-[1.1rem] bg-white/55 px-4 py-4 shadow-[0_12px_34px_rgba(33,40,66,0.1)] backdrop-blur-sm">
                <p className="text-[0.66rem] uppercase tracking-[0.4em] text-[#6f675b]">Related visual</p>
                <p className="mt-3 text-sm leading-7 text-[#5f574c]">
                  {entry.summary}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function MuseumCard({
  entry,
  active,
  onActivate,
  isTouchDevice,
}: {
  entry: TimelineEntry;
  active: boolean;
  onActivate: () => void;
  isTouchDevice: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const cardWidth = isTouchDevice
    ? active
      ? "clamp(13rem, 82vw, 15rem)"
      : "clamp(6rem, 20vw, 7rem)"
    : active
      ? "clamp(19rem, 46vw, 36rem)"
      : "clamp(3.35rem, 4.2vw, 4.1rem)";

  const cardHeight = isTouchDevice ? (active ? "14.75rem" : "14rem") : "26.5rem";

  return (
    <motion.button
      type="button"
      onClick={onActivate}
      whileHover={reduceMotion || isTouchDevice ? undefined : { y: -5, scale: 1.02 }}
      whileTap={reduceMotion || isTouchDevice ? undefined : { scale: 0.99 }}
      className={`group relative block rounded-[1.55rem] border border-white/12 p-3 text-left shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3A4367]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
        isTouchDevice
          ? "h-[14rem] w-[6.1rem] bg-[#eadfc9] sm:h-[22rem] sm:w-[13.5rem]"
          : "h-[17rem] w-[10.25rem] bg-[linear-gradient(180deg,rgba(255,247,232,0.16),rgba(255,247,232,0.08))] sm:h-[21rem] sm:w-[13rem]"
      }`}
      style={{
        width: cardWidth,
        height: cardHeight,
        boxShadow: active ? "0 18px 54px rgba(0,0,0,0.28)" : "0 12px 40px rgba(0,0,0,0.18)",
      }}
    >
      <div
        className="absolute inset-0 rounded-[1.55rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isTouchDevice ? "none" : `radial-gradient(circle at top, ${entry.accent}22 0%, transparent 45%)`,
        }}
      />

      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-[1.15rem] p-4 ${
          isTouchDevice ? "bg-[#f1e3cb]" : "bg-[linear-gradient(180deg,rgba(255,247,232,0.42),rgba(255,247,232,0.18))]"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-[0.66rem] uppercase tracking-[0.46em] text-[#c5b8a0]">{entry.year}</p>
          <span
            className="rounded-full px-2 py-1 text-[0.56rem] uppercase tracking-[0.34em]"
            style={{
              color: entry.accent,
              backgroundColor: `${entry.accent}18`,
            }}
          >
            {active ? "active" : "record"}
          </span>
        </div>

        {active ? (
          <>
            <div className="mt-4 flex-1">
              <div
                className={`h-[6.5rem] rounded-[1rem] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] sm:h-[8rem] ${
                  isTouchDevice ? "bg-[#efe4cf]" : "bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(246,238,224,0.25))]"
                }`}
              >
                <MuseumVisual entry={entry} />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-xl leading-none tracking-[-0.04em] text-[#fbf6eb]">{entry.title}</p>
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[#c5b8a0]">Archive label</p>
              <p className="text-sm leading-6 text-[#e4dac8]">{entry.category}</p>
              <p className="text-sm leading-6 text-[#e4dac8]">{entry.summary}</p>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-3 text-center">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.accent, boxShadow: `0 0 0 8px ${entry.accent}18` }}
            />
            <p className="text-[0.58rem] uppercase tracking-[0.44em] text-[#c5b8a0]">Spine</p>
            <p className="max-w-[4.8rem] text-[0.72rem] leading-tight tracking-[0.18em] text-[#f8f2e7]">
              {entry.word}
            </p>
          </div>
        )}
      </div>
    </motion.button>
  );
}

function TimelineLogEntry({ entry }: { entry: TimelineEntry }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-4 border-b border-white/5 py-5 sm:grid-cols-[9rem_1fr]"
    >
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.35em] text-muted">{formatDisplayDate(entry.date)}</p>
        <p className="text-[0.62rem] uppercase tracking-[0.35em] text-muted/70">{entry.category}</p>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-light leading-8 text-text sm:text-xl">{entry.title}</p>
        <p className="text-sm leading-7 text-muted sm:text-base">{entry.summary}</p>
      </div>
    </motion.div>
  );
}

export function TimelinePage({ initialEntries = [] }: { initialEntries?: TimelineEntry[] }) {
  const reduceMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const timelineEntries = initialEntries.length ? initialEntries : seedTimelineEntries;
  const selectedEntry = timelineEntries[Math.min(selectedIndex, timelineEntries.length - 1)] ?? timelineEntries[0];
  const startLabel = timelineEntries[timelineEntries.length - 1]?.year ?? "2025";
  const endLabel = timelineEntries[0]?.year ?? "2031";

  useEffect(() => {
    const touchQuery = window.matchMedia("(hover: none)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const updateTouchState = () => {
      setIsTouchDevice(touchQuery.matches || pointerQuery.matches);
    };

    updateTouchState();
    touchQuery.addEventListener("change", updateTouchState);
    pointerQuery.addEventListener("change", updateTouchState);

    return () => {
      touchQuery.removeEventListener("change", updateTouchState);
      pointerQuery.removeEventListener("change", updateTouchState);
    };
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [timelineEntries.length]);

  function handleWheel(event: ReactWheelEvent<HTMLDivElement>) {
    const rail = railRef.current;
    if (!rail) return;

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      rail.scrollLeft += event.deltaY;
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-[#F0E7D5]" style={{ background: palette.background }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,67,103,0.18),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(240,231,213,0.05),transparent_22%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-screen bg-[linear-gradient(rgba(255,247,232,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,247,232,0.045)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0,transparent_58%,rgba(18,20,38,0.06)_100%)]" />

      <div className="relative mx-auto w-full max-w-[96rem] px-5 pb-10 pt-5 sm:px-8 lg:px-10 xl:px-12">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-2">
            <p className="text-[0.66rem] uppercase tracking-[0.5em]" style={{ color: palette.muted }}>
              Museum timeline
            </p>
            <h1 className="text-2xl font-light tracking-[0.22em] text-[#F0E7D5] sm:text-3xl">TIMELINE</h1>
          </div>
        </header>

        <section className="mt-4 sm:mt-5">
          <div className="rounded-[3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,247,232,0.06),rgba(255,247,232,0.025))] px-4 py-4 shadow-[0_24px_90px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:px-5 sm:py-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.66rem] uppercase tracking-[0.5em]" style={{ color: palette.muted }}>
                  Milestones
                </p>
                <p className="mt-2 hidden text-base uppercase tracking-[0.35em] text-[#E7DECC] sm:block sm:text-lg">
                  {startLabel} ─────●─────●─────●─────●─────●─────●───── {endLabel}
                </p>
                <TimelineRuler startLabel={startLabel} endLabel={endLabel} />
              </div>
              <div className="hidden items-center gap-3 text-[0.64rem] uppercase tracking-[0.35em] text-[#c5b8a0] sm:flex">
                <Link href="/" className="transition-colors hover:text-[#fbf6eb]">
                  Home
                </Link>
                <span className="text-white/20">/</span>
                <Link href="/archives" className="transition-colors hover:text-[#fbf6eb]">
                  Archives
                </Link>
                <span className="text-white/20">/</span>
                <Link href="/now" className="transition-colors hover:text-[#fbf6eb]">
                  Now
                </Link>
              </div>
            </div>

            <div className="relative rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,247,232,0.05),rgba(255,247,232,0.02))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-5 sm:py-5">
              <div className="pointer-events-none absolute left-5 right-5 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#3A4367]/28 to-transparent" />
              <div className="pointer-events-none absolute left-5 right-5 top-1/2 h-[1px] -translate-y-1/2 bg-[#3A4367]/14 blur-[0.5px]" />

              <div
                ref={railRef}
                onWheel={handleWheel}
                className="relative flex gap-4 overflow-x-auto pb-2 pt-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                style={{ touchAction: "pan-x" }}
              >
                {timelineEntries.map((entry, index) => {
                  const active = index === selectedIndex;
                  const before = index < selectedIndex;

                  return (
                    <motion.div
                      key={`${entry.date}-${entry.title}`}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onFocus={() => setSelectedIndex(index)}
                      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.04 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.995 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="relative shrink-0"
                    >
                      <div className="mb-3 flex items-center justify-center">
                        <div
                          className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition-transform ${
                            active ? "scale-150" : "scale-100"
                          } ${before ? "border-[#3A4367] bg-[#3A4367]/30" : "border-white/20 bg-white/10"}`}
                          style={{
                            boxShadow: active ? `0 0 0 8px rgba(58,67,103,0.14), 0 0 24px rgba(58,67,103,0.38)` : undefined,
                            backgroundColor: active ? palette.highlight : undefined,
                          }}
                        >
                          {active ? (
                            <span className="absolute -top-7 whitespace-nowrap text-[0.62rem] uppercase tracking-[0.38em] text-[#6f675b]">
                              YOU ARE HERE
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="relative">
                        {active ? (
                          <div className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#3A4367] shadow-[0_0_0_10px_rgba(58,67,103,0.1)]" />
                        ) : null}
                        <MuseumCard entry={entry} active={active} onActivate={() => setSelectedIndex(index)} isTouchDevice={isTouchDevice} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-[3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,247,232,0.05),rgba(255,247,232,0.02))] px-5 py-5 shadow-[0_24px_90px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:mt-5 sm:px-6 sm:py-6 xl:px-8 xl:py-7">
            <TimelineHero entry={selectedEntry} isTouchDevice={isTouchDevice} />
          </div>
        </section>

        <Section
          eyebrow="Archive Logs"
          title="Timeline notes."
          subtitle="A clean log generated from the same archive records that power the public timeline."
        >
          <div className="rounded-[2rem] border border-white/8 bg-surface/70 px-6 py-3 backdrop-blur-sm sm:px-8">
            {timelineEntries.map((entry) => (
              <TimelineLogEntry key={`${entry.date}-${entry.title}`} entry={entry} />
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
