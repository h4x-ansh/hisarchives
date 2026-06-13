"use client";

import type { ComponentType, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Lenis from "lenis";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Activity, Box, Feather, Globe, GraduationCap, Target } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { formatExactDate } from "@/lib/date";

const HeroCanvas = dynamic(
  () => import("./hero-canvas").then((m) => ({ default: m.HeroCanvas })),
  { ssr: false }
);

// ─── Data ────────────────────────────────────────────────────────────────────

const homeNavLinks = [
  { href: "/activity", label: "Journal" },
  { href: "/archives", label: "Archives" },
  { href: "/gallery", label: "Curated" },
  { href: "/me", label: "Identity" },
  { href: "/now", label: "Now" },
] as const;

const objectives: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}[] = [
  { title: "The Nindo", description: "My way of the ninja. The path I chose.", icon: Target },
  { title: "Domain Expansion", description: "The body and mind locked in. No escape.", icon: Activity },
  { title: "Pressure Is A Privilege", description: "Earned, not given. Carry it anyway.", icon: Box },
  { title: "Beauty Saves", description: "Beauty will save the world. Or at least — it saved me.", icon: Feather },
];


const archiveQuotes = [
  "Every life leaves traces.",
  "Nothing is forgotten.",
  "The archive remains active.",
  "Records continue to accumulate.",
] as const;

const timelineMilestones = [
  { label: "INIT", sub: "OCT 2024", active: true },
  { label: "BUILD", sub: "APR 2025" },
  { label: "LAUNCH", sub: "OCT 2025" },
  { label: "VINCAM", sub: "2027" },
];

// ─── Glass styles ─────────────────────────────────────────────────────────────

const monolithStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.012) 100%)",
  backdropFilter: "blur(48px) saturate(160%)",
  WebkitBackdropFilter: "blur(48px) saturate(160%)",
  border: "1px solid rgba(255,255,255,0.07)",
  boxShadow:
    "0 48px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.09), inset -1px 0 rgba(255,255,255,0.04)",
};

const holoStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(109,40,217,0.07) 0%, rgba(255,255,255,0.02) 50%, rgba(49,46,129,0.07) 100%)",
  backdropFilter: "blur(28px) saturate(140%)",
  WebkitBackdropFilter: "blur(28px) saturate(140%)",
  border: "1px solid rgba(139,92,246,0.18)",
  boxShadow:
    "0 24px 72px rgba(0,0,0,0.58), 0 0 0 1px rgba(139,92,246,0.08), inset 0 1px 0 rgba(139,92,246,0.14)",
};

const floatCardStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.018) 100%)",
  backdropFilter: "blur(22px) saturate(140%)",
  WebkitBackdropFilter: "blur(22px) saturate(140%)",
  border: "1px solid rgba(255,255,255,0.09)",
  boxShadow:
    "0 28px 80px rgba(0,0,0,0.78), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.11), inset 0 -1px 0 rgba(0,0,0,0.22)",
};

const scanLines: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)",
};

// ─── Home header (horizontal top bar) ────────────────────────────────────────

function HomeHeader() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-4 sm:px-10"
      style={{ background: "linear-gradient(to bottom, rgba(5,5,8,0.72) 0%, transparent 100%)" }}
    >
      <Link href="/" className="flex items-center gap-2.5 group">
        <span className="text-accent/80 text-sm font-light" style={{ fontFamily: "var(--font-serif)" }}>◎</span>
        <span className="text-[0.6rem] uppercase tracking-[0.55em] text-white/65 group-hover:text-white/90 transition-colors">
          HISARCHIVES.XYZ
        </span>
      </Link>

      <nav className="hidden items-center gap-8 lg:flex">
        {homeNavLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-[0.58rem] uppercase tracking-[0.52em] text-white/40 transition-colors duration-200 hover:text-white/85"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

// ─── TiltCard ────────────────────────────────────────────────────────────────

function TiltCard({
  children,
  className = "",
  intensity = 10,
  defaultRotateX = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  defaultRotateX?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [defaultRotateX + intensity, defaultRotateX - intensity]),
    { stiffness: 380, damping: 38 }
  );
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-intensity, intensity]), {
    stiffness: 380,
    damping: 38,
  });
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.1), transparent 58%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (reduceMotion || !ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        mouseX.set((e.clientX - left) / width);
        mouseY.set((e.clientY - top) / height);
      }}
      onMouseLeave={() => {
        if (reduceMotion) return;
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      style={
        reduceMotion
          ? style
          : { rotateX, rotateY, transformPerspective: 900, ...style }
      }
      className={className}
    >
      {children}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />
      )}
    </motion.div>
  );
}

