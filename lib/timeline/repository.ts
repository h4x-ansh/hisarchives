import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import type { ArchiveRecordRow } from "@/lib/archive/types";
import { seedTimelineEntries } from "./seed";
import type { TimelineEntry } from "./types";

function formatTimelineYear(dateValue: string) {
  const parsedDate = new Date(`${dateValue}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", { year: "numeric" }).format(parsedDate);
}

function slugToAccent(slug: string) {
  const palette = ["#3b82f6", "#eab308", "#6d28d9", "#38bdf8", "#10b981", "#fb7185", "#f59e0b"];
  const index = Math.abs(slug.split("").reduce((sum, character) => sum + character.charCodeAt(0), 0)) % palette.length;
  return palette[index];
}

function wordFromTitle(title: string) {
  return title.length > 12 ? title.slice(0, 12).toUpperCase() : title.toUpperCase();
}

function archiveRowToTimelineEntry(row: ArchiveRecordRow): TimelineEntry {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.archive_date,
    year: formatTimelineYear(row.archive_date),
    summary: row.short_summary,
    category: row.category,
    coverImageUrl: row.cover_image_url ?? "",
    href: `/archives/${row.slug}`,
    accent: slugToAccent(row.slug),
    word: wordFromTitle(row.title),
    status: row.status === "Published" ? "Published" : "Draft",
  };
}

function sortEntries(entries: TimelineEntry[]) {
  return [...entries].sort((left, right) => {
    const leftDate = Date.parse(left.date);
    const rightDate = Date.parse(right.date);
    return rightDate - leftDate;
  });
}

export function listSeedTimelineEntries() {
  return sortEntries(seedTimelineEntries);
}

export async function listArchiveTimelineEntries() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("archive_records")
    .select("*")
    .eq("status", "Published")
    .order("archive_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load timeline records: ${error.message}`);
  }

  return sortEntries((data as ArchiveRecordRow[]).map(archiveRowToTimelineEntry));
}

export async function loadTimelineEntries() {
  try {
    const entries = await listArchiveTimelineEntries();
    if (entries.length) {
      return entries;
    }
  } catch {
    // Fall back to the existing seed timeline data.
  }

  return listSeedTimelineEntries();
}
