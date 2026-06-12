import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { TestAuthCard } from "@/components/test-auth-card";
import { isOwnerSession } from "@/lib/auth/owner";

export const metadata: Metadata = {
  title: "test | hisarchives.xyz",
  robots: { index: false, follow: false },
};

export default async function TestRoute() {
  const session = (await auth()) as { user?: { email?: string | null; isOwner?: boolean } } | null;

  if (isOwnerSession(session)) {
    redirect("/test/dashboard");
  }

  return <TestAuthCard email={session?.user?.email ?? null} isOwner={Boolean(session?.user?.isOwner)} />;
}
