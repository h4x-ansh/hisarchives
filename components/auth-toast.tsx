"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export function AuthToast() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (searchParams.get("auth") === "denied") {
      setVisible(true);
      const timeout = window.setTimeout(() => {
        setVisible(false);
        router.replace(pathname);
      }, 2800);

      return () => window.clearTimeout(timeout);
    }

    setVisible(false);
  }, [pathname, router, searchParams]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-white/10 bg-black/85 px-4 py-3 text-[0.72rem] tracking-wide text-text shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        >
          Sorry, you&apos;re not my owner hehe 🙂
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
