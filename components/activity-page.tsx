"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { JournalEntry } from "@/lib/journal/types";

const moodThemes: Record<string, { accent: string; glow: string; paper: string }> = {
  Focused:    { accent: "#c4952a", glow: "rgba(196,149,42,0.3)",  paper: "linear-gradient(180deg,#f0dfb0,#d4b46a)" },
  Reflective: { accent: "#7a6e8a", glow: "rgba(122,110,138,0.24)", paper: "linear-gradient(180deg,#d8d0c8,#b0a498)" },
  Calm:       { accent: "#4a7850", glow: "rgba(74,120,80,0.24)",  paper: "linear-gradient(180deg,#c8e0cc,#90b894)" },
  Grateful:   { accent: "#b86030", glow: "rgba(184,96,48,0.26)",  paper: "linear-gradient(180deg,#f0c898,#c87848)" },
};

function DiaryPhoto({ entry }: { entry: JournalEntry }) {
  const theme = moodThemes[entry.mood] ?? moodThemes.Reflective;
  if (entry.photo) return <img src={entry.photo} alt={entry.title} className="h-full w-full object-cover" />;
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: theme.paper }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.6),transparent_28%),radial-gradient(circle_at_78%_24%,rgba(255,255,255,0.14),transparent_24%)]" />
      <div className="absolute inset-x-5 bottom-5 h-20 rounded-[1.4rem] blur-2xl" style={{ background: theme.glow }} />
      <div className="absolute left-6 top-6 rounded-full border border-black/5 bg-white/45 px-3 py-1 text-[0.58rem] uppercase tracking-[0.36em] text-[#5a4c38]">quiet record</div>
      <div className="absolute inset-x-6 top-24 h-[55%] rounded-[1.5rem] border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))]" />
      <div className="absolute left-10 top-28 h-20 w-20 rounded-full bg-white/35 blur-[2px]" />
      <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-[0.65rem] uppercase tracking-[0.32em] text-[#5a4c38]">
        <span>{entry.mood}</span>
        <span>{entry.date}</span>
      </div>
    </div>
  );
}

