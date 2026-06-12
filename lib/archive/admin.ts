import { randomUUID } from "crypto";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getArchiveRecordById } from "./repository";
import type { ArchiveRecordRow } from "./types";

export type ArchiveSubmission = {
  title: string;
  archiveDate: string;
  category: string;
  shortSummary: string;
  fullDescription: string;
  status: "Draft" | "Published";
  coverImageFile: File | null;
};

function readTextField(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeDate(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  return new Date().toISOString().slice(0, 10);
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "archive";
}

function normalizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

function getStoragePathFromPublicUrl(publicUrl: string) {
  try {
    const parsedUrl = new URL(publicUrl);
    const storagePrefix = `/storage/v1/object/public/archive-covers/`;
    const pathIndex = parsedUrl.pathname.indexOf(storagePrefix);

    if (pathIndex === -1) {
      return null;
    }

    return parsedUrl.pathname.slice(pathIndex + storagePrefix.length);
  } catch {
    return null;
  }
}

async function uploadCoverImage(entryId: string, file: File) {
  const supabase = getSupabaseAdminClient();
  const safeFileName = normalizeFileName(file.name || "archive-cover");
  const extension = safeFileName.includes(".") ? `.${safeFileName.split(".").pop()}` : "";
  const storagePath = `${entryId}/${randomUUID()}${extension}`;
  const { error } = await supabase.storage.from("archive-covers").upload(storagePath, Buffer.from(await file.arrayBuffer()), {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (error) {
    throw new Error(`Failed to upload archive cover: ${error.message}`);
  }

  const { data } = supabase.storage.from("archive-covers").getPublicUrl(storagePath);
  return data.publicUrl;
}

async function removeCoverImage(publicUrl: string) {
  const storagePath = getStoragePathFromPublicUrl(publicUrl);

  if (!storagePath) {
    return;
  }

  const supabase = getSupabaseAdminClient();
  await supabase.storage.from("archive-covers").remove([storagePath]);
}

export function parseArchiveSubmission(formData: FormData): ArchiveSubmission {
  const coverImageField = formData.get("coverImage");

  return {
    title: readTextField(formData.get("title")),
    archiveDate: normalizeDate(readTextField(formData.get("archiveDate"))),
    category: readTextField(formData.get("category")),
    shortSummary: readTextField(formData.get("shortSummary")),
    fullDescription: readTextField(formData.get("fullDescription")),
    status: readTextField(formData.get("status")) === "Published" ? "Published" : "Draft",
    coverImageFile: coverImageField instanceof File && coverImageField.size > 0 ? coverImageField : null,
  };
}

export async function createArchiveEntry(submission: ArchiveSubmission) {
  const supabase = getSupabaseAdminClient();
  const id = randomUUID();
  const slug = `${slugify(submission.title)}-${id.slice(0, 8)}`;
  const uploadedCover = submission.coverImageFile ? await uploadCoverImage(id, submission.coverImageFile) : null;

  const payload = {
    id,
    slug,
    title: submission.title,
    archive_date: submission.archiveDate,
    category: submission.category,
    cover_image_url: uploadedCover,
    short_summary: submission.shortSummary,
    full_description: submission.fullDescription,
    status: submission.status,
  };

  const { data, error } = await supabase.from("archive_records").insert(payload as never).select("*").single();

  if (error) {
    if (uploadedCover) {
      await removeCoverImage(uploadedCover);
    }
    throw new Error(`Failed to create archive record: ${error.message}`);
  }

  const createdRecord = (data as ArchiveRecordRow | null) ?? (await getArchiveRecordById(id));

  if (!createdRecord) {
    throw new Error(`Failed to load created archive record after insert: ${id}`);
  }

  return createdRecord;
}

export async function updateArchiveEntry(id: string, submission: ArchiveSubmission) {
  const supabase = getSupabaseAdminClient();
  const existingRecord = await getArchiveRecordById(id);

  if (!existingRecord) {
    throw new Error("Archive record not found.");
  }

  const uploadedCover = submission.coverImageFile ? await uploadCoverImage(id, submission.coverImageFile) : null;
  const payload = {
    title: submission.title,
    archive_date: submission.archiveDate,
    category: submission.category,
    cover_image_url: uploadedCover ?? existingRecord.cover_image_url,
    short_summary: submission.shortSummary,
    full_description: submission.fullDescription,
    status: submission.status,
  };

  const { data, error } = await supabase.from("archive_records").update(payload as never).eq("id", id).select("*").single();

  if (error) {
    if (uploadedCover) {
      await removeCoverImage(uploadedCover);
    }

    throw new Error(`Failed to update archive record: ${error.message}`);
  }

  if (uploadedCover && existingRecord.cover_image_url) {
    await removeCoverImage(existingRecord.cover_image_url);
  }

  return data as ArchiveRecordRow;
}

export async function deleteArchiveEntry(id: string) {
  const supabase = getSupabaseAdminClient();
  const existingRecord = await getArchiveRecordById(id);

  if (!existingRecord) {
    return;
  }

  const { error } = await supabase.from("archive_records").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete archive record: ${error.message}`);
  }

  if (existingRecord.cover_image_url) {
    await removeCoverImage(existingRecord.cover_image_url);
  }
}
