import { randomUUID } from "crypto";
import { getCuratedRecordById } from "./repository";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { curatedBucketName } from "@/lib/supabase/admin";
import type { CuratedRecordRow } from "./types";

export type CuratedSubmission = {
  title: string;
  category: string;
  accent: string;
  imagePosition: string;
  shortDescription: string;
  fullDescription: string;
  externalLink: string;
  displayOrder: number;
  status: "Draft" | "Published";
  imageFile: File | null;
};

function readTextField(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeDisplayOrder(value: string) {
  const parsedValue = Number.parseInt(value, 10);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function normalizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

function getStoragePathFromPublicUrl(publicUrl: string) {
  try {
    const parsedUrl = new URL(publicUrl);
    const storagePrefix = `/storage/v1/object/public/${curatedBucketName}/`;
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

async function uploadImage(entryId: string, file: File) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) throw new Error(`Unsupported file type: ${file.type}`);
  if (file.size > MAX_FILE_SIZE) throw new Error("File too large (max 10 MB).");
  const supabase = getSupabaseAdminClient();
  const safeFileName = normalizeFileName(file.name || "curated-image");
  const extension = safeFileName.includes(".") ? `.${safeFileName.split(".").pop()}` : "";
  const storagePath = `${entryId}/${randomUUID()}${extension}`;
  const { error } = await supabase.storage.from(curatedBucketName).upload(storagePath, Buffer.from(await file.arrayBuffer()), {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (error) {
    throw new Error(`Failed to upload curated image: ${error.message}`);
  }

  const { data } = supabase.storage.from(curatedBucketName).getPublicUrl(storagePath);
  return data.publicUrl;
}

async function removeImage(publicUrl: string) {
  const storagePath = getStoragePathFromPublicUrl(publicUrl);

  if (!storagePath) {
    return;
  }

  const supabase = getSupabaseAdminClient();
  await supabase.storage.from(curatedBucketName).remove([storagePath]);
}

export function parseCuratedSubmission(formData: FormData): CuratedSubmission {
  const imageField = formData.get("image");

  return {
    title: readTextField(formData.get("title")),
    category: readTextField(formData.get("category")),
    accent: readTextField(formData.get("accent")) || "#8b92a5",
    imagePosition: readTextField(formData.get("imagePosition")) || "center",
    shortDescription: readTextField(formData.get("shortDescription")),
    fullDescription: readTextField(formData.get("fullDescription")),
    externalLink: readTextField(formData.get("externalLink")),
    displayOrder: normalizeDisplayOrder(readTextField(formData.get("displayOrder"))),
    status: readTextField(formData.get("status")) === "Published" ? "Published" : "Draft",
    imageFile: imageField instanceof File && imageField.size > 0 ? imageField : null,
  };
}

export async function createCuratedEntry(submission: CuratedSubmission) {
  const supabase = getSupabaseAdminClient();
  const id = randomUUID();
  const uploadedImage = submission.imageFile ? await uploadImage(id, submission.imageFile) : null;

  const payload = {
    id,
    title: submission.title,
    category: submission.category,
    image_url: uploadedImage,
    image_position: submission.imagePosition,
    accent: submission.accent,
    short_description: submission.shortDescription,
    full_description: submission.fullDescription || null,
    external_link: submission.externalLink || null,
    display_order: submission.displayOrder,
    status: submission.status,
  };

  const { data, error } = await supabase.from("curated_items").insert(payload as never).select("*").single();

  if (error) {
    if (uploadedImage) {
      await removeImage(uploadedImage);
    }
    throw new Error(`Failed to create curated item: ${error.message}`);
  }

  const createdRecord = (data as CuratedRecordRow | null) ?? (await getCuratedRecordById(id));

  if (!createdRecord) {
    throw new Error(`Failed to load created curated item after insert: ${id}`);
  }

  return createdRecord;
}

export async function updateCuratedEntry(id: string, submission: CuratedSubmission) {
  const supabase = getSupabaseAdminClient();
  const existingRecord = await getCuratedRecordById(id);

  if (!existingRecord) {
    throw new Error("Curated item not found.");
  }

  const uploadedImage = submission.imageFile ? await uploadImage(id, submission.imageFile) : null;
  const payload = {
    title: submission.title,
    category: submission.category,
    image_url: uploadedImage ?? existingRecord.image_url,
    image_position: submission.imagePosition,
    accent: submission.accent,
    short_description: submission.shortDescription,
    full_description: submission.fullDescription || null,
    external_link: submission.externalLink || null,
    display_order: submission.displayOrder,
    status: submission.status,
  };

  const { data, error } = await supabase.from("curated_items").update(payload as never).eq("id", id).select("*").single();

  if (error) {
    if (uploadedImage) {
      await removeImage(uploadedImage);
    }

    throw new Error(`Failed to update curated item: ${error.message}`);
  }

  if (uploadedImage && existingRecord.image_url) {
    await removeImage(existingRecord.image_url);
  }

  return data as CuratedRecordRow;
}

export async function deleteCuratedEntry(id: string) {
  const supabase = getSupabaseAdminClient();
  const existingRecord = await getCuratedRecordById(id);

  if (!existingRecord) {
    return;
  }

  const { error } = await supabase.from("curated_items").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete curated item: ${error.message}`);
  }

  if (existingRecord.image_url) {
    await removeImage(existingRecord.image_url);
  }
}
