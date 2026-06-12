import type { Metadata } from "next";
import { ProjectsPage } from "@/components/now-page";
import { getOwnerSession } from "@/lib/auth/owner";

export const metadata: Metadata = {
  title: "Projects | now | hisarchives.xyz",
  description: "Project control center — milestones, progress, and current builds.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsRoute() {
  const { isOwner } = await getOwnerSession();
  return <ProjectsPage isOwner={isOwner} />;
}
