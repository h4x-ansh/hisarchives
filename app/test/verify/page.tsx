import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { TestVerifyClient } from "@/components/test-verify-client";
import { isOwnerSession } from "@/lib/auth/owner";

export const metadata: Metadata = {
  title: "verify | hisarchives.xyz",
  robots: { index: false, follow: false },
};

export default async function TestVerifyRoute() {
  const session = (await auth()) as { user?: { email?: string | null; isOwner?: boolean } } | null;

  if (!session?.user?.email) {
    redirect("/test");
  }

  if (isOwnerSession(session)) {
    redirect("/test/dashboard");
  }

  return <TestVerifyClient />;
}
