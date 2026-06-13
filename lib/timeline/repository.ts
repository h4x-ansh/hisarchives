import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { seedTimelineEntries } from "./seed";
import type { TimelineEntry } from "./types";

type TimelineRow = {
  id: string; slug: string; title: string; date: string; year: string;
  summary: string; category: string; cover_image_url: string | null;
  href: string; accent: string; word: string; status: string;
  display_order: number; created_at: string; updated_at: string;
};

function rowToEntry(row: TimelineRow): TimelineEntry {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.date,
    year: row.year,
    summary: row.summary,
    category: row.category,
    coverImageUrl: row.cover_image_url ?? "",
    href: row.href,
    accent: row.accent,
    word: row.word,
    status: row.status,
  };
}

function sortEntries(entries: TimelineEntry[]) {
  return [...entries].sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}

export function listSeedTimelineEntries() {
  return sortEntries(seedTimelineEntries);
}

export async function listTimelineEntries() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("timeline_entries")
    .select("*")
    .order("display_order", { ascending: true })
    .order("date", { ascending: true });

  if (error) throw new Error(`Failed to load timeline entries: ${error.message}`);
  return (data as TimelineRow[]).map(rowToEntry);
}

export async function getTimelineEntryById(id: string) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("timeline_entries")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Failed to load timeline entry: ${error.message}`);
  return (data as TimelineRow | null) ?? null;
}

export async function loadTimelineEntries() {
  try {
    const entries = await listTimelineEntries();
    if (entries.length) return entries;
  } catch {
    // fall through to seed
  }
  return listSeedTimelineEntries();
}
