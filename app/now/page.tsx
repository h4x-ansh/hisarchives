import type { Metadata } from "next";
import { NowPage } from "@/components/now-page";

export const metadata: Metadata = {
  title: "now | hisarchives.xyz",
  description: "Current status page for hisarchives.xyz.",
};

export default function NowRoute() {
  return <NowPage />;
}
