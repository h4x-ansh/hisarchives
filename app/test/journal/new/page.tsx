import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin-sign-out-button";
import { JournalEditorForm } from "@/components/journal-editor-form";
import { isOwnerSession, getOwnerSession } from "@/lib/auth/owner";
import { hasSupabaseAdminEnv } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "new journal entry | hisarchives.xyz",
  robots: { index: false, follow: false },
};

export default async function JournalNewRoute() {
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
              <h1 className="mt-2 text-3xl font-light tracking-[0.18em]">New Entry</h1>
            </div>
            <AdminSignOutButton />
          </div>
          <p className="mt-6 text-sm leading-7 text-white/65">
            Set the Supabase admin environment variables before creating journal entries.
          </p>
        </div>
      </main>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <main className="min-h-screen bg-[#0a0b10] px-5 py-6 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-[1.8rem] border border-white/8 bg-white/[0.03] px-5 py-4 shadow-[0_22px_70px_rgba(0,0,0,0.28)]">
          <div className="space-y-1">
            <p className="text-[0.68rem] uppercase tracking-[0.45em] text-white/50">HisArchives Admin</p>
            <h1 className="text-3xl font-light tracking-[0.18em]">New Journal Entry</h1>
            <p className="text-sm text-white/60">Standard page form. No modal, no overlay.</p>
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
            mode="create"
            actionPath="/test/journal/submit"
            values={{
              title: "",
              entryDate: today,
              mood: "Reflective",
              tags: "",
              photoCaption: "",
              content: "",
            }}
          />
        </section>
      </div>
    </main>
  );
}
