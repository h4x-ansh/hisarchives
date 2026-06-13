import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin-sign-out-button";
import { isOwnerSession, getOwnerSession } from "@/lib/auth/owner";
import { hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { listTimelineEntries } from "@/lib/timeline/repository";

export const metadata: Metadata = {
  title: "timeline admin | hisarchives.xyz",
  robots: { index: false, follow: false },
};

export default async function TimelineAdminRoute() {
  const { session } = await getOwnerSession();
  if (!isOwnerSession(session)) redirect("/test");

  if (!hasSupabaseAdminEnv()) {
    return (
      <main className="min-h-screen bg-[#0a0b10] px-5 py-6 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl rounded-[1.8rem] border border-white/8 bg-white/[0.03] px-6 py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.45em] text-white/50">HisArchives Admin</p>
              <h1 className="mt-2 text-3xl font-light tracking-[0.18em]">Timeline</h1>
            </div>
            <AdminSignOutButton />
          </div>
          <p className="mt-6 text-sm leading-7 text-white/65">
            Configure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to use the timeline CMS.
          </p>
        </div>
      </main>
    );
  }

  const entries = await listTimelineEntries();

  return (
    <main className="min-h-screen bg-[#0a0b10] px-5 py-6 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-[1.8rem] border border-white/8 bg-white/[0.03] px-5 py-4 shadow-[0_22px_70px_rgba(0,0,0,0.28)]">
          <div className="space-y-1">
            <p className="text-[0.68rem] uppercase tracking-[0.45em] text-white/50">HisArchives Admin</p>
            <h1 className="text-3xl font-light tracking-[0.18em]">Timeline</h1>
            <p className="text-sm text-white/60">Create, edit, and delete timeline entries.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/test/dashboard"
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/80 transition hover:bg-white/[0.08]"
            >
              Dashboard
            </Link>
            <Link
              href="/test/timeline/new"
              className="rounded-full bg-white px-4 py-2 text-xs uppercase tracking-[0.32em] text-[#111] transition hover:bg-white/90"
            >
              New Entry
            </Link>
            <AdminSignOutButton />
          </div>
        </header>

        {entries.length ? (
          <section className="grid gap-4">
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-[1.7rem] border border-white/8 bg-white/[0.03] px-5 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.2)]"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.8rem] text-[0.52rem] font-medium uppercase tracking-wider text-white"
                    style={{ backgroundColor: entry.accent }}
                  >
                    {entry.word.slice(0, 4)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-light tracking-wide">{entry.title}</h2>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.34em] ${
                          entry.status === "Active" ? "bg-emerald-400/15 text-emerald-200" : "bg-amber-400/15 text-amber-200"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </div>
                    <p className="text-xs text-white/45">{entry.year} · {entry.category} · {entry.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/test/timeline/edit/${entry.id}`}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/80 transition hover:bg-white/[0.08]"
                  >
                    Edit
                  </Link>
                  <form action="/test/timeline/submit" method="post">
                    <input type="hidden" name="intent" value="delete" />
                    <input type="hidden" name="id" value={entry.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-red-100 transition hover:bg-red-400/20"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.03] px-6 py-10 text-center text-white/65">
            No timeline entries yet. Run the migration SQL first, then create entries here.
          </div>
        )}
      </div>
    </main>
  );
}
