import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin-sign-out-button";
import { isOwnerSession, getOwnerSession } from "@/lib/auth/owner";
import { formatRelativeDateTime } from "@/lib/date";
import { hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { listJournalEntries, listSeedJournalEntries } from "@/lib/journal/repository";

export const metadata: Metadata = {
  title: "dashboard | hisarchives.xyz",
  robots: { index: false, follow: false },
};

type JournalStats = {
  totalEntries: number;
  draftCount: number;
  publishedCount: number;
  recentEntries: ReturnType<typeof listSeedJournalEntries>;
  lastEditedAt: string | null;
};

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not available";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return formatRelativeDateTime(parsedDate);
}

function formatEnvironment() {
  return process.env.NODE_ENV === "production" ? "Production" : "Development";
}

function StatTile({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string;
  sublabel?: string;
}) {
  return (
    <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-4 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
      <p className="text-[0.62rem] uppercase tracking-[0.42em] text-white/45">{label}</p>
      <p className="mt-3 text-3xl font-light tracking-[0.12em] text-white">{value}</p>
      {sublabel ? <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/45">{sublabel}</p> : null}
    </div>
  );
}

function LockedPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-5 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)] opacity-80">
      <p className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Coming Soon</p>
      <h3 className="mt-3 text-2xl font-light tracking-wide text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/60">{description}</p>
      <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/45">
        Disabled
      </div>
    </article>
  );
}

export default async function DashboardRoute() {
  const { session } = await getOwnerSession();

  if (!isOwnerSession(session)) {
    redirect("/test");
  }

  const email = session?.user?.email ?? "Owner";
  const environment = formatEnvironment();
  const journalEntries = hasSupabaseAdminEnv()
    ? await listJournalEntries({ includeDrafts: true })
    : listSeedJournalEntries({ includeDrafts: true });

  const totalEntries = journalEntries.length;
  const publishedCount = journalEntries.filter((entry) => entry.published).length;
  const draftCount = totalEntries - publishedCount;
  const lastEditedAt = journalEntries
    .map((entry) => entry.updatedAt || entry.createdAt)
    .sort((left, right) => Date.parse(right) - Date.parse(left))[0] ?? null;
  const recentEntries = journalEntries.slice(0, 3);

  const stats: JournalStats = {
    totalEntries,
    draftCount,
    publishedCount,
    recentEntries,
    lastEditedAt,
  };

  return (
    <main className="min-h-screen bg-[#090a0f] px-5 py-6 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(20,17,29,0.92),rgba(10,10,15,0.96))] px-5 py-5 shadow-[0_24px_90px_rgba(0,0,0,0.32)]">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_26%)]" />
          <div className="relative flex flex-wrap items-start justify-between gap-5">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[0.68rem] uppercase tracking-[0.45em] text-white/45">Hidden control room</p>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.62rem] uppercase tracking-[0.32em] text-white/55">
                  {environment}
                </span>
              </div>
              <h1 className="text-4xl font-light tracking-[0.16em] text-white sm:text-5xl">Owner Dashboard</h1>
              <p className="max-w-2xl text-sm leading-7 text-white/62">
                Central control panel for the single-owner Journal CMS. Public pages stay read-only.
              </p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.04] px-4 py-3 text-right shadow-[0_14px_44px_rgba(0,0,0,0.2)]">
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-white/45">Signed in as</p>
                <p className="mt-2 max-w-[18rem] break-all text-sm text-white/90">{email}</p>
              </div>
              <AdminSignOutButton />
            </div>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
          <div className="space-y-4">
            <article className="rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Journal</p>
                  <h2 className="text-3xl font-light tracking-wide text-white">Active</h2>
                  <p className="max-w-2xl text-sm leading-7 text-white/60">
                    The only editable content type for now. Stats are pulled from the current journal table.
                  </p>
                </div>
                <Link
                  href="/test/journal"
                  className="inline-flex rounded-full bg-white px-5 py-3 text-xs uppercase tracking-[0.32em] text-[#111] transition hover:bg-white/90"
                >
                  Manage Journal
                </Link>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <StatTile label="Total Entries" value={String(stats.totalEntries).padStart(2, "0")} />
                <StatTile label="Draft Count" value={String(stats.draftCount).padStart(2, "0")} />
                <StatTile label="Published Count" value={String(stats.publishedCount).padStart(2, "0")} />
              </div>

              <div className="mt-5 rounded-[1.4rem] border border-white/8 bg-black/18 px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Last Edited</p>
                  <p className="text-sm text-white/75">{formatDateTime(stats.lastEditedAt)}</p>
                </div>
              </div>
            </article>

            <article className="rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.02))] px-5 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Recent Journal Entries</p>
                  <h2 className="mt-2 text-2xl font-light tracking-wide text-white">Latest activity</h2>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.62rem] uppercase tracking-[0.32em] text-white/55">
                  {recentEntries.length} shown
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {recentEntries.length ? (
                  recentEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-[1.35rem] border border-white/8 bg-white/[0.03] px-4 py-4"
                    >
                      <div className="space-y-1">
                        <p className="text-base font-light tracking-wide text-white">{entry.title}</p>
                        <p className="text-xs uppercase tracking-[0.32em] text-white/45">
                          {entry.date} - {entry.mood} - {entry.published ? "Published" : "Draft"}
                        </p>
                      </div>
                      <Link
                        href={`/test/journal/edit/${entry.id}`}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/75 transition hover:bg-white/[0.08]"
                      >
                        Edit
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="rounded-[1.35rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/55">
                    No journal entries yet.
                  </p>
                )}
              </div>
            </article>
          </div>

          <aside className="space-y-4">
            <article className="rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
              <p className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Environment</p>
              <h2 className="mt-3 text-2xl font-light tracking-wide text-white">{environment}</h2>
              <p className="mt-3 text-sm leading-7 text-white/60">
                The dashboard reflects the current runtime so you always know whether you are working in development or
                production.
              </p>
            </article>

            <article className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-5 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
              <p className="text-[0.66rem] uppercase tracking-[0.42em] text-emerald-200/70">Active</p>
              <h3 className="mt-3 text-2xl font-light tracking-wide text-white">Archives</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">
                The second content system is now live in the owner area.
              </p>
              <Link
                href="/test/archives"
                className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#111] transition hover:bg-white/90"
              >
                Manage Archives
              </Link>
            </article>
            <LockedPanel
              title="Timeline"
              description="Timeline stays archive-backed and does not get its own editor."
            />
            <article className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-5 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
              <p className="text-[0.66rem] uppercase tracking-[0.42em] text-emerald-200/70">Active</p>
              <h3 className="mt-3 text-2xl font-light tracking-wide text-white">Curated</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">
                The Curated library is now managed from the owner dashboard.
              </p>
              <Link
                href="/test/curated"
                className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#111] transition hover:bg-white/90"
              >
                Manage Curated
              </Link>
            </article>
            <article className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-5 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
              <p className="text-[0.66rem] uppercase tracking-[0.42em] text-emerald-200/70">Active</p>
              <h3 className="mt-3 text-2xl font-light tracking-wide text-white">Identity</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">
                The public identity record is now editable from the owner dashboard.
              </p>
              <Link
                href="/test/identity"
                className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#111] transition hover:bg-white/90"
              >
                Manage Identity
              </Link>
            </article>
            <LockedPanel
              title="Now"
              description="Placeholder for the next CMS phase. No editor is exposed yet."
            />
          </aside>
        </section>
      </div>
    </main>
  );
}
