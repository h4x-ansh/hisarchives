import { randomUUID } from "crypto";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { seedJournalEntries } from "./seed";
import type { JournalEntry, JournalEntryRecord } from "./types";

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 180))} min read`;
}

function formatEntryDate(entryDate: string) {
  const parsedDate = new Date(`${entryDate}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(parsedDate)
    .replace(/,/g, "");
}

function rowToEntry(row: JournalEntryRecord): JournalEntry {
  return {
    id: row.id,
    date: formatEntryDate(row.entry_date),
    title: row.title,
    photo: row.photo_url ?? "",
    caption: row.photo_caption ?? "",
    mood: row.mood,
    tags: row.tags ?? [],
    content: row.content,
    readingTime: estimateReadingTime(row.content),
    published: row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function normalizeEntryRows(rows: JournalEntryRecord[] | null | undefined) {
  return (rows ?? []).sort((left, right) => {
    const leftDate = Date.parse(left.entry_date) || Date.parse(left.created_at);
    const rightDate = Date.parse(right.entry_date) || Date.parse(right.created_at);
    return rightDate - leftDate;
  });
}

export async function listJournalEntries(options?: { includeDrafts?: boolean }) {
  const supabase = getSupabaseAdminClient();
  const query = supabase.from("journal_entries").select("*").order("entry_date", { ascending: false }).order("created_at", {
    ascending: false,
  });

  if (!options?.includeDrafts) {
    query.eq("published", true);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to load journal entries: ${error.message}`);
  }

  return normalizeEntryRows(data as JournalEntryRecord[]).map(rowToEntry);
}

export function listSeedJournalEntries(options?: { includeDrafts?: boolean }) {
  const rows = options?.includeDrafts ? seedJournalEntries : seedJournalEntries.filter((entry) => entry.published);
  return normalizeEntryRows(rows).map(rowToEntry);
}

export async function seedJournalEntriesIfEmpty() {
  const supabase = getSupabaseAdminClient();
  const { count, error } = await supabase.from("journal_entries").select("id", { count: "exact", head: true });

  if (error) {
    throw new Error(`Failed to inspect journal table: ${error.message}`);
  }

  if (!count) {
    const seedRows = seedJournalEntries.map(({ id: _id, ...entry }) => ({
      ...entry,
      id: randomUUID(),
    }));
    const { error: insertError } = await supabase.from("journal_entries").insert(seedRows as never[]);
    if (insertError) {
      throw new Error(`Failed to seed journal entries: ${insertError.message}`);
    }
  }
}
