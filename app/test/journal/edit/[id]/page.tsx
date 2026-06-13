import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin-sign-out-button";
import { JournalEditorForm } from "@/components/journal-editor-form";
import { isOwnerSession, getOwnerSession } from "@/lib/auth/owner";
import { hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { getJournalEntryRecordById } from "@/lib/journal/repository";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "edit journal entry | hisarchives.xyz",
  robots: { index: false, follow: false },
};

export default async function JournalEditRoute({ params }: PageProps) {
  const { id } = await params;
  console.info("[journal] params.id", id);

  if (!id || id === "undefined" || id === "null") {
    notFound();
  }

  const { session } = await getOwnerSession();

  if (!isOwnerSession(session)) {
    redirect("/test");
  }

  if (!hasSupabaseAdminEnv()) {
    return (
      <main className="min-h-screen bg-[#0a0b10] px-5 py-6 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl rounded-[1.8rem] border border-white/8 bg-white/[0.03] px-6 py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.45em] text-white/50">HisArchives Admin</p>
              <h1 className="mt-2 text-3xl font-light tracking-[0.18em]">Edit Entry</h1>
            </div>
            <AdminSignOutButton />
          </div>
          <p className="mt-6 text-sm leading-7 text-white/65">
            Set the Supabase admin environment variables before editing journal entries.
          </p>
        </div>
      </main>
    );
  }

  const entry = await getJournalEntryRecordById(id);

  if (!entry) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0b10] px-5 py-6 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-[1.8rem] border border-white/8 bg-white/[0.03] px-5 py-4 shadow-[0_22px_70px_rgba(0,0,0,0.28)]">
          <div className="space-y-1">
            <p className="text-[0.68rem] uppercase tracking-[0.45em] text-white/50">HisArchives Admin</p>
            <h1 className="text-3xl font-light tracking-[0.18em]">Edit Journal Entry</h1>
            <p className="text-sm text-white/60">{entry.title}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/test/journal"
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/80 transition hover:bg-white/[0.08]"
            >
              Back to Journal
            </Link>
            <AdminSignOutButton />
          </div>
        </header>

        <section className="rounded-[1.8rem] border border-white/8 bg-white/[0.03] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.2)] sm:p-6">
          <JournalEditorForm
            mode="update"
            entryId={entry.id}
            actionPath="/test/journal/submit"
            values={{
              title: entry.title,
              entryDate: entry.entry_date,
              mood: entry.mood,
              tags: entry.tags.join(", "),
              photoCaption: entry.photo_caption ?? "",
              content: entry.content,
              photoUrl: entry.photo_url,
            }}
          />

          <form action="/test/journal/submit" method="post" className="mt-6 flex justify-end">
            <input type="hidden" name="intent" value="delete" />
            <input type="hidden" name="id" value={entry.id} />
            <button
              type="submit"
              className="rounded-full border border-red-400/30 bg-red-400/10 px-5 py-3 text-xs uppercase tracking-[0.32em] text-red-100 transition hover:bg-red-400/20"
            >
              Delete Entry
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
