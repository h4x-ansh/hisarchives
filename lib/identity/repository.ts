import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import type { IdentityFormValues, IdentityRecord, IdentityRecordRow } from "./types";

export const IDENTITY_RECORD_ID = "primary";

export function identityRowToRecord(row: IdentityRecordRow): IdentityRecord {
  return {
    id: row.id,
    name: row.name,
    shortTagline: row.short_tagline,
    fullBio: row.full_bio,
    profilePhotoUrl: row.profile_photo_url,
    location: row.location,
    email: row.email,
    github: row.github,
    discord: row.discord,
    instagram: row.instagram,
    linkedin: row.linkedin,
    website: row.website,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getIdentityRecord() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from("identity_record").select("*").eq("id", IDENTITY_RECORD_ID).maybeSingle();

  if (error) {
    throw new Error(`Failed to load identity record: ${error.message}`);
  }

  return (data as IdentityRecordRow | null) ?? null;
}

export function identityRecordToFormValues(record?: IdentityRecordRow | null): IdentityFormValues {
  return {
    name: record?.name ?? "",
    shortTagline: record?.short_tagline ?? "",
    fullBio: record?.full_bio ?? "",
    location: record?.location ?? "",
    email: record?.email ?? "",
    github: record?.github ?? "",
    discord: record?.discord ?? "",
    instagram: record?.instagram ?? "",
    linkedin: record?.linkedin ?? "",
    website: record?.website ?? "",
    profilePhotoUrl: record?.profile_photo_url ?? "",
  };
}
