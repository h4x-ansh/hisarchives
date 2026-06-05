"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArchiveFrame } from "@/components/archive-frame";

const dossierSections = [
  { label: "Name", value: "Ansh" },
  { label: "Established", value: "22 Oct 2007" },
  { label: "Location", value: "India" },
  { label: "Status", value: "Building" },
  { label: "Current Phase", value: "Class 11" },
] as const;

const activeSystems = ["HisArchives", "Fitness", "Learning", "Projects"] as const;

const identityStats = [
  { label: "Age", value: "18" },
  { label: "Current Phase", value: "Class 11" },
  { label: "Archive Start", value: "2026" },
  { label: "Status", value: "Active" },
] as const;

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

          <div className="grid gap-4 lg:grid-cols-12">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8"
            >
              <div className="rounded-[2rem] border border-white/8 bg-surface/70 p-6 backdrop-blur-sm sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  {dossierSections.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.35rem] border border-white/5 bg-white/[0.03] px-5 py-4"
                    >
                      <p className="text-[0.72rem] uppercase tracking-[0.4em] text-muted">{item.label}</p>
                      <p className="mt-4 text-2xl font-light tracking-wide text-text sm:text-3xl">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4"
            >
              <div className="rounded-[2rem] border border-white/8 bg-surface/70 p-6 backdrop-blur-sm sm:p-8">
                <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Archive Notes</p>
                <p className="mt-5 text-lg font-light leading-8 text-text sm:text-xl">
                  Still in the early phase.
                  <br />
                  Focused on study, projects, documentation and long-term growth.
                  <br />
                  Record remains active.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-20 sm:py-28">
        <div className="grid gap-4 lg:grid-cols-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-[2rem] border border-white/8 bg-surface/70 p-6 backdrop-blur-sm sm:p-8">
              <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Current Mission Panel</p>
              <div className="mt-5 space-y-4">
                <div className="rounded-[1.35rem] border border-white/5 bg-white/[0.03] px-5 py-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.4em] text-muted">Primary Objective</p>
                  <p className="mt-3 text-2xl font-light tracking-wide text-text sm:text-3xl">JEE 2027</p>
                </div>
                <div className="rounded-[1.35rem] border border-white/5 bg-white/[0.03] px-5 py-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.4em] text-muted">Active Systems</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {activeSystems.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/8 bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.3em] text-text"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="rounded-[2rem] border border-white/8 bg-surface/70 p-6 backdrop-blur-sm sm:p-8">
              <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Identity Statistics</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {identityStats.map((item) => (
                  <div key={item.label} className="rounded-[1.35rem] border border-white/5 bg-white/[0.03] px-5 py-4">
                    <p className="text-[0.72rem] uppercase tracking-[0.4em] text-muted">{item.label}</p>
                    <p className="mt-4 text-2xl font-light tracking-wide text-text">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </ArchiveFrame>
  );
}
