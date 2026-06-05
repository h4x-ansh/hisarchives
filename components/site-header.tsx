"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const archiveIndexItems = [
  { href: "/", label: "Home" },
  { href: "/archives", label: "Archives" },
  { href: "/now", label: "Now" },
  { href: "/identity", label: "Identity" },
  { href: "/timeline", label: "Timeline" },
  { href: "/activity", label: "Activity" },
  { href: "/gallery", label: "Gallery" },
  { href: "/library", label: "Library" },
  { href: "/records", label: "Records" },
  { href: "/birthdays", label: "Important Dates" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader({
  activePath,
  timestamp,
}: {
  activePath:
    | "/"
    | "/archives"
    | "/now"
    | "/identity"
    | "/timeline"
    | "/activity"
    | "/gallery"
    | "/library"
    | "/records"
    | "/birthdays"
    | "/contact"
    | "/dashboard";
  timestamp?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <header className="flex items-center justify-between gap-6 border-b border-white/5 py-4 text-[0.72rem] uppercase tracking-[0.38em] text-muted">
        <Link href="/" className="shrink-0 transition-colors hover:text-text">
          hisarchives.xyz
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          {timestamp ? <span className="hidden sm:inline">{timestamp}</span> : null}
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls="archive-index-panel"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex items-center gap-2 transition-colors hover:text-text focus:outline-none focus-visible:text-text"
          >
            ARCHIVE INDEX
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Archive index"
            id="archive-index-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <button
              type="button"
              aria-label="Close archive index"
              className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-5 w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2 rounded-[2rem] border border-white/10 bg-[#070707] shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
            >
              <div className="border-b border-white/5 px-5 py-4 sm:px-8">
                <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Archive Catalog</p>
              </div>
              <div className="max-h-[70vh] overflow-y-auto px-5 py-4 sm:px-8 sm:py-6">
                <div className="grid gap-2">
                  {archiveIndexItems.map((item, index) => {
                    const isActive = item.href === activePath;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={`group grid grid-cols-[4rem_1fr] items-center gap-4 rounded-2xl border border-white/5 px-4 py-4 transition-colors hover:border-white/12 hover:bg-white/[0.03] sm:grid-cols-[5rem_1fr] sm:px-5 ${
                          isActive ? "bg-white/[0.03]" : ""
                        }`}
                      >
                        <span className="text-sm uppercase tracking-[0.35em] text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-lg font-light tracking-wide text-text sm:text-xl">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
