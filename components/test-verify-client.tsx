"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function TestVerifyClient() {
  const router = useRouter();

  useEffect(() => {
    void signOut({ redirect: false }).then(() => {
      router.replace("/?auth=denied");
    });
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5 text-text">
      <div className="rounded-[1.5rem] border border-white/8 bg-surface/80 px-5 py-4 text-sm text-muted">
        Verifying access...
      </div>
    </main>
  );
}
