"use client";

import { signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";

export function TestAuthCard({ email, isOwner }: { email: string | null; isOwner: boolean }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5 text-text">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm space-y-5 rounded-[2rem] border border-white/8 bg-surface/80 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.32)] backdrop-blur-sm"
      >
        <div className="space-y-2">
          <p className="text-[0.68rem] uppercase tracking-[0.45em] text-muted">Hidden owner access</p>
          <h1 className="text-3xl font-light tracking-[0.12em]">TEST</h1>
        </div>

        {email ? (
          <div className="space-y-4">
            <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.04] px-4 py-4">
              <p className="text-[0.68rem] uppercase tracking-[0.35em] text-muted">Signed in as</p>
              <p className="mt-2 break-all text-sm text-text/90">{email}</p>
              <p className="mt-2 text-[0.7rem] uppercase tracking-[0.3em] text-muted">
                {isOwner ? "Owner session active" : "Not owner"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/test" })}
              className="w-full rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-text transition-colors hover:bg-white/[0.08]"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/test/verify" })}
            className="w-full rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-text transition-colors hover:bg-white/[0.08]"
          >
            Continue with Google
          </button>
        )}
      </motion.div>
    </main>
  );
}
