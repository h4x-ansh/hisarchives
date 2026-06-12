import type { Metadata } from "next";
import { HealthPage } from "@/components/now-page";
import { getOwnerSession } from "@/lib/auth/owner";

export const metadata: Metadata = {
  title: "Health | now | hisarchives.xyz",
  description: "Gym and health tracker — workout streaks, muscle group progress, and personal records.",
};

export const dynamic = "force-dynamic";

export default async function HealthRoute() {
  const { isOwner } = await getOwnerSession();
  return <HealthPage isOwner={isOwner} />;
}
