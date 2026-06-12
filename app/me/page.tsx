import type { Metadata } from "next";
import { IdentityPage } from "@/components/identity-page";
import { hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { getIdentityRecord, identityRowToRecord } from "@/lib/identity/repository";

export const metadata: Metadata = {
  title: "me | hisarchives.xyz",
  description: "Identity record for hisarchives.xyz.",
};

export default async function MeRoute() {
  if (!hasSupabaseAdminEnv()) {
    return <IdentityPage />;
  }

  try {
    const record = await getIdentityRecord();
    return <IdentityPage record={record ? identityRowToRecord(record) : null} />;
  } catch {
    return <IdentityPage />;
  }
}
