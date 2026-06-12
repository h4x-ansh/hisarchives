import { randomUUID } from "crypto";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { seedArchiveRecords } from "./seed";
import type { ArchiveCard, ArchiveRecord, ArchiveRecordRow } from "./types";

function formatArchiveYear(archiveDate: string) {
  const parsedDate = new Date(`${archiveDate}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", { year: "numeric" }).format(parsedDate);
}

function slugToAccent(slug: string) {
  const palette = ["#3b82f6", "#eab308", "#6d28d9", "#38bdf8", "#10b981", "#fb7185", "#f59e0b"];
  const index = Math.abs(slug.split("").reduce((sum, character) => sum + character.charCodeAt(0), 0)) % palette.length;
  return palette[index];
}

function wordFromTitle(title: string) {
  return title.length > 12 ? title.toUpperCase() : title.toUpperCase();
}

function shelfLabelFromCategory(category: string) {
  return category;
}

export function archiveRowToRecord(row: ArchiveRecordRow): ArchiveRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    archiveDate: row.archive_date,
    category: row.category,
    coverImageUrl: row.cover_image_url ?? "",
    shortSummary: row.short_summary,
    fullDescription: row.full_description,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function rowToArchiveCard(row: ArchiveRecordRow): ArchiveCard {
  return {
    id: row.slug,
    title: row.title,
    description: row.short_summary,
    status: row.status === "Published" ? "Published" : "Draft",
    year: formatArchiveYear(row.archive_date),
    accent: slugToAccent(row.slug),
    word: wordFromTitle(row.title),
    href: `/archives/${row.slug}`,
    shelfLabel: shelfLabelFromCategory(row.category),
    coverImageUrl: row.cover_image_url ?? "",
  };
}

function normalizeRows(rows: ArchiveRecordRow[] | null | undefined) {
  return (rows ?? []).sort((left, right) => {
    const leftDate = Date.parse(left.archive_date) || Date.parse(left.created_at);
    const rightDate = Date.parse(right.archive_date) || Date.parse(right.created_at);
    return rightDate - leftDate;
  });
}

function normalizeSeedRows() {
  return normalizeRows(seedArchiveRecords);
}

export async function listArchiveEntries(options?: { includeDrafts?: boolean }) {
  const supabase = getSupabaseAdminClient();
  const query = supabase.from("archive_records").select("*").order("archive_date", { ascending: false }).order("created_at", {
    ascending: false,
  });

  if (!options?.includeDrafts) {
    query.eq("status", "Published");
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to load archive records: ${error.message}`);
  }

  return normalizeRows(data as ArchiveRecordRow[]).map(rowToArchiveCard);
}

export async function getArchiveRecordById(id: string) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from("archive_records").select("*").eq("id", id).maybeSingle();

  if (error) {
    throw new Error(`Failed to load archive record: ${error.message}`);
  }

  return (data as ArchiveRecordRow | null) ?? null;
}

export async function getArchiveRecordBySlug(slug: string) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from("archive_records").select("*").eq("slug", slug).maybeSingle();

  if (error) {
    throw new Error(`Failed to load archive record: ${error.message}`);
  }

  return (data as ArchiveRecordRow | null) ?? null;
}

export function listSeedArchiveEntries(options?: { includeDrafts?: boolean }) {
  const rows = options?.includeDrafts ? normalizeSeedRows() : normalizeSeedRows().filter((entry) => entry.status === "Published");
  return rows.map(rowToArchiveCard);
}

export async function seedArchiveEntriesIfEmpty() {
  const supabase = getSupabaseAdminClient();
  const { count, error } = await supabase.from("archive_records").select("id", { count: "exact", head: true });

  if (error) {
    throw new Error(`Failed to inspect archive table: ${error.message}`);
  }

  if (!count) {
    const seedRows = seedArchiveRecords.map(({ id: _id, ...entry }) => ({
      ...entry,
      id: randomUUID(),
    }));

    const { error: insertError } = await supabase.from("archive_records").insert(seedRows as never[]);
    if (insertError) {
      throw new Error(`Failed to seed archive records: ${insertError.message}`);
    }
  }
}

export function archiveRecordToFormValues(record: ArchiveRecordRow) {
  return {
    title: record.title,
    archiveDate: record.archive_date,
    category: record.category,
    shortSummary: record.short_summary,
    fullDescription: record.full_description,
    status: record.status,
    coverImageUrl: record.cover_image_url ?? "",
  };
}