// ─── Orbital sphere ───────────────────────────────────────────────────────────

function BatSignal({ reduceMotion }: { reduceMotion: boolean }) {
  const SIZE = 280;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 cursor-pointer"
      style={{ width: SIZE, height: SIZE, transition: "transform 0.4s ease" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Base ambient bloom — brightens on hover */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ transition: "opacity 0.5s ease", opacity: hovered ? 1 : 0.4 }}>
        <div className="rounded-full" style={{
          width: 240, height: 180,
          background: "radial-gradient(ellipse, rgba(140,160,255,0.18), rgba(80,80,200,0.06) 55%, transparent 75%)",
          filter: "blur(28px)",
          transition: "all 0.5s ease",
        }} />
      </div>

      {/* Spotlight beam on hover */}
      <div className="pointer-events-none absolute inset-0 flex justify-center"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <div style={{
          width: 120, height: "100%",
          background: "linear-gradient(to bottom, rgba(180,190,255,0.07) 0%, transparent 80%)",
          clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
        }} />
      </div>

      {/* SVG rings */}
      <svg viewBox="0 0 280 280" style={{ position: "absolute", inset: 0, width: SIZE, height: SIZE, overflow: "visible" }}>
        <defs>
          <filter id="ring-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Outer dashed ring — rotating */}
        <circle cx={140} cy={140} r={132} fill="none"
          filter={hovered ? "url(#ring-glow)" : undefined}
          stroke={hovered ? "rgba(160,180,255,0.35)" : "rgba(255,255,255,0.1)"}
          strokeWidth={hovered ? 1.2 : 1} strokeDasharray="5 6"
          style={{
            transformOrigin: "140px 140px",
            animation: reduceMotion ? undefined : "bat-rot 32s linear infinite",
            transition: "stroke 0.4s ease, stroke-width 0.4s ease",
          }}
        />

        {/* Inner solid ring — pulsing */}
        <circle cx={140} cy={140} r={108} fill="none"
          filter={hovered ? "url(#ring-glow)" : undefined}
          stroke={hovered ? "rgba(160,180,255,0.3)" : "rgba(255,255,255,0.07)"}
          strokeWidth={hovered ? 1.5 : 1}
          style={{
            animation: reduceMotion ? undefined : "bat-pulse 3.2s ease-in-out infinite",
            transition: "stroke 0.4s ease",
          }}
        />

        {/* Tick marks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line key={deg}
              x1={140 + Math.cos(rad) * 102} y1={140 + Math.sin(rad) * 102}
              x2={140 + Math.cos(rad) * 116} y2={140 + Math.sin(rad) * 116}
              stroke={hovered ? "rgba(180,200,255,0.45)" : "rgba(255,255,255,0.14)"}
              strokeWidth={hovered ? 1.5 : 1}
              style={{ transition: "stroke 0.4s ease" }}
            />
          );
        })}

        {/* Corner crosshair marks on outer ring at 0/90/180/270 */}
        {[0, 90, 180, 270].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 140 + Math.cos(rad) * 132;
          const cy2 = 140 + Math.sin(rad) * 132;
          return (
            <g key={`cross-${deg}`} style={{ opacity: hovered ? 1 : 0.3, transition: "opacity 0.4s ease" }}>
              <line x1={cx - Math.sin(rad) * 5} y1={cy2 + Math.cos(rad) * 5}
                    x2={cx + Math.sin(rad) * 5} y2={cy2 - Math.cos(rad) * 5}
                    stroke="rgba(180,200,255,0.6)" strokeWidth={1} />
            </g>
          );
        })}
      </svg>

      {/* Batman image */}
      <div className="absolute inset-0 flex items-center justify-center"
        style={{ transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.4s ease" }}>
        <img
          src="/batman-cutout.jpg"
          alt=""
          style={{
            width: 220,
            height: "auto",
            objectFit: "contain",
            filter: hovered
              ? "invert(1) brightness(0.12) contrast(1.5) drop-shadow(0 0 12px rgba(140,160,255,0.35))"
              : "invert(1) brightness(0.08) contrast(1.4)",
            animation: reduceMotion ? undefined : "bat-breathe 4s ease-in-out infinite",
            transition: "filter 0.4s ease",
          }}
        />
      </div>

      <style>{`
        @keyframes bat-rot { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bat-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes bat-breathe {
          0%, 100% { opacity: 0.82; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Objective card ───────────────────────────────────────────────────────────

function ObjectiveCard({
  index,
  title,
  description,
  icon: Icon,
}: {
  index: number;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <TiltCard
      intensity={9}
      defaultRotateX={2}
      className="group relative overflow-hidden rounded-3xl p-7"
      style={floatCardStyle}
    >
      <p className="text-[0.58rem] uppercase tracking-[0.45em] text-accent/60 mb-5">
        {String(index).padStart(2, "0")}
      </p>
      <h3 className="text-xl font-light tracking-wide text-white mb-6">{title}</h3>
      <div className="flex items-center justify-center w-12 h-12 rounded-2xl mb-6"
        style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
        <Icon className="h-5 w-5 text-accent/80" />
      </div>
      <p className="text-sm leading-7 text-white/40 font-light">{description}</p>
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }}
      />
    </TiltCard>
  );
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

export function Homepage() {
  const reduceMotion = useReducedMotion();
  const [storyIndex, setStoryIndex] = useState(0);
  const [recordIndex, setRecordIndex] = useState(0);
  const [heroShift, setHeroShift] = useState({ x: 0, y: 0 });
  const [isMobileHero, setIsMobileHero] = useState(false);
  const [studyStreak, setStudyStreak] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  const streakLabel =
    studyStreak === null
      ? "Study streak"
      : studyStreak === 0
      ? "Study streak — not started"
      : `Study streak — ${studyStreak} ${studyStreak === 1 ? "day" : "days"}`;

  const livingRecords = [
    { eventDate: "2024-10-26", text: "Idea of this project", live: false },
    { eventDate: "active", text: streakLabel, live: true },
    { eventDate: "2025-04-03", text: "Started building this website", live: false },
    { eventDate: "2025-10-22", text: "hisarchives.xyz launched", live: false },
    { eventDate: "2026-06-13", text: "HisArchives V3 deployed.\n\nArchive infrastructure completed.\nIdentity records active.\nCMS operational.\nThe archive remains active.", live: false },
  ];

  // Smooth scroll
  useEffect(() => {
    if (reduceMotion) return;
    const lenis = new Lenis({ duration: 0.55, smoothWheel: true, lerp: 0.18 });
    let frame = 0;
    const raf = (t: number) => { lenis.raf(t); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, [reduceMotion]);

  // Mobile detection
  useEffect(() => {
    const q = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobileHero(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);

  // Quote cycling
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setStoryIndex((c) => (c + 1) % archiveQuotes.length), 4200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  // Record cycling — one at a time
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setRecordIndex((c) => (c + 1) % livingRecords.length), 3400);
    return () => window.clearInterval(id);
  }, [reduceMotion, livingRecords.length]);

  // Streak fetch
  useEffect(() => {
    fetch("/api/now/streak")
      .then((r) => r.json())
      .then((d: { streak: number }) => setStudyStreak(d.streak))
      .catch(() => setStudyStreak(0));
  }, []);

  const current = livingRecords[recordIndex];

  return (
    <main className="relative isolate overflow-hidden bg-[#050508] text-white">
      <HomeHeader />
      <SiteHeader activePath="/" timestampDate="2026-06-05T00:00:00Z" />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        id="hero"
        onMouseMove={(e) => {
          if (reduceMotion || !heroRef.current) return;
          const b = heroRef.current.getBoundingClientRect();
          setHeroShift({
            x: ((e.clientX - b.left) / b.width - 0.5) * 10,
            y: ((e.clientY - b.top) / b.height - 0.5) * 10,
          });
        }}
        onMouseLeave={() => setHeroShift({ x: 0, y: 0 })}
        className="relative min-h-screen overflow-hidden bg-[#050508]"
      >
        {/* ── Layer 1: base image — slowest, furthest ── */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ willChange: "transform" }}
        >
          <div
            className="absolute inset-[-2%]"
            style={{
              backgroundImage: "url('/hero-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `perspective(1600px) rotateX(${-heroShift.y * 0.25}deg) rotateY(${heroShift.x * 0.25}deg) translate3d(${heroShift.x * 0.35}px, ${heroShift.y * 0.25}px, 0)`,
              transition: "transform 0.05s linear",
              filter: "brightness(0.82) saturate(1.1)",
            }}
          />
        </div>

        {/* ── Layer 2: mid-depth atmospheric glow ── */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 58% 75%, rgba(50,28,90,0.45) 0%, transparent 55%)",
            transform: `translate3d(${heroShift.x * 0.55}px, ${heroShift.y * 0.4}px, 0)`,
            transition: "transform 0.08s linear",
          }}
        />

        {/* ── Layer 3: Three.js particle overlay — fastest, nearest ── */}
        {!isMobileHero && (
          <div className="absolute inset-0 pointer-events-none">
            <HeroCanvas x={heroShift.x / 5} y={-heroShift.y / 5} />
          </div>
        )}

        {/* ── Left text fade ── */}
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(105deg, rgba(5,5,8,0.92) 0%, rgba(5,5,8,0.72) 32%, rgba(5,5,8,0.22) 62%, transparent 100%)" }} />
        {/* ── Depth vignette edges ── */}
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(3,2,10,0.65) 100%)" }} />
        {/* ── Bottom fade to page ── */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050508] to-transparent" />

        <div className="relative z-10 flex min-h-screen items-center pt-20">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-20">
            <div className="grid gap-0 lg:grid-cols-[1fr_1.4fr] lg:items-center">

              {/* ── Left — text ── */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={
                  isMobileHero
                    ? undefined
                    : {
                        transform: `perspective(1100px) rotateX(${-heroShift.y * 0.25}deg) rotateY(${heroShift.x * 0.25}deg) translate3d(${heroShift.x * 0.15}px, ${heroShift.y * 0.15}px, 0)`,
                      }
                }
              >
                <p className="mb-6 text-[0.6rem] uppercase tracking-[0.62em] text-accent/80">
                  A Living Archive
                </p>

                {/* Main display title */}
                <h1 className="font-thin leading-[0.88]" style={{ fontSize: "clamp(2.6rem, 4.6vw, 4.8rem)", letterSpacing: "0.06em" }}>
                  <span className="block text-white/95">THE</span>
                  <span
                    className="block"
                    style={{
                      background: "linear-gradient(135deg, #ffffff 0%, rgba(198,168,255,0.85) 55%, rgba(139,92,246,0.7) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ARCHIVES
                  </span>
                </h1>

                <div className="my-5 h-px w-10 bg-white/15" />

                <p className="text-[0.95rem] font-light text-white/42" style={{ letterSpacing: "0.01em" }}>
                  Projects. Thoughts. Progress. Memories.
                </p>

                {/* Live record feed — one at a time */}
                <div className="mt-8">
                  <p className="mb-5 text-[0.58rem] uppercase tracking-[0.68em] text-accent/70">
                    Live Record Feed
                  </p>
                  <div className="relative h-7 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={recordIndex}
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -14 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center gap-4"
                      >
                        <span className="flex-shrink-0 w-24 text-[0.68rem] font-light tracking-wider text-accent">
                          {current.live ? (
                            <span className="flex items-center gap-1.5">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                              <span>LIVE</span>
                            </span>
                          ) : (
                            formatExactDate(current.eventDate)
                          )}
                        </span>
                        <span className="text-[0.42rem] text-white/20">◆</span>
                        <span className="text-[0.88rem] font-light text-white/60">{current.text}</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Progress dots */}
                  <div className="mt-3.5 flex gap-1.5">
                    {livingRecords.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setRecordIndex(i)}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: i === recordIndex ? 18 : 5,
                          height: 3,
                          background: i === recordIndex ? "rgba(139,92,246,0.9)" : "rgba(255,255,255,0.15)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <Link
                    href="/archives"
                    className="inline-flex items-center gap-3 rounded-full px-6 py-2.5 text-[0.62rem] uppercase tracking-[0.45em] text-white/60 transition duration-300 hover:text-white/90"
                    style={{
                      border: "1px solid rgba(255,255,255,0.13)",
                      background: "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    Enter the Archive
                    <span className="text-sm text-accent">↗</span>
                  </Link>
                </div>
              </motion.div>

              {/* ── Right — canvas scene + vertical element ── */}
              <div className="relative hidden min-h-[28rem] lg:block">
                {/* Vertical line + "KEEP BUILDING / KEEP BECOMING" */}
                <div
                  className="absolute flex flex-col items-center"
                  style={{
                    left: "38%",
                    top: "18%",
                    bottom: "12%",
                    transform: `translate3d(${heroShift.x * 0.05}px, ${heroShift.y * 0.05}px, 0)`,
                  }}
                >
                  {/* Top line segment */}
                  <div className="w-px flex-1 max-h-16" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12))" }} />

                  {/* Labels */}
                  <div className="relative flex flex-col gap-5 py-4">
                    <div className="text-right pr-5">
                      <p className="text-[0.5rem] uppercase tracking-[0.6em] text-white/25 leading-tight">KEEP<br />BUILDING.</p>
                    </div>
                    <div className="text-right pr-5">
                      <p className="text-[0.5rem] uppercase tracking-[0.6em] text-white/25 leading-tight">KEEP<br />BECOMING.</p>
                    </div>
                  </div>

                  {/* Bottom line */}
                  <div className="w-px flex-1" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(139,92,246,0.25))" }} />

                  {/* Accent dot */}
                  <div
                    className="rounded-full"
                    style={{
                      width: 9,
                      height: 9,
                      background: "rgba(139,92,246,0.9)",
                      boxShadow: "0 0 14px 5px rgba(139,92,246,0.45)",
                      marginTop: 4,
                    }}
                  />

                  {/* Tail */}
                  <div className="w-px flex-1 max-h-32" style={{ background: "linear-gradient(to bottom, rgba(139,92,246,0.2), transparent)" }} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE MONOLITH ───────────────────────────────────────────────── */}
      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl p-10 sm:p-14" style={{
            ...monolithStyle,
            backgroundImage: "url('/bg-tab.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
            {/* Dark overlay so text stays readable */}
            <div className="pointer-events-none absolute inset-0" style={{ background: "rgba(6,4,16,0.38)" }} />
            <div className="pointer-events-none absolute inset-0 opacity-20" style={scanLines} />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 40%, rgba(139,92,246,0.3) 60%, transparent)" }}
            />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p
                  className="mb-5 leading-none text-accent"
                  style={{ fontSize: "1.6rem", fontFamily: "Georgia, serif" }}
                >
                  ❝❝
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={archiveQuotes[storyIndex]}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -18 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className="font-light leading-tight text-white"
                    style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)", letterSpacing: "-0.02em" }}
                  >
                    {archiveQuotes[storyIndex]}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-4 text-base font-light text-white/45">The mask is not to hide who I am, but to create what I am.</p>
              </div>
              <BatSignal reduceMotion={!!reduceMotion} />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── TIMELINE RAIL ────────────────────────────────────────────────── */}
      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        id="beginning"
        className="border-t px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
        style={{ borderColor: "rgba(255,255,255,0.04)" }}
      >
        <div className="mx-auto max-w-7xl">
          <p className="mb-8 text-[0.6rem] uppercase tracking-[0.65em] text-accent">The Timeline</p>

          <div className="grid items-start gap-8 lg:grid-cols-[auto_1fr] lg:gap-16">
            <h2
              className="font-light leading-none tracking-[-0.08em] text-white"
              style={{ fontSize: "clamp(7rem, 20vw, 15rem)" }}
            >
              {formatExactDate("2026-06-04", "yyyy")}
            </h2>
            <p
              className="font-light leading-snug text-white/65 lg:mt-8"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
            >
              Veni.
              <br />
              Vidi.
              <br />
              Vici.
              <br />
              The archive begins here.
            </p>
          </div>

          <div className="relative mt-14">
            <div
              className="pointer-events-none absolute inset-x-0 top-3 h-6 blur-2xl"
              style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.45) 0%, rgba(139,92,246,0.1) 35%, transparent 70%)" }}
            />
            <div
              className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
              style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.75) 0%, rgba(139,92,246,0.3) 30%, rgba(255,255,255,0.08) 100%)" }}
            />
            <div className="relative flex justify-between py-3">
              {timelineMilestones.map((m) => (
                <div key={m.label} className="flex flex-col items-center gap-3">
                  <div
                    className="relative z-10 rounded-full"
                    style={
                      m.active
                        ? { width: 11, height: 11, background: "#8b5cf6", boxShadow: "0 0 14px 5px rgba(139,92,246,0.65)" }
                        : { width: 8, height: 8, background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.1)" }
                    }
                  />
                  <div className="text-center">
                    <p className={`text-[0.58rem] uppercase tracking-[0.4em] ${m.active ? "text-accent" : "text-white/25"}`}>{m.label}</p>
                    <p className="mt-0.5 text-[0.52rem] uppercase tracking-wider text-white/18">{m.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.section>

      {/* ── IDENTITY PANEL ───────────────────────────────────────────────── */}
      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        id="identity"
        className="border-t px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
        style={{ borderColor: "rgba(255,255,255,0.04)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl" style={holoStyle}>
            <div className="pointer-events-none absolute inset-0 opacity-18" style={scanLines} />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5) 30%, rgba(139,92,246,0.5) 70%, transparent)" }}
            />
            {["top-0 left-0 border-t border-l rounded-tl-[inherit]", "top-0 right-0 border-t border-r rounded-tr-[inherit]", "bottom-0 left-0 border-b border-l rounded-bl-[inherit]", "bottom-0 right-0 border-b border-r rounded-br-[inherit]"].map((c, i) => (
              <div key={i} className={`pointer-events-none absolute h-5 w-5 ${c}`} style={{ borderColor: "rgba(139,92,246,0.4)" }} />
            ))}

            <div className="relative grid sm:grid-cols-3">
              {[
                { label: "Identity Record", value: "ANSH", large: true, icon: null },
                { label: "Recorded In", value: "India", large: false, icon: Globe },
                { label: "Current Phase", value: "Vidi (I saw)", large: false, icon: GraduationCap },
              ].map((item) => (
                <div key={item.label} className="p-8 sm:p-10" style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="mb-4 text-[0.58rem] uppercase tracking-[0.6em] text-accent/55">{item.label}</p>
                  <p className={`font-light text-white/90 ${item.large ? "text-5xl sm:text-6xl tracking-tight" : "text-3xl"}`}>
                    {item.value}
                  </p>
                  {item.icon && <item.icon className="mt-3 h-4 w-4 text-accent/45" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── ACTIVE RECORD ────────────────────────────────────────────────── */}
      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        id="objectives"
        className="border-t px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
        style={{ borderColor: "rgba(255,255,255,0.04)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-[0.6rem] uppercase tracking-[0.6em] text-accent">Active Record</p>
              <h2 className="font-light text-white/90" style={{ fontSize: "clamp(1.75rem, 4vw, 3.2rem)" }}>
                What is being carried forward.
              </h2>
            </div>
            <p className="max-w-xs text-sm font-light leading-7 text-white/30">
              Once I&apos;m done — I&apos;ll be gone.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {objectives.map((obj, i) => (
              <ObjectiveCard key={obj.title} index={i + 1} title={obj.title} description={obj.description} icon={obj.icon} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── ENTER ARCHIVES ───────────────────────────────────────────────── */}
      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        id="archives"
        className="border-t px-5 py-20 pb-10 sm:px-8 sm:py-28 lg:px-12"
        style={{ borderColor: "rgba(255,255,255,0.04)" }}
      >
        <div className="mx-auto max-w-7xl">
          <TiltCard
            intensity={3}
            className="group relative overflow-hidden rounded-3xl grid lg:grid-cols-[1fr_0.75fr]"
            style={monolithStyle}
          >
            <div className="pointer-events-none absolute inset-0 opacity-20" style={scanLines} />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.16) 50%, transparent)" }}
            />

            <div className="relative p-10 sm:p-14">
              <div className="space-y-6">
                <p className="text-[0.6rem] uppercase tracking-[0.65em] text-accent">Enter Archives</p>
                <h2
                  className="font-light leading-[1.05] text-white/92"
                  style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
                >
                  Open the<br />archive index.
                </h2>
                <Link
                  href="/archives"
                  className="inline-flex items-center gap-3 rounded-full px-7 py-3 text-[0.7rem] uppercase tracking-[0.42em] text-white/70 transition duration-300 hover:text-white"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
                >
                  Enter Archives
                  <span className="text-accent">→</span>
                </Link>
              </div>
            </div>

            <div className="relative hidden overflow-hidden lg:block">
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(109,40,217,0.18) 0%, rgba(5,5,8,0.6) 65%)" }} />
              {[0.85, 0.7, 0.55, 0.4, 0.28].map((s, i) => (
                <div
                  key={i}
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{ width: `${s * 100}%`, height: `${s * 100}%`, borderColor: `rgba(255,255,255,${0.04 + i * 0.01})` }}
                />
              ))}
              <div
                className="pointer-events-none absolute left-1/2 -translate-x-1/2"
                style={{ top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.14) 40%, rgba(139,92,246,0.2) 60%, transparent)" }}
              />
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                style={{ background: "rgba(139,92,246,0.25)" }}
              />
              <div
                className="pointer-events-none absolute left-1/2 -translate-x-1/2"
                style={{ bottom: "15%", width: 2, height: 8, background: "rgba(255,255,255,0.2)", borderRadius: 1 }}
              />
            </div>
          </TiltCard>
        </div>
      </motion.section>

    </main>
  );
}
