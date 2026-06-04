import type { Metadata } from "next";
import { LibraryPage } from "@/components/library-page";

export const metadata: Metadata = {
  title: "library | hisarchives.xyz",
  description: "Reference shelf for hisarchives.xyz.",
};

export default function LibraryRoute() {
  return <LibraryPage />;
}
