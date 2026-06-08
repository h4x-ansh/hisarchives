"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, Clock3, MapPin, Search, Sparkles, Zap } from "lucide-react";

const focusCards = [
  { title: "JEE 2027", detail: "Study track", hint: "Class 11 • physics focus" },
  { title: "HisArchives", detail: "Build track", hint: "Main site • product feel" },
  { title: "Fitness", detail: "Routine track", hint: "Consistency • nightly work" },
  { title: "Projects", detail: "Work track", hint: "Bugs, polish, releases" },
] as const;

const statusNodes = [
  { code: "JEE", label: "Study mode", tone: "bg-amber-300" },
  { code: "FIT", label: "Routine active", tone: "bg-orange-300" },
  { code: "WEB", label: "Build state", tone: "bg-yellow-200" },
  { code: "LIFE", label: "Daily flow", tone: "bg-amber-200" },
  { code: "MEM", label: "Memory log", tone: "bg-stone-200" },
] as const;

const liveLog = [
  { time: "21:42", tag: "SYSTEM", text: "Sync complete. Archive state remains active." },
  { time: "21:18", tag: "BUILD", text: "Adjusted the archive shelf spacing and spine titles." },
  { time: "20:54", tag: "FOCUS", text: "Returned to JEE 2027 after the layout pass." },
  { time: "19:36", tag: "NOTE", text: "Recorded the latest site polish and motion cleanup." },
  { time: "18:12", tag: "WORK", text: "Refreshed /now into a warm workstation view." },
] as const;

const metrics = [
  { label: "Study Hours", value: "6.5h", percent: 72 },
  { label: "Build Hours", value: "2.8h", percent: 49 },
  { label: "Fitness Hours", value: "1.2h", percent: 31 },
  { label: "Discipline Index", value: "87", percent: 87 },
] as const;

