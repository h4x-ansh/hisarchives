"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { useEffect, useState } from "react";
import { seedTimelineEntries } from "@/lib/timeline/seed";
import type { TimelineEntry } from "@/lib/timeline/types";

const CARD_W = 272;
const CARD_H = 410;

const visuals = [
  "linear-gradient(155deg,#667eea,#764ba2)",
  "linear-gradient(155deg,#f093fb,#f5576c)",
  "linear-gradient(155deg,#4facfe,#00c6fb)",
  "linear-gradient(155deg,#43e97b,#38f9d7)",
  "linear-gradient(155deg,#fa709a,#fee140)",
  "linear-gradient(155deg,#a1c4fd,#c2e9fb)",
  "linear-gradient(155deg,#ffecd2,#fcb69f)",
  "linear-gradient(155deg,#84fab0,#8fd3f4)",
];

function formatYear(value: string) {
  return new Date(`${value}T00:00:00Z`).getFullYear().toString();
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" })
    .format(new Date(`${value}T00:00:00Z`));
}

function CoverCard({
  entry, offset, onClick, visualIndex,
}: {
  entry: TimelineEntry;
  offset: number;
  onClick: () => void;
  visualIndex: number;
}) {
  const absOffset = Math.abs(offset);
  const active = offset === 0;
  const rm = useReducedMotion();

  if (absOffset > 3) return null;

  return (
    <motion.div
      onClick={!active ? onClick : undefined}
      animate={rm ? undefined : {
        x: offset * 210,
        z: -absOffset * 55,
        rotateY: -offset * 36,
        scale: active ? 1 : Math.max(0.68, 0.88 - (absOffset - 1) * 0.09),
        opacity: absOffset === 3 ? 0.45 : 1,
      }}
      initial={false}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: CARD_W,
        height: CARD_H,
        marginLeft: -CARD_W / 2,
        marginTop: -CARD_H / 2,
        zIndex: 20 - absOffset * 2,
        cursor: active ? "default" : "pointer",
      }}
    >
      {/* card */}
      <div
        className="h-full w-full overflow-hidden rounded-[1.75rem]"
        style={{
          background: "#f6eedb",
          boxShadow: active
            ? "0 28px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.3)"
            : "0 12px 40px rgba(0,0,0,0.3)",
        }}
      >
        {/* visual */}
        <div className="relative h-[46%] w-full overflow-hidden">
          {entry.coverImageUrl ? (
            <img src={entry.coverImageUrl} alt={entry.title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full" style={{ background: visuals[visualIndex % visuals.length] }} />
          )}
          {/* overlay gradient */}
          <div className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(246,238,219,0.6) 100%)" }} />
        </div>

        {/* content */}
        <div className="flex h-[54%] flex-col justify-between px-5 py-4">
          <div>
            <h3 className="text-[1rem] font-bold leading-snug tracking-[-0.01em] text-[#1e2340]">
              {entry.title}
            </h3>
            <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.28em] text-[#7a705f]">
              📍 {entry.category} · {entry.year}
            </p>
            <p className="mt-2 line-clamp-2 text-[0.68rem] leading-[1.7] text-[#5f574c]">
              {entry.summary}
            </p>
          </div>

          <div>
            {/* stats row */}
            <div className="mb-3 grid grid-cols-3 gap-1 border-t pt-3"
              style={{ borderColor: "rgba(33,40,66,0.1)" }}>
              {[
                { label: "Status", val: entry.status?.slice(0, 7) ?? "—" },
                { label: "Date",   val: formatShortDate(entry.date) },
                { label: "Tag",    val: entry.word ?? "—" },
              ].map(({ label, val }) => (
                <div key={label}>
                  <p className="text-[0.5rem] uppercase tracking-[0.3em] text-[#9e9485]">{label}</p>
                  <p className="mt-0.5 text-[0.7rem] font-semibold text-[#1e2340]">{val}</p>
                </div>
              ))}
            </div>

            {/* bottom row */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.5rem] uppercase tracking-[0.3em] text-[#9e9485]">Year</p>
                <p className="text-[1.15rem] font-bold tracking-[-0.02em] text-[#1e2340]">
                  {entry.year}
                </p>
              </div>
              {active && (
                <div className="flex h-10 w-10 items-center justify-center rounded-full text-[#f6eedb] shadow-lg"
                  style={{ background: "#1e2340" }}>
                  <span className="text-sm font-light">→</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TimelinePage({ initialEntries = [] }: { initialEntries?: TimelineEntry[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const rm = useReducedMotion();
  const entries = initialEntries.length ? initialEntries : seedTimelineEntries;

  useEffect(() => { setSelectedIndex(0); }, [entries.length]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* full-page background */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{ background: "#1c2038" }}>
        <div className="timeline-bg" style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/bg-timeline.jpg')",
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.55)",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,32,56,0.9) 0%, rgba(28,32,56,0.35) 55%, transparent 100%)" }} />
      </div>
      <style>{`
        @media (max-width: 767px) {
          .timeline-bg {
            background-size: cover !important;
            background-position: center center !important;
          }
        }
      `}</style>

      <SiteHeader activePath="/timeline" />

      <div className="relative z-10 flex min-h-screen flex-col px-4 pb-12 pt-6 sm:px-8 xl:pl-[6.75rem] xl:pr-14">

        {/* header */}
        <motion.div
          initial={rm ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 flex items-end justify-between border-b pb-4"
          style={{ borderColor: "rgba(197,184,160,0.1)" }}
        >
          <div>
            <p className="mb-1 text-[0.58rem] uppercase tracking-[0.55em]" style={{ color: "rgba(197,184,160,0.35)" }}>
              Personal Record
            </p>
            <h1 className="text-2xl font-light tracking-[0.3em] sm:text-3xl" style={{ color: "#F0E7D5" }}>
              TIMELINE
            </h1>
          </div>
          <div className="hidden items-center gap-5 text-[0.62rem] uppercase tracking-[0.4em] sm:flex"
            style={{ color: "rgba(197,184,160,0.35)" }}>
            {[["Home", "/"], ["Archives", "/archives"], ["Now", "/now"]].map(([label, href]) => (
              <Link key={href} href={href} className="transition-colors hover:text-[#f5edd8]">{label}</Link>
            ))}
          </div>
        </motion.div>

        {/* 3D coverflow stage */}
        <div className="relative flex flex-1 flex-col items-center justify-center">
          <div
            className="relative w-full"
            style={{ height: CARD_H + 60, perspective: "1400px" }}
          >
            {/* drag capture layer */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                if (info.offset.x < -40) setSelectedIndex(i => Math.min(i + 1, entries.length - 1));
                else if (info.offset.x > 40) setSelectedIndex(i => Math.max(i - 1, 0));
              }}
              className="absolute inset-0 z-40 cursor-grab active:cursor-grabbing"
              style={{ touchAction: "none" }}
            />
            <div style={{ position: "relative", transformStyle: "preserve-3d", height: "100%" }}>
              {entries.map((entry, i) => (
                <CoverCard
                  key={`${entry.date}-${entry.title}`}
                  entry={entry}
                  offset={i - selectedIndex}
                  onClick={() => setSelectedIndex(i)}
                  visualIndex={i}
                />
              ))}
            </div>
          </div>

          {/* nav controls */}
          <div className="mt-8 flex items-center gap-5">
            <button
              onClick={() => setSelectedIndex(i => Math.max(i - 1, 0))}
              disabled={selectedIndex <= 0}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all disabled:opacity-20"
              style={{ border: "1px solid rgba(197,184,160,0.2)", color: "#C5B8A0" }}
            >←</button>

            {/* dots */}
            <div className="flex items-center gap-1.5">
              {entries.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === selectedIndex ? 22 : 6,
                    background: i === selectedIndex ? "#C5B8A0" : "rgba(197,184,160,0.22)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setSelectedIndex(i => Math.min(i + 1, entries.length - 1))}
              disabled={selectedIndex >= entries.length - 1}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all disabled:opacity-20"
              style={{ border: "1px solid rgba(197,184,160,0.2)", color: "#C5B8A0" }}
            >→</button>
          </div>

          <p className="mt-3 text-[0.56rem] uppercase tracking-[0.5em]"
            style={{ color: "rgba(197,184,160,0.28)" }}>
            {String(selectedIndex + 1).padStart(2, "0")} / {String(entries.length).padStart(2, "0")}
          </p>
        </div>

      </div>
    </main>
  );
}
