import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin-sign-out-button";
import { isOwnerSession, getOwnerSession } from "@/lib/auth/owner";

export const metadata: Metadata = {
  title: "dashboard | hisarchives.xyz",
  robots: { index: false, follow: false },
};

const cmsModules = [
  { label: "Journal", href: "/test/journal" },
  { label: "Archives", href: "/test/archives" },
  { label: "Curated", href: "/test/curated" },
  { label: "Timeline", href: "/test/timeline" },
] as const;

export default async function DashboardRoute() {
  const { session } = await getOwnerSession();

  if (!isOwnerSession(session)) {
    redirect("/test");
  }

  const email = session?.user?.email ?? "Owner";

  return (
    <main className="min-h-screen bg-[#090a0f] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">

        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.45em] text-white/35">hisarchives.xyz</p>
            <h1 className="mt-1 text-3xl font-light tracking-[0.14em] text-white">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/60">
              {email}
            </span>
            <AdminSignOutButton />
          </div>
        </header>

        <section>
          <p className="mb-4 text-[0.62rem] uppercase tracking-[0.42em] text-white/35">Manage</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {cmsModules.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col justify-between rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-5 transition hover:bg-white/[0.06] hover:border-white/14"
              >
                <span className="text-base font-light tracking-wide text-white">{label}</span>
                <span className="mt-6 text-[0.6rem] uppercase tracking-[0.38em] text-white/35">Open →</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
