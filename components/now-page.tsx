"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArchiveFrame, ArchiveHero } from "@/components/archive-frame";

const focusDistribution = [
  { label: "Physics", value: 86, tone: "bg-accent" },
  { label: "Chemistry", value: 72, tone: "bg-white/45" },
  { label: "Mathematics", value: 91, tone: "bg-white/70" },
  { label: "Projects", value: 58, tone: "bg-accent/65" },
  { label: "Fitness", value: 64, tone: "bg-white/30" },
] as const;

const activeBuilds = ["HisArchives", "Discord Automation", "Future Records"] as const;
const currentFocus = ["Physics", "Chemistry", "Mathematics"] as const;
const upcomingItems = ["Birthday", "Archive Updates", "Project Milestones"] as const;
const recentRecords = ["Purchased Domain", "Built Archive", "Updated Timeline", "Added Records"] as const;
const weeklyActivity = [
  { label: "Study", value: 84 },
  { label: "Projects", value: 63 },
  { label: "Reading", value: 49 },
  { label: "Fitness", value: 57 },
] as const;

function Card({
  className = "",
  title,
  eyebrow,
  children,
}: {
  className?: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-[2rem] border border-white/8 bg-surface/75 p-5 shadow-glow backdrop-blur-sm sm:p-7 ${className}`}>
      <div className="space-y-5">
        {eyebrow ? <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">{eyebrow}</p> : null}
        <h2 className="text-xl font-light tracking-wide text-text sm:text-3xl">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Bar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/8">
      <div
        className="h-full rounded-full bg-gradient-to-r from-accent to-white/70"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function MiniProgress({ value }: { value: number }) {
  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-muted">
        <span>Progress</span>
        <span>{value}%</span>
      </div>
      <Bar value={value} />
    </div>
  );
}

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 py-4 last:border-b-0">
      <span className="text-sm uppercase tracking-[0.35em] text-muted">{label}</span>
      <span className="text-lg font-light text-text">{value}</span>
    </div>
  );
}

export function NowPage() {
  const reduceMotion = useReducedMotion();

  return (
    <ArchiveFrame activePath="/now">
      <ArchiveHero
        eyebrow="Current Overview"
        title="LIVE STATUS"
        subtitle="A personal command center for what is happening right now."
      />

      <section className="border-t border-white/5 py-20 sm:py-28">
        <div className="grid gap-4 lg:grid-cols-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <Card title="PRIMARY OBJECTIVE" eyebrow="Card 01">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[0.72rem] uppercase tracking-[0.35em] text-muted">Current phase</p>
                  <p className="text-3xl font-light text-text sm:text-4xl">JEE 2027</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <StatLine label="Current phase" value="Class 11" />
                  <StatLine label="Status" value="In Progress" />
                </div>
                <MiniProgress value={72} />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <Card title="FOCUS DISTRIBUTION" eyebrow="Card 02" className="h-full">
              <div className="space-y-4">
                {focusDistribution.map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm uppercase tracking-[0.28em] text-muted">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/8">
                      <div className={`h-full rounded-full ${item.tone}`} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <Card title="ACTIVE BUILDS" eyebrow="Card 03" className="h-full">
              <div className="space-y-4">
                {activeBuilds.map((item, index) => (
                  <div key={item} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                    <span className="text-lg font-light">{item}</span>
                    <span className="text-xs uppercase tracking-[0.35em] text-muted">
                      0{index + 1}
                    </span>
                  </div>
                ))}
                <div className="pt-2 text-sm uppercase tracking-[0.35em] text-muted">3 Active Records</div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <Card title="CURRENT STATUS" eyebrow="Card 04" className="h-full">
              <div className="space-y-4">
                {["Building", "Learning", "Creating"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-lg font-light">
                    {item}
                  </div>
                ))}
                <div className="pt-2">
                  <p className="text-[0.72rem] uppercase tracking-[0.35em] text-muted">Archive State</p>
                  <p className="mt-2 text-xl font-light text-text">Active</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <Card title="WEEKLY ACTIVITY" eyebrow="Card 05" className="h-full">
              <div className="grid gap-6">
                <div className="grid h-44 grid-cols-2 gap-4 sm:h-52 sm:grid-cols-4">
                  {weeklyActivity.map((item) => (
                    <div key={item.label} className="flex flex-col justify-end gap-3">
                      <div className="relative flex-1 rounded-[1.25rem] border border-white/5 bg-white/[0.03] px-3 py-3">
                        <div
                          className="absolute inset-x-3 bottom-3 rounded-full bg-gradient-to-t from-accent via-accent/70 to-white/20"
                          style={{ height: `${item.value}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <Card title="CURRENT FOCUS" eyebrow="Card 06" className="h-full">
              <div className="flex flex-wrap gap-3">
                {currentFocus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/8 bg-white/[0.04] px-4 py-2 text-sm uppercase tracking-[0.3em] text-text"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <Card title="UPCOMING" eyebrow="Card 07" className="h-full">
              <div className="space-y-3">
                {upcomingItems.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-lg font-light">
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <Card title="RECENT RECORDS" eyebrow="Card 08" className="h-full">
              <div className="grid gap-3 sm:grid-cols-2">
                {recentRecords.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-4 text-lg font-light">
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </ArchiveFrame>
  );
}
