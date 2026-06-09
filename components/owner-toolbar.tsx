"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, PencilLine, Plus, Trash2 } from "lucide-react";

const ownerActions = {
  "/": [{ label: "Edit", icon: PencilLine }],
  "/archives": [
    { label: "Create Archive", icon: Plus },
    { label: "Edit", icon: PencilLine },
  ],
  "/archives/[slug]": [{ label: "Edit", icon: PencilLine }],
  "/now": [{ label: "Edit", icon: PencilLine }],
  "/me": [{ label: "Edit", icon: PencilLine }],
  "/timeline": [
    { label: "Add Milestone", icon: Plus },
    { label: "Edit", icon: PencilLine },
  ],
  "/activity": [
    { label: "New Entry", icon: Plus },
    { label: "Edit", icon: PencilLine },
    { label: "Delete", icon: Trash2 },
  ],
  "/gallery": [
    { label: "Add Item", icon: Plus },
    { label: "Edit", icon: PencilLine },
  ],
} as const;

export function OwnerToolbar({ isOwner }: { isOwner: boolean }) {
  const pathname = usePathname();
  console.log("OwnerToolbar rerender");

  if (!isOwner || pathname.startsWith("/test")) {
    return null;
  }

  const key = pathname.startsWith("/archives/") ? "/archives/[slug]" : (pathname as keyof typeof ownerActions);
  const actions = ownerActions[key] ?? [];

  function emitAction(label: string) {
    console.log("OwnerToolbar action", {
      label,
      pathname,
      activeElement: document.activeElement?.tagName,
    });
    window.dispatchEvent(
      new CustomEvent("hisarchives:owner-action", {
        detail: {
          path: pathname,
          label,
        },
      }),
    );
  }

  if (!actions.length) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-5 right-5 z-[65] flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-2 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-text shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
      >
        <span className="hidden items-center gap-2 rounded-full bg-white/[0.04] px-3 py-2 text-[0.62rem] tracking-[0.32em] text-muted sm:flex">
          <Lock className="h-3.5 w-3.5" />
          Owner
        </span>
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              onMouseDown={(event) => {
                console.log("OwnerToolbar mousedown", {
                  label: action.label,
                  activeElement: document.activeElement?.tagName,
                });
                event.preventDefault();
              }}
              onClick={(event) => {
                emitAction(action.label);
                event.currentTarget.blur();
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.05] px-3 py-2 text-[0.62rem] uppercase tracking-[0.28em] text-text transition-colors hover:bg-white/[0.08]"
              title={action.label}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{action.label}</span>
            </button>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}
