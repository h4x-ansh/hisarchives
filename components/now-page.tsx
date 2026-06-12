"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { useState, useEffect, useCallback, useRef } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  BarChart2,
  BookOpen,
  CheckSquare,
  ChevronRight,
  Clock,
  Code2,
  Dumbbell,
  FileText,
  Flame,
  Palette,
  SkipForward,
  Target,
  Timer,
  TrendingUp,
  Triangle,
  Zap,
} from "lucide-react";
import {
  artAnalytics,
  artSkills,
  healthAnalytics,
  healthExercises,
  jeeAnalytics,
  jeeChapters,
  nowProfile,
  projectFeatures,
  projectsAnalytics,
  type CheckItem,
} from "@/lib/now/data";

// ─── Design Tokens ────────────────────────────────────────────────────────────

const BG = "#0c0b1e";
const CARD = "#12102a";
const CARD2 = "#1a1735";
const BORDER = "rgba(139,92,246,0.22)";
const PURPLE = "#8b5cf6";
const PURPLE_DIM = "#a78bfa";
const GREEN = "#22c55e";
const ORANGE = "#f59e0b";
const RED = "#ef4444";
const TEAL = "#2dd4bf";

// ─── Breakpoint hook ─────────────────────────────────────────────────────────

function useBreakpoint() {
  const [w, setW] = useState(1200); // SSR default = desktop, updates after mount
  useEffect(() => {
    const update = () => setW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return { isMobile: w < 640, isTablet: w < 1024, w };
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Section = "overview" | "jee" | "health" | "art" | "projects";
type JeeTab = "chapters" | "analytics" | "mocktests";
type HealthTab = "workouts" | "analytics" | "prs";
type ArtTab = "skills" | "analytics" | "portfolio";
type ProjectTab = "features" | "analytics";
type SaveState = "idle" | "saving" | "saved" | "error";

// ─── Save status hook ─────────────────────────────────────────────────────────

function useSave() {
  const [state, setState] = useState<SaveState>("idle");
  const retryRef = useRef<(() => Promise<void>) | null>(null);

  const run = useCallback(async (apiFn: () => Promise<Response>) => {
    const attempt = async () => {
      setState("saving");
      try {
        const r = await apiFn();
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        setState("saved");
        setTimeout(() => setState("idle"), 2000);
      } catch (err) {
        console.error("[now tracker] save failed:", err);
        setState("error");
      }
    };
    retryRef.current = attempt;
    await attempt();
  }, []);

  const retry = useCallback(() => { void retryRef.current?.(); }, []);

  return { state, run, retry };
}

// ─── Save indicator ───────────────────────────────────────────────────────────

function SaveIndicator({ state, onRetry }: { state: SaveState; onRetry: () => void }) {
  if (state === "idle") return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}>
      {state === "saving" && <span style={{ color: PURPLE_DIM }}>Saving…</span>}
      {state === "saved" && <span style={{ color: GREEN }}>✓ Saved</span>}
      {state === "error" && (
        <>
          <span style={{ color: RED }}>⚠ Save failed</span>
          <button
            onClick={onRetry}
            style={{ color: PURPLE, background: "none", border: "none", cursor: "pointer", fontSize: 12, padding: 0, textDecoration: "underline" }}
          >
            Retry
          </button>
        </>
      )}
    </span>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

function TrackerLayout({ active, children, isOwner }: { active: Section; children: ReactNode; isOwner: boolean }) {
  const { isMobile, isTablet, w } = useBreakpoint();
  const isXL = w >= 1280;
  const sidebarOffset = isXL ? 108 : 0;

  const tabs: { href: string; label: string; section: Section; icon: typeof Clock }[] = [
    { href: "/now", label: "Study", section: "overview", icon: Clock },
    { href: "/now/jee", label: "JEE", section: "jee", icon: BookOpen },
    { href: "/now/health", label: "Health", section: "health", icon: Dumbbell },
    { href: "/now/art", label: "Art", section: "art", icon: Palette },
    { href: "/now/projects", label: "Projects", section: "projects", icon: Code2 },
  ];

  const basePad = isMobile ? 12 : isTablet ? 16 : 24;

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <SiteHeader activePath="/now" />
      <style>{`.tracker-tabs::-webkit-scrollbar{display:none}`}</style>
      {/* Top nav */}
      <nav style={{ background: "#07060f", borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", paddingLeft: isMobile ? 8 : sidebarOffset || 24, paddingRight: isMobile ? 8 : 24, display: "flex", alignItems: "center", height: 52, gap: 0 }}>
          {/* Logo — icon only on mobile */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: isMobile ? 4 : 24, flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, background: PURPLE, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Target size={14} color="white" />
            </div>
            {!isMobile && (
              <>
                <span style={{ fontWeight: 600, color: "white", fontSize: 14, whiteSpace: "nowrap" }}>Mission Control</span>
                {!isTablet && <span style={{ color: "rgba(139,92,246,0.5)", fontSize: 12 }}>— {nowProfile.handle}</span>}
              </>
            )}
          </div>

          {/* Tabs — scrollable on mobile/tablet */}
          <div className="tracker-tabs" style={{ display: "flex", flex: 1, overflowX: "auto", scrollbarWidth: "none" }}>
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? 0 : 6,
                  padding: isMobile ? "0 10px" : "0 14px",
                  height: 52,
                  fontSize: 12,
                  fontWeight: 500,
                  borderBottom: active === tab.section ? `2px solid ${PURPLE}` : "2px solid transparent",
                  color: active === tab.section ? PURPLE : "#9ca3af",
                  textDecoration: "none",
                  transition: "color 0.15s",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                <tab.icon size={14} />
                {!isMobile && <span style={{ marginLeft: 6 }}>{tab.label}</span>}
                {isMobile && <span style={{ fontSize: 10, marginLeft: 4 }}>{tab.label}</span>}
              </Link>
            ))}
          </div>

          {/* Back link — hide on mobile */}
          {!isMobile && (
            <Link href="/" style={{ fontSize: 11, color: "#6b7280", textDecoration: "none", whiteSpace: "nowrap", marginLeft: 8, flexShrink: 0 }}>
              ← Home
            </Link>
          )}
        </div>
      </nav>

      {/* Read-only banner for visitors */}
      {!isOwner && (
        <div style={{ background: "rgba(139,92,246,0.08)", borderBottom: `1px solid ${BORDER}`, padding: "8px 24px", textAlign: "center" }}>
          <span style={{ fontSize: 12, color: PURPLE_DIM }}>
            👁 Viewing Ansh&apos;s tracker — read only.{" "}
            <a href="/test" style={{ color: PURPLE, textDecoration: "underline" }}>Sign in</a>
            {" "}to edit.
          </span>
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: 1400, margin: "0 auto", paddingTop: basePad, paddingRight: basePad, paddingBottom: 48, paddingLeft: sidebarOffset || basePad }}>
        {children}
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20, ...style }}>
      {children}
    </div>
  );
}

