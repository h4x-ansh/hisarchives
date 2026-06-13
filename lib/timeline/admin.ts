import { randomUUID } from "crypto";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getTimelineEntryById } from "./repository";

export type TimelineSubmission = {
  title: string;
  slug: string;
  date: string;
  year: string;
  summary: string;
  category: string;
  href: string;
  accent: string;
  word: string;
  status: "Active" | "Planned";
  displayOrder: number;
};

function readTextField(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : new Date().toISOString().slice(0, 10);
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "timeline"
  );
}

export function parseTimelineSubmission(formData: FormData): TimelineSubmission {
  const title = readTextField(formData.get("title"));
  const rawSlug = readTextField(formData.get("slug"));
  const date = normalizeDate(readTextField(formData.get("date")));
  const rawYear = readTextField(formData.get("year"));
  const year = rawYear || date.slice(0, 4);
  const word = readTextField(formData.get("word")) || title.slice(0, 12).toUpperCase();
  const displayOrder = parseInt(readTextField(formData.get("displayOrder")), 10);

  return {
    title,
    slug: rawSlug ? slugify(rawSlug) : slugify(title),
    date,
    year,
    summary: readTextField(formData.get("summary")),
    category: readTextField(formData.get("category")),
    href: readTextField(formData.get("href")),
    accent: readTextField(formData.get("accent")) || "#8b92a5",
    word,
    status: readTextField(formData.get("status")) === "Planned" ? "Planned" : "Active",
    displayOrder: Number.isFinite(displayOrder) ? displayOrder : 0,
  };
}

export async function createTimelineEntry(submission: TimelineSubmission) {
  const supabase = getSupabaseAdminClient();
  const id = randomUUID();
  const slug = `${submission.slug}-${id.slice(0, 8)}`;

  const { data, error } = await supabase
    .from("timeline_entries")
    .insert({
      id,
      slug,
      title: submission.title,
      date: submission.date,
      year: submission.year,
      summary: submission.summary,
      category: submission.category,
      href: submission.href,
      accent: submission.accent,
      word: submission.word,
      status: submission.status,
      display_order: submission.displayOrder,
    } as never)
    .select("*")
    .single();

  if (error) throw new Error(`Failed to create timeline entry: ${error.message}`);
  return data as { id: string; slug: string };
}

export async function updateTimelineEntry(id: string, submission: TimelineSubmission) {
  const supabase = getSupabaseAdminClient();
  const existing = await getTimelineEntryById(id);
  if (!existing) throw new Error("Timeline entry not found.");

  const { data, error } = await supabase
    .from("timeline_entries")
    .update({
      title: submission.title,
      slug: submission.slug || existing.slug,
      date: submission.date,
      year: submission.year,
      summary: submission.summary,
      category: submission.category,
      href: submission.href,
      accent: submission.accent,
      word: submission.word,
      status: submission.status,
      display_order: submission.displayOrder,
    } as never)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(`Failed to update timeline entry: ${error.message}`);
  return data;
}

export async function deleteTimelineEntry(id: string) {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("timeline_entries").delete().eq("id", id);
  if (error) throw new Error(`Failed to delete timeline entry: ${error.message}`);
}
