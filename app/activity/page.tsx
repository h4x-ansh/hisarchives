import type { Metadata } from "next";
import { ActivityPage } from "@/components/activity-page";
import { listJournalEntries, listSeedJournalEntries, seedJournalEntriesIfEmpty } from "@/lib/journal/repository";
import { hasSupabaseAdminEnv } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "journal | hisarchives.xyz",
  description: "A personal notebook inside hisarchives.xyz.",
};

export const dynamic = "force-dynamic";

export default async function ActivityRoute() {
  if (!hasSupabaseAdminEnv()) {
    return <ActivityPage initialEntries={listSeedJournalEntries()} />;
  }

  await seedJournalEntriesIfEmpty();
  const entries = await listJournalEntries();

  return <ActivityPage initialEntries={entries} />;
}
