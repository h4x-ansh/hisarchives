"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import type { IdentityRecord } from "@/lib/identity/types";

// ─── Data ─────────────────────────────────────────────────────────────────────

const fallback = {
  name: "Ansh",
  shortTagline: "I build digital systems that last. Archive-first, mission-driven, and always shipping.",
  fullBio: "Started with curiosity. Ended up building HisArchives — a living archive of work, discipline, and unfinished ambition. I believe in clarity, precision, and craftsmanship in everything I build.",
  fullBio2: "Every project gets documented. Every decision gets recorded. The archive stays active.",
  location: "India",
  email: "anuneet.og@gmail.com",
  github: "https://github.com/h4x-ansh",
  discord: "11.11arc",
};

const stats = [
  { icon: "⬡", value: "2+", label: "Years Building" },
  { icon: "⬡", value: "7+", label: "Projects Completed" },
  { icon: "⬡", value: "1", label: "Archive Live" },
  { icon: "∞", value: "∞", label: "Curiosity Level" },
];

const skillCategories = [
  {
    label: "Development",
    skills: [
      { name: "HTML / CSS",   icon: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "TypeScript",   icon: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "Java",         icon: "https://cdn.simpleicons.org/openjdk/ffffff" },
      { name: "Next.js",      icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
      { name: "Supabase",     icon: "https://cdn.simpleicons.org/supabase/3ECF8E" },
      { name: "GitHub",       icon: "https://cdn.simpleicons.org/github/ffffff" },
      { name: "Vercel",       icon: "https://cdn.simpleicons.org/vercel/ffffff" },
      { name: "Frontend Dev", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Python",       icon: "https://cdn.simpleicons.org/python/3776AB" },
    ],
  },
  {
    label: "AI Automation",
    skills: [
      { name: "Prompt Engineering", icon: "https://img.icons8.com/color/48/artificial-intelligence.png" },
      { name: "ChatGPT",            icon: "https://img.icons8.com/color/48/chatgpt.png" },
      { name: "Claude",             icon: "https://cdn.simpleicons.org/anthropic/ffffff" },
      { name: "Automation Systems", icon: "https://cdn.simpleicons.org/zapier/FF4A00" },
    ],
  },
  {
    label: "Photography",
    skills: [
      { name: "Mobile Photography", icon: "https://cdn.simpleicons.org/apple/ffffff" },
      { name: "Photo Editing",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg" },
      { name: "Colour Grading",     icon: "https://cdn.simpleicons.org/davinciresolve/233A51", invert: true },
      { name: "Composition",        icon: "https://cdn.simpleicons.org/unsplash/ffffff" },
    ],
  },
  {
    label: "Video Editing",
    skills: [
      { name: "CapCut",          icon: "https://cdn.simpleicons.org/tiktok/ffffff" },
      { name: "Premiere Pro",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-plain.svg" },
      { name: "Motion Graphics", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-plain.svg" },
      { name: "Reels Editing",   icon: "https://cdn.simpleicons.org/instagram/E4405F" },
      { name: "Shorts Editing",  icon: "https://cdn.simpleicons.org/youtube/FF0000" },
    ],
  },
];

const projects = [
  { title: "HisArchives", sub: "Sasta Portfolio", year: "2024", href: "/", scene: "archive" as const },
  { title: "Discord Bot", sub: "Multipurpose Moderation Bot", year: "2025", href: "https://discord.com/oauth2/authorize?client_id=1494645067552526408&scope=bot+applications.commands&permissions=1100337244374", external: true, scene: "automation" as const },
  { title: "OWO Tool", sub: "Reverse Engineered Auto Farmer", year: "2026", href: "#", popup: true, scene: "cricket" as const },
  { title: "Study Tracker", sub: "For My Own Usage", year: "2025", href: "/now", scene: "atom" as const },
];

const experience = [
  { period: "2025 – Present", title: "Freelancer", desc: "Open to frontend development and video editing work." },
  { period: "2024 – 2025", title: "Freelance Video Editor", desc: "Edited reels, shorts, and long-form content for clients." },
  { period: "2024 – 2026", title: "Discord Moderator", desc: "Moderated and managed communities across multiple servers." },
];

const education = [
  { year: "2026 – 2027", title: "JEE 2027 Preparation", sub: "University of — Science Stream" },
  { year: "2026", title: "Class 11", sub: "Science Stream" },
  { year: "2024", title: "Class 10", sub: "Secondary Education" },
];

// ─── Tilt card ────────────────────────────────────────────────────────────────

function useTilt(max = 8) {
  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);
  const ry = useTransform(nx, [0, 1], [-max, max]);
  const rx = useTransform(ny, [0, 1], [max, -max]);
  const sry = useSpring(ry, { stiffness: 200, damping: 25 });
  const srx = useSpring(rx, { stiffness: 200, damping: 25 });

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    nx.set((e.clientX - r.left) / r.width);
    ny.set((e.clientY - r.top) / r.height);
  }, [nx, ny]);

  const onLeave = useCallback(() => { nx.set(0.5); ny.set(0.5); }, [nx, ny]);

  return { srx, sry, onMove, onLeave };
}

// rests at a slight left-leaning tilt (nx=0.3 → rotateY ≈ -6deg), interactive on hover
function useHeroTilt() {
  const nx = useMotionValue(0.88);
  const ny = useMotionValue(0.52);
  const ry = useTransform(nx, [0, 1], [-30, 30]);
  const rx = useTransform(ny, [0, 1], [8, -8]);
  const sry = useSpring(ry, { stiffness: 120, damping: 26 });
  const srx = useSpring(rx, { stiffness: 120, damping: 26 });

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    nx.set((e.clientX - r.left) / r.width);
    ny.set((e.clientY - r.top) / r.height);
  }, [nx, ny]);

  const onLeave = useCallback(() => { nx.set(0.88); ny.set(0.52); }, [nx, ny]);

  return { srx, sry, onMove, onLeave };
}