function CardHeader({ icon: Icon, title, color }: { icon: typeof Clock; title: string; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
      <Icon size={15} color={color ?? PURPLE} />
      <h2 style={{ fontWeight: 600, color: color ?? PURPLE, fontSize: 14, margin: 0 }}>{title}</h2>
    </div>
  );
}

// ─── Sub-tabs ────────────────────────────────────────────────────────────────

function SubTabs<T extends string>({ tabs, active, onChange }: { tabs: { value: T; label: string }[]; active: T; onChange: (v: T) => void }) {
  return (
    <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: `1px solid ${BORDER}` }}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          style={{
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 500,
            color: active === tab.value ? PURPLE : "#9ca3af",
            background: "none",
            border: "none",
            borderBottom: active === tab.value ? `2px solid ${PURPLE}` : "2px solid transparent",
            cursor: "pointer",
            transition: "color 0.15s",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ─── Circular Timer ───────────────────────────────────────────────────────────

function CircularTimer({ timeLeft, total, label }: { timeLeft: number; total: number; label: string }) {
  const R = 58;
  const circ = 2 * Math.PI * R;
  const progress = total > 0 ? (total - timeLeft) / total : 0;
  const offset = circ * (1 - progress);
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  return (
    <div style={{ position: "relative", width: 152, height: 152, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="152" height="152" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
        <circle cx="76" cy="76" r={R} fill="none" stroke="rgba(139,92,246,0.18)" strokeWidth="7" />
        <circle
          cx="76" cy="76" r={R} fill="none"
          stroke={PURPLE} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div style={{ position: "relative", textAlign: "center", zIndex: 1 }}>
        <p style={{ fontSize: 32, fontWeight: 700, color: "white", margin: 0, lineHeight: 1, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
          {mm}:{ss}
        </p>
        <p style={{ fontSize: 12, color: PURPLE_DIM, marginTop: 4 }}>{label}</p>
      </div>
    </div>
  );
}

// ─── Today-minutes persistence ───────────────────────────────────────────────

// Timer persisted in Supabase via /api/now/timer. Resets server-side by date key.
function useTimerData(isOwner: boolean) {
  const [minutes, setMinutes] = useState(0);
  const { state: saveState, run: runSave, retry: retrySave } = useSave();

  useEffect(() => {
    fetch("/api/now/timer")
      .then((r) => r.json())
      .then((d: { minutes?: number }) => setMinutes(d.minutes ?? 0))
      .catch(() => {});
  }, []);

  const addMinutes = (mins: number) => {
    if (!isOwner || mins <= 0) return;
    setMinutes((prev) => {
      const next = prev + mins;
      void runSave(() =>
        fetch("/api/now/timer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ minutes: next }),
        })
      );
      return next;
    });
  };

  return { minutes, addMinutes, saveState, retrySave };
}

// ─── Weak chapter detector ───────────────────────────────────────────────────

function useWeakChapter() {
  const [result, setResult] = useState<{ chapter: string; subject: string; score: string } | null>(null);

  useEffect(() => {
    fetch("/api/now/checklist?domain=jee")
      .then((r) => r.json())
      .then((dbMap: Record<string, boolean[]>) => {
        const all = [
          ...jeeChapters.physics.map((it) => ({ name: it.name, subject: "Physics", checks: [...it.checks] as boolean[] })),
          ...jeeChapters.chemistry.map((it) => ({ name: it.name, subject: "Chemistry", checks: [...it.checks] as boolean[] })),
          ...jeeChapters.maths.map((it) => ({ name: it.name, subject: "Maths", checks: [...it.checks] as boolean[] })),
        ];
        for (const ch of all) {
          if (dbMap[ch.name]) ch.checks = dbMap[ch.name];
        }
        let weakName = all[0].name;
        let weakSubject = all[0].subject;
        let weakDone = all[0].checks.filter(Boolean).length;
        for (const ch of all.slice(1)) {
          const done = ch.checks.filter(Boolean).length;
          if (done < weakDone) { weakDone = done; weakName = ch.name; weakSubject = ch.subject; }
        }
        setResult({ chapter: weakName, subject: weakSubject, score: `${Math.round((weakDone / 4) * 100)}%` });
      })
      .catch(() => {});
  }, []);

  return result;
}

// ─── Pomodoro Card ────────────────────────────────────────────────────────────

const PRESETS = [
  { label: "25/5", work: 25, brk: 5 },
  { label: "50/10", work: 50, brk: 10 },
  { label: "90/20", work: 90, brk: 20 },
];

function PomodoroCard({ onAdd }: { onAdd: (mins: number) => void }) {
  const [presetIdx, setPresetIdx] = useState(0);
  const [custom, setCustom] = useState(false);
  const [workMins, setWorkMins] = useState(25);
  const [breakMins, setBreakMins] = useState(5);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [focusMins, setFocusMins] = useState(0);

  // Refs so the interval closure always sees current values
  const workMinsRef = { current: workMins };
  workMinsRef.current = workMins;
  const breakMinsRef = { current: breakMins };
  breakMinsRef.current = breakMins;
  const modeRef = { current: mode };
  modeRef.current = mode;
  const onAddRef = { current: onAdd };
  onAddRef.current = onAdd;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0) {
          if (modeRef.current === "work") {
            setSessions((s) => s + 1);
            setFocusMins((f) => f + workMinsRef.current);
            onAddRef.current(workMinsRef.current);
            setMode("break");
            return breakMinsRef.current * 60;
          }
          setMode("work");
          return workMinsRef.current * 60;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const applyPreset = (i: number) => {
    const p = PRESETS[i];
    setPresetIdx(i);
    setWorkMins(p.work);
    setBreakMins(p.brk);
    setRunning(false);
    setMode("work");
    setTimeLeft(p.work * 60);
    setCustom(false);
  };

  const reset = () => { setRunning(false); setMode("work"); setTimeLeft(workMins * 60); };
  const skip = () => {
    if (mode === "work") { setSessions((s) => s + 1); setMode("break"); setTimeLeft(breakMins * 60); }
    else { setMode("work"); setTimeLeft(workMins * 60); }
    setRunning(false);
  };
  const total = mode === "work" ? workMins * 60 : breakMins * 60;

  return (
    <Card>
      <CardHeader icon={Clock} title="Pomodoro Timer" />

      {/* Presets */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => applyPreset(i)}
            style={{
              padding: "4px 12px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s",
              background: presetIdx === i && !custom ? PURPLE : "transparent",
              border: presetIdx === i && !custom ? `1px solid ${PURPLE}` : `1px solid ${BORDER}`,
              color: presetIdx === i && !custom ? "white" : PURPLE_DIM,
            }}
          >
            {p.label}
          </button>
        ))}
        <button
          onClick={() => setCustom(!custom)}
          style={{
            padding: "4px 12px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            background: custom ? PURPLE : "transparent",
            border: custom ? `1px solid ${PURPLE}` : `1px solid ${BORDER}`,
            color: custom ? "white" : PURPLE_DIM,
          }}
        >
          Custom
        </button>
      </div>

      {/* Circular timer */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <CircularTimer timeLeft={timeLeft} total={total} label={mode === "work" ? "Work" : "Break"} />
      </div>

      {/* Sessions */}
      <p style={{ textAlign: "center", fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
        Sessions: <strong style={{ color: PURPLE }}>{sessions}</strong> · Focus:{" "}
        <strong style={{ color: PURPLE }}>{focusMins} min</strong>
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 12 }}>
        <button
          onClick={() => setRunning(true)}
          disabled={running}
          style={{ background: GREEN, color: "white", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: running ? "default" : "pointer", display: "flex", alignItems: "center", gap: 6, opacity: running ? 0.45 : 1 }}
        >
          ▶ Start
        </button>
        <button
          onClick={() => setRunning(false)}
          disabled={!running}
          style={{ background: "transparent", color: ORANGE, border: `1px solid ${ORANGE}`, borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: !running ? "default" : "pointer", opacity: !running ? 0.45 : 1 }}
        >
          ⏸ Pause
        </button>
        <button
          onClick={reset}
          style={{ background: "transparent", color: RED, border: `1px solid ${RED}`, borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer" }}
        >
          ↺ Reset
        </button>
        <button
          onClick={skip}
          style={{ background: "transparent", color: "#9ca3af", border: "1px solid #374151", borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}
        >
          <SkipForward size={13} /> Skip
        </button>
      </div>

      <p style={{ textAlign: "center", fontSize: 12, color: "#4b5563" }}>
        {running ? "In progress..." : "Ready to focus"}
      </p>

      {/* Custom */}
      {custom && (
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "Work (min)", value: workMins, set: (n: number) => { setWorkMins(n); if (mode === "work" && !running) setTimeLeft(n * 60); }, min: 5, max: 90, step: 5 },
            { label: "Break (min)", value: breakMins, set: (n: number) => { setBreakMins(n); if (mode === "break" && !running) setTimeLeft(n * 60); }, min: 1, max: 30, step: 1 },
          ].map(({ label, value, set, min, max, step }) => (
            <div key={label} style={{ background: CARD2, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 12 }}>
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280", marginBottom: 8 }}>{label}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <button onClick={() => set(Math.max(min, value - step))} style={{ background: "none", border: "none", color: PURPLE_DIM, fontSize: 18, cursor: "pointer" }}>−</button>
                <span style={{ color: "white", fontSize: 16 }}>{value}</span>
                <button onClick={() => set(Math.min(max, value + step))} style={{ background: "none", border: "none", color: PURPLE_DIM, fontSize: 18, cursor: "pointer" }}>+</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

// ─── Stopwatch Card ───────────────────────────────────────────────────────────

function StopwatchCard({ onAdd }: { onAdd: (mins: number) => void }) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [logged, setLogged] = useState(0);
  const [tooShort, setTooShort] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const logAndReset = () => {
    const mins = Math.floor(elapsed / 60);
    if (mins > 0) {
      onAdd(mins);
      setLogged((l) => l + mins);
    } else if (elapsed > 0) {
      setTooShort(true);
      setTimeout(() => setTooShort(false), 3000);
    }
    setRunning(false);
    setElapsed(0);
  };

  const hh = String(Math.floor(elapsed / 3600)).padStart(2, "0");
  const mm = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <Card>
      <CardHeader icon={Timer} title="Stopwatch" />
      <p style={{ textAlign: "center", fontSize: 48, fontWeight: 700, color: PURPLE, fontFamily: "monospace", letterSpacing: "0.08em", margin: "20px 0 4px" }}>
        {hh} : {mm} : {ss}
      </p>
      <p style={{ textAlign: "center", fontSize: 12, color: "#6b7280", marginBottom: 8 }}>Elapsed time</p>
      <div style={{ height: 28, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
        {logged > 0 && <p style={{ fontSize: 13, color: GREEN, margin: 0 }}>+{logged} min logged today</p>}
        {tooShort && <p style={{ fontSize: 13, color: ORANGE, margin: 0 }}>Under 1 min — not logged</p>}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button onClick={() => setRunning(true)} disabled={running} style={{ background: "transparent", color: GREEN, border: `1px solid ${GREEN}`, borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: running ? "default" : "pointer", opacity: running ? 0.45 : 1 }}>▶ Start</button>
        <button onClick={() => setRunning(false)} disabled={!running} style={{ background: "transparent", color: ORANGE, border: `1px solid ${ORANGE}`, borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: !running ? "default" : "pointer", opacity: !running ? 0.45 : 1 }}>⏸ Pause</button>
        <button onClick={logAndReset} style={{ background: GREEN, color: "white", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer" }}>✓ Log & Reset</button>
      </div>
      <p style={{ textAlign: "center", fontSize: 12, color: "#4b5563", marginTop: 10 }}>
        &quot;Log &amp; Reset&quot; saves elapsed time to Today&apos;s total
      </p>
    </Card>
  );
}

// ─── Today's Study Card ───────────────────────────────────────────────────────

function TodayCard({ minutes, label, goalHours, saveState, onRetry }: {
  minutes: number; label: string; goalHours: number;
  saveState?: SaveState; onRetry?: () => void;
}) {
  const hours = minutes / 60;
  const pct = Math.min(100, Math.round((hours / goalHours) * 100));
  return (
    <Card>
      <CardHeader icon={Activity} title={`Today's ${label}`} />
      <p style={{ textAlign: "center", fontSize: 52, fontWeight: 700, color: PURPLE, margin: "8px 0 4px", lineHeight: 1 }}>
        {hours.toFixed(1)} <span style={{ fontSize: 28 }}>hrs</span>
      </p>
      <p style={{ textAlign: "center", color: "#6b7280", fontSize: 13, marginBottom: 12 }}>
        {minutes} min tracked · resets at midnight
      </p>
      {/* Goal progress bar */}
      <div style={{ background: "rgba(139,92,246,0.12)", borderRadius: 999, height: 6, margin: "0 8px 10px" }}>
        <div style={{ background: PURPLE, height: 6, borderRadius: 999, width: `${pct}%`, transition: "width 0.4s ease" }} />
      </div>
      <p style={{ textAlign: "center", fontSize: 13, color: "#6b7280" }}>
        Goal: {goalHours}h ·{" "}
        <span style={{ color: pct >= 100 ? GREEN : PURPLE_DIM }}>{pct}%</span>
        {pct >= 100 && <span style={{ color: GREEN }}> — Goal hit! </span>}
      </p>
      {saveState && saveState !== "idle" && (
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <SaveIndicator state={saveState} onRetry={onRetry ?? (() => {})} />
        </div>
      )}
    </Card>
  );
}

// ─── Smart Weakness Card ──────────────────────────────────────────────────────

function WeaknessCard({ chapter, subject, score }: { chapter: string; subject: string; score: string }) {
  return (
    <Card>
      <CardHeader icon={Zap} title="Smart Weakness Detector" color={ORANGE} />
      <div style={{ background: CARD2, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 16, marginBottom: 12 }}>
        <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>Chapter needing most attention:</p>
        <p style={{ textAlign: "center", fontSize: 15, fontWeight: 600, color: ORANGE }}>
          {subject}: {chapter}
        </p>
        <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af", marginTop: 6 }}>Score {score} — Focus here!</p>
      </div>
      <p style={{ textAlign: "center", fontSize: 12, color: "#6b7280" }}>Based on completion across all subjects</p>
    </Card>
  );
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────

function BarChart({ data, legendLabel = "Hours" }: { data: { day: string; hours: number }[]; legendLabel?: string }) {
  const max = Math.max(...data.map((d) => d.hours), 1);
  const H = 160;
  const levels = [0, 0.25, 0.5, 0.75, 1.0];

  return (
    <div style={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
        {/* Y axis labels */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: H, paddingBottom: 24, marginRight: 8 }}>
          {levels.slice().reverse().map((l) => (
            <span key={l} style={{ fontSize: 10, color: "#6b7280", lineHeight: 1 }}>{(l * max).toFixed(1)}</span>
          ))}
        </div>
        {/* Chart area */}
        <div style={{ flex: 1, position: "relative" }}>
          {/* Grid lines */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 24 }}>
            {levels.map((l) => (
              <div key={l} style={{ position: "absolute", left: 0, right: 0, bottom: `${l * 100}%`, borderTop: "1px solid rgba(139,92,246,0.1)" }} />
            ))}
          </div>
          {/* Bars */}
          <div style={{ display: "flex", alignItems: "flex-end", height: H, gap: 8 }}>
            {data.map((d) => (
              <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}>
                <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                  <div
                    style={{
                      width: "100%",
                      height: `${Math.max(2, (d.hours / max) * 100)}%`,
                      background: d.hours > 0 ? `rgba(139,92,246,0.75)` : "rgba(139,92,246,0.12)",
                      borderRadius: "4px 4px 0 0",
                      transition: "height 0.3s ease",
                    }}
                  />
                </div>
                <span style={{ fontSize: 11, color: "#6b7280", whiteSpace: "nowrap" }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 24, height: 8, background: "rgba(139,92,246,0.75)", borderRadius: 2 }} />
          <span style={{ fontSize: 11, color: "#9ca3af" }}>{legendLabel}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Cards Row ───────────────────────────────────────────────────────────

function StatsRow({ stats }: { stats: { label: string; value: string; emoji?: string }[] }) {
  const { isMobile } = useBreakpoint();
  return (
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? 8 : 12, marginBottom: 20 }}>
      {stats.map((s) => (
        <div key={s.label} style={{ background: CARD2, border: `1px solid ${BORDER}`, borderRadius: 8, padding: isMobile ? 12 : 16, textAlign: "center" }}>
          <p style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: PURPLE, margin: 0, lineHeight: 1 }}>
            {s.value} {s.emoji}
          </p>
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Chapter Checklist ────────────────────────────────────────────────────────

function useChecklist(subjects: { label: string; items: CheckItem[] }[], domain: string, isOwner: boolean) {
  const [state, setState] = useState<Record<string, [boolean, boolean, boolean, boolean]>>(
    () => Object.fromEntries(
      subjects.flatMap((s) => s.items).map((it) => [it.name, [...it.checks] as [boolean, boolean, boolean, boolean]]),
    ),
  );
  const { state: saveState, run: runSave, retry: retrySave } = useSave();

  // Merge DB state over static defaults on mount
  useEffect(() => {
    fetch(`/api/now/checklist?domain=${domain}`)
      .then((r) => r.json())
      .then((dbMap: Record<string, boolean[]>) => {
        setState((prev) => {
          const next = { ...prev };
          for (const [name, checks] of Object.entries(dbMap)) {
            if (next[name] !== undefined) {
              next[name] = checks as [boolean, boolean, boolean, boolean];
            }
          }
          return next;
        });
      })
      .catch(() => {});
  }, [domain]);

  const toggle = (name: string, idx: number) => {
    if (!isOwner) return;
    setState((prev) => {
      const existing = prev[name] ?? [false, false, false, false];
      const arr = [...existing] as [boolean, boolean, boolean, boolean];
      arr[idx] = !arr[idx];
      void runSave(() =>
        fetch("/api/now/checklist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ domain, item_name: name, checks: arr }),
        })
      );
      return { ...prev, [name]: arr };
    });
  };

  return { state, toggle, saveState, retrySave };
}

function ChapterRow({
  num,
  name,
  checks,
  checkLabels,
  onToggle,
  isOwner,
}: {
  num: number;
  name: string;
  checks: [boolean, boolean, boolean, boolean];
  checkLabels: [string, string, string, string];
  onToggle: (idx: number) => void;
  isOwner: boolean;
}) {
  const { isMobile } = useBreakpoint();
  const done = checks.filter(Boolean).length;
  const total = checks.length;
  const isComplete = done === total;

  return (
    <div
      style={{
        borderBottom: `1px solid ${BORDER}`,
        padding: isMobile ? "10px 12px" : "14px 16px",
        background: isComplete ? "rgba(34,197,94,0.04)" : "transparent",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8, gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
          <span style={{ fontWeight: 600, color: "white", fontSize: isMobile ? 13 : 14, wordBreak: "break-word" }}>
            {num}. {name}
          </span>
          {isComplete && !isMobile && (
            <span style={{ fontSize: 11, color: GREEN, fontWeight: 500, whiteSpace: "nowrap" }}>✓ Complete</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: "#6b7280" }}>{done}/{total}</span>
          <div style={{ display: "flex", gap: 2 }}>
            {checks.map((c, i) => (
              <div key={i} style={{ width: 7, height: 7, borderRadius: 1, background: c ? PURPLE : "rgba(139,92,246,0.2)" }} />
            ))}
          </div>
        </div>
      </div>
      {/* On mobile: 2×2 grid. Desktop: 1 row */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, auto)", gap: isMobile ? "6px 16px" : "0 20px" }}>
        {checkLabels.map((label, idx) => (
          <label
            key={label}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: isMobile ? 12 : 13, color: checks[idx] ? "white" : "#9ca3af", cursor: "pointer" }}
          >
            <input
              type="checkbox"
              checked={checks[idx]}
              onChange={() => onToggle(idx)}
              disabled={!isOwner}
              style={{ accentColor: PURPLE, width: 14, height: 14, cursor: isOwner ? "pointer" : "not-allowed", flexShrink: 0, opacity: isOwner ? 1 : 0.7 }}
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}

function ChapterChecklist({
  subjects,
  checkLabels,
  title,
  domain,
  isOwner,
}: {
  subjects: { label: string; items: CheckItem[] }[];
  checkLabels: [string, string, string, string];
  title: string;
  domain: string;
  isOwner: boolean;
}) {
  const { isMobile } = useBreakpoint();
  const [activeSubject, setActiveSubject] = useState(0);
  const currentItems = subjects[activeSubject].items;

  const { state, toggle, saveState, retrySave } = useChecklist(subjects, domain, isOwner);

  const allStateChecks = Object.values(state).flat();
  const totalDone = allStateChecks.filter(Boolean).length;
  const totalPossible = allStateChecks.length;
  const pct = totalPossible > 0 ? Math.round((totalDone / totalPossible) * 100) : 0;

  return (
    <Card style={{ padding: 0 }}>
      <div style={{ padding: isMobile ? 12 : 20 }}>
        <CardHeader icon={CheckSquare} title={title} />
        <p style={{ textAlign: "center", fontSize: isMobile ? 32 : 40, fontWeight: 700, color: TEAL, margin: "8px 0 4px" }}>{pct}%</p>
        <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af", marginBottom: isOwner ? 4 : 16 }}>Overall Completion</p>
        {isOwner && (
          <div style={{ textAlign: "center", height: 24, marginBottom: 12 }}>
            <SaveIndicator state={saveState} onRetry={retrySave} />
          </div>
        )}

        {/* Subject tabs — wrap on mobile */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {subjects.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActiveSubject(i)}
              style={{
                padding: isMobile ? "5px 10px" : "6px 14px",
                borderRadius: 999,
                fontSize: isMobile ? 12 : 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
                background: activeSubject === i ? PURPLE : "transparent",
                border: activeSubject === i ? `1px solid ${PURPLE}` : `1px solid ${BORDER}`,
                color: activeSubject === i ? "white" : "#9ca3af",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chapter rows */}
      <div>
        {currentItems.map((item, i) => (
          <ChapterRow
            key={item.name}
            num={i + 1}
            name={item.name}
            checks={state[item.name] ?? item.checks}
            checkLabels={checkLabels}
            onToggle={(idx) => toggle(item.name, idx)}
            isOwner={isOwner}
          />
        ))}
      </div>
    </Card>
  );
}

// ─── Analytics Section ────────────────────────────────────────────────────────

function AnalyticsSection({
  title,
  stats,
  weeklyData,
  legendLabel,
}: {
  title: string;
  stats: { label: string; value: string; emoji?: string }[];
  weeklyData: { day: string; hours: number }[];
  legendLabel?: string;
}) {
  return (
    <Card>
      <CardHeader icon={BarChart2} title={title} />
      <StatsRow stats={stats} />
      <BarChart data={weeklyData} legendLabel={legendLabel} />
      <p style={{ textAlign: "center", fontSize: 11, color: "#4b5563", marginTop: 10 }}>
        Stats show manually tracked estimates
      </p>
    </Card>
  );
}

// ─── Mock Test Section ────────────────────────────────────────────────────────

type MockTest = { date: string; name: string; physics: number; chemistry: number; maths: number };

function MockTestsSection({ isOwner }: { isOwner: boolean }) {
  const { isMobile, isTablet } = useBreakpoint();
  const [tests, setTests] = useState<MockTest[]>(jeeAnalytics.mockTests);
  const [form, setForm] = useState({ name: "", date: "", physics: "", chemistry: "", maths: "" });
  const { state: saveState, run: runSave, retry: retrySave } = useSave();

  useEffect(() => {
    fetch("/api/now/records?type=mocktest")
      .then((r) => r.json())
      .then((d: { records?: MockTest[] }) => { if (d.records?.length) setTests(d.records); })
      .catch(() => {});
  }, []);

  const addTest = () => {
    if (!isOwner) return;
    const p = parseInt(form.physics) || 0;
    const c = parseInt(form.chemistry) || 0;
    const m = parseInt(form.maths) || 0;
    if (!form.name || !form.date) return;
    const record = { date: form.date, name: form.name, physics: p, chemistry: c, maths: m };
    setTests((prev) => [...prev, record]);
    setForm({ name: "", date: "", physics: "", chemistry: "", maths: "" });
    void runSave(() =>
      fetch("/api/now/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "mocktest", data: record }),
      })
    );
  };

  const inputStyle: React.CSSProperties = {
    background: CARD2, border: `1px solid ${BORDER}`, borderRadius: 6,
    color: "white", fontSize: 13, padding: "10px 12px", width: "100%", outline: "none",
    opacity: isOwner ? 1 : 0.45, cursor: isOwner ? "text" : "not-allowed",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: PURPLE_DIM, textTransform: "uppercase",
    letterSpacing: "0.08em", display: "block", marginBottom: 6,
  };

  const formCols = isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr 1fr" : "2fr 1.5fr 1fr 1fr 1fr";
  const formFields = [
    { key: "name", label: "Test Name", placeholder: "e.g. JEE Mock #3", type: "text", min: undefined, max: undefined },
    { key: "date", label: "Date", placeholder: "", type: "date", min: undefined, max: undefined },
    { key: "physics", label: "Physics /100", placeholder: "0", type: "number", min: "0", max: "100" },
    { key: "chemistry", label: "Chemistry /100", placeholder: "0", type: "number", min: "0", max: "100" },
    { key: "maths", label: "Maths /100", placeholder: "0", type: "number", min: "0", max: "100" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card>
        <CardHeader icon={FileText} title="Add Mock Test Result" color={ORANGE} />
        <div style={{ display: "grid", gridTemplateColumns: formCols, gap: 10, marginBottom: 14 }}>
          {formFields.map(({ key, label, placeholder, type, min, max }) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <input type={type} placeholder={placeholder} value={form[key as keyof typeof form]}
                min={min} max={max}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                disabled={!isOwner} style={inputStyle} />
            </div>
          ))}
        </div>
        {isOwner ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={addTest}
              style={{ background: PURPLE, color: "white", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              + Add Test
            </button>
            <SaveIndicator state={saveState} onRetry={retrySave} />
          </div>
        ) : (
          <p style={{ fontSize: 12, color: "#6b7280" }}>Log in as owner to add tests.</p>
        )}
      </Card>

      <Card>
        <CardHeader icon={TrendingUp} title="Score Trend" />
        {tests.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6b7280", padding: "40px 0" }}>No tests yet. Add your first above!</p>
        ) : (
          <>
            {/* Scrollable table on mobile */}
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", marginBottom: 20 }}>
              <div style={{ minWidth: 480 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr", gap: 8, padding: "8px 12px", background: CARD2, borderRadius: 6, marginBottom: 8 }}>
                  {["Date", "Name", "Phy", "Chem", "Math", "Total"].map((h) => (
                    <span key={h} style={{ fontSize: 11, fontWeight: 600, color: PURPLE_DIM, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
                  ))}
                </div>
                {tests.map((t, i) => {
                  const total = t.physics + t.chemistry + t.maths;
                  const prev = tests[i - 1];
                  const delta = prev ? total - (prev.physics + prev.chemistry + prev.maths) : null;
                  return (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr", gap: 8, padding: "10px 12px", borderBottom: `1px solid ${BORDER}` }}>
                      <span style={{ fontSize: 12, color: "#9ca3af" }}>{t.date}</span>
                      <span style={{ fontSize: 12, color: "white" }}>{t.name}</span>
                      <span style={{ fontSize: 12, color: "white" }}>{t.physics}</span>
                      <span style={{ fontSize: 12, color: "white" }}>{t.chemistry}</span>
                      <span style={{ fontSize: 12, color: "white" }}>{t.maths}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "white" }}>{total}/300</span>
                        {delta !== null && (
                          <span style={{ fontSize: 10, color: delta > 0 ? GREEN : RED }}>{delta > 0 ? "+" : ""}{delta}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Score bars */}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end", height: 90 }}>
              {tests.map((t, i) => {
                const total = t.physics + t.chemistry + t.maths;
                const pct = (total / 300) * 100;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 10, color: PURPLE_DIM }}>{total}</span>
                    <div style={{ width: "100%", height: 56, display: "flex", alignItems: "flex-end" }}>
                      <div style={{ width: "100%", height: `${pct}%`, background: "rgba(139,92,246,0.7)", borderRadius: "4px 4px 0 0" }} />
                    </div>
                    <span style={{ fontSize: 9, color: "#6b7280", textAlign: "center" }}>{t.name.replace("Full Mock #", "#")}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

// ─── PR Log Section ───────────────────────────────────────────────────────────

function PRSection({ isOwner }: { isOwner: boolean }) {
  const { isMobile } = useBreakpoint();
  const [prs, setPRs] = useState(healthAnalytics.prs);
  const [form, setForm] = useState({ exercise: "", date: "", value: "" });
  const { state: saveState, run: runSave, retry: retrySave } = useSave();

  useEffect(() => {
    fetch("/api/now/records?type=pr")
      .then((r) => r.json())
      .then((d: { records?: typeof healthAnalytics.prs }) => { if (d.records?.length) setPRs(d.records); })
      .catch(() => {});
  }, []);

  const addPR = () => {
    if (!isOwner || !form.exercise || !form.value) return;
    const record = { date: form.date || new Date().toISOString().slice(0, 10), exercise: form.exercise, value: form.value };
    setPRs((p) => [...p, record]);
    setForm({ exercise: "", date: "", value: "" });
    void runSave(() =>
      fetch("/api/now/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "pr", data: record }),
      })
    );
  };

  const inputStyle: React.CSSProperties = {
    background: CARD2, border: `1px solid ${BORDER}`, borderRadius: 6,
    color: "white", fontSize: 13, padding: "10px 12px", width: "100%", outline: "none",
    opacity: isOwner ? 1 : 0.45, cursor: isOwner ? "text" : "not-allowed",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card>
        <CardHeader icon={FileText} title="Log Personal Record" color={ORANGE} />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1.5fr 1fr", gap: 10, marginBottom: 14 }}>
          {[
            { key: "exercise", label: "Exercise", placeholder: "e.g. Bench Press", type: "text" },
            { key: "date", label: "Date", placeholder: "", type: "date" },
            { key: "value", label: "Weight / Reps", placeholder: "e.g. 65 kg", type: "text" },
          ].map(({ key, label, placeholder, type }) => (
            <div key={key}>
              <label style={{ fontSize: 11, fontWeight: 600, color: PURPLE_DIM, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>{label}</label>
              <input type={type} placeholder={placeholder} value={form[key as keyof typeof form]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} disabled={!isOwner} style={inputStyle} />
            </div>
          ))}
        </div>
        {isOwner ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={addPR} style={{ background: PURPLE, color: "white", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              + Add PR
            </button>
            <SaveIndicator state={saveState} onRetry={retrySave} />
          </div>
        ) : (
          <p style={{ fontSize: 12, color: "#6b7280" }}>Log in as owner to add records.</p>
        )}
      </Card>
      <Card>
        <CardHeader icon={TrendingUp} title="PR History" />
        {prs.map((pr, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${BORDER}` }}>
            <div>
              <p style={{ fontWeight: 600, color: "white", fontSize: 14, margin: 0 }}>{pr.exercise}</p>
              <p style={{ color: "#6b7280", fontSize: 12, margin: "2px 0 0" }}>{pr.date}</p>
            </div>
            <span style={{ color: GREEN, fontWeight: 700, fontSize: 15 }}>{pr.value}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── Portfolio Section ────────────────────────────────────────────────────────

function PortfolioSection({ isOwner }: { isOwner: boolean }) {
  const { isMobile } = useBreakpoint();
  const [pieces, setPieces] = useState(artAnalytics.recentPieces);
  const [form, setForm] = useState({ name: "", date: "", medium: "" });
  const { state: saveState, run: runSave, retry: retrySave } = useSave();

  useEffect(() => {
    fetch("/api/now/records?type=portfolio")
      .then((r) => r.json())
      .then((d: { records?: typeof artAnalytics.recentPieces }) => { if (d.records?.length) setPieces(d.records); })
      .catch(() => {});
  }, []);

  const addPiece = () => {
    if (!isOwner || !form.name) return;
    const record = { name: form.name, date: form.date || new Date().toISOString().slice(0, 10), medium: form.medium || "Mixed" };
    setPieces((p) => [...p, record]);
    setForm({ name: "", date: "", medium: "" });
    void runSave(() =>
      fetch("/api/now/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "portfolio", data: record }),
      })
    );
  };

  const inputStyle: React.CSSProperties = {
    background: CARD2, border: `1px solid ${BORDER}`, borderRadius: 6,
    color: "white", fontSize: 13, padding: "10px 12px", width: "100%", outline: "none",
    opacity: isOwner ? 1 : 0.45, cursor: isOwner ? "text" : "not-allowed",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card>
        <CardHeader icon={FileText} title="Log Completed Piece" color={ORANGE} />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1.5fr 1fr", gap: 10, marginBottom: 14 }}>
          {[
            { key: "name", label: "Piece Title", placeholder: "e.g. Portrait Study #4", type: "text" },
            { key: "date", label: "Date", placeholder: "", type: "date" },
            { key: "medium", label: "Medium", placeholder: "e.g. Digital", type: "text" },
          ].map(({ key, label, placeholder, type }) => (
            <div key={key}>
              <label style={{ fontSize: 11, fontWeight: 600, color: PURPLE_DIM, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>{label}</label>
              <input type={type} placeholder={placeholder} value={form[key as keyof typeof form]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} style={inputStyle} disabled={!isOwner} />
            </div>
          ))}
        </div>
        {isOwner ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={addPiece} style={{ background: PURPLE, color: "white", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              + Add Piece
            </button>
            <SaveIndicator state={saveState} onRetry={retrySave} />
          </div>
        ) : (
          <p style={{ fontSize: 12, color: "#6b7280" }}>Log in as owner to log pieces.</p>
        )}
      </Card>
      <Card>
        <CardHeader icon={TrendingUp} title="Portfolio Log" />
        {pieces.slice().reverse().map((p, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${BORDER}` }}>
            <div>
              <p style={{ fontWeight: 600, color: "white", fontSize: 14, margin: 0 }}>{p.name}</p>
              <p style={{ color: "#6b7280", fontSize: 12, margin: "2px 0 0" }}>{p.date}</p>
            </div>
            <span style={{ color: PURPLE_DIM, fontSize: 13, background: CARD2, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "3px 10px" }}>{p.medium}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── Page: Study (Overview) ───────────────────────────────────────────────────

export function NowPage({ isOwner }: { isOwner: boolean }) {
  const { minutes, addMinutes, saveState, retrySave } = useTimerData(isOwner);
  const weak = useWeakChapter();
  const { isMobile } = useBreakpoint();
  const cols = isMobile ? "1fr" : "1fr 1fr";

  return (
    <TrackerLayout active="overview" isOwner={isOwner}>
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 12 : 16, marginBottom: isMobile ? 12 : 16 }}>
        <PomodoroCard onAdd={addMinutes} />
        <StopwatchCard onAdd={addMinutes} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 12 : 16 }}>
        <TodayCard minutes={minutes} label="Study" goalHours={4} saveState={saveState} onRetry={retrySave} />
        <WeaknessCard
          chapter={weak?.chapter ?? "—"}
          subject={weak?.subject ?? "Computing…"}
          score={weak?.score ?? "—"}
        />
      </div>
    </TrackerLayout>
  );
}

// ─── Page: JEE ────────────────────────────────────────────────────────────────

export function JEEPage({ isOwner }: { isOwner: boolean }) {
  const [tab, setTab] = useState<JeeTab>("chapters");

  return (
    <TrackerLayout active="jee" isOwner={isOwner}>
      <SubTabs<JeeTab>
        tabs={[
          { value: "chapters", label: "Chapters" },
          { value: "analytics", label: "Analytics" },
          { value: "mocktests", label: "Mock Tests" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "chapters" && (
        <ChapterChecklist
          title="JEE Chapter Checklist"
          domain="jee"
          isOwner={isOwner}
          subjects={[
            { label: "⚛ Physics (28)", items: jeeChapters.physics },
            { label: "⚗ Chemistry (30)", items: jeeChapters.chemistry },
            { label: "π Maths (30)", items: jeeChapters.maths },
          ]}
          checkLabels={["Theory", "NCERT", "Mains PYQs", "Adv PYQs"]}
        />
      )}

      {tab === "analytics" && (
        <AnalyticsSection
          title="Study Analytics"
          stats={[
            { label: "Total Hours", value: `${jeeAnalytics.totalHours}h` },
            { label: "Streak 🔥", value: String(jeeAnalytics.streak) },
            { label: "Today", value: `${jeeAnalytics.todayHours}h` },
            { label: "7-Day Avg", value: `${jeeAnalytics.sevenDayAvg}h` },
          ]}
          weeklyData={jeeAnalytics.weeklyData}
          legendLabel="Hours Studied"
        />
      )}

      {tab === "mocktests" && <MockTestsSection isOwner={isOwner} />}
    </TrackerLayout>
  );
}

// ─── Page: Health ─────────────────────────────────────────────────────────────

export function HealthPage({ isOwner }: { isOwner: boolean }) {
  const [tab, setTab] = useState<HealthTab>("workouts");

  return (
    <TrackerLayout active="health" isOwner={isOwner}>
      <SubTabs<HealthTab>
        tabs={[
          { value: "workouts", label: "Workouts" },
          { value: "analytics", label: "Analytics" },
          { value: "prs", label: "Personal Records" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "workouts" && (
        <ChapterChecklist
          title="Workout Checklist"
          domain="health"
          isOwner={isOwner}
          subjects={[
            { label: "💪 Push", items: healthExercises.push },
            { label: "🔙 Pull", items: healthExercises.pull },
            { label: "🦵 Legs", items: healthExercises.legs },
            { label: "🔥 Core", items: healthExercises.core },
          ]}
          checkLabels={["Warm-up", "Sets Done", "Cool-down", "Logged"]}
        />
      )}

      {tab === "analytics" && (
        <AnalyticsSection
          title="Workout Analytics"
          stats={[
            { label: "Total Hours", value: `${healthAnalytics.totalHours}h` },
            { label: "Streak 🔥", value: String(healthAnalytics.streak) },
            { label: "Today", value: `${healthAnalytics.todayHours}h` },
            { label: "7-Day Avg", value: `${healthAnalytics.sevenDayAvg}h` },
          ]}
          weeklyData={healthAnalytics.weeklyData}
          legendLabel="Hours Trained"
        />
      )}

      {tab === "prs" && <PRSection isOwner={isOwner} />}
    </TrackerLayout>
  );
}

// ─── Page: Art ────────────────────────────────────────────────────────────────

export function ArtPage({ isOwner }: { isOwner: boolean }) {
  const [tab, setTab] = useState<ArtTab>("skills");

  return (
    <TrackerLayout active="art" isOwner={isOwner}>
      <SubTabs<ArtTab>
        tabs={[
          { value: "skills", label: "Skills" },
          { value: "analytics", label: "Analytics" },
          { value: "portfolio", label: "Portfolio" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "skills" && (
        <ChapterChecklist
          title="Art Skill Checklist"
          domain="art"
          isOwner={isOwner}
          subjects={[
            { label: "✏ Fundamentals", items: artSkills.fundamentals },
            { label: "🧍 Figure Drawing", items: artSkills.figure },
            { label: "💻 Digital", items: artSkills.digital },
          ]}
          checkLabels={["Theory", "Practice", "Reference", "Complete"]}
        />
      )}

      {tab === "analytics" && (
        <AnalyticsSection
          title="Practice Analytics"
          stats={[
            { label: "Total Hours", value: `${artAnalytics.totalHours}h` },
            { label: "Streak 🔥", value: String(artAnalytics.streak) },
            { label: "Today", value: `${artAnalytics.todayHours}h` },
            { label: "7-Day Avg", value: `${artAnalytics.sevenDayAvg}h` },
          ]}
          weeklyData={artAnalytics.weeklyData}
          legendLabel="Hours Practiced"
        />
      )}

      {tab === "portfolio" && <PortfolioSection isOwner={isOwner} />}
    </TrackerLayout>
  );
}

// ─── Page: Projects ───────────────────────────────────────────────────────────

export function ProjectsPage({ isOwner }: { isOwner: boolean }) {
  const [tab, setTab] = useState<ProjectTab>("features");

  return (
    <TrackerLayout active="projects" isOwner={isOwner}>
      <SubTabs<ProjectTab>
        tabs={[
          { value: "features", label: "Features" },
          { value: "analytics", label: "Analytics" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "features" && (
        <ChapterChecklist
          title="Project Feature Checklist"
          domain="projects"
          isOwner={isOwner}
          subjects={[
            { label: "🗂 HisArchives", items: projectFeatures.hisarchives },
            { label: "🤖 Discord Bot", items: projectFeatures.discordbot },
            { label: "🔭 Future Projects", items: projectFeatures.future },
          ]}
          checkLabels={["Design", "Dev", "Test", "Shipped"]}
        />
      )}

      {tab === "analytics" && (
        <AnalyticsSection
          title="Coding Analytics"
          stats={[
            { label: "Total Hours", value: `${projectsAnalytics.totalHours}h` },
            { label: "Streak 🔥", value: String(projectsAnalytics.streak) },
            { label: "Today", value: `${projectsAnalytics.todayHours}h` },
            { label: "7-Day Avg", value: `${projectsAnalytics.sevenDayAvg}h` },
          ]}
          weeklyData={projectsAnalytics.weeklyData}
          legendLabel="Hours Coded"
        />
      )}
    </TrackerLayout>
  );
}
