import { randomUUID } from "crypto";
import { getSupabaseAdminClient, journalBucketName } from "@/lib/supabase/admin";
import { getJournalEntryRecordById } from "./repository";
import type { JournalEntryRecord } from "./types";

export type JournalSubmission = {
  title: string;
  content: string;
  photoCaption: string;
  tags: string[];
  mood: string;
  entryDate: string;
  published: boolean;
  photoFile: File | null;
};

function readTextField(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function parseTagsField(value: FormDataEntryValue | null) {
  const text = readTextField(value);

  if (!text) {
    return [];
  }

  return Array.from(
    new Set(
      text
        .split(/[\n,]/)
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  );
}

function normalizeDate(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  return new Date().toISOString().slice(0, 10);
}

function normalizeFileName(name: string) {
  return name
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function getStoragePathFromPublicUrl(publicUrl: string) {
  try {
    const parsedUrl = new URL(publicUrl);
    const storagePrefix = `/storage/v1/object/public/${journalBucketName}/`;
    const pathIndex = parsedUrl.pathname.indexOf(storagePrefix);

    if (pathIndex === -1) {
      return null;
    }

    return parsedUrl.pathname.slice(pathIndex + storagePrefix.length);
  } catch {
    return null;
  }
}

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg","image/png","image/webp","image/gif","image/avif"]);
const MAX_FILE_SIZE = 10 * 1024 * 1024;

async function uploadPhoto(entryId: string, file: File) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) throw new Error(`Unsupported file type: ${file.type}`);
  if (file.size > MAX_FILE_SIZE) throw new Error("File too large (max 10 MB).");
  const supabase = getSupabaseAdminClient();
  const safeFileName = normalizeFileName(file.name || "journal-photo");
  const extension = safeFileName.includes(".") ? `.${safeFileName.split(".").pop()}` : "";
  const storagePath = `${entryId}/${randomUUID()}${extension}`;
  const { error } = await supabase.storage.from(journalBucketName).upload(storagePath, Buffer.from(await file.arrayBuffer()), {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (error) {
    throw new Error(`Failed to upload journal photo: ${error.message}`);
  }

  const { data } = supabase.storage.from(journalBucketName).getPublicUrl(storagePath);
  return {
    photoUrl: data.publicUrl,
    storagePath,
  };
}

async function removePhoto(publicUrl: string) {
  const storagePath = getStoragePathFromPublicUrl(publicUrl);

  if (!storagePath) {
    return;
  }

  const supabase = getSupabaseAdminClient();
  await supabase.storage.from(journalBucketName).remove([storagePath]);
}

export function parseJournalSubmission(formData: FormData): JournalSubmission {
  const photoField = formData.get("photo");

  return {
    title: readTextField(formData.get("title")),
    content: readTextField(formData.get("content")),
    photoCaption: readTextField(formData.get("photoCaption")),
    tags: parseTagsField(formData.get("tags")),
    mood: readTextField(formData.get("mood")) || "Reflective",
    entryDate: normalizeDate(readTextField(formData.get("entryDate"))),
    published: readTextField(formData.get("published")) === "true",
    photoFile: photoField instanceof File && photoField.size > 0 ? photoField : null,
  };
}

export async function createJournalEntry(submission: JournalSubmission) {
  const supabase = getSupabaseAdminClient();
  const id = randomUUID();
  const uploadedPhoto = submission.photoFile ? await uploadPhoto(id, submission.photoFile) : null;

  const payload = {
    id,
    title: submission.title,
    content: submission.content,
    photo_url: uploadedPhoto?.photoUrl ?? null,
    photo_caption: submission.photoCaption || null,
    tags: submission.tags,
    mood: submission.mood,
    entry_date: submission.entryDate,
    published: submission.published,
  };

  const { data, error } = await supabase.from("journal_entries").insert(payload as never).select("*").single();

  if (error) {
    if (uploadedPhoto) {
      await removePhoto(uploadedPhoto.photoUrl);
    }
    throw new Error(`Failed to create journal entry: ${error.message}`);
  }

  const createdEntry = (data as JournalEntryRecord | null) ?? (await getJournalEntryRecordById(id));

  if (!createdEntry) {
    throw new Error(`Failed to load created journal entry after insert: ${id}`);
  }

  return createdEntry;
}

export async function updateJournalEntry(id: string, submission: JournalSubmission) {
  const supabase = getSupabaseAdminClient();
  const existingEntry = await getJournalEntryRecordById(id);

  if (!existingEntry) {
    throw new Error("Journal entry not found.");
  }

  const uploadedPhoto = submission.photoFile ? await uploadPhoto(id, submission.photoFile) : null;
  const payload = {
    title: submission.title,
    content: submission.content,
    photo_url: uploadedPhoto?.photoUrl ?? existingEntry.photo_url,
    photo_caption: submission.photoCaption || null,
    tags: submission.tags,
    mood: submission.mood,
    entry_date: submission.entryDate,
    published: submission.published,
  };

  const { data, error } = await supabase.from("journal_entries").update(payload as never).eq("id", id).select("*").single();

  if (error) {
    if (uploadedPhoto) {
      await removePhoto(uploadedPhoto.photoUrl);
    }

    throw new Error(`Failed to update journal entry: ${error.message}`);
  }

  if (uploadedPhoto && existingEntry.photo_url) {
    await removePhoto(existingEntry.photo_url);
  }

  return data as JournalEntryRecord;
}

export async function deleteJournalEntry(id: string) {
  const supabase = getSupabaseAdminClient();
  const existingEntry = await getJournalEntryRecordById(id);

  if (!existingEntry) {
    return;
  }

  const { error } = await supabase.from("journal_entries").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete journal entry: ${error.message}`);
  }

  if (existingEntry.photo_url) {
    await removePhoto(existingEntry.photo_url);
  }
}
