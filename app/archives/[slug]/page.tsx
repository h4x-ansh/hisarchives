import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveDetailPage } from "@/components/archive-detail-page";
import { hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { archiveRowToRecord, getArchiveRecordBySlug } from "@/lib/archive/repository";

const validSlugs = ["discord-automation", "tournament-platform", "hisarchives"] as const;

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;

  if (!validSlugs.includes(slug as (typeof validSlugs)[number])) {
    if (!hasSupabaseAdminEnv()) {
      return {};
    }

    try {
      const recordRow = await getArchiveRecordBySlug(slug);
      if (!recordRow || recordRow.status !== "Published") {
        return {};
      }
      return {
        title: `${recordRow.title} | hisarchives.xyz`,
        description: recordRow.short_summary,
      };
    } catch {
      return {};
    }
  }

  const titleMap: Record<(typeof validSlugs)[number], string> = {
    "discord-automation": "Discord Automation",
    "tournament-platform": "Tournament Platform",
    hisarchives: "HisArchives",
  };

  return {
    title: `${titleMap[slug as (typeof validSlugs)[number]]} | hisarchives.xyz`,
    description: `Archive detail page for ${titleMap[slug as (typeof validSlugs)[number]]}.`,
  };
}

export default async function ArchiveDetailRoute({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  if (hasSupabaseAdminEnv()) {
    try {
      const recordRow = await getArchiveRecordBySlug(slug);
      if (recordRow?.status === "Published") {
        return <ArchiveDetailPage record={archiveRowToRecord(recordRow)} />;
      }
    } catch {
      // DB unavailable or table missing at build time — fall through to seed data
    }
  }

  if (!validSlugs.includes(slug as (typeof validSlugs)[number])) {
    notFound();
  }

  return <ArchiveDetailPage slug={slug as (typeof validSlugs)[number]} />;
}
