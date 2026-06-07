"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Edit3, ImageUp, Lock, Plus, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type JournalEntry = {
  id: string;
  date: string;
  title: string;
  photo: string;
  caption: string;
  mood: string;
  tags: string[];
  content: string;
  readingTime: string;
};

type JournalDraft = {
  title: string;
  caption: string;
  content: string;
  mood: string;
  tags: string;
  photo: string;
};

const STORAGE_KEY = "hisarchives-journal-entries";
const OWNER_KEY = "hisarchives-journal-owner";

const seedEntries: JournalEntry[] = [
  {
    id: "2026-06-07",
    date: "07 Jun 2026",
    title: "Quiet Revision, Late Evening",
    photo: "",
    caption: "Desk lamp, ruled pages, and a clean hour of focus.",
    mood: "Focused",
    tags: ["JEE 2027", "Revision", "Evening"],
    content:
      "The room stayed quiet and the notes felt readable again. I went back through the weak chapters without rushing, and the day started to feel usable. The archive only moves when the work is steady, and tonight was steady enough.",
    readingTime: "3 min read",
  },
  {
    id: "2026-06-06",
    date: "06 Jun 2026",
    title: "HisArchives Stayed Open",
    photo: "",
    caption: "Built in the gaps between study and life.",
    mood: "Reflective",
    tags: ["HisArchives", "Writing", "Progress"],
    content:
      "The archive is becoming the place where the day is left behind. I fixed a few rough edges, reworked some structure, and kept the page honest. It still feels like a personal record rather than a product, which is the right direction.",
    readingTime: "2 min read",
  },
  {
    id: "2026-06-05",
    date: "05 Jun 2026",
    title: "Fitness, Without Drama",
    photo: "",
    caption: "Nothing dramatic. Just another clean session.",
    mood: "Calm",
    tags: ["Fitness", "Discipline", "Routine"],
    content:
      "The body record is simple when it is real: move, recover, repeat. The day did not need a perfect session, only a complete one. That consistency is starting to feel more permanent than motivation ever did.",
    readingTime: "2 min read",
  },
  {
    id: "2026-06-04",
    date: "04 Jun 2026",
    title: "Domain Day",
    photo: "",
    caption: "The archive got its own name and stopped borrowing one.",
    mood: "Grateful",
    tags: ["Domain", "Launch", "Memory"],
    content:
      "The archive crossed into a more permanent state today. The site has a name now, and that name feels like it belongs to a longer timeline. I want the pages to read like a life being kept rather than a site being posted.",
    readingTime: "2 min read",
  },
];

