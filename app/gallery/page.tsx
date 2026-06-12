import type { Metadata } from "next";
import { GalleryPage } from "@/components/gallery-page";
import { listCuratedGalleryItems } from "@/lib/curated/repository";
import { hasSupabaseAdminEnv } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "curated | hisarchives.xyz",
  description: "Curated objects, stories, songs, and ideas for hisarchives.xyz.",
};

export default async function GalleryRoute() {
  if (!hasSupabaseAdminEnv()) {
    return <GalleryPage />;
  }

  let initialItems: Awaited<ReturnType<typeof listCuratedGalleryItems>> = [];

  try {
    initialItems = await listCuratedGalleryItems();
  } catch {
    initialItems = [];
  }

  return <GalleryPage initialItems={initialItems} />;
}
