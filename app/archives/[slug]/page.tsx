import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveDetailPage } from "@/components/archive-detail-page";

const validSlugs = ["discord-automation", "tournament-platform", "hisarchives"] as const;

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const slug = params.slug;

  if (!validSlugs.includes(slug as (typeof validSlugs)[number])) {
    return {};
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

export default function ArchiveDetailRoute({ params }: { params: { slug: string } }) {
  if (!validSlugs.includes(params.slug as (typeof validSlugs)[number])) {
    notFound();
  }

  return <ArchiveDetailPage slug={params.slug as (typeof validSlugs)[number]} />;
}
