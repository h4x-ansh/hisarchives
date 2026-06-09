"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageUp, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

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
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

type JournalDraft = {
  title: string;
  caption: string;
  content: string;
  mood: string;
  tags: string;
  photo: string;
};

const LEGACY_STORAGE_KEY = "hisarchives-journal-entries";
const LEGACY_MIGRATED_KEY = "hisarchives-journal-migrated";
const ENABLE_LEGACY_IMPORT = false;

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

function buildEntryFromDraft(draft: JournalDraft, existingId?: string, published = true): JournalEntry {
  const date = new Date();
  const readableDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  const timestamp = date.toISOString();

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
    published,
    createdAt: timestamp,
    updatedAt: timestamp,
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
  onClose,
  onPublish,
  onSaveDraft,
  onUploadPhoto,
}: {
  open: boolean;
  onClose: () => void;
  onPublish: (draft: JournalDraft) => void;
  onSaveDraft: (draft: JournalDraft) => void;
  onUploadPhoto: (file: File) => Promise<string>;
}) {
  const [draft, setDraft] = useState<JournalDraft>(() => createDraft());
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const lastFocusedFieldRef = useRef<string | null>(null);

  console.log("Composer rerender");

  useEffect(() => {
    console.log("Composer mounted");
    return () => {
      console.log("Composer unmounted");
    };
  }, []);

  return open ? (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/35 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-black/8 bg-[#fbf6ec] shadow-[0_40px_120px_rgba(40,30,20,0.28)]"
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
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
                      autoFocus
                      value={draft.title}
                      onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          console.log("title input Enter keydown", {
                            activeElement: document.activeElement?.tagName,
                            insideForm: Boolean(event.currentTarget.form),
                          });
                        }
                      }}
                      onFocus={() => {
                        lastFocusedFieldRef.current = "title";
                        console.log("focus title", { activeElement: document.activeElement?.tagName });
                      }}
                      onBlur={() =>
                        console.log("blur title", {
                          nextActiveElement: document.activeElement?.tagName,
                          lastFocusedField: lastFocusedFieldRef.current,
                        })
                      }
                      className="mt-2 w-full rounded-[1rem] border border-black/8 bg-white/65 px-4 py-3 text-[#2a2622] outline-none transition focus:border-[#9A7B4F]/40"
                      placeholder="Write the entry title"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[0.62rem] uppercase tracking-[0.42em] text-[#8a7f72]">Caption</span>
                    <input
                      value={draft.caption}
                      onChange={(event) => setDraft((current) => ({ ...current, caption: event.target.value }))}
                      onFocus={() => {
                        lastFocusedFieldRef.current = "caption";
                        console.log("focus caption", { activeElement: document.activeElement?.tagName });
                      }}
                      onBlur={() => console.log("blur caption", { nextActiveElement: document.activeElement?.tagName })}
                      className="mt-2 w-full rounded-[1rem] border border-black/8 bg-white/65 px-4 py-3 text-[#2a2622] outline-none transition focus:border-[#9A7B4F]/40"
                      placeholder="Short caption for the left page"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[0.62rem] uppercase tracking-[0.42em] text-[#8a7f72]">Journal content</span>
                    <textarea
                      value={draft.content}
                      onChange={(event) => setDraft((current) => ({ ...current, content: event.target.value }))}
                      onFocus={() => {
                        lastFocusedFieldRef.current = "content";
                        console.log("focus content", { activeElement: document.activeElement?.tagName });
                      }}
                      onBlur={() => console.log("blur content", { nextActiveElement: document.activeElement?.tagName })}
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
                      onFocus={() => {
                        lastFocusedFieldRef.current = "mood";
                        console.log("focus mood", { activeElement: document.activeElement?.tagName });
                      }}
                      onBlur={() => console.log("blur mood", { nextActiveElement: document.activeElement?.tagName })}
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
                      onFocus={() => {
                        lastFocusedFieldRef.current = "tags";
                        console.log("focus tags", { activeElement: document.activeElement?.tagName });
                      }}
                      onBlur={() => console.log("blur tags", { nextActiveElement: document.activeElement?.tagName })}
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
                          setUploadingPhoto(true);
                          try {
                            const url = await onUploadPhoto(file);
                            setDraft((current) => ({ ...current, photo: url }));
                          } finally {
                            setUploadingPhoto(false);
                          }
                        }}
                        onFocus={() => {
                          lastFocusedFieldRef.current = "file";
                          console.log("focus file", { activeElement: document.activeElement?.tagName });
                        }}
                        onBlur={() => console.log("blur file", { nextActiveElement: document.activeElement?.tagName })}
                        className="hidden"
                        id="journal-photo-upload"
                      />
                      <label htmlFor="journal-photo-upload" className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#4a443c]">
                        <ImageUp className="h-4 w-4" />
                        {uploadingPhoto ? "Uploading..." : "Upload photo"}
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
                      onClick={() => onSaveDraft(draft)}
                      className="rounded-full border border-black/8 bg-white/60 px-4 py-2 text-sm text-[#4a443c] transition hover:bg-white"
                    >
                      Save Draft
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
      </div>
    </div>
  ) : null;
}

