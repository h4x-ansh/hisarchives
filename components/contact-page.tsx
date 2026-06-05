"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArchiveFrame, ArchiveHero, ArchiveSection } from "@/components/archive-frame";

const contactMethods = [
  { label: "Email", value: "anuneet.og@gmail.com" },
  { label: "GitHub", value: "@h4x-ansh" },
  { label: "Discord", value: "11.11arc" },
  { label: "Instagram", value: "@_anuneet1x" },
] as const;

const otherLinks = [
  "Linktree placeholder",
  "Project archive mirror",
  "Notes index",
] as const;

export function ContactPage() {
  const reduceMotion = useReducedMotion();

  return (
    <ArchiveFrame activePath="/contact">
      <ArchiveHero
        eyebrow="Transmission"
        title="TRANSMISSION CHANNELS"
        subtitle="Ways to reach the archive, recorded in a minimal and placeholder form."
      />

      <ArchiveSection eyebrow="Channels" title="Primary contact points." subtitle="Placeholder values only.">
        <div className="grid gap-4 sm:grid-cols-2">
          {contactMethods.map((item, index) => (
            <motion.article
              key={item.label}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[1.75rem] border border-white/8 bg-surface/70 p-6 backdrop-blur-sm sm:p-7"
            >
              <p className="text-[0.72rem] uppercase tracking-[0.4em] text-muted">{item.label}</p>
              <p className="mt-4 text-2xl font-light">{item.value}</p>
            </motion.article>
          ))}
        </div>
      </ArchiveSection>

      <ArchiveSection eyebrow="Other Links" title="Additional references.">
        <div className="rounded-[2rem] border border-white/8 bg-surface/70 px-6 py-3 backdrop-blur-sm sm:px-8">
          {otherLinks.map((item) => (
            <div key={item} className="grid gap-4 border-b border-white/5 py-5 sm:grid-cols-[12rem_1fr]">
              <p className="text-[0.72rem] uppercase tracking-[0.35em] text-muted">Link</p>
              <p className="text-lg font-light leading-8 text-text sm:text-xl">{item}</p>
            </div>
          ))}
        </div>
      </ArchiveSection>
    </ArchiveFrame>
  );
}
