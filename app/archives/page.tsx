import { ArchivePage } from "@/components/archive-page";
import { hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { listArchiveEntries, listSeedArchiveEntries, seedArchiveEntriesIfEmpty } from "@/lib/archive/repository";

export const dynamic = "force-dynamic";

export default async function ArchivesRoute() {
  if (!hasSupabaseAdminEnv()) {
    return <ArchivePage initialItems={listSeedArchiveEntries()} />;
  }

  await seedArchiveEntriesIfEmpty();
  const initialItems = await listArchiveEntries();

  return <ArchivePage initialItems={initialItems} />;
}
