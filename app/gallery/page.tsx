import type { Metadata } from "next";
import { GalleryPage } from "@/components/gallery-page";

export const metadata: Metadata = {
  title: "curated | hisarchives.xyz",
  description: "Curated objects, stories, songs, and ideas for hisarchives.xyz.",
};

export default function GalleryRoute() {
  return <GalleryPage />;
}