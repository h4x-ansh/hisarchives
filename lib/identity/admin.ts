import { randomUUID } from "crypto";
import { getSupabaseAdminClient, identityBucketName } from "@/lib/supabase/admin";
import { getIdentityRecord, IDENTITY_RECORD_ID } from "./repository";
import type { IdentityRecordRow } from "./types";

export type IdentitySubmission = {
  name: string;
  shortTagline: string;
  fullBio: string;
  location: string;
  email: string;
  github: string;
  discord: string;
  instagram: string;
  linkedin: string;
  website: string;
  profilePhotoFile: File | null;
};

function readTextField(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

function getStoragePathFromPublicUrl(publicUrl: string) {
  try {
    const parsedUrl = new URL(publicUrl);
    const storagePrefix = `/storage/v1/object/public/${identityBucketName}/`;
    const pathIndex = parsedUrl.pathname.indexOf(storagePrefix);

    if (pathIndex === -1) {
      return null;
    }

    return parsedUrl.pathname.slice(pathIndex + storagePrefix.length);
  } catch {
    return null;
  }
}

async function uploadProfilePhoto(file: File) {
  const supabase = getSupabaseAdminClient();
  const safeFileName = normalizeFileName(file.name || "profile-photo");
  const extension = safeFileName.includes(".") ? `.${safeFileName.split(".").pop()}` : "";
  const storagePath = `${IDENTITY_RECORD_ID}/${randomUUID()}${extension}`;
  const { error } = await supabase.storage.from(identityBucketName).upload(storagePath, Buffer.from(await file.arrayBuffer()), {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (error) {
    throw new Error(`Failed to upload profile photo: ${error.message}`);
  }

  const { data } = supabase.storage.from(identityBucketName).getPublicUrl(storagePath);
  return data.publicUrl;
}

async function removeProfilePhoto(publicUrl: string) {
  const storagePath = getStoragePathFromPublicUrl(publicUrl);

  if (!storagePath) {
    return;
  }

  const supabase = getSupabaseAdminClient();
  await supabase.storage.from(identityBucketName).remove([storagePath]);
}

export function parseIdentitySubmission(formData: FormData): IdentitySubmission {
  const profilePhotoField = formData.get("profilePhoto");

  return {
    name: readTextField(formData.get("name")),
    shortTagline: readTextField(formData.get("shortTagline")),
    fullBio: readTextField(formData.get("fullBio")),
    location: readTextField(formData.get("location")),
    email: readTextField(formData.get("email")),
    github: readTextField(formData.get("github")),
    discord: readTextField(formData.get("discord")),
    instagram: readTextField(formData.get("instagram")),
    linkedin: readTextField(formData.get("linkedin")),
    website: readTextField(formData.get("website")),
    profilePhotoFile: profilePhotoField instanceof File && profilePhotoField.size > 0 ? profilePhotoField : null,
  };
}

export async function upsertIdentityRecord(submission: IdentitySubmission) {
  const supabase = getSupabaseAdminClient();
  const existingRecord = await getIdentityRecord();
  const uploadedPhoto = submission.profilePhotoFile ? await uploadProfilePhoto(submission.profilePhotoFile) : null;

  const payload = {
    id: IDENTITY_RECORD_ID,
    name: submission.name,
    short_tagline: submission.shortTagline,
    full_bio: submission.fullBio,
    profile_photo_url: uploadedPhoto ?? existingRecord?.profile_photo_url ?? null,
    location: submission.location || null,
    email: submission.email || null,
    github: submission.github || null,
    discord: submission.discord || null,
    instagram: submission.instagram || null,
    linkedin: submission.linkedin || null,
    website: submission.website || null,
  };

  const { data, error } = await supabase.from("identity_record").upsert(payload as never).select("*").single();

  if (error) {
    if (uploadedPhoto) {
      await removeProfilePhoto(uploadedPhoto);
    }
    throw new Error(`Failed to save identity record: ${error.message}`);
  }

  if (uploadedPhoto && existingRecord?.profile_photo_url) {
    await removeProfilePhoto(existingRecord.profile_photo_url);
  }

  return data as IdentityRecordRow;
}
