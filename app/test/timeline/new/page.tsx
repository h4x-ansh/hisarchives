import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin-sign-out-button";
import { TimelineEditorForm } from "@/components/timeline-editor-form";
import { isOwnerSession, getOwnerSession } from "@/lib/auth/owner";

export const metadata: Metadata = {
  title: "new timeline entry | hisarchives.xyz",
  robots: { index: false, follow: false },
};

const emptyValues = {
  title: "", slug: "", date: new Date().toISOString().slice(0, 10),
  year: String(new Date().getFullYear()), summary: "", category: "",
  href: "", accent: "#8b92a5", word: "", status: "Active", displayOrder: "0",
};

export default async function TimelineNewRoute() {
  const { session } = await getOwnerSession();
  if (!isOwnerSession(session)) redirect("/test");

  return (
    <main className="min-h-screen bg-[#0a0b10] px-5 py-6 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-[1.8rem] border border-white/8 bg-white/[0.03] px-5 py-4 shadow-[0_22px_70px_rgba(0,0,0,0.28)]">
          <div className="space-y-1">
            <p className="text-[0.68rem] uppercase tracking-[0.45em] text-white/50">HisArchives Admin</p>
            <h1 className="text-3xl font-light tracking-[0.18em]">New Timeline Entry</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/test/timeline"
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/80 transition hover:bg-white/[0.08]"
            >
              Back
            </Link>
            <AdminSignOutButton />
          </div>
        </header>

        <section className="rounded-[1.8rem] border border-white/8 bg-white/[0.03] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.2)] sm:p-6">
          <TimelineEditorForm mode="create" actionPath="/test/timeline/submit" values={emptyValues} />
        </section>
      </div>
    </main>
  );
}
