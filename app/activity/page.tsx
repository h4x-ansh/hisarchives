import type { Metadata } from "next";
import { auth } from "@/auth";
import { ActivityPage } from "@/components/activity-page";
import { listJournalEntries, listSeedJournalEntries, seedJournalEntriesIfEmpty } from "@/lib/journal/repository";
import { hasSupabaseAdminEnv } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "journal | hisarchives.xyz",
  description: "A personal notebook inside hisarchives.xyz.",
};

export const dynamic = "force-dynamic";

export default async function ActivityRoute() {
  const session = (await auth()) as { user?: { isOwner?: boolean } } | null;
  const includeDrafts = Boolean(session?.user?.isOwner);

  if (!hasSupabaseAdminEnv()) {
    console.warn("ActivityRoute fallback: missing Supabase admin env, using seed journal entries.");
    return <ActivityPage initialEntries={listSeedJournalEntries({ includeDrafts })} isOwner={includeDrafts} />;
  }

  await seedJournalEntriesIfEmpty();
  const entries = await listJournalEntries({ includeDrafts });

  return <ActivityPage initialEntries={entries} isOwner={includeDrafts} />;
}