// ─── CSS sphere for About ──────────────────────────────────────────────────────

function CssSphere() {
  const [hovered, setHovered] = useState(false);
  const SIZE = 280;

  return (
    <div
      className="relative flex h-full w-full cursor-pointer items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ambient red bloom */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ zIndex: 0 }}>
        <div style={{
          width: 260, height: 200,
          background: "radial-gradient(ellipse, rgba(180,20,20,0.18), rgba(100,10,10,0.06) 55%, transparent 75%)",
          filter: "blur(30px)",
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.5s ease",
        }} />
      </div>

      {/* ── Sharingan SVG rings — z0, behind Sasuke ── */}
      <svg viewBox="0 0 280 280" style={{ position: "absolute", inset: 0, width: SIZE, height: SIZE, overflow: "visible", zIndex: 1, transform: "translateX(28px)" }}>
        <defs>
          <filter id="sharingan-glow-me">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Outer dashed ring */}
        <circle cx={140} cy={140} r={130} fill="none"
          stroke={hovered ? "rgba(220,40,40,0.35)" : "rgba(200,30,30,0.15)"}
          strokeWidth={hovered ? 1.2 : 1} strokeDasharray="5 7"
          style={{ transformOrigin: "140px 140px", animation: "sharingan-rot 28s linear infinite", transition: "stroke 0.4s ease" }}
        />

        {/* Mid solid ring */}
        <circle cx={140} cy={140} r={106} fill="none"
          filter={hovered ? "url(#sharingan-glow-me)" : undefined}
          stroke={hovered ? "rgba(220,40,40,0.6)" : "rgba(180,20,20,0.2)"}
          strokeWidth={hovered ? 1.5 : 1}
          strokeDasharray={hovered ? "220 60" : "340 0"}
          style={{ transformOrigin: "140px 140px", animation: "sharingan-rot-rev 16s linear infinite", transition: "stroke 0.4s ease, stroke-dasharray 0.6s ease" }}
        />

        {/* Inner ring */}
        <circle cx={140} cy={140} r={80} fill="none"
          filter={hovered ? "url(#sharingan-glow-me)" : undefined}
          stroke={hovered ? "rgba(220,40,40,0.5)" : "rgba(160,15,15,0.15)"}
          strokeWidth={1.2}
          strokeDasharray={hovered ? "140 50" : "250 0"}
          style={{ transformOrigin: "140px 140px", animation: "sharingan-rot 10s linear infinite", transition: "stroke 0.4s ease, stroke-dasharray 0.5s ease 0.1s" }}
        />

        {/* Tick marks */}
        {[0,45,90,135,180,225,270,315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line key={deg}
              x1={140 + Math.cos(rad) * 100} y1={140 + Math.sin(rad) * 100}
              x2={140 + Math.cos(rad) * 114} y2={140 + Math.sin(rad) * 114}
              stroke={hovered ? "rgba(220,40,40,0.45)" : "rgba(180,20,20,0.18)"}
              strokeWidth={hovered ? 1.5 : 1}
              style={{ transition: "stroke 0.4s ease" }}
            />
          );
        })}

        {/* Crosshair brackets on hover */}
        {[0,90,180,270].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 140 + Math.cos(rad) * 130;
          const cy2 = 140 + Math.sin(rad) * 130;
          return (
            <g key={deg} style={{ opacity: hovered ? 1 : 0.2, transition: "opacity 0.4s ease" }}>
              <line x1={cx - Math.sin(rad)*5} y1={cy2 + Math.cos(rad)*5}
                    x2={cx + Math.sin(rad)*5} y2={cy2 - Math.cos(rad)*5}
                    stroke="rgba(220,40,40,0.7)" strokeWidth={1} />
            </g>
          );
        })}
      </svg>

      {/* ── Sasuke — in front of rings ── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 2, transform: hovered ? "translate(-20px, 16px) scale(1.06)" : "translate(-20px, 16px)", transition: "transform 0.4s ease" }}>
        <img
          src="/sasuke.png"
          alt=""
          style={{
            width: 210, height: "auto", objectFit: "contain",
            filter: hovered
              ? "brightness(1.1) contrast(1.06) drop-shadow(0 0 18px rgba(220,40,40,0.6))"
              : "brightness(0.95) contrast(1.04) drop-shadow(0 0 6px rgba(180,20,20,0.25))",
            animation: "sasuke-breathe 4s ease-in-out infinite",
            transition: "filter 0.4s ease",
          }}
        />
      </div>

      <style>{`
        @keyframes sharingan-rot     { from { transform: rotate(0deg); }  to { transform: rotate(360deg); } }
        @keyframes sharingan-rot-rev { from { transform: rotate(0deg); }  to { transform: rotate(-360deg); } }
        @keyframes sasuke-breathe    { 0%, 100% { opacity: 0.88; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
}

// ─── Photo slideshow ─────────────────────────────────────────────────────────

const photos = ["/me1.png", "/me2.jpeg", "/me3.jpeg"];

const photoConfig = [
  { src: "/me1.png",  bottom: "80px",   right: "2%",  height: "130%", width: "auto", maxWidth: 420, mobileBottom: "275px", mobileRight: "-8%"  },
  { src: "/me2.png",  bottom: "-160px", right: "2%",  height: "140%", width: "auto", maxWidth: 500, mobileBottom: "165px", mobileRight: "-9%"   },
  { src: "/me3.png",  bottom: "40px",   right: "0%",  height: "120%", width: "auto", maxWidth: 390, mobileBottom: "0px",   mobileRight: "-12%"  },
];

function PhotoSlideshow() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % photoConfig.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cfg = photoConfig[index];

  return (
    <>
      {/* Pulsing violet floor glow */}
      <motion.div
        className="pointer-events-none absolute hidden lg:block"
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: 0, right: "10%", width: 220, height: 100, background: "radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.55) 0%, transparent 70%)", filter: "blur(18px)" }}
      />

      <AnimatePresence mode="wait">
        <motion.img
          key={cfg.src}
          src={cfg.src}
          alt=""
          aria-hidden
          className="pointer-events-none absolute object-contain object-bottom"
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            bottom: isMobile ? cfg.mobileBottom : cfg.bottom,
            right: isMobile ? cfg.mobileRight : cfg.right,
            height: cfg.height,
            width: cfg.width,
            maxWidth: `min(${cfg.maxWidth}px, 55vw)`,
            filter: "drop-shadow(0 0 24px rgba(139,92,246,0.6)) drop-shadow(0 0 8px rgba(200,160,255,0.4))",
          }}
        />
      </AnimatePresence>
    </>
  );
}

