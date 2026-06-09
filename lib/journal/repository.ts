import { randomUUID } from "crypto";
import type { File as NodeFile } from "node:buffer";
import { getSupabaseAdminClient, journalBucketName } from "@/lib/supabase/admin";
import { seedJournalEntries } from "./seed";
import type { JournalEntry, JournalEntryInput, JournalEntryRecord } from "./types";
import type { Database } from "@/lib/supabase/database.types";

type JournalEntryInsert = Database["public"]["Tables"]["journal_entries"]["Insert"];

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

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

function rowFromInput(input: JournalEntryInput, existingId?: string): JournalEntryRecord {
  const now = new Date().toISOString();

  return {
    id: existingId ?? randomUUID(),
    title: input.title.trim() || "Untitled Entry",
    content: input.content.trim(),
    photo_url: input.photo_url ?? null,
    photo_caption: input.photo_caption ?? null,
    tags: input.tags ?? [],
    mood: input.mood,
    entry_date: input.entry_date,
    published: input.published,
    created_at: now,
    updated_at: now,
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

export async function createJournalEntry(input: JournalEntryInput) {
  const supabase = getSupabaseAdminClient();
  const row = rowFromInput(input);
  const { data, error } = await supabase.from("journal_entries").insert(row as never).select("*").single();

  if (error) {
    throw new Error(`Failed to create journal entry: ${error.message}`);
  }

  return rowToEntry(data as JournalEntryRecord);
}

export async function updateJournalEntry(id: string, input: JournalEntryInput) {
  const supabase = getSupabaseAdminClient();
  const { data: current, error: loadError } = await supabase.from("journal_entries").select("*").eq("id", id).maybeSingle();

  if (loadError) {
    throw new Error(`Failed to load journal entry: ${loadError.message}`);
  }

  const nextRow = {
    ...(current as JournalEntryRecord | null),
    ...rowFromInput(input, id),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase.from("journal_entries").upsert(nextRow as never).select("*").single();

  if (error) {
    throw new Error(`Failed to update journal entry: ${error.message}`);
  }

  return rowToEntry(data as JournalEntryRecord);
}

export async function deleteJournalEntry(id: string) {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("journal_entries").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete journal entry: ${error.message}`);
  }

  return { ok: true };
}

export async function uploadJournalPhoto(file: File, fileName?: string) {
  const supabase = getSupabaseAdminClient();
  const extension = file.name.split(".").pop() ?? "jpg";
  const path = `${new Date().getFullYear()}/${Date.now()}-${fileName ?? file.name.replace(/\s+/g, "-")}.${extension}`;
  const { error } = await supabase.storage.from(journalBucketName).upload(path, file, {
    contentType: file.type || "image/jpeg",
    upsert: false,
  });

  if (error) {
    throw new Error(`Failed to upload journal photo: ${error.message}`);
  }

  const { data } = supabase.storage.from(journalBucketName).getPublicUrl(path);
  return { path, url: data.publicUrl };
}

export async function importLocalJournalEntries(entries: JournalEntry[]) {
  const supabase = getSupabaseAdminClient();

  const rows = entries.map((entry) => ({
    id: isUuid(entry.id) ? entry.id : randomUUID(),
    title: entry.title,
    content: entry.content,
    photo_url: entry.photo || null,
    photo_caption: entry.caption || null,
    tags: entry.tags ?? [],
    mood: entry.mood,
    entry_date: new Date(entry.id).toISOString().slice(0, 10),
    published: true,
    created_at: entry.createdAt,
    updated_at: entry.updatedAt,
  }));

  const { data, error } = await supabase.from("journal_entries").upsert(rows as never[]).select("*");

  if (error) {
    throw new Error(`Failed to import local journal entries: ${error.message}`);
  }

  return normalizeEntryRows(data as JournalEntryRecord[]).map(rowToEntry);
}