const moodThemes: Record<string, { accent: string; glow: string; paper: string }> = {
  Focused: { accent: "#9A7B4F", glow: "rgba(154,123,79,0.22)", paper: "linear-gradient(180deg,#f6e8d3,#dfc39e)" },
  Reflective: { accent: "#6D6A88", glow: "rgba(109,106,136,0.18)", paper: "linear-gradient(180deg,#f0e8da,#d9cfbf)" },
  Calm: { accent: "#6A8268", glow: "rgba(106,130,104,0.18)", paper: "linear-gradient(180deg,#f4ede1,#dcd2c1)" },
  Grateful: { accent: "#8D6A52", glow: "rgba(141,106,82,0.18)", paper: "linear-gradient(180deg,#f5e9d7,#dfc8ad)" },
};

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 180))} min read`;
}

function normalizeTags(tagsText: string) {
  return tagsText
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function createDraft(entry?: JournalEntry): JournalDraft {
  return {
    title: entry?.title ?? "",
    caption: entry?.caption ?? "",
    content: entry?.content ?? "",
    mood: entry?.mood ?? "Reflective",
    tags: entry?.tags?.join(", ") ?? "",
    photo: entry?.photo ?? "",
  };
}

function buildEntryFromDraft(draft: JournalDraft, existingId?: string): JournalEntry {
  const date = new Date();
  const readableDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  return {
    id: existingId ?? String(date.getTime()),
    date: readableDate.replace(/,/g, ""),
    title: draft.title.trim() || "Untitled Entry",
    photo: draft.photo,
    caption: draft.caption.trim(),
    mood: draft.mood,
    tags: normalizeTags(draft.tags),
    content: draft.content.trim(),
    readingTime: estimateReadingTime(draft.content),
  };
}

function DiaryPhoto({ entry }: { entry: JournalEntry }) {
  const theme = moodThemes[entry.mood] ?? moodThemes.Reflective;

  if (entry.photo) {
    return <img src={entry.photo} alt={entry.title} className="h-full w-full object-cover" />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: theme.paper }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.75),transparent_28%),radial-gradient(circle_at_78%_24%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(40,31,20,0.14),transparent_46%)]" />
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(32,24,18,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(32,24,18,0.08)_1px,transparent_1px)] bg-[size:18px_18px]" />
      <div className="absolute inset-x-5 bottom-5 h-20 rounded-[1.4rem] blur-2xl" style={{ background: theme.glow }} />
      <div className="absolute left-6 top-6 rounded-full border border-black/5 bg-white/55 px-3 py-1 text-[0.58rem] uppercase tracking-[0.36em] text-[#665f54]">
        favorite photo
      </div>
      <div className="absolute inset-x-6 top-24 h-[55%] rounded-[1.5rem] border border-white/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))]" />
      <div className="absolute left-10 top-28 h-20 w-20 rounded-full bg-white/45 blur-[2px]" />
      <div className="absolute right-8 top-20 h-28 w-28 rounded-full bg-white/18 blur-[18px]" />
      <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-[0.65rem] uppercase tracking-[0.32em] text-[#5f574c]">
        <span>{entry.mood}</span>
        <span>{entry.date}</span>
      </div>
    </div>
  );
}

function NotebookPage({ entry, side }: { entry: JournalEntry; side: "left" | "right" }) {
  const theme = moodThemes[entry.mood] ?? moodThemes.Reflective;
  const isLeft = side === "left";

  return (
    <div className={`relative h-full min-h-[0] bg-[#fbf6ec] px-5 py-4 sm:px-6 sm:py-5 ${isLeft ? "lg:pr-8" : "lg:pl-8"}`}>
      <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(rgba(54,40,24,0.06)_1px,transparent_1px)] bg-[length:100%_28px]" />
      <div className={`relative z-10 flex h-full flex-col ${isLeft ? "pr-3 lg:pr-5" : "pl-3 lg:pl-5"}`}>
        {isLeft ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.48em] text-[#8a7f72]">Date</p>
                  <p className="mt-1 text-[1.55rem] font-light tracking-[0.12em] text-[#24211e]">{entry.date}</p>
                </div>
              <div
                className="h-9 w-9 rounded-full shadow-[0_0_0_9px_rgba(255,255,255,0.24)]"
                style={{
                  background: theme.accent,
                  boxShadow: `0 0 0 8px rgba(255,255,255,0.18), 0 0 20px ${theme.glow}`,
                }}
              />
            </div>

            <div className="mx-auto w-full max-w-[18rem] overflow-hidden rounded-[1.45rem] border border-black/8 bg-white shadow-[0_18px_42px_rgba(60,45,30,0.11)]">
              <div className="aspect-[4/5]">
                <DiaryPhoto entry={entry} />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[0.64rem] uppercase tracking-[0.46em] text-[#8a7f72]">Caption</p>
              <p className="text-[0.9rem] leading-6.5 text-[#2c2722]">{entry.caption}</p>
            </div>

            <div className="flex items-center gap-3 rounded-full bg-white/55 px-4 py-2 text-sm text-[#4a443c] shadow-[0_10px_22px_rgba(60,45,30,0.08)]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: theme.accent }} />
              <span className="uppercase tracking-[0.26em]">{entry.mood}</span>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={entry.id}
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col justify-start"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.48em] text-[#8a7f72]">Journal title</p>
                    <h2 className="mt-1 text-[clamp(1.75rem,3.1vw,3rem)] font-light leading-[0.96] tracking-[-0.04em] text-[#23201d]">
                      {entry.title}
                    </h2>
                  </div>
                  <span className="rounded-full bg-white/65 px-3 py-2 text-[0.64rem] uppercase tracking-[0.34em] text-[#6c6258] shadow-[0_10px_24px_rgba(60,45,30,0.06)]">
                    {entry.readingTime}
                  </span>
                </div>

                <div className="rounded-[1.35rem] bg-white/42 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                  <div className="space-y-3 text-[0.95rem] leading-7 text-[#2d2722] sm:text-[1rem]">
                    {entry.content.split("\n\n").map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3.5 space-y-2.5">
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/5 bg-white/65 px-3 py-2 text-[0.62rem] uppercase tracking-[0.34em] text-[#5f574c]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-[0.65rem] uppercase tracking-[0.38em] text-[#8a7f72]">{entry.readingTime}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function ComposerModal({
  open,
  initialDraft,
  onClose,
  onPublish,
}: {
  open: boolean;
  initialDraft: JournalDraft;
  onClose: () => void;
  onPublish: (draft: JournalDraft) => void;
}) {
  const [draft, setDraft] = useState(initialDraft);

  useEffect(() => {
    setDraft(initialDraft);
  }, [initialDraft, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-black/8 bg-[#fbf6ec] shadow-[0_40px_120px_rgba(40,30,20,0.28)]"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(54,40,24,0.06)_1px,transparent_1px)] bg-[length:100%_28px]" />
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="border-b border-black/5 p-6 lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.48em] text-[#8a7f72]">Owner publishing</p>
                    <h3 className="mt-2 text-3xl font-light tracking-[0.14em] text-[#24211e]">NEW ENTRY</h3>
                  </div>
                  <button
                    type="button"
                    aria-label="Close modal"
                    onClick={onClose}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-[#4a443c] shadow-[0_8px_20px_rgba(60,45,30,0.08)]"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  <label className="block">
                    <span className="text-[0.62rem] uppercase tracking-[0.42em] text-[#8a7f72]">Title</span>
                    <input
                      value={draft.title}
                      onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
                      className="mt-2 w-full rounded-[1rem] border border-black/8 bg-white/65 px-4 py-3 text-[#2a2622] outline-none transition focus:border-[#9A7B4F]/40"
                      placeholder="Write the entry title"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[0.62rem] uppercase tracking-[0.42em] text-[#8a7f72]">Caption</span>
                    <input
                      value={draft.caption}
                      onChange={(event) => setDraft((current) => ({ ...current, caption: event.target.value }))}
                      className="mt-2 w-full rounded-[1rem] border border-black/8 bg-white/65 px-4 py-3 text-[#2a2622] outline-none transition focus:border-[#9A7B4F]/40"
                      placeholder="Short caption for the left page"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[0.62rem] uppercase tracking-[0.42em] text-[#8a7f72]">Journal content</span>
                    <textarea
                      value={draft.content}
                      onChange={(event) => setDraft((current) => ({ ...current, content: event.target.value }))}
                      rows={7}
                      className="mt-2 w-full rounded-[1rem] border border-black/8 bg-white/65 px-4 py-3 text-[#2a2622] outline-none transition focus:border-[#9A7B4F]/40"
                      placeholder="Write the entry like a diary page..."
                    />
                  </label>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-[0.62rem] uppercase tracking-[0.42em] text-[#8a7f72]">Mood</span>
                    <select
                      value={draft.mood}
                      onChange={(event) => setDraft((current) => ({ ...current, mood: event.target.value }))}
                      className="mt-2 w-full rounded-[1rem] border border-black/8 bg-white/65 px-4 py-3 text-[#2a2622] outline-none transition focus:border-[#9A7B4F]/40"
                    >
                      <option>Reflective</option>
                      <option>Focused</option>
                      <option>Calm</option>
                      <option>Grateful</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-[0.62rem] uppercase tracking-[0.42em] text-[#8a7f72]">Tags</span>
                    <input
                      value={draft.tags}
                      onChange={(event) => setDraft((current) => ({ ...current, tags: event.target.value }))}
                      className="mt-2 w-full rounded-[1rem] border border-black/8 bg-white/65 px-4 py-3 text-[#2a2622] outline-none transition focus:border-[#9A7B4F]/40"
                      placeholder="JEE 2027, Study, Evening"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[0.62rem] uppercase tracking-[0.42em] text-[#8a7f72]">Photo upload</span>
                    <div className="mt-2 flex items-center gap-3 rounded-[1rem] border border-dashed border-black/12 bg-white/45 px-4 py-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (event) => {
                          const file = event.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => {
                            setDraft((current) => ({ ...current, photo: String(reader.result ?? "") }));
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="hidden"
                        id="journal-photo-upload"
                      />
                      <label htmlFor="journal-photo-upload" className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#4a443c]">
                        <ImageUp className="h-4 w-4" />
                        Upload photo
                      </label>
                      <div className="ml-auto text-[0.62rem] uppercase tracking-[0.36em] text-[#8a7f72]">Optional</div>
                    </div>
                    {draft.photo ? (
                      <div className="mt-3 overflow-hidden rounded-[1rem] border border-black/8 bg-white shadow-[0_10px_24px_rgba(60,45,30,0.08)]">
                        <img src={draft.photo} alt="Preview" className="h-40 w-full object-cover" />
                      </div>
                    ) : null}
                  </label>

                  <div className="rounded-[1.4rem] bg-[#f1e8d8] p-4 text-sm leading-7 text-[#5d5449]">
                    Publishing stores the entry in local notebook state. Wire this form to Supabase when backend credentials are available.
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-full border border-black/8 bg-white/60 px-4 py-2 text-sm text-[#4a443c] transition hover:bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => onPublish(draft)}
                      className="rounded-full bg-[#24211e] px-5 py-2 text-sm text-[#fbf6ec] transition hover:bg-[#312d28]"
                    >
                      Publish entry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function ActivityPage() {
  const reduceMotion = useReducedMotion();
  const [entries, setEntries] = useState(seedEntries);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ownerMode, setOwnerMode] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [draft, setDraft] = useState<JournalDraft>(createDraft());
  const [photoPreview, setPhotoPreview] = useState("");

  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem(STORAGE_KEY);
      const storedOwner = localStorage.getItem(OWNER_KEY);
      if (storedEntries) {
        const parsed = JSON.parse(storedEntries) as JournalEntry[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEntries(parsed);
        }
      }
      setOwnerMode(storedOwner === "1");
    } catch {
      // ignore malformed storage
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries, loaded]);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(OWNER_KEY, ownerMode ? "1" : "0");
  }, [ownerMode, loaded]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.altKey) && event.shiftKey && event.key.toLowerCase() === "o") {
        event.preventDefault();
        setOwnerMode((current) => !current);
      }
      if (ownerMode && (event.metaKey || event.altKey) && event.shiftKey && event.key.toLowerCase() === "n") {
        event.preventDefault();
        setEditingId(null);
        setDraft(createDraft());
        setPhotoPreview("");
        setComposerOpen(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [ownerMode]);

  const sortedEntries = useMemo(
    () =>
      [...entries].sort((left, right) => {
        const leftTime = Date.parse(left.id) || Date.parse(left.date);
        const rightTime = Date.parse(right.id) || Date.parse(right.date);
        return rightTime - leftTime;
      }),
    [entries],
  );

  const selectedEntry = useMemo(() => sortedEntries[selectedIndex] ?? sortedEntries[0], [sortedEntries, selectedIndex]);

  useEffect(() => {
    setSelectedIndex((current) => Math.min(current, Math.max(sortedEntries.length - 1, 0)));
  }, [sortedEntries.length]);

  function selectEntry(index: number) {
    setDirection(index > selectedIndex ? 1 : -1);
    setSelectedIndex(index);
  }

  function stepOlder() {
    setDirection(1);
    setSelectedIndex((current) => Math.min(current + 1, sortedEntries.length - 1));
  }

  function stepNewer() {
    setDirection(-1);
    setSelectedIndex((current) => Math.max(current - 1, 0));
  }

  function openComposer(entry?: JournalEntry) {
    setEditingId(entry?.id ?? null);
    setDraft(createDraft(entry));
    setPhotoPreview(entry?.photo ?? "");
    setComposerOpen(true);
  }

  function closeComposer() {
    setComposerOpen(false);
  }

  function publishDraft(nextDraft: JournalDraft) {
    const nextEntry = buildEntryFromDraft(
      {
        ...nextDraft,
        photo: photoPreview || nextDraft.photo,
      },
      editingId ?? undefined,
    );

    setEntries((current) => {
      if (editingId) {
        return current.map((entry) => (entry.id === editingId ? nextEntry : entry));
      }
      return [nextEntry, ...current];
    });

    setSelectedIndex(0);
    setEditingId(null);
    setDraft(createDraft());
    setPhotoPreview("");
    setComposerOpen(false);
  }

  function deleteEntry(id: string) {
    setEntries((current) => current.filter((entry) => entry.id !== id));
    setSelectedIndex(0);
  }

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#f4ecdf] text-[#2a2622]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.65),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(137,108,75,0.08),transparent_25%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(78,61,40,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(78,61,40,0.08)_1px,transparent_1px)] bg-[size:46px_46px]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0,transparent_62%,rgba(61,45,26,0.06)_100%)]" />

      <div className="relative mx-auto flex h-full w-full max-w-[96rem] flex-col px-4 py-3 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 pb-3">
          <div className="space-y-2">
            <p className="text-[0.64rem] uppercase tracking-[0.5em] text-[#8a7f72]">Personal notebook</p>
            <h1 className="text-[2rem] font-light tracking-[0.24em] text-[#24211e] sm:text-[2.5rem]">JOURNAL</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[0.64rem] uppercase tracking-[0.34em] text-[#6e6257]">
            <Link href="/" className="transition hover:text-[#24211e]">
              Home
            </Link>
            <span className="text-[#c2b5a0]">/</span>
            <Link href="/archives" className="transition hover:text-[#24211e]">
              Archives
            </Link>
            <span className="text-[#c2b5a0]">/</span>
            <Link href="/now" className="transition hover:text-[#24211e]">
              Now
            </Link>

            {ownerMode ? (
              <>
                <span className="text-[#c2b5a0]">/</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/55 px-3 py-2 text-[#49443d] shadow-[0_10px_20px_rgba(60,45,30,0.06)]">
                  <Lock className="h-3.5 w-3.5" />
                  Owner mode
                </span>
              </>
            ) : null}

            {ownerMode ? (
              <button
                type="button"
                onClick={() => openComposer()}
                className="inline-flex items-center gap-2 rounded-full bg-[#24211e] px-4 py-2 text-[#fbf6ec] shadow-[0_12px_26px_rgba(36,33,30,0.18)] transition hover:bg-[#322d28]"
              >
                <Plus className="h-4 w-4" />
                New Entry
              </button>
            ) : null}
          </div>
        </header>

        <section className="mt-1 flex min-h-0 flex-1 flex-col">
          <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-[2rem] border border-black/5 bg-[#fffaf3] shadow-[0_24px_70px_rgba(60,45,30,0.14)]">
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[72px] -translate-x-1/2 bg-[linear-gradient(90deg,rgba(0,0,0,0.04),rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.04))] opacity-30" />
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#a58e73]/25" />
            <div className="pointer-events-none absolute inset-y-8 left-1/2 w-[1px] -translate-x-1/2 bg-[#8d7b65]/15 blur-[0.5px]" />
            <div className="absolute left-1/2 top-[0.95rem] h-4 w-4 -translate-x-1/2 rounded-full border border-[#7f6d58]/50 bg-[#f3eadc] shadow-[0_0_0_10px_rgba(255,255,255,0.35)]" />
            <div className="absolute left-1/2 top-[6.6rem] h-4 w-4 -translate-x-1/2 rounded-full border border-[#7f6d58]/40 bg-[#f3eadc] shadow-[0_0_0_10px_rgba(255,255,255,0.18)]" />
            <div className="absolute left-1/2 bottom-[4.8rem] h-4 w-4 -translate-x-1/2 rounded-full border border-[#7f6d58]/40 bg-[#f3eadc] shadow-[0_0_0_10px_rgba(255,255,255,0.18)]" />

            <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-2">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`left-${selectedEntry?.id ?? "none"}`}
                  initial={reduceMotion ? false : { opacity: 0, x: direction > 0 ? -14 : 14 }}
                  animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: direction > 0 ? -14 : 14 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-black/5 lg:border-b-0 lg:border-r"
                >
                  {selectedEntry ? <NotebookPage entry={selectedEntry} side="left" /> : null}
                </motion.div>
              </AnimatePresence>

              <div className="relative">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`right-${selectedEntry?.id ?? "none"}`}
                    initial={reduceMotion ? false : { opacity: 0, x: direction > 0 ? 14 : -14 }}
                    animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: direction > 0 ? 14 : -14 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {selectedEntry ? <NotebookPage entry={selectedEntry} side="right" /> : null}
                  </motion.div>
                </AnimatePresence>

                {ownerMode && selectedEntry ? (
                  <div className="absolute right-5 top-5 z-20 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => openComposer(selectedEntry)}
                      className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-[0.64rem] uppercase tracking-[0.32em] text-[#4d4740] shadow-[0_12px_24px_rgba(60,45,30,0.08)] backdrop-blur-sm transition hover:bg-white"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      Edit Entry
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteEntry(selectedEntry.id)}
                      className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-[0.64rem] uppercase tracking-[0.32em] text-[#7a443f] shadow-[0_12px_24px_rgba(60,45,30,0.08)] backdrop-blur-sm transition hover:bg-white"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete Entry
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

          </div>
          <div className="flex-none pt-3">
            <div className="flex justify-center px-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-[#fffaf3]/96 px-3 py-2 shadow-[0_12px_28px_rgba(60,45,30,0.12)] backdrop-blur-sm">
                <button
                  type="button"
                  onClick={stepOlder}
                  disabled={selectedIndex >= sortedEntries.length - 1}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.64rem] uppercase tracking-[0.34em] text-[#4a443c] transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Entry
                </button>
                <span className="h-5 w-px bg-[#cdbfa8]" />
                <button
                  type="button"
                  onClick={stepNewer}
                  disabled={selectedIndex <= 0}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.64rem] uppercase tracking-[0.34em] text-[#4a443c] transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Next Entry
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ComposerModal
        open={composerOpen}
        initialDraft={draft}
        onClose={closeComposer}
        onPublish={(nextDraft) => publishDraft(nextDraft)}
      />
    </main>
  );
}

