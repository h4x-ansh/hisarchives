import type { Metadata } from "next";
import { JEEPage } from "@/components/now-page";
import { getOwnerSession } from "@/lib/auth/owner";

export const metadata: Metadata = {
  title: "JEE | now | hisarchives.xyz",
  description: "JEE 2027 study tracker — subjects, chapters, mock tests, and countdowns.",
};

export const dynamic = "force-dynamic";

export default async function JeeRoute() {
  const { isOwner } = await getOwnerSession();
  return <JEEPage isOwner={isOwner} />;
}