// ─── Hero glass card ─────────────────────────────────────────────────────────

const GLASS_THICKNESS = 16; // px — real 3D depth

function HeroGlassCard({ tagline, location }: { tagline: string; location: string }) {
  const { srx, sry, onMove, onLeave } = useHeroTilt();
  const [isMobile, setIsMobile] = useState(false);
  // separate springs for mobile touch tilt — start at 0 (flat)
  const mobileTiltX = useSpring(0, { stiffness: 180, damping: 28 });
  const mobileTiltY = useSpring(0, { stiffness: 180, damping: 28 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (touch.clientX - rect.left) / rect.width;
    const ny = (touch.clientY - rect.top) / rect.height;
    mobileTiltY.set((nx - 0.5) * 30);
    mobileTiltX.set((ny - 0.5) * -16);
  }, [mobileTiltX, mobileTiltY]);

  const handleTouchEnd = useCallback(() => {
    mobileTiltX.set(0);
    mobileTiltY.set(0);
  }, [mobileTiltX, mobileTiltY]);

  return (
    <div
      onMouseMove={isMobile ? undefined : onMove}
      onMouseLeave={isMobile ? undefined : onLeave}
      onTouchMove={isMobile ? handleTouchMove : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
      onTouchCancel={isMobile ? handleTouchEnd : undefined}
      className="relative z-10 mb-6 mr-6 mt-10 w-full max-w-[640px] cursor-default sm:mb-8 sm:-ml-[60px] sm:mr-8 sm:mt-12 lg:mb-10 lg:mr-10 lg:mt-14"
      style={isMobile ? { touchAction: "pan-y" } : undefined}
    >
    <motion.div
      style={{
        rotateX: isMobile ? mobileTiltX : srx,
        rotateY: isMobile ? mobileTiltY : sry,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        boxShadow: "0 60px 140px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.5)",
      }}
      className="relative rounded-[1.6rem]"
    >
      {/* ── Back face — gives the slab its body ── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.6rem]"
        style={{
          transform: `translateZ(-${GLASS_THICKNESS}px)`,
          background: "transparent",
          border: "none",
        }}
      />

      {/* ── Left side face — visible when tilting right ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: 0, top: "3%", height: "94%",
          width: GLASS_THICKNESS,
          transformOrigin: "left center",
          transform: "rotateY(-90deg)",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.08) 100%)",
          borderRadius: "0 3px 3px 0",
        }}
      />

      {/* ── Right side face — visible when tilting left ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          right: 0, top: "3%", height: "94%",
          width: GLASS_THICKNESS,
          transformOrigin: "right center",
          transform: "rotateY(90deg)",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 100%)",
          borderRadius: "3px 0 0 3px",
        }}
      />

      {/* ── Top side face ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0, left: "3%", width: "94%",
          height: GLASS_THICKNESS,
          transformOrigin: "top center",
          transform: "rotateX(90deg)",
          background: "linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.06) 100%)",
          borderRadius: "0 0 3px 3px",
        }}
      />

      {/* ── Front face — glass surface ── */}
      <div
        className="relative rounded-[1.6rem] p-8 sm:p-10 lg:p-12"
        style={{
          transform: "translateZ(0)",
          background: "rgba(255,255,255,0.03)",
          clipPath: "inset(0 round 1.6rem)",
        }}
      >
        {/* Top edge highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px]"
          style={{ background: "linear-gradient(to right, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.6) 25%, rgba(255,255,255,0.35) 65%, rgba(255,255,255,0.04) 100%)" }} />
        {/* Left edge highlight */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[1.5px]"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.14) 55%, rgba(255,255,255,0.02) 100%)" }} />
        {/* Right edge — dim */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-px"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.06), transparent 70%)" }} />
        {/* Bottom edge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.05) 40%, transparent)" }} />
        {/* Top-left glare */}
        <div className="pointer-events-none absolute left-0 top-0 h-32 w-52 rounded-tl-[1.6rem]"
          style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.08) 0%, transparent 65%)" }} />

        {/* ── Content ── */}
        <div className="flex flex-col justify-between" style={{ minHeight: 220 }}>
          <div className="space-y-4">
            <p className="text-[0.58rem] uppercase tracking-[0.7em] text-white/30">/ Me</p>

            <h1 className="text-[clamp(2.4rem,4.5vw,3.6rem)] font-light leading-[1.06] tracking-[-0.01em] text-white">
              Designer. Developer.<br />Builder.
            </h1>

            <div className="h-[1.5px] w-8 rounded-full" style={{ background: "linear-gradient(to right, rgba(139,92,246,1), transparent)" }} />

            <p className="max-w-[380px] text-[0.8rem] leading-[1.85] text-white/45">
              {tagline}
            </p>

            <div className="pt-1">
              <Link
                href="/archives"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] px-6 py-2.5 text-[0.6rem] uppercase tracking-[0.45em] text-white/65 backdrop-blur-sm transition hover:bg-white/10 hover:text-white"
              >
                View Archives
                <span className="text-[0.6rem] text-white/35">↓</span>
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
            <span className="text-[0.55rem] uppercase tracking-[0.5em] text-white/28">Based in {location}</span>
            <span className="h-[4px] w-[4px] rounded-full bg-violet-500" style={{ boxShadow: "0 0 5px rgba(139,92,246,0.9)" }} />
            <span className="text-[0.55rem] uppercase tracking-[0.5em] text-violet-400/55">Focused on JEE 2027</span>
          </div>
        </div>
      </div>
    </motion.div>
    </div>
  );
}

