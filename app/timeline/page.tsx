import type { Metadata } from "next";
import { TimelinePage } from "@/components/timeline-page";
import { loadTimelineEntries } from "@/lib/timeline/repository";

export const metadata: Metadata = {
  title: "timeline | hisarchives.xyz",
  description: "Chronological archive timeline for hisarchives.xyz.",
};

export default async function TimelineRoute() {
  const initialEntries = await loadTimelineEntries();
  return <TimelinePage initialEntries={initialEntries} />;
}
