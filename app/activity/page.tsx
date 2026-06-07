import type { Metadata } from "next";
import { ActivityPage } from "@/components/activity-page";

export const metadata: Metadata = {
  title: "journal | hisarchives.xyz",
  description: "A personal notebook inside hisarchives.xyz.",
};

export default function ActivityRoute() {
  return <ActivityPage />;
}
