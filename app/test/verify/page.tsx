import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, OWNER_EMAIL } from "@/auth";
import { TestVerifyClient } from "@/components/test-verify-client";

export const metadata: Metadata = {
  title: "verify | hisarchives.xyz",
  robots: { index: false, follow: false },
};

export default async function TestVerifyRoute() {
  const session = (await auth()) as { user?: { email?: string | null; isOwner?: boolean } } | null;

  if (!session?.user?.email) {
    redirect("/test");
  }

  if (OWNER_EMAIL && session.user.email.toLowerCase() === OWNER_EMAIL) {
    redirect("/");
  }

  return <TestVerifyClient />;
}
