"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArchiveFrame } from "@/components/archive-frame";

const floatingCards = [
  {
    label: "Established",
    value: "22 OCT 2007",
    className: "left-4 top-4 sm:left-8 sm:top-8 w-[min(42vw,15rem)] sm:w-[15rem]",
  },
  {
    label: "Current Phase",
    value: "CLASS 11",
    className: "right-4 top-8 sm:right-10 sm:top-14 w-[min(40vw,14rem)] sm:w-[14rem]",
  },
  {
    label: "Primary Objective",
    value: "JEE 2027",
    className: "left-2 top-[19%] sm:left-[8%] sm:top-[20%] w-[min(44vw,16rem)] sm:w-[16rem]",
  },
  {
    label: "Status",
    value: "BUILDING",
    className: "right-2 top-[21%] sm:right-[8%] sm:top-[24%] w-[min(38vw,13rem)] sm:w-[13rem]",
  },
  {
    label: "Location",
    value: "INDIA",
    className: "left-0 bottom-[24%] sm:left-[10%] sm:bottom-[22%] w-[min(36vw,12rem)] sm:w-[12rem]",
  },
  {
    label: "Active Systems",
    value: "HisArchives / Fitness / Learning / Projects",
    className: "right-0 bottom-[26%] sm:right-[8%] sm:bottom-[24%] w-[min(54vw,18rem)] sm:w-[18rem]",
  },
  {
    label: "Archive Start",
    value: "2026",
    className: "left-8 bottom-6 sm:left-[22%] sm:bottom-12 w-[min(32vw,11rem)] sm:w-[11rem]",
  },
  {
    label: "Current Version",
    value: "v1.0",
    className: "right-8 bottom-8 sm:right-[22%] sm:bottom-14 w-[min(32vw,11rem)] sm:w-[11rem]",
  },
  {
    label: "Philosophy",
    value: "Document the work while it is still becoming.",
    className: "left-1/2 top-[44%] w-[min(66vw,20rem)] -translate-x-1/2 sm:top-[46%] sm:w-[20rem]",
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

export function IdentityPage() {
  const reduceMotion = useReducedMotion();

  return (
    <ArchiveFrame activePath="/identity">
      <section className="border-t border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-5 px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <p className="text-[0.72rem] uppercase tracking-[0.5em] text-muted">File 001</p>
            <p className="text-[0.72rem] uppercase tracking-[0.5em] text-muted">Active Record</p>
            <h1 className="text-balance text-4xl font-light tracking-[0.16em] sm:text-5xl lg:text-6xl">
              IDENTITY RECORD
            </h1>
          </div>

          <div className="relative isolate mt-8 min-h-[980px] overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.02] px-4 py-8 shadow-glow sm:min-h-[840px] sm:px-8 sm:py-10">
            <div className="absolute inset-6 rounded-[2.5rem] border border-white/[0.04]" />
            <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(139,92,246,0.16)_0%,_rgba(139,92,246,0.06)_34%,_transparent_72%)] opacity-80 blur-3xl" />

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

            <div className="relative h-full min-h-[920px] sm:min-h-[760px]">
              {floatingCards.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute ${item.className}`}
                  style={{ zIndex: index < 4 ? 18 : 14 }}
                >
                  <FloatingCard label={item.label} value={item.value} large={index < 4} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ArchiveFrame>
  );
}
