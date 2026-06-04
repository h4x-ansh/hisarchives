"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArchiveFrame, ArchiveHero, ArchiveSection } from "@/components/archive-frame";

const galleryItems = [
  { year: "2026", caption: "Early archive composition", id: "VIS-001" },
  { year: "2026", caption: "Notes on structure and motion", id: "VIS-002" },
  { year: "2026", caption: "Experimental interface record", id: "VIS-003" },
  { year: "2026", caption: "Personal archive study", id: "VIS-004" },
] as const;

export function GalleryPage() {
  const reduceMotion = useReducedMotion();

  return (
    <ArchiveFrame activePath="/gallery">
      <ArchiveHero
        eyebrow="Visual"
        title="VISUAL RECORDS"
        subtitle="Placeholder images presented as archive entries, not as a carousel."
      />

      <ArchiveSection eyebrow="Gallery" title="Catalogued visuals." subtitle="Each entry includes year, caption, and record ID.">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          {galleryItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-surface/70 backdrop-blur-sm"
            >
              <div className="relative aspect-[4/3] bg-black/40">
                <Image
                  src="/record-placeholder.svg"
                  alt={item.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-3 p-6">
                <p className="text-[0.72rem] uppercase tracking-[0.4em] text-muted">{item.id}</p>
                <p className="text-2xl font-light tracking-wide text-text">{item.caption}</p>
                <p className="text-sm uppercase tracking-[0.35em] text-muted">{item.year}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </ArchiveSection>
    </ArchiveFrame>
  );
}