export function ActivityPage({
  initialEntries,
  isOwner,
}: {
  initialEntries: JournalEntry[];
  isOwner: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [entries, setEntries] = useState(initialEntries);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [composerOpen, setComposerOpenState] = useState(false);
  const [editingId, setEditingIdState] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [isMigrating, setIsMigrating] = useState(false);
  const migrationAttemptedRef = useRef(false);
  const previousComposerOpenRef = useRef<boolean>(false);
  const previousEditingIdRef = useRef<string | null>(null);
  const previousStateRef = useRef<{
    ownerMode: boolean;
    isMigrating: boolean;
    entriesLength: number;
    selectedIndex: number;
    composerOpen: boolean;
    editingId: string | null;
    photoPreview: string;
    initialEntriesRef: JournalEntry[];
    isOwner: boolean;
  } | null>(null);
  const selectedEntryRef = useRef<JournalEntry | null>(null);

  const ownerMode = isOwner;
  console.log("ActivityPage rerender");
  console.log("Session state updates", { ownerMode, isMigrating, entries: entries.length, selectedIndex, composerOpen });

  function setComposerOpen(nextValue: boolean, source: string) {
    console.log("setComposerOpen invoke", { source, from: composerOpen, to: nextValue });
    console.trace("setComposerOpen");
    setComposerOpenState((current) => {
      console.log("setComposerOpen commit", { source, from: current, to: nextValue });
      return nextValue;
    });
  }

  function setEditingId(nextValue: string | null, source: string) {
    console.log("setEditingId invoke", { source, from: editingId, to: nextValue, applied: false });
    console.trace("setEditingId");
    setEditingIdState((current) => {
      console.log("setEditingId commit", { source, from: current, to: null, requested: nextValue, applied: false });
      return null;
    });
  }

  useEffect(() => {
    if (previousComposerOpenRef.current !== composerOpen) {
      console.log("composerOpen transition", `${String(previousComposerOpenRef.current)} -> ${String(composerOpen)}`);
      previousComposerOpenRef.current = composerOpen;
    }
  }, [composerOpen]);

  useEffect(() => {
    if (previousEditingIdRef.current !== editingId) {
      console.log("editingId transition", `${String(previousEditingIdRef.current)} -> ${String(editingId)}`);
      previousEditingIdRef.current = editingId;
    }
  }, [editingId]);

  useEffect(() => {
    const previousState = previousStateRef.current;
    const nextState = {
      ownerMode,
      isMigrating,
      entriesLength: entries.length,
      selectedIndex,
      composerOpen,
      editingId,
      photoPreview,
      initialEntriesRef: initialEntries,
      isOwner,
    };

    if (!previousState) {
      console.log("ActivityPage state change", { reason: "initial mount", nextState });
      previousStateRef.current = nextState;
      return;
    }

    const changes: Record<string, unknown> = {};

    if (previousState.ownerMode !== nextState.ownerMode) changes.ownerMode = { from: previousState.ownerMode, to: nextState.ownerMode };
    if (previousState.isMigrating !== nextState.isMigrating) changes.isMigrating = { from: previousState.isMigrating, to: nextState.isMigrating };
    if (previousState.entriesLength !== nextState.entriesLength) changes.entriesLength = { from: previousState.entriesLength, to: nextState.entriesLength };
    if (previousState.selectedIndex !== nextState.selectedIndex) changes.selectedIndex = { from: previousState.selectedIndex, to: nextState.selectedIndex };
    if (previousState.composerOpen !== nextState.composerOpen) changes.composerOpen = { from: previousState.composerOpen, to: nextState.composerOpen };
    if (previousState.editingId !== nextState.editingId) changes.editingId = { from: previousState.editingId, to: nextState.editingId };
    if (previousState.photoPreview !== nextState.photoPreview) changes.photoPreview = {
      from: Boolean(previousState.photoPreview),
      to: Boolean(nextState.photoPreview),
    };
    if (previousState.isOwner !== nextState.isOwner) changes.isOwner = { from: previousState.isOwner, to: nextState.isOwner };
    if (previousState.initialEntriesRef !== nextState.initialEntriesRef) changes.initialEntriesRef = { changed: true };

    if (Object.keys(changes).length > 0) {
      console.log("ActivityPage state change", changes);
    }

    previousStateRef.current = nextState;
  });

  useEffect(() => {
    console.log("ActivityPage entries update", initialEntries.length);
    if (composerOpen) {
      console.log("ActivityPage entries sync frozen", { reason: "composer open" });
      return;
    }
    setEntries(initialEntries);
  }, [composerOpen, initialEntries]);

  useEffect(() => {
    console.log("ActivityPage owner mode update", ownerMode);
    function handleKeyDown(event: KeyboardEvent) {
      if (ownerMode && (event.metaKey || event.altKey) && event.shiftKey && event.key.toLowerCase() === "n") {
        event.preventDefault();
        setEditingId(null, "keydown:new-entry");
        setPhotoPreview("");
        setComposerOpen(true, "keydown:new-entry");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [ownerMode]);

  useEffect(() => {
    console.log("ActivityPage migration update", { isMigrating, ownerMode, composerOpen });
    if (!ENABLE_LEGACY_IMPORT) {
      console.log("Journal import disabled", { reason: "temporary kill switch enabled" });
      return;
    }

    if (!ownerMode || typeof window === "undefined") {
      console.log("Journal import skipped", { reason: "owner mode off or window unavailable", ownerMode });
      return;
    }

    if (composerOpen) {
      console.log("Journal import skipped", { reason: "composer is open" });
      return;
    }

    if (migrationAttemptedRef.current) {
      console.log("Journal import skipped", { reason: "already attempted this mount" });
      return;
    }

    const migrateLegacyEntries = async () => {
      migrationAttemptedRef.current = true;
      const alreadyMigrated = window.localStorage.getItem(LEGACY_MIGRATED_KEY);
      if (alreadyMigrated === "1") {
        console.log("Journal import skipped", { reason: "migration already completed" });
        return;
      }

      const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
      if (!legacy) {
        console.log("Journal import skipped", { reason: "no legacy entries found" });
        return;
      }

      try {
        console.log("Journal import trigger", { source: "ActivityPage migration effect" });
        const parsed = JSON.parse(legacy) as JournalEntry[];
        if (!Array.isArray(parsed) || parsed.length === 0) {
          console.log("Journal import skipped", { reason: "legacy payload empty or invalid" });
          return;
        }

        setIsMigrating(true);
        const response = await fetch("/api/journal/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ entries: parsed }),
        });

        if (!response.ok) {
          console.log("Journal import failure", { status: response.status, statusText: response.statusText });
          return;
        }

        const payload = (await response.json()) as { imported?: JournalEntry[]; importedCount?: number };
        if (Array.isArray(payload.imported) && payload.imported.length > 0) {
          console.log("Journal import success", { importedCount: payload.imported.length });
          setEntries(payload.imported);
          setSelectedIndex(0);
          window.localStorage.removeItem(LEGACY_STORAGE_KEY);
          window.localStorage.setItem(LEGACY_MIGRATED_KEY, "1");
          return;
        }

        console.log("Journal import success", {
          importedCount: payload.importedCount ?? 0,
          note: "response returned no imported entry array",
        });
        window.localStorage.setItem(LEGACY_MIGRATED_KEY, "1");
      } catch {
        console.log("Journal import failure", { error: "exception during import" });
        // ignore migration errors and keep the server-loaded data
      } finally {
        setIsMigrating(false);
      }
    };

    void migrateLegacyEntries();
  }, [composerOpen, ownerMode]);

  const sortedEntries = useMemo(
    () =>
      [...entries].sort((left, right) => {
        const leftTime = Date.parse(left.createdAt) || Date.parse(left.date);
        const rightTime = Date.parse(right.createdAt) || Date.parse(right.date);
        return rightTime - leftTime;
      }),
    [entries],
  );

  const selectedEntry = useMemo(() => sortedEntries[selectedIndex] ?? sortedEntries[0], [sortedEntries, selectedIndex]);
  selectedEntryRef.current = selectedEntry ?? null;

  useEffect(() => {
    if (composerOpen) {
      console.log("ActivityPage selected index clamp frozen", { reason: "composer open" });
      return;
    }
    setSelectedIndex((current) => Math.min(current, Math.max(sortedEntries.length - 1, 0)));
  }, [composerOpen, sortedEntries.length]);

  useEffect(() => {
    console.log("ActivityPage owner action listener update", { composerOpen, selectedEntryId: selectedEntryRef.current?.id ?? "none" });

    if (composerOpen) {
      console.log("ActivityPage owner action sync frozen", { reason: "composer open" });
      return;
    }

    function handleOwnerAction(event: Event) {
      const customEvent = event as CustomEvent<{ path?: string; label?: string }>;

      if (customEvent.detail?.path !== "/activity") {
        return;
      }

      switch (customEvent.detail?.label) {
        case "New Entry":
          setEditingId(null, "owner-action:new-entry");
          setPhotoPreview("");
          setComposerOpen(true, "owner-action:new-entry");
          break;
        case "Edit":
          if (selectedEntryRef.current) {
            openComposer(selectedEntryRef.current);
          }
          break;
        case "Delete":
          if (selectedEntryRef.current) {
            deleteEntry(selectedEntryRef.current.id);
          }
          break;
        default:
          break;
      }
    }

    window.addEventListener("hisarchives:owner-action", handleOwnerAction);
    return () => window.removeEventListener("hisarchives:owner-action", handleOwnerAction);
  }, [composerOpen]);

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
    setEditingId(entry?.id ?? null, "openComposer");
    setPhotoPreview(entry?.photo ?? "");
    setComposerOpen(true, "openComposer");
  }

  function closeComposer() {
    setComposerOpen(false, "closeComposer");
  }

  async function uploadPhoto(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/journal/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload photo.");
    }

    const payload = (await response.json()) as { url?: string };
    if (!payload.url) {
      throw new Error("Upload returned no URL.");
    }

    setPhotoPreview(payload.url);
    return payload.url;
  }

  async function persistEntry(nextDraft: JournalDraft, published: boolean) {
    const payload = {
      title: nextDraft.title.trim() || "Untitled Entry",
      content: nextDraft.content.trim(),
      photo_url: photoPreview || nextDraft.photo || null,
      photo_caption: nextDraft.caption.trim() || null,
      tags: normalizeTags(nextDraft.tags),
      mood: nextDraft.mood,
      entry_date: editingId ? selectedEntry?.createdAt?.slice(0, 10) ?? new Date().toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
      published,
    };

    const response = await fetch(editingId ? `/api/journal/${editingId}` : "/api/journal", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to save journal entry.");
    }

    const result = (await response.json()) as { entry: JournalEntry };
    setEntries((current) => {
      if (editingId) {
        return current.map((entry) => (entry.id === editingId ? result.entry : entry));
      }

      return [result.entry, ...current];
    });

    setSelectedIndex(0);
    setEditingId(null, "persistEntry");
    setPhotoPreview("");
    setComposerOpen(false, "persistEntry");
  }

  function deleteEntry(id: string) {
    void (async () => {
      const response = await fetch(`/api/journal/${id}`, { method: "DELETE" });
      if (!response.ok) return;

      setEntries((current) => current.filter((entry) => entry.id !== id));
      setSelectedIndex(0);
    })();
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
        onClose={closeComposer}
        onUploadPhoto={uploadPhoto}
        onSaveDraft={(nextDraft) => void persistEntry(nextDraft, false)}
        onPublish={(nextDraft) => void persistEntry(nextDraft, true)}
      />
    </main>
  );
}

