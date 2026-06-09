import type { Metadata } from "next";
import { auth } from "@/auth";
import { ActivityPage } from "@/components/activity-page";
import { listJournalEntries, seedJournalEntriesIfEmpty } from "@/lib/journal/repository";

export const metadata: Metadata = {
  title: "journal | hisarchives.xyz",
  description: "A personal notebook inside hisarchives.xyz.",
};

export default async function ActivityRoute() {
  await seedJournalEntriesIfEmpty();
  const session = (await auth()) as { user?: { isOwner?: boolean } } | null;
  const entries = await listJournalEntries({ includeDrafts: Boolean(session?.user?.isOwner) });

  return <ActivityPage initialEntries={entries} isOwner={Boolean(session?.user?.isOwner)} />;
}
