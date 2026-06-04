import type { Metadata } from "next";
import { GalleryPage } from "@/components/gallery-page";

export const metadata: Metadata = {
  title: "gallery | hisarchives.xyz",
  description: "Visual records for hisarchives.xyz.",
};

export default function GalleryRoute() {
  return <GalleryPage />;
}