function WorkPanel({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`rounded-[2rem] border border-[#d28a41]/18 bg-[linear-gradient(180deg,rgba(57,35,22,0.74),rgba(19,11,8,0.9))] shadow-[0_26px_90px_rgba(0,0,0,0.34)] backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

function Bar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/8">
      <div className="h-full rounded-full bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400" style={{ width: `${value}%` }} />
    </div>
  );
}

function FocusChip({ title, detail, hint }: (typeof focusCards)[number]) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }}
      transition={{ duration: 0.18 }}
      className="group relative overflow-hidden rounded-[1.5rem] border border-[#d28a41]/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(0,0,0,0.04))] p-3 sm:p-4"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,177,98,0.16),transparent_32%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative space-y-1.5 sm:space-y-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.95rem] font-light tracking-wide text-[#f8efe6] sm:text-[1rem]">{title}</p>
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80 shadow-[0_0_16px_rgba(251,191,36,0.7)]" />
        </div>
        <p className="text-[0.66rem] uppercase tracking-[0.38em] text-amber-100/60">{detail}</p>
        <p className="text-[0.82rem] leading-6 text-amber-50/70 sm:text-sm">{hint}</p>
      </div>
    </motion.div>
  );
}

function StatRing() {
  const reduceMotion = useReducedMotion();
  const ring = 87;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[2rem] border border-[#d28a41]/18 bg-[linear-gradient(180deg,rgba(56,34,22,0.72),rgba(18,10,7,0.94))] p-4 sm:p-5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,177,98,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_28%)]" />
      <div className="relative space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.66rem] uppercase tracking-[0.45em] text-amber-100/55">Statistics</p>
            <h2 className="mt-2 text-2xl font-light tracking-wide text-[#f8efe6]">Work Rhythm</h2>
          </div>
          <div className="rounded-full border border-[#d28a41]/18 bg-white/[0.04] px-3 py-1 text-[0.62rem] uppercase tracking-[0.35em] text-amber-100/70">
            Live
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_12rem] sm:gap-5">
          <div className="flex items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[18rem] items-center justify-center sm:max-w-[23rem]">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 225deg, rgba(251,191,36,0.95) 0 72%, rgba(249,115,22,0.78) 72% 84%, rgba(245,158,11,0.48) 84% 93%, rgba(255,255,255,0.24) 93% 100%)",
                }}
              />
              <div className="absolute inset-[1.1rem] rounded-full bg-[#1f130d] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />
              <div className="relative text-center">
                <p className="text-[0.66rem] uppercase tracking-[0.45em] text-amber-100/55">Discipline Index</p>
                <p className="mt-3 text-5xl font-light text-[#f8efe6] sm:mt-4 sm:text-6xl">{ring}</p>
                <p className="mt-2 text-[0.72rem] uppercase tracking-[0.35em] text-amber-100/70 sm:mt-3 sm:text-sm">Active</p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {metrics.map((item) => (
              <div key={item.label} className="rounded-[1.4rem] border border-white/6 bg-white/[0.03] px-4 py-3 sm:py-4">
                <div className="flex items-center justify-between gap-4 text-[0.66rem] uppercase tracking-[0.35em] text-amber-100/60">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <div className="mt-3">
                  <Bar value={item.percent} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatusRail() {
  const reduceMotion = useReducedMotion();

  return (
      <motion.aside
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[2rem] border border-[#d28a41]/18 bg-[linear-gradient(180deg,rgba(54,33,22,0.66),rgba(18,10,7,0.94))] p-4 shadow-[0_26px_90px_rgba(0,0,0,0.3)] sm:p-5"
    >
        <div className="space-y-3 sm:space-y-4">
        <div>
          <p className="text-[0.66rem] uppercase tracking-[0.45em] text-amber-100/55">Active Status</p>
          <h2 className="mt-2 text-2xl font-light tracking-wide text-[#f8efe6]">Node rail</h2>
        </div>
        <div className="space-y-2.5 sm:space-y-3">
          {statusNodes.map((node) => (
            <div key={node.code} className="flex items-center gap-3 rounded-[1.2rem] bg-white/[0.04] px-4 py-2.5 transition hover:bg-white/[0.06] sm:py-3">
              <span className={`h-3 w-3 rounded-full ${node.tone} shadow-[0_0_16px_rgba(251,191,36,0.45)]`} />
              <div className="min-w-0 flex-1">
                <p className="text-sm uppercase tracking-[0.35em] text-[#f8efe6]">{node.code}</p>
                <p className="mt-1 text-[0.7rem] uppercase tracking-[0.25em] text-amber-100/55">{node.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[1.4rem] border border-white/6 bg-black/18 p-3 sm:p-4">
          <div className="flex items-center justify-between text-[0.66rem] uppercase tracking-[0.35em] text-amber-100/55">
            <span>Session</span>
            <span>Tonight</span>
          </div>
          <div className="mt-2.5 space-y-2 text-[0.88rem] text-[#f8efe6] sm:mt-3 sm:text-sm">
            <div className="flex items-center gap-2 text-amber-100/70"><Clock3 className="h-4 w-4" /> 9:42 PM</div>
            <div className="flex items-center gap-2 text-amber-100/70"><MapPin className="h-4 w-4" /> India</div>
            <div className="flex items-center gap-2 text-amber-100/70"><Activity className="h-4 w-4" /> Focus mode on</div>
            <div className="flex items-center gap-2 text-amber-100/70"><Zap className="h-4 w-4" /> Archive active</div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

export function NowPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#160e09] text-[#f8efe6]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_12%,rgba(255,178,92,0.24),transparent_26%),radial-gradient(circle_at_8%_18%,rgba(255,255,255,0.05),transparent_18%),linear-gradient(180deg,#271812_0%,#140d09_58%,#0f0906_100%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[55%] top-[6%] h-96 w-96 rounded-full bg-amber-200/12 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, 12, 0], y: [0, -10, 0], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-orange-300/10 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, 10, 0], y: [0, 6, 0], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(10,6,4,0.44))]"
        animate={reduceMotion ? undefined : { opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto w-full max-w-[96rem] px-5 pb-14 pt-5 sm:px-8 lg:px-10 xl:px-12">
        <header className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] lg:items-start">
          <div className="space-y-4">
            <p className="text-[0.66rem] uppercase tracking-[0.45em] text-amber-100/55">Current Session</p>
            <h1 className="text-4xl font-light tracking-wide text-[#f8efe6] sm:text-5xl xl:text-6xl">Good Evening, Ansh</h1>
            <p className="max-w-3xl text-base leading-8 text-amber-50/72 sm:text-lg">
              Ansh&apos;s personal workstation at night — warm, focused, and built for the next move.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              {[
                ["Current time", "21:42"],
                ["Session status", "Active"],
                ["Location", "India"],
                ["Archive status", "Live"],
                ["Focus mode", "On"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-full border border-[#d28a41]/16 bg-white/[0.04] px-4 py-2 text-[0.68rem] uppercase tracking-[0.35em] text-amber-100/70">
                  {label}: {value}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-end">
            <div className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.4em] text-amber-100/60">
              <Link href="/" className="transition hover:text-[#f8efe6]">
                Home
              </Link>
              <span className="text-amber-100/30">/</span>
              <Link href="/archives" className="transition hover:text-[#f8efe6]">
                Archives
              </Link>
            </div>
          </div>
        </header>

        <section className="mt-4 grid gap-4 sm:mt-7 sm:gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(22rem,0.7fr)] xl:items-start">
          <WorkPanel className="relative overflow-visible p-4 sm:p-7 xl:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(255,178,92,0.2),transparent_26%),radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.05),transparent_16%),radial-gradient(circle_at_70%_72%,rgba(255,124,58,0.12),transparent_20%)]" />
            <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(24rem,1fr)] xl:items-stretch">
              <div className="space-y-5 sm:space-y-6">
                <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_15rem] sm:gap-4">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#d28a41]/16 bg-white/[0.04] px-4 py-2 text-[0.66rem] uppercase tracking-[0.35em] text-amber-100/70">
                      <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                      Current Focus
                    </div>
                    <label className="flex items-center gap-3 rounded-[1.5rem] border border-[#d28a41]/16 bg-[#1a110c]/78 px-4 py-3.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] transition focus-within:border-amber-300/35 hover:bg-[#1c130d]/88 sm:py-4">
                      <Search className="h-4 w-4 text-amber-200/65" />
                      <input
                        type="text"
                        placeholder="Search projects, archives, logs"
                        className="w-full bg-transparent text-sm text-[#f8efe6] placeholder:text-amber-100/35 outline-none"
                      />
                    </label>
                  </div>

                  <div className="rounded-[2rem] border border-[#d28a41]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.06))] p-3.5 sm:p-4">
                    <p className="text-[0.66rem] uppercase tracking-[0.45em] text-amber-100/55">Current Mission</p>
                    <p className="mt-2.5 text-2xl font-light text-[#f8efe6] sm:mt-3 sm:text-3xl">JEE 2027</p>
                    <p className="mt-2.5 text-[0.88rem] leading-6 text-amber-50/70 sm:mt-3 sm:text-sm sm:leading-7">
                      The anchor for the session. Everything else supports this track.
                    </p>
                  </div>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 xl:grid-cols-2">
                  {focusCards.map((card) => (
                    <FocusChip key={card.title} {...card} />
                  ))}
                </div>
              </div>

              <div className="relative min-h-[28rem] sm:min-h-[42rem] xl:min-h-[46rem]">
                <div className="absolute inset-0 overflow-visible">
                  <motion.div
                    aria-hidden
                    className="absolute left-1/2 top-[-1rem] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,180,92,0.42)_0%,rgba(255,145,60,0.2)_32%,transparent_70%)] blur-3xl sm:h-[36rem] sm:w-[36rem] xl:h-[42rem] xl:w-[42rem]"
                    animate={reduceMotion ? undefined : { opacity: [0.58, 0.9, 0.58], scale: [1, 1.05, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute inset-0"
                    animate={reduceMotion ? undefined : { x: [0, 10, 0], y: [0, -6, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Image
                      src="/potrait-fotor-bg-remover-20260606231944.png"
                      alt="Ansh cutout portrait"
                      fill
                      priority
                      sizes="(max-width: 1280px) 74vw, 30rem"
                      className="object-contain object-bottom drop-shadow-[0_32px_48px_rgba(0,0,0,0.5)]"
                    />
                  </motion.div>
                  <div className="absolute inset-x-[16%] bottom-[6%] h-32 rounded-full bg-amber-300/16 blur-3xl sm:h-40" />
                  <div className="absolute inset-x-[18%] top-[14%] h-[5.5rem] rounded-full bg-white/10 blur-3xl sm:h-28" />
                  <div className="absolute left-[10%] top-[14%] text-4xl font-light tracking-[-0.06em] text-[#f8efe6]/4 sm:text-6xl">0007</div>
                  <div className="absolute right-[8%] top-[28%] text-3xl font-light tracking-[-0.06em] text-[#f8efe6]/4 sm:text-5xl">JEE 2027</div>
                  <div className="absolute inset-x-[14%] top-[44%] h-[1px] bg-white/[0.08]" />
                </div>

                <div className="absolute left-4 top-4 rounded-[1.4rem] border border-[#d28a41]/16 bg-black/20 px-4 py-3 backdrop-blur-md sm:left-6 sm:top-6">
                  <p className="text-[0.66rem] uppercase tracking-[0.45em] text-amber-100/55">Archive pulse</p>
                  <p className="mt-2 max-w-[14rem] text-sm leading-7 text-[#f8efe6]">Warm light. Open tabs. Silent progress.</p>
                </div>
              </div>
            </div>
          </WorkPanel>

          <div className="grid gap-5">
            <StatRing />
            <StatusRail />
          </div>
        </section>

        <section className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
          <WorkPanel className="p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.66rem] uppercase tracking-[0.45em] text-amber-100/55">Recent Activity</p>
                <h2 className="mt-1.5 text-2xl font-light tracking-wide text-[#f8efe6] sm:mt-2">Live archive log</h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[#d28a41]/16 bg-white/[0.04] px-3 py-1 text-[0.62rem] uppercase tracking-[0.35em] text-amber-100/65">
                <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.85)] animate-pulse" />
                Terminal feed
              </div>
            </div>

            <div className="mt-4 space-y-3 sm:mt-5">
              {liveLog.map((entry, index) => (
                <motion.div
                  key={`${entry.time}-${entry.text}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={reduceMotion ? undefined : { x: 4 }}
                  className={`rounded-[1.45rem] border px-4 py-4 transition ${
                    index === 0
                      ? "border-amber-300/20 bg-amber-300/8 shadow-[0_0_0_1px_rgba(251,191,36,0.08)]"
                      : "border-white/6 bg-black/16 hover:bg-black/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 text-[0.66rem] uppercase tracking-[0.35em] text-amber-100/55">
                    <span>{entry.time}</span>
                    <span>{entry.tag}</span>
                  </div>
                  <p className="mt-3 text-base font-light leading-7 text-[#f8efe6]">{entry.text}</p>
                </motion.div>
              ))}
            </div>
          </WorkPanel>

          <WorkPanel className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-5">
              <div>
                <p className="text-[0.66rem] uppercase tracking-[0.45em] text-amber-100/55">Session Notes</p>
                <h2 className="mt-1.5 text-2xl font-light tracking-wide text-[#f8efe6] sm:mt-2">Desk temperature</h2>
              </div>

              <div className="rounded-[1.5rem] border border-[#d28a41]/16 bg-[#1f130d]/72 p-3.5 sm:p-4">
                <div className="flex items-center justify-between text-[0.66rem] uppercase tracking-[0.4em] text-amber-100/55">
                  <span>Current state</span>
                  <span>Warm</span>
                </div>
                <div className="mt-2.5 h-2 rounded-full bg-white/8 sm:mt-3">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-amber-500" />
                </div>
                <p className="mt-3 text-[0.88rem] leading-6 text-amber-100/70 sm:mt-4 sm:text-sm sm:leading-7">Late-night workstation energy with contrast, glow, and enough negative space for the cuts to breathe.</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {[
                  ["Focus", "Strong"],
                  ["Session", "Active"],
                  ["Mood", "Calm"],
                  ["Mode", "Work"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.2rem] border border-white/6 bg-white/[0.04] px-4 py-3.5 sm:py-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.35em] text-amber-100/55">{label}</p>
                    <p className="mt-2 text-base font-light text-[#f8efe6] sm:text-lg">{value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.5rem] border border-[#d28a41]/16 bg-black/18 px-4 py-3.5 text-[0.66rem] uppercase tracking-[0.45em] text-amber-100/65 sm:py-4">
                Session active • Focus mode on • Local time 21:42 • Archive connection stable
              </div>
            </div>
          </WorkPanel>
        </section>
      </div>
    </main>
  );
}