function NotebookPage({ entry, side }: { entry: JournalEntry; side: "left" | "right" }) {
  const theme = moodThemes[entry.mood] ?? moodThemes.Reflective;
  const isLeft = side === "left";

  return (
    <div
      className={`relative h-full min-h-[0] px-5 py-4 sm:px-6 sm:py-5 ${isLeft ? "lg:pr-8" : "lg:pl-8"}`}
      style={{ background: "#211810" }}
    >
      {/* ruled lines */}
      <div className="absolute inset-0 opacity-[0.09] bg-[linear-gradient(rgba(200,160,100,0.12)_1px,transparent_1px)] bg-[length:100%_28px]" />

      <div className={`relative z-10 flex h-full flex-col ${isLeft ? "pr-3 lg:pr-5" : "pl-3 lg:pl-5"}`}>
        {isLeft ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.48em]" style={{ color: "#7a6448" }}>Date</p>
                <p className="mt-1 text-[1.55rem] font-light tracking-[0.12em]" style={{ color: "#e8d4b0" }}>{entry.date}</p>
              </div>
              <div className="h-9 w-9 rounded-full" style={{ background: theme.accent, boxShadow: `0 0 0 8px rgba(255,255,255,0.06), 0 0 20px ${theme.glow}` }} />
            </div>

            <div className="mx-auto w-full max-w-[18rem] overflow-hidden rounded-[1.45rem] border shadow-[0_18px_42px_rgba(0,0,0,0.4)]"
              style={{ borderColor: "rgba(150,110,60,0.2)" }}>
              <div className="aspect-[4/5]"><DiaryPhoto entry={entry} /></div>
            </div>

            <div className="space-y-1.5">
              <p className="text-[0.64rem] uppercase tracking-[0.46em]" style={{ color: "#7a6448" }}>Caption</p>
              <p className="text-[0.88rem] leading-6" style={{ color: "#c8b090" }}>{entry.caption}</p>
            </div>

            <div className="flex items-center gap-3 rounded-full px-4 py-2 text-sm shadow-[0_8px_18px_rgba(0,0,0,0.3)]"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(150,110,60,0.18)" }}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: theme.accent }} />
              <span className="uppercase tracking-[0.26em]" style={{ color: "#c8b090" }}>{entry.mood}</span>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={entry.id}
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col justify-start"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.48em]" style={{ color: "#7a6448" }}>Journal title</p>
                    <h2 className="mt-1 text-[clamp(1.75rem,3.1vw,3rem)] font-light leading-[0.96] tracking-[-0.04em]" style={{ color: "#e8d4b0" }}>
                      {entry.title}
                    </h2>
                  </div>
                  <span className="rounded-full px-3 py-2 text-[0.64rem] uppercase tracking-[0.34em] shadow-[0_8px_18px_rgba(0,0,0,0.25)]"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(150,110,60,0.18)", color: "#a08868" }}>
                    {entry.readingTime}
                  </span>
                </div>

                <div className="rounded-[1.35rem] p-4"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(150,110,60,0.12)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                  <div className="space-y-3 text-[0.95rem] leading-7 sm:text-[1rem]" style={{ color: "#c8b090" }}>
                    {entry.content.split("\n\n").map((paragraph, index) => (
                      <p key={`${entry.id}-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3.5 space-y-2.5">
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="rounded-full px-3 py-2 text-[0.62rem] uppercase tracking-[0.34em]"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(150,110,60,0.15)", color: "#8a7050" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-[0.65rem] uppercase tracking-[0.38em]" style={{ color: "#7a6448" }}>{entry.readingTime}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export function ActivityPage({ initialEntries }: { initialEntries: JournalEntry[] }) {
  const reduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const sortedEntries = useMemo(
    () => [...initialEntries].sort((l, r) => {
      const lt = Date.parse(l.createdAt) || Date.parse(l.date);
      const rt = Date.parse(r.createdAt) || Date.parse(r.date);
      return rt - lt;
    }),
    [initialEntries],
  );

  const selectedEntry = sortedEntries[selectedIndex] ?? null;

  function stepOlder() { setDirection(1);  setSelectedIndex(c => Math.min(c + 1, sortedEntries.length - 1)); }
  function stepNewer() { setDirection(-1); setSelectedIndex(c => Math.max(c - 1, 0)); }

  return (
    <main className="min-h-screen overflow-auto lg:fixed lg:inset-0 lg:overflow-hidden" style={{ background: "#18130e" }}>
      <SiteHeader activePath="/activity" />

      {/* ambient */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 12% 12%, rgba(160,110,40,0.16), transparent 45%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 88% 88%, rgba(120,75,25,0.12), transparent 40%)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.035,
          backgroundImage: "linear-gradient(rgba(210,160,80,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(210,160,80,0.07) 1px,transparent 1px)",
          backgroundSize: "46px 46px" }} />
      </div>

      <div className="relative mx-auto flex w-full max-w-[96rem] flex-col px-4 py-3 sm:px-6 lg:h-full lg:px-8 xl:pl-[6.75rem]">
        <header className="flex flex-wrap items-center justify-between gap-4 pb-3">
          <div className="space-y-2">
            <p className="text-[0.64rem] uppercase tracking-[0.5em]" style={{ color: "#7a6448" }}>Personal notebook</p>
            <h1 className="text-[2rem] font-light tracking-[0.24em] sm:text-[2.5rem]" style={{ color: "#e8d4b0" }}>JOURNAL</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[0.64rem] uppercase tracking-[0.34em]" style={{ color: "#6a5438" }}>
            <Link href="/" className="transition hover:text-[#e8d4b0]">Home</Link>
            <span style={{ color: "#3a2c1e" }}>/</span>
            <Link href="/archives" className="transition hover:text-[#e8d4b0]">Archives</Link>
            <span style={{ color: "#3a2c1e" }}>/</span>
            <Link href="/now" className="transition hover:text-[#e8d4b0]">Now</Link>
          </div>
        </header>

        <section className="mt-1 flex flex-1 flex-col lg:min-h-0">
          {selectedEntry ? (
            <>
              <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-[2rem] shadow-[0_28px_80px_rgba(0,0,0,0.7)]"
                style={{ border: "1px solid rgba(150,110,60,0.18)", background: "#211810" }}>

                {/* spine */}
                <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[68px] -translate-x-1/2 opacity-20"
                  style={{ background: "linear-gradient(90deg,rgba(0,0,0,0.06),rgba(0,0,0,0.14) 50%,rgba(0,0,0,0.06))" }} />
                <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
                  style={{ background: "rgba(150,110,60,0.25)" }} />

                {/* binding rings */}
                {[{ top: "0.95rem" }, { top: "6.6rem" }, { bottom: "4.8rem" }].map((pos, i) => (
                  <div key={i} className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full"
                    style={{ ...pos, background: "#2e2218", border: "1px solid rgba(150,110,60,0.3)", boxShadow: "0 0 0 8px rgba(33,24,16,0.6)" }} />
                ))}

                <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-2">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`left-${selectedEntry.id}`}
                      initial={reduceMotion ? false : { opacity: 0, x: direction > 0 ? -14 : 14 }}
                      animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, x: direction > 0 ? -14 : 14 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b lg:border-b-0 lg:border-r"
                      style={{ borderColor: "rgba(150,110,60,0.12)" }}
                    >
                      <NotebookPage entry={selectedEntry} side="left" />
                    </motion.div>
                  </AnimatePresence>
                  <div className="relative">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={`right-${selectedEntry.id}`}
                        initial={reduceMotion ? false : { opacity: 0, x: direction > 0 ? 14 : -14 }}
                        animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, x: direction > 0 ? 14 : -14 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <NotebookPage entry={selectedEntry} side="right" />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="flex-none pt-3">
                <div className="flex justify-center px-4">
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 shadow-[0_12px_28px_rgba(0,0,0,0.5)]"
                    style={{ background: "rgba(33,24,16,0.95)", border: "1px solid rgba(150,110,60,0.18)" }}>
                    <button type="button" onClick={stepOlder}
                      disabled={selectedIndex >= sortedEntries.length - 1}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.64rem] uppercase tracking-[0.34em] transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-35"
                      style={{ color: "#c8a878" }}>
                      <ChevronLeft className="h-4 w-4" /> Previous Entry
                    </button>
                    <span className="h-5 w-px" style={{ background: "rgba(150,110,60,0.35)" }} />
                    <button type="button" onClick={stepNewer}
                      disabled={selectedIndex <= 0}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.64rem] uppercase tracking-[0.34em] transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-35"
                      style={{ color: "#c8a878" }}>
                      Next Entry <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-0 flex-1 items-center justify-center rounded-[2rem] shadow-[0_24px_70px_rgba(0,0,0,0.6)]"
              style={{ background: "#211810", border: "1px solid rgba(150,110,60,0.15)" }}>
              <div className="max-w-md space-y-3 px-8 py-12 text-center">
                <p className="text-[0.64rem] uppercase tracking-[0.5em]" style={{ color: "#7a6448" }}>Personal notebook</p>
                <h2 className="text-3xl font-light tracking-[0.16em]" style={{ color: "#e8d4b0" }}>No entries yet</h2>
                <p className="text-sm leading-7" style={{ color: "#8a7050" }}>The archive is ready, but there are no published entries available to display.</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
