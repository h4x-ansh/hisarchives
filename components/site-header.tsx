"use client";

import { useState } from "react";
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

  return (
    <div className="border-b border-white/5">
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
            role="region"
            aria-label="Archive index"
            id="archive-index-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 bg-[#070707]">
              <div className="px-5 py-4 sm:px-8">
                <p className="text-[0.72rem] uppercase tracking-[0.45em] text-muted">Archive Catalog</p>
              </div>
              <div className="px-5 pb-5 sm:px-8 sm:pb-6">
                <div className="grid gap-2 md:grid-cols-2">
                  {archiveIndexItems.map((item, index) => {
                    const isActive = item.href === activePath;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={`grid grid-cols-[4rem_1fr] items-center gap-4 rounded-2xl border border-white/5 px-4 py-4 transition-colors hover:border-white/12 hover:bg-white/[0.03] sm:grid-cols-[5rem_1fr] sm:px-5 ${
                          isActive ? "bg-white/[0.03] text-text" : ""
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
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
