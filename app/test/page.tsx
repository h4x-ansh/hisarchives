import type { Metadata } from "next";
import { auth } from "@/auth";
import { TestAuthCard } from "@/components/test-auth-card";

export const metadata: Metadata = {
  title: "test | hisarchives.xyz",
  robots: { index: false, follow: false },
};

export default async function TestRoute() {
  const session = (await auth()) as { user?: { email?: string | null; isOwner?: boolean } } | null;

  return <TestAuthCard email={session?.user?.email ?? null} isOwner={Boolean(session?.user?.isOwner)} />;
}
