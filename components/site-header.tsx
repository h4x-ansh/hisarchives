"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { formatRelativeDateTime } from "@/lib/date";
import {
  Activity,
  Calendar,
  FolderArchive,
  House,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";

const publicNavItems = [
  { href: "/", label: "Home", description: "Landing archive", icon: House },
  { href: "/archives", label: "Archives", description: "Stored projects and records", icon: FolderArchive },
  { href: "/now", label: "Now", description: "Current status and focus", icon: Activity },
  { href: "/me", label: "Identity", description: "Personal metadata", icon: User },
  { href: "/timeline", label: "Timeline", description: "Chronological record of events", icon: Calendar },
  { href: "/activity", label: "Journal", description: "Daily logs and movement", icon: Activity },
  { href: "/gallery", label: "Curated", description: "Visual archive", icon: Images },
] as const;

const adminNavItems = [
  { href: "/test/dashboard", label: "Dashboard", description: "Owner control panel", icon: LayoutDashboard },
] as const;

function NavItem({
  href,
  label,
  description,
  icon: Icon,
  isActive,
  onClick,
  variant = "mobile",
}: {
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  onClick?: () => void;
  variant?: "mobile" | "desktop";
}) {
  if (variant === "desktop") {
    return (
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={`group/item relative flex items-center gap-3 rounded-[1rem] px-2.5 py-1.75 transition-all ${
          isActive ? "bg-white/[0.08] text-text shadow-[0_0_24px_rgba(139,92,246,0.07)] scale-[1.01]" : "bg-transparent text-text hover:bg-white/[0.03]"
        }`}
      >
        <span
          className={`absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-accent transition-opacity ${
            isActive ? "opacity-100" : "opacity-0 group-hover/item:opacity-30"
          }`}
        />
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-black/20 text-text transition-transform duration-200 group-hover/item:scale-[1.03]">
          <Icon className={`h-3.5 w-3.5 ${isActive ? "text-text" : "text-text/85"}`} />
        </span>
        <span className="min-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-200 xl:group-hover:opacity-100 xl:group-focus-within:opacity-100">
          <span className={`block text-sm font-light tracking-wide ${isActive ? "text-text" : "text-text/92"}`}>
            {label}
          </span>
          <span className="block text-[0.6rem] leading-4 text-muted">{description}</span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      className={`grid grid-cols-[2rem_1fr] items-start gap-3 rounded-[1rem] px-3 py-3 transition-colors ${
        isActive ? "bg-white/[0.08] text-text" : "text-text hover:bg-white/[0.04]"
      }`}
    >
      <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-black/25">
        <Icon className="h-4 w-4" />
      </span>
      <span>
        <span className="block text-sm font-light tracking-wide">{label}</span>
        <span className="mt-1 block text-[0.62rem] leading-4 text-muted">{description}</span>
      </span>
    </Link>
  );
}

export function SiteHeader({
  activePath,
  timestamp,
  timestampDate,
}: {
  activePath:
    | "/"
    | "/archives"
    | "/now"
    | "/me"
    | "/identity"
    | "/timeline"
    | "/activity"
    | "/gallery"
    ;
  timestamp?: string;
  timestampDate?: string | Date | null;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const isOwner = Boolean((session?.user as { isOwner?: boolean } | undefined)?.isOwner);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        aria-label="Open archive navigation"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-[70] inline-flex h-11 w-11 items-center justify-center rounded-[1rem] bg-black/35 text-text shadow-[0_16px_40px_rgba(0,0,0,0.24)] backdrop-blur-2xl transition-transform hover:scale-[1.03] xl:hidden"
      >
        <Menu className="h-4.5 w-4.5" />
      </button>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close archive navigation"
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 34 }}
              className="fixed inset-y-0 left-0 z-50 w-[min(86vw,20rem)] bg-black/22 shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur-3xl xl:hidden"
            >
              <div className="flex items-center justify-end px-5 py-4">
                <button
                  type="button"
                  aria-label="Close archive navigation"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[0.9rem] bg-white/[0.05] text-text"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <nav className="px-3 pb-4">
                <div className="space-y-1">
                  {publicNavItems.map((item) => (
                    <NavItem
                      key={item.href}
                      {...item}
                      isActive={item.href === activePath}
                      onClick={() => setMobileOpen(false)}
                      variant="mobile"
                    />
                  ))}
                </div>

                {isOwner && (
                  <>
                    <div className="my-3 flex items-center gap-2 px-1">
                      <div className="h-px flex-1 bg-white/[0.06]" />
                      <span className="text-[0.58rem] uppercase tracking-[0.45em] text-white/30">Admin</span>
                      <div className="h-px flex-1 bg-white/[0.06]" />
                    </div>
                    <div className="space-y-1">
                      {adminNavItems.map((item) => (
                        <NavItem
                          key={item.href}
                          {...item}
                          isActive={pathname === item.href}
                          onClick={() => setMobileOpen(false)}
                          variant="mobile"
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() => signOut({ callbackUrl: "/test" })}
                        className="grid w-full grid-cols-[2rem_1fr] items-start gap-3 rounded-[1rem] px-3 py-3 text-left text-text transition-colors hover:bg-white/[0.04]"
                      >
                        <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-black/25">
                          <LogOut className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-light tracking-wide">Sign Out</span>
                          <span className="mt-1 block text-[0.62rem] leading-4 text-muted">End owner session</span>
                        </span>
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2 rounded-[0.9rem] bg-white/[0.03] px-3 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                      <span className="text-[0.6rem] uppercase tracking-[0.4em] text-white/40">Owner Mode</span>
                    </div>
                  </>
                )}

                <div className="mt-3 rounded-[1rem] bg-white/[0.03] px-3 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-muted shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                  {timestampDate ? formatRelativeDateTime(timestampDate) : timestamp ?? "Archive State"}
                </div>
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <aside className="group fixed left-5 top-5 bottom-5 z-30 hidden w-[72px] flex-col rounded-[1.5rem] bg-black/18 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-3xl transition-[width] duration-300 xl:flex xl:hover:w-[18rem] xl:focus-within:w-[18rem]">
        <nav className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto px-1.5 py-3">
          <div className="space-y-0.5 pt-10">
            {publicNavItems.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                isActive={item.href === activePath}
                variant="desktop"
              />
            ))}

            {isOwner && (
              <>
                <div className="my-2 px-2">
                  <div className="h-px bg-white/[0.06]" />
                </div>
                {adminNavItems.map((item) => (
                  <NavItem
                    key={item.href}
                    {...item}
                    isActive={pathname === item.href}
                    variant="desktop"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/test" })}
                  className="group/item relative flex w-full items-center gap-3 rounded-[1rem] px-2.5 py-1.75 text-left text-text transition-all hover:bg-white/[0.03]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-black/20 text-text transition-transform duration-200 group-hover/item:scale-[1.03]">
                    <LogOut className="h-3.5 w-3.5 text-text/85" />
                  </span>
                  <span className="min-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-200 xl:group-hover:opacity-100 xl:group-focus-within:opacity-100">
                    <span className="block text-sm font-light tracking-wide text-text/92">Sign Out</span>
                    <span className="block text-[0.6rem] leading-4 text-muted">End owner session</span>
                  </span>
                </button>
              </>
            )}
          </div>

          <div className="px-1 pb-1">
            {isOwner && (
              <div className="mb-2 overflow-hidden rounded-[1rem] bg-white/[0.03] px-3 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                <p className="text-[0.68rem] uppercase tracking-[0.45em] text-emerald-400/60">◉</p>
                <p className="mt-1 overflow-hidden whitespace-nowrap text-[0.62rem] uppercase tracking-[0.35em] text-white/35 opacity-0 transition-opacity duration-200 xl:group-hover:opacity-100 xl:group-focus-within:opacity-100">
                  Owner Mode
                </p>
              </div>
            )}
            <div className="rounded-[1rem] bg-white/[0.03] px-3 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <p className="text-[0.68rem] uppercase tracking-[0.45em] text-muted">◎</p>
              <p className="mt-2 overflow-hidden whitespace-nowrap text-[0.68rem] uppercase tracking-[0.3em] text-text opacity-0 transition-opacity duration-200 xl:group-hover:opacity-100 xl:group-focus-within:opacity-100">
                {timestampDate ? formatRelativeDateTime(timestampDate) : timestamp ?? "Archive State"}
              </p>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
