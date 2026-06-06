"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArchiveFrame } from "@/components/archive-frame";

const floatingCards = [
  {
    label: "Established",
    value: "22 OCT 2007",
    className: "left-0 top-0 w-[min(42vw,15rem)] sm:left-[7%] sm:top-[6%] sm:w-[14rem]",
  },
  {
    label: "Primary Objective",
    value: "JEE 2027",
    className: "left-0 top-[12rem] w-[min(46vw,16rem)] sm:left-[11%] sm:top-[24%] sm:w-[15rem]",
  },
  {
    label: "Current Phase",
    value: "CLASS 11",
    className: "right-0 top-0 w-[min(40vw,14rem)] sm:right-[8%] sm:top-[8%] sm:w-[13rem]",
  },
  {
    label: "Status",
    value: "BUILDING",
    className: "right-0 top-[11rem] w-[min(38vw,13rem)] sm:right-[10%] sm:top-[26%] sm:w-[12.5rem]",
  },
  {
    label: "Location",
    value: "INDIA",
    className: "left-0 bottom-[12rem] w-[min(36vw,12rem)] sm:left-[8%] sm:bottom-[20%] sm:w-[11.5rem]",
  },
  {
    label: "Archive Start",
    value: "2026",
    className: "right-0 bottom-[12rem] w-[min(34vw,11rem)] sm:right-[9%] sm:bottom-[20%] sm:w-[10.5rem]",
  },
  {
    label: "Philosophy",
    value: "Document the work while it is still becoming.",
    className: "left-0 bottom-0 w-[min(56vw,18rem)] sm:left-[16%] sm:bottom-[6%] sm:w-[17rem]",
  },
  {
    label: "Active Systems",
    value: "HisArchives / Fitness / Learning / Projects",
    className: "right-0 bottom-0 w-[min(60vw,20rem)] sm:right-[10%] sm:bottom-[7%] sm:w-[18rem]",
  },
] as const;

function FloatingCard({
  label,
  value,
  className = "",
  large = false,
}: {
  label: string;
  value: string;
  className?: string;
  large?: boolean;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className={`rounded-[1.75rem] border border-white/8 bg-surface/75 p-5 shadow-glow backdrop-blur-sm sm:p-6 ${className}`}
    >
      <p className="text-[0.68rem] uppercase tracking-[0.45em] text-muted">{label}</p>
      <p className={`mt-4 font-light tracking-wide text-text ${large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}>
        {value}
      </p>
    </motion.article>
  );
}

function IdentityStackCard({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[1.5rem] border border-white/8 bg-surface/80 p-5 shadow-glow"
    >
      <p className="text-[0.68rem] uppercase tracking-[0.45em] text-muted">{label}</p>
      <p className={`mt-3 font-light tracking-wide text-text ${compact ? "text-lg" : "text-2xl"}`}>{value}</p>
    </motion.article>
  );
}

export function IdentityPage() {
  const reduceMotion = useReducedMotion();

  return (
    <ArchiveFrame activePath="/identity">
      <section className="border-t border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-5 px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <p className="text-[0.72rem] uppercase tracking-[0.5em] text-muted">File 001</p>
            <p className="text-[0.72rem] uppercase tracking-[0.5em] text-muted">Active Record</p>
          </div>

          <div className="md:hidden">
            <div className="space-y-5">
              <motion.article
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[2.25rem] border border-white/10 bg-[#0a0a0a] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
              >
                <p className="text-[0.68rem] uppercase tracking-[0.45em] text-muted">Identity Core</p>
                <h1 className="mt-4 text-5xl font-light tracking-[0.14em]">ANSH</h1>
                <p className="mt-5 text-lg font-light leading-8 text-text">
                  Building.
                  <br />
                  Learning.
                  <br />
                  Creating.
                </p>
                <p className="mt-4 text-sm uppercase tracking-[0.35em] text-muted">Archive Record Active.</p>
              </motion.article>

              <div className="grid gap-4">
                <IdentityStackCard label="Established" value="22 Oct 2007" compact />
                <IdentityStackCard label="Current Phase" value="Class 11" compact />
                <IdentityStackCard label="Status" value="Building" compact />
                <IdentityStackCard label="Location" value="India" compact />
                <IdentityStackCard label="Primary Objective" value="JEE 2027" compact />
                <IdentityStackCard
                  label="Philosophy"
                  value="Document the work while it is still becoming."
                />
                <IdentityStackCard label="Archive Start" value="2026" compact />
              </div>

              <IdentityStackCard label="Center Record" value="Archive active. Identity preserved as a living record." />
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative isolate mt-8 min-h-[1000px] rounded-[3rem] border border-white/5 bg-white/[0.02] px-4 py-8 shadow-glow sm:min-h-[900px] sm:px-8 sm:py-10">
              <div className="absolute inset-6 rounded-[2.5rem] border border-white/[0.04]" />
              <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(139,92,246,0.16)_0%,_rgba(139,92,246,0.06)_34%,_transparent_72%)] opacity-80 blur-3xl" />
              <div className="absolute left-1/2 top-1/2 h-[48rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05] sm:h-[52rem] sm:w-[52rem]" />

              <motion.article
                initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-1/2 z-20 w-[min(88vw,40rem)] -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.5)] sm:p-8"
              >
                <div className="space-y-7 sm:space-y-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-[0.68rem] uppercase tracking-[0.45em] text-muted">Center Record</p>
                      <h2 className="text-3xl font-light tracking-[0.16em] sm:text-5xl">ANSH</h2>
                    </div>
                    <p className="text-[0.68rem] uppercase tracking-[0.4em] text-muted">Archive Node</p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-base font-light leading-7 text-text sm:text-xl sm:leading-8">
                      Building.
                      <br />
                      Learning.
                      <br />
                      Creating.
                    </p>
                    <p className="text-sm uppercase tracking-[0.35em] text-muted">Archive Record Active.</p>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.45em] text-muted">Current Mission</p>
                    <p className="mt-3 text-lg font-light tracking-wide text-text sm:text-2xl">JEE 2027</p>
                  </div>
                </div>
              </motion.article>

              <div className="relative h-full min-h-[940px] sm:min-h-[780px]">
                {floatingCards.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute ${item.className}`}
                    style={{ zIndex: index < 2 ? 22 : index < 4 ? 20 : 16 }}
                  >
                    <FloatingCard label={item.label} value={item.value} large={index < 4} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ArchiveFrame>
  );
}
