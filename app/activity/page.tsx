import type { Metadata } from "next";
import { ActivityPage } from "@/components/activity-page";

export const metadata: Metadata = {
  title: "activity | hisarchives.xyz",
  description: "Activity record for hisarchives.xyz.",
};

export default function ActivityRoute() {
  return <ActivityPage />;
}
