import type { Metadata } from "next";
import { ArtPage } from "@/components/now-page";
import { getOwnerSession } from "@/lib/auth/owner";

export const metadata: Metadata = {
  title: "Art | now | hisarchives.xyz",
  description: "Art practice tracker — skills, completed pieces, and creative progression.",
};

export const dynamic = "force-dynamic";

export default async function ArtRoute() {
  const { isOwner } = await getOwnerSession();
  return <ArtPage isOwner={isOwner} />;
}
