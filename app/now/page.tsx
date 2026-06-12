import type { Metadata } from "next";
import { NowPage } from "@/components/now-page";
import { getOwnerSession } from "@/lib/auth/owner";

export const metadata: Metadata = {
  title: "now | hisarchives.xyz",
  description: "Current status page for hisarchives.xyz.",
};

export const dynamic = "force-dynamic";

export default async function NowRoute() {
  const { isOwner } = await getOwnerSession();
  return <NowPage isOwner={isOwner} />;
}
