import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { curatedBucketName } from "@/lib/supabase/admin";
import type { CuratedGalleryItem, CuratedRecord, CuratedRecordRow } from "./types";

function hashAccent(value: string) {
  const palette = ["#8A79FF", "#7CC6FF", "#58D0A6", "#E2383F", "#F0B85B", "#D44D3D", "#74D6A2", "#B84B5E"];
  const index = Math.abs(value.split("").reduce((sum, character) => sum + character.charCodeAt(0), 0)) % palette.length;
  return palette[index];
}

function normalizeDisplayOrder(value: number | null | undefined) {
  return Number.isFinite(value as number) ? Number(value) : 0;
}

function normalizeYear(displayOrder: number) {
  return String(displayOrder).padStart(2, "0");
}

export function curatedRowToRecord(row: CuratedRecordRow): CuratedRecord {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    imageUrl: row.image_url ?? "",
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    externalLink: row.external_link,
    displayOrder: row.display_order,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function curatedRowToGalleryItem(row: CuratedRecordRow): CuratedGalleryItem {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    image: row.image_url ?? "",
    fallbackImage: row.image_url ?? "",
    accent: row.accent || hashAccent(`${row.category}-${row.title}`),
    imagePosition: row.image_position || "center",
    description: row.short_description,
    externalLink: row.external_link ?? undefined,
    displayOrder: normalizeDisplayOrder(row.display_order),
    year: normalizeYear(normalizeDisplayOrder(row.display_order)),
  };
}

function sortRows(rows: CuratedRecordRow[]) {
  return [...rows].sort((left, right) => {
    if (left.display_order !== right.display_order) {
      return left.display_order - right.display_order;
    }

    return left.title.localeCompare(right.title);
  });
}

export async function listCuratedEntries(options?: { includeDrafts?: boolean }) {
  const supabase = getSupabaseAdminClient();
  const query = supabase.from("curated_items").select("*").order("display_order", { ascending: true }).order("created_at", {
    ascending: false,
  });

  if (!options?.includeDrafts) {
    query.eq("status", "Published");
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to load curated items: ${error.message}`);
  }

  return sortRows((data ?? []) as CuratedRecordRow[]).map(curatedRowToRecord);
}

export async function listCuratedGalleryItems(options?: { includeDrafts?: boolean }) {
  const supabase = getSupabaseAdminClient();
  const query = supabase.from("curated_items").select("*").order("display_order", { ascending: true }).order("created_at", {
    ascending: false,
  });

  if (!options?.includeDrafts) {
    query.eq("status", "Published");
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to load curated items: ${error.message}`);
  }

  return sortRows((data ?? []) as CuratedRecordRow[]).map(curatedRowToGalleryItem);
}

export async function getCuratedRecordById(id: string) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from("curated_items").select("*").eq("id", id).maybeSingle();

  if (error) {
    throw new Error(`Failed to load curated item: ${error.message}`);
  }

  return (data as CuratedRecordRow | null) ?? null;
}

export function curatedRecordToFormValues(record: CuratedRecordRow) {
  return {
    title: record.title,
    category: record.category,
    accent: record.accent ?? "#8b92a5",
    imagePosition: record.image_position ?? "center",
    shortDescription: record.short_description,
    fullDescription: record.full_description ?? "",
    externalLink: record.external_link ?? "",
    displayOrder: String(record.display_order),
    status: record.status,
    imageUrl: record.image_url ?? "",
  };
}

export function getCuratedBucketName() {
  return curatedBucketName;
}