// ─── Project scene ────────────────────────────────────────────────────────────

function ProjectScene({ type }: { type: "archive" | "automation" | "cricket" | "atom" }) {
  if (type === "archive") return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 65%, rgba(139,92,246,0.18), transparent 70%)" }} />
      <div style={{ perspective: 500 }}>
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d", position: "relative", width: 72, height: 56 }}
        >
          {[2, 1, 0].map((i) => (
            <div key={i} style={{
              position: "absolute", inset: 0,
              transform: `translateZ(${i * 10}px) translateY(${i * -9}px)`,
              background: `rgba(255,255,255,${0.02 + i * 0.02})`,
              border: `1px solid rgba(255,255,255,${0.07 + i * 0.06})`,
              borderRadius: 7,
              boxShadow: i === 0 ? "0 0 18px rgba(139,92,246,0.25)" : "none",
            }} />
          ))}
        </motion.div>
      </div>
    </div>
  );

  if (type === "automation") return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 65%, rgba(59,130,246,0.15), transparent 70%)" }} />
      <div style={{ position: "relative", width: 90, height: 90 }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 12, height: 12, borderRadius: "50%", background: "rgba(99,179,237,0.9)", boxShadow: "0 0 14px rgba(99,179,237,0.9)" }} />
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={i}
            animate={{ rotate: [i * 90, i * 90 + 360] }}
            transition={{ duration: 5 + i * 1.2, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", top: "50%", left: "50%", width: 80, height: 80, transform: "translate(-50%,-50%)" }}
          >
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", background: "rgba(147,197,253,0.85)", boxShadow: "0 0 10px rgba(147,197,253,0.8)" }} />
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }}>
              <line x1="50%" y1="50%" x2="50%" y2="0%" stroke="rgba(147,197,253,0.9)" strokeWidth="1" />
            </svg>
          </motion.div>
        ))}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px dashed rgba(147,197,253,0.15)" }}
        />
      </div>
    </div>
  );

  if (type === "cricket") return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 65%, rgba(220,38,38,0.18), transparent 70%)" }} />
      <div style={{ perspective: 400 }}>
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ width: 72, height: 72, borderRadius: "50%", background: "radial-gradient(circle at 35% 32%, #f87171, #991b1b)", boxShadow: "0 0 32px rgba(220,38,38,0.45), inset -8px -8px 18px rgba(0,0,0,0.45)", position: "relative", overflow: "hidden" }}
        >
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 72 72">
            <path d="M 36 4 Q 62 36 36 68" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" />
            <path d="M 36 4 Q 10 36 36 68" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" />
            <path d="M 28 18 Q 36 28 28 46" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="2 3" />
            <path d="M 44 18 Q 36 28 44 46" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="2 3" />
          </svg>
        </motion.div>
      </div>
    </div>
  );

  if (type === "atom") return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 65%, rgba(6,182,212,0.15), transparent 70%)" }} />
      <div style={{ position: "relative", width: 88, height: 88 }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 10, height: 10, borderRadius: "50%", background: "rgba(6,182,212,0.95)", boxShadow: "0 0 14px rgba(6,182,212,0.9)" }} />
        {[
          { rx: 38, ry: 13, rotate: 0,   dur: 5   },
          { rx: 38, ry: 13, rotate: 60,  dur: 7   },
          { rx: 38, ry: 13, rotate: -60, dur: 9   },
        ].map(({ rx, ry, rotate, dur }, i) => (
          <motion.div key={i}
            animate={{ rotate: [rotate, rotate + 360] }}
            transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <svg width={88} height={88} viewBox="0 0 88 88" style={{ position: "absolute" }}>
              <ellipse cx={44} cy={44} rx={rx} ry={ry} fill="none"
                stroke={`rgba(6,182,212,${0.55 - i * 0.1})`} strokeWidth="1"
                transform={`rotate(${rotate} 44 44)`}
              />
            </svg>
            <div style={{ position: "absolute", top: `calc(50% - ${ry}px)`, left: "50%", transform: "translate(-50%,-50%)", width: 6, height: 6, borderRadius: "50%", background: "rgba(6,182,212,0.8)", boxShadow: "0 0 8px rgba(6,182,212,0.8)" }} />
          </motion.div>
        ))}
      </div>
    </div>
  );

  return null;
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ title, sub, year, href, scene, index, external, popup }: {
  title: string; sub: string; year: string; href: string;
  scene: "archive" | "automation" | "cricket" | "atom";
  index: number; external?: boolean; popup?: boolean;
}) {
  const { srx, sry, onMove, onLeave } = useTilt(6);
  const [showPopup, setShowPopup] = useState(false);

  const inner = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProjectScene type={scene} />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)" }} />
      </div>
      <div className="p-4">
        <p className="text-[0.82rem] font-light text-white/85">{title}</p>
        <p className="mt-0.5 text-[0.65rem] text-white/35">{sub}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[0.58rem] uppercase tracking-[0.35em] text-white/25">{year}</span>
          <span className="text-[0.65rem] text-white/25 transition group-hover:text-white/50">↗</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 800, background: "rgba(6,4,18,0.97)" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.08 }}
        whileHover={{ y: -5 }}
        className="group overflow-hidden rounded-[1.5rem] border border-white/8 cursor-pointer"
      >
        {popup ? (
          <button className="block w-full text-left" onClick={() => setShowPopup(true)}>{inner}</button>
        ) : external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>
        ) : (
          <Link href={href} className="block">{inner}</Link>
        )}
      </motion.div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-6"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-sm w-full rounded-[1.5rem] px-8 py-9 text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 text-2xl">🔒</div>
              <p className="mb-1 text-sm font-semibold text-white/90">Tool will be public soon</p>
              <p className="mb-6 text-[0.72rem] leading-relaxed text-white/45">Contact to get early access to the tool.</p>
              <a
                href={`mailto:${fallback.email}`}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-white/80 transition hover:text-white"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                Contact →
              </a>
              <button
                onClick={() => setShowPopup(false)}
                className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-[0.65rem] text-white/30 transition hover:text-white/60"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export function IdentityPage({ record }: { record?: IdentityRecord | null } = {}) {
  const d = record as {
    name?: string; shortTagline?: string; fullBio?: string;
    location?: string; email?: string; github?: string;
    discord?: string; profilePhotoUrl?: string;
  } | null;

  const name     = d?.name          || fallback.name;
  const tagline  = d?.shortTagline  || fallback.shortTagline;
  const bio      = d?.fullBio       || fallback.fullBio;
  const location = d?.location      || fallback.location;
  const email    = d?.email         || fallback.email;
  const github   = d?.github        || fallback.github;
  const discord  = d?.discord       || fallback.discord;

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white" style={{ backgroundColor: "#04020c" }}>

      {/* Site label — fixed top left of viewport */}
      <div className="fixed left-[68px] top-[18px] z-50 xl:left-[88px]">
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.55em] text-white/50">HisArchives.xyz</span>
      </div>

      {/* Top-right nav links */}
      <nav className="fixed right-5 top-4 z-50 hidden items-center gap-6 sm:flex">
        <Link href="/" className="text-[0.6rem] uppercase tracking-[0.45em] text-white/45 transition hover:text-white/80">Home</Link>
        <Link href="/journal" className="text-[0.6rem] uppercase tracking-[0.45em] text-white/45 transition hover:text-white/80">Journal</Link>
        <Link href="/contact" className="text-[0.6rem] uppercase tracking-[0.45em] text-white/45 transition hover:text-white/80">Contact</Link>
      </nav>

      {/* ── Full-page fixed background ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <img src="/bg-me.png" alt="" aria-hidden className="h-full w-full object-cover object-center" style={{ filter: "brightness(1)" }} />
        {/* Fade lower half to dark so content sections stay readable */}
        <div className="absolute inset-x-0 bottom-0 h-[55vh]" style={{ background: "linear-gradient(to top, rgba(4,2,12,1) 0%, rgba(4,2,12,0.75) 40%, transparent 100%)" }} />
      </div>

      <SiteHeader activePath="/me" />

      <div className="relative z-10 xl:pl-[72px]">
        <div className="mx-auto max-w-6xl space-y-16 px-4 pb-20 pt-8 sm:px-6 lg:px-8 xl:pt-10">

          {/* ─── HERO ─────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Transparent hero — bg shows through from fixed layer */}
            <div className="relative min-h-[560px]">


              <PhotoSlideshow />

              {/* Glass card — 3D tiltable slab, pushed down to clear the label */}
              <div className="pt-10">
                <HeroGlassCard tagline={tagline} location={location} />
              </div>

            </div>
          </motion.div>

          {/* ─── STATS ────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="overflow-hidden rounded-[1.75rem] border border-white/8" style={{ background: "rgba(10,7,22,0.95)", boxShadow: "0 20px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)" }} />
              <div className="grid grid-cols-2 divide-x divide-white/[0.06] lg:grid-cols-4">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    whileHover={{ backgroundColor: "rgba(139,92,246,0.04)" }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-1.5 px-6 py-8"
                  >
                    <span className="mb-1 text-lg text-violet-400/60">{s.icon}</span>
                    <span className="text-3xl font-light tracking-tight text-white">{s.value}</span>
                    <span className="text-center text-[0.58rem] uppercase tracking-[0.45em] text-white/30">{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── ABOUT ────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4 lg:grid-cols-[320px_1fr]"
          >
            {/* Left — sphere display case */}
            <div className="relative min-h-[280px] rounded-[1.75rem]" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
              <CssSphere />
            </div>

            {/* Right — bio */}
            <div className="relative rounded-[1.75rem] p-8 sm:p-10" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)" }}>

              <div className="space-y-5">
                <p className="text-[0.6rem] uppercase tracking-[0.6em] text-white/25">/ About Me</p>

                <h2 className="text-[clamp(1.6rem,3.5vw,2.25rem)] font-light leading-tight text-white">
                  I'm a student building<br className="hidden sm:block" /> digital infrastructure.
                </h2>

                <p className="max-w-[480px] text-[0.82rem] leading-[1.8] text-white/45">{bio}</p>
                <p className="max-w-[480px] text-[0.82rem] leading-[1.8] text-white/35">{fallback.fullBio2}</p>


                <a
                  href="#skills"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.4em] text-white/55 transition hover:bg-white/8 hover:text-white/80"
                >
                  More about me <span>→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* ─── SKILLS ───────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div id="skills" className="rounded-[1.75rem] px-8 py-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
              <p className="mb-7 text-[0.6rem] uppercase tracking-[0.6em] text-white/25">/ Skills</p>
              <div className="space-y-6">
                {skillCategories.map((cat, ci) => (
                  <div key={cat.label}>
                    <p className="mb-3 text-[0.58rem] uppercase tracking-[0.5em] text-white/20">{cat.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, si) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, y: 6 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: ci * 0.05 + si * 0.04 }}
                          whileHover={{ y: -2 }}
                          className="group flex cursor-default items-center gap-2.5 rounded-full px-5 py-2.5 transition"
                          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.13)" }}
                        >
                          {skill.icon && (
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              width={18}
                              height={18}
                              className="h-[18px] w-[18px] shrink-0 opacity-80 transition group-hover:opacity-100"
                              style={skill.invert ? { filter: "invert(1) brightness(2)" } : undefined}
                            />
                          )}
                          {!skill.icon && (
                            <span className="shrink-0 text-[11px] leading-none text-white/40">✦</span>
                          )}
                          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/75 transition group-hover:text-white">{skill.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── FEATURED WORK ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[0.6rem] uppercase tracking-[0.6em] text-white/25">/ Featured Work</p>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-[0.6rem] text-white/35 transition hover:border-white/14 hover:text-white/55 cursor-pointer">+</div>
                <Link href="/archives" className="flex h-7 w-7 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-[0.6rem] text-white/35 transition hover:border-white/14 hover:text-white/55">→</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {projects.map((p, i) => (
                <ProjectCard key={p.title} {...p} index={i} />
              ))}
            </div>
          </motion.div>

          {/* ─── EXPERIENCE & EDUCATION ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/8 px-6 py-8 sm:px-8 sm:py-10" style={{ background: "rgba(10,7,22,0.95)", boxShadow: "0 20px 60px rgba(0,0,0,0.45)" }}>
              {/* Ambient left glow */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-2/5" style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(88,28,135,0.16), transparent 70%)" }} />
              {/* Ambient right glow */}
              <div className="pointer-events-none absolute right-0 top-0 h-full w-2/5" style={{ background: "radial-gradient(ellipse at 100% 50%, rgba(59,130,246,0.08), transparent 70%)" }} />

              <p className="relative mb-8 text-[0.6rem] uppercase tracking-[0.6em] text-white/25">/ Experience &amp; Education</p>

              <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-0">
                {/* Center glowing divider */}
                <div
                  className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block"
                  style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(139,92,246,0.5) 20%, rgba(139,92,246,0.3) 50%, rgba(139,92,246,0.5) 80%, transparent 100%)", boxShadow: "0 0 12px rgba(139,92,246,0.3)" }}
                />

                {/* Left — experience */}
                <div className="relative space-y-5 lg:pr-10">
                  {experience.map((e, i) => (
                    <motion.div
                      key={e.title}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.1 }}
                      className="relative pl-5"
                    >
                      {/* Dot */}
                      <div className="absolute left-0 top-[5px] h-2 w-2 rounded-full bg-violet-500" style={{ boxShadow: "0 0 6px rgba(139,92,246,0.7)" }} />
                      {/* Vertical line */}
                      {i < experience.length - 1 && (
                        <div className="absolute left-[3.5px] top-[13px] h-full w-px" style={{ background: "linear-gradient(to bottom, rgba(139,92,246,0.25), transparent)" }} />
                      )}
                      <p className="mb-1 text-[0.58rem] uppercase tracking-[0.45em] text-white/25">{e.period}</p>
                      <p className="text-[0.82rem] font-light text-white/80">{e.title}</p>
                      <p className="mt-0.5 text-[0.7rem] leading-[1.6] text-white/35">{e.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Right — education */}
                <div className="relative space-y-5 lg:pl-10">
                  {education.map((e, i) => (
                    <motion.div
                      key={e.title}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.1 }}
                      className="relative pl-5"
                    >
                      <div className="absolute left-0 top-[5px] h-2 w-2 rounded-full bg-blue-500/70" style={{ boxShadow: "0 0 6px rgba(59,130,246,0.5)" }} />
                      {i < education.length - 1 && (
                        <div className="absolute left-[3.5px] top-[13px] h-full w-px" style={{ background: "linear-gradient(to bottom, rgba(59,130,246,0.2), transparent)" }} />
                      )}
                      <p className="mb-1 text-[0.58rem] uppercase tracking-[0.45em] text-white/25">{e.year}</p>
                      <p className="text-[0.82rem] font-light text-white/80">{e.title}</p>
                      <p className="mt-0.5 text-[0.7rem] leading-[1.6] text-white/35">{e.sub}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── CONTACT ──────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/8 px-8 py-10 sm:px-10" style={{ background: "rgba(10,7,22,0.95)", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.2), transparent)" }} />
              <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(88,28,135,0.14), transparent 60%)" }} />
              <div className="relative flex flex-wrap items-center justify-between gap-6">
                <div>
                  <p className="mb-3 text-[0.6rem] uppercase tracking-[0.6em] text-white/25">/ Let's Connect</p>
                  <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-light text-white">Have a project in mind?</h2>
                  <p className="mt-2.5 text-[0.78rem] text-white/35">I'm currently building. Reach out if it matters.</p>
                </div>
                <a
                  href="https://guns.lol/_anuneet1x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.05] px-7 py-3.5 text-[0.65rem] uppercase tracking-[0.45em] text-white/60 backdrop-blur-sm transition hover:border-violet-500/25 hover:bg-violet-500/[0.08] hover:text-white/85"
                >
                  Get in touch
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* ─── FOOTER ───────────────────────────────────────────────────── */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.05] pt-7">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-light text-white/40">H</div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.5em] text-white/25">hisarchives.xyz</p>
                <p className="text-[0.58rem] text-white/15">Building digital experiences that matter.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {github && (
                <Link href={github} target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-[0.55rem] text-white/30 transition hover:border-white/14 hover:text-white/55">
                  gh
                </Link>
              )}
              {email && (
                <Link href={`mailto:${email}`} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-[0.55rem] text-white/30 transition hover:border-white/14 hover:text-white/55">
                  @
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* CSS for sphere ring transforms */}
      <style>{`
        @keyframes sphere-rot { from { transform: rotateZ(0deg); } to { transform: rotateZ(360deg); } }
      `}</style>
    </div>
  );
}
