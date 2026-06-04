import type { Metadata } from "next";
import { TimelinePage } from "@/components/timeline-page";

export const metadata: Metadata = {
  title: "timeline | hisarchives.xyz",
  description: "Chronological archive timeline for hisarchives.xyz.",
};

export default function TimelineRoute() {
  return <TimelinePage />;
}
