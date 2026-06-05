"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArchiveFrame } from "@/components/archive-frame";

const floatingCards = [
  { label: "Established", value: "22 OCT 2007", x: "sm:translate-x-4", y: "sm:-translate-y-2" },
  { label: "Current Phase", value: "CLASS 11", x: "sm:-translate-x-2", y: "sm:translate-y-4" },
  { label: "Primary Objective", value: "JEE 2027", x: "sm:translate-x-6", y: "sm:translate-y-2" },
  { label: "Status", value: "BUILDING", x: "sm:-translate-x-6", y: "sm:-translate-y-3" },
  { label: "Location", value: "INDIA", x: "sm:translate-x-3", y: "sm:-translate-y-6" },
  { label: "Active Systems", value: "HisArchives / Fitness / Learning / Projects", x: "sm:translate-x-0", y: "sm:translate-y-2" },
  { label: "Archive Start", value: "2026", x: "sm:-translate-x-4", y: "sm:translate-y-0" },
  { label: "Current Version", value: "v1.0", x: "sm:translate-x-5", y: "sm:-translate-y-1" },
  { label: "Philosophy", value: "Document the work while it is still becoming.", x: "sm:-translate-x-3", y: "sm:translate-y-3" },
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
      <section className="border-t border-white/5 py-20 sm:py-28">
        <div className="space-y-6">
          <div className="max-w-4xl space-y-5">
            <p className="text-[0.72rem] uppercase tracking-[0.5em] text-muted">File 001</p>
            <p className="text-[0.72rem] uppercase tracking-[0.5em] text-muted">Active Record</p>
            <h1 className="text-balance text-6xl font-light tracking-[0.15em] sm:text-8xl lg:text-[8rem]">
              IDENTITY RECORD
            </h1>
          </div>

          <div className="relative mt-10 min-h-[980px] sm:min-h-[860px]">
            <motion.article
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-1/2 z-10 w-[min(88vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.5)] sm:p-8"
            >
              <div className="space-y-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-[0.68rem] uppercase tracking-[0.45em] text-muted">Center Record</p>
                    <h2 className="text-4xl font-light tracking-[0.16em] sm:text-5xl">ANSH</h2>
                  </div>
                  <p className="text-[0.68rem] uppercase tracking-[0.4em] text-muted">Archive Node</p>
                </div>

                <div className="space-y-4">
                  <p className="text-lg font-light leading-8 text-text sm:text-2xl">
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
                  <p className="mt-3 text-xl font-light tracking-wide text-text sm:text-2xl">JEE 2027</p>
                </div>
              </div>
            </motion.article>

            <div className="relative h-full">
              {floatingCards.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute w-[min(78vw,18rem)] sm:w-[min(32vw,18rem)] ${
                    index % 2 === 0 ? "left-0" : "right-0"
                  } ${item.x} ${item.y}`}
                  style={{
                    top: `${8 + index * 8}%`,
                    zIndex: index < 3 ? 20 : 15,
                  }}
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
