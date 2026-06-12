"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { JournalEntry } from "@/lib/journal/types";

const moodThemes: Record<string, { accent: string; glow: string; paper: string }> = {
  Focused: { accent: "#9A7B4F", glow: "rgba(154,123,79,0.22)", paper: "linear-gradient(180deg,#f6e8d3,#dfc39e)" },
  Reflective: { accent: "#6D6A88", glow: "rgba(109,106,136,0.18)", paper: "linear-gradient(180deg,#f0e8da,#d9cfbf)" },
  Calm: { accent: "#6A8268", glow: "rgba(106,130,104,0.18)", paper: "linear-gradient(180deg,#f4ede1,#dcd2c1)" },
  Grateful: { accent: "#8D6A52", glow: "rgba(141,106,82,0.18)", paper: "linear-gradient(180deg,#f5e9d7,#dfc8ad)" },
};

function DiaryPhoto({ entry }: { entry: JournalEntry }) {
  const theme = moodThemes[entry.mood] ?? moodThemes.Reflective;

  if (entry.photo) {
    return <img src={entry.photo} alt={entry.title} className="h-full w-full object-cover" />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: theme.paper }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.75),transparent_28%),radial-gradient(circle_at_78%_24%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(40,31,20,0.14),transparent_46%)]" />
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(32,24,18,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(32,24,18,0.08)_1px,transparent_1px)] bg-[size:18px_18px]" />
      <div className="absolute inset-x-5 bottom-5 h-20 rounded-[1.4rem] blur-2xl" style={{ background: theme.glow }} />
      <div className="absolute left-6 top-6 rounded-full border border-black/5 bg-white/55 px-3 py-1 text-[0.58rem] uppercase tracking-[0.36em] text-[#665f54]">
        quiet record
      </div>
      <div className="absolute inset-x-6 top-24 h-[55%] rounded-[1.5rem] border border-white/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))]" />
      <div className="absolute left-10 top-28 h-20 w-20 rounded-full bg-white/45 blur-[2px]" />
      <div className="absolute right-8 top-20 h-28 w-28 rounded-full bg-white/18 blur-[18px]" />
      <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-[0.65rem] uppercase tracking-[0.32em] text-[#5f574c]">
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
    <div className={`relative h-full min-h-[0] bg-[#fbf6ec] px-5 py-4 sm:px-6 sm:py-5 ${isLeft ? "lg:pr-8" : "lg:pl-8"}`}>
      <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(rgba(54,40,24,0.06)_1px,transparent_1px)] bg-[length:100%_28px]" />
      <div className={`relative z-10 flex h-full flex-col ${isLeft ? "pr-3 lg:pr-5" : "pl-3 lg:pl-5"}`}>
        {isLeft ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.48em] text-[#8a7f72]">Date</p>
                <p className="mt-1 text-[1.55rem] font-light tracking-[0.12em] text-[#24211e]">{entry.date}</p>
              </div>
              <div
                className="h-9 w-9 rounded-full shadow-[0_0_0_9px_rgba(255,255,255,0.24)]"
                style={{
                  background: theme.accent,
                  boxShadow: `0 0 0 8px rgba(255,255,255,0.18), 0 0 20px ${theme.glow}`,
                }}
              />
            </div>

            <div className="mx-auto w-full max-w-[18rem] overflow-hidden rounded-[1.45rem] border border-black/8 bg-white shadow-[0_18px_42px_rgba(60,45,30,0.11)]">
              <div className="aspect-[4/5]">
                <DiaryPhoto entry={entry} />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[0.64rem] uppercase tracking-[0.46em] text-[#8a7f72]">Caption</p>
              <p className="text-[0.9rem] leading-6.5 text-[#2c2722]">{entry.caption}</p>
            </div>

            <div className="flex items-center gap-3 rounded-full bg-white/55 px-4 py-2 text-sm text-[#4a443c] shadow-[0_10px_22px_rgba(60,45,30,0.08)]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: theme.accent }} />
              <span className="uppercase tracking-[0.26em]">{entry.mood}</span>
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
                    <p className="text-[0.62rem] uppercase tracking-[0.48em] text-[#8a7f72]">Journal title</p>
                    <h2 className="mt-1 text-[clamp(1.75rem,3.1vw,3rem)] font-light leading-[0.96] tracking-[-0.04em] text-[#23201d]">
                      {entry.title}
                    </h2>
                  </div>
                  <span className="rounded-full bg-white/65 px-3 py-2 text-[0.64rem] uppercase tracking-[0.34em] text-[#6c6258] shadow-[0_10px_24px_rgba(60,45,30,0.06)]">
                    {entry.readingTime}
                  </span>
                </div>

                <div className="rounded-[1.35rem] bg-white/42 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                  <div className="space-y-3 text-[0.95rem] leading-7 text-[#2d2722] sm:text-[1rem]">
                    {entry.content.split("\n\n").map((paragraph, index) => (
                      <p key={`${entry.id}-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3.5 space-y-2.5">
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/5 bg-white/65 px-3 py-2 text-[0.62rem] uppercase tracking-[0.34em] text-[#5f574c]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-[0.65rem] uppercase tracking-[0.38em] text-[#8a7f72]">{entry.readingTime}</div>
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
    () =>
      [...initialEntries].sort((left, right) => {
        const leftTime = Date.parse(left.createdAt) || Date.parse(left.date);
        const rightTime = Date.parse(right.createdAt) || Date.parse(right.date);
        return rightTime - leftTime;
      }),
    [initialEntries],
  );

  const selectedEntry = sortedEntries[selectedIndex] ?? null;

  function stepOlder() {
    setDirection(1);
    setSelectedIndex((current) => Math.min(current + 1, sortedEntries.length - 1));
  }

  function stepNewer() {
    setDirection(-1);
    setSelectedIndex((current) => Math.max(current - 1, 0));
  }

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#f4ecdf] text-[#2a2622]">
      <SiteHeader activePath="/activity" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.65),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(137,108,75,0.08),transparent_25%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(78,61,40,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(78,61,40,0.08)_1px,transparent_1px)] bg-[size:46px_46px]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0,transparent_62%,rgba(61,45,26,0.06)_100%)]" />

      <div className="relative mx-auto flex h-full w-full max-w-[96rem] flex-col px-4 py-3 sm:px-6 lg:px-8 xl:pl-[6.75rem]">
        <header className="flex flex-wrap items-center justify-between gap-4 pb-3">
          <div className="space-y-2">
            <p className="text-[0.64rem] uppercase tracking-[0.5em] text-[#8a7f72]">Personal notebook</p>
            <h1 className="text-[2rem] font-light tracking-[0.24em] text-[#24211e] sm:text-[2.5rem]">JOURNAL</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[0.64rem] uppercase tracking-[0.34em] text-[#6e6257]">
            <Link href="/" className="transition hover:text-[#24211e]">
              Home
            </Link>
            <span className="text-[#c2b5a0]">/</span>
            <Link href="/archives" className="transition hover:text-[#24211e]">
              Archives
            </Link>
            <span className="text-[#c2b5a0]">/</span>
            <Link href="/now" className="transition hover:text-[#24211e]">
              Now
            </Link>
          </div>
        </header>

        <section className="mt-1 flex min-h-0 flex-1 flex-col">
          {selectedEntry ? (
            <>
              <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-[2rem] border border-black/5 bg-[#fffaf3] shadow-[0_24px_70px_rgba(60,45,30,0.14)]">
                <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[72px] -translate-x-1/2 bg-[linear-gradient(90deg,rgba(0,0,0,0.04),rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.04))] opacity-30" />
                <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#a58e73]/25" />
                <div className="pointer-events-none absolute inset-y-8 left-1/2 w-[1px] -translate-x-1/2 bg-[#8d7b65]/15 blur-[0.5px]" />
                <div className="absolute left-1/2 top-[0.95rem] h-4 w-4 -translate-x-1/2 rounded-full border border-[#7f6d58]/50 bg-[#f3eadc] shadow-[0_0_0_10px_rgba(255,255,255,0.35)]" />
                <div className="absolute left-1/2 top-[6.6rem] h-4 w-4 -translate-x-1/2 rounded-full border border-[#7f6d58]/40 bg-[#f3eadc] shadow-[0_0_0_10px_rgba(255,255,255,0.18)]" />
                <div className="absolute left-1/2 bottom-[4.8rem] h-4 w-4 -translate-x-1/2 rounded-full border border-[#7f6d58]/40 bg-[#f3eadc] shadow-[0_0_0_10px_rgba(255,255,255,0.18)]" />

                <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-2">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`left-${selectedEntry.id}`}
                      initial={reduceMotion ? false : { opacity: 0, x: direction > 0 ? -14 : 14 }}
                      animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, x: direction > 0 ? -14 : 14 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b border-black/5 lg:border-b-0 lg:border-r"
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
                  <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-[#fffaf3]/96 px-3 py-2 shadow-[0_12px_28px_rgba(60,45,30,0.12)] backdrop-blur-sm">
                    <button
                      type="button"
                      onClick={stepOlder}
                      disabled={selectedIndex >= sortedEntries.length - 1}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.64rem] uppercase tracking-[0.34em] text-[#4a443c] transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous Entry
                    </button>
                    <span className="h-5 w-px bg-[#cdbfa8]" />
                    <button
                      type="button"
                      onClick={stepNewer}
                      disabled={selectedIndex <= 0}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.64rem] uppercase tracking-[0.34em] text-[#4a443c] transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      Next Entry
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-0 flex-1 items-center justify-center rounded-[2rem] border border-black/5 bg-[#fffaf3] shadow-[0_24px_70px_rgba(60,45,30,0.14)]">
              <div className="max-w-md space-y-3 px-8 py-12 text-center">
                <p className="text-[0.64rem] uppercase tracking-[0.5em] text-[#8a7f72]">Personal notebook</p>
                <h2 className="text-3xl font-light tracking-[0.16em] text-[#24211e]">No entries yet</h2>
                <p className="text-sm leading-7 text-[#5f574c]">
                  The archive is ready, but there are no published entries available to display.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
