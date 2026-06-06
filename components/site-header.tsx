"use client";

import Link from "next/link";
import {
  Activity,
  BookOpen,
  Calendar,
  CalendarDays,
  FileText,
  FolderArchive,
  House,
  Images,
  Mail,
  User,
} from "lucide-react";

const archiveNavItems = [
  { href: "/", label: "Home", description: "Landing archive", icon: House },
  { href: "/archives", label: "Archives", description: "Stored projects and records", icon: FolderArchive },
  { href: "/now", label: "Now", description: "Current status and focus", icon: Activity },
  { href: "/identity", label: "Identity", description: "Personal metadata", icon: User },
  { href: "/timeline", label: "Timeline", description: "Chronological record of events", icon: Calendar },
  { href: "/activity", label: "Activity", description: "Daily logs and movement", icon: Activity },
  { href: "/gallery", label: "Gallery", description: "Visual archive", icon: Images },
  { href: "/library", label: "Library", description: "Collected resources", icon: BookOpen },
  { href: "/records", label: "Records", description: "Collected documents and notes", icon: FileText },
  { href: "/birthdays", label: "Important Dates", description: "Marked dates and milestones", icon: CalendarDays },
  { href: "/contact", label: "Contact", description: "Transmission channels", icon: Mail },
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
  return (
    <>
      <aside className="group fixed left-3 top-3 bottom-3 z-30 flex w-[56px] flex-col rounded-[1.4rem] bg-black/18 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-3xl transition-[width] duration-300 lg:left-5 lg:top-5 lg:bottom-5 lg:w-[72px] lg:hover:w-[18rem] lg:focus-within:w-[18rem]">
        <div className="flex h-18 items-center px-2.5">
          <Link
            href="/"
            aria-label="Go to home"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.9rem] bg-white/[0.05] text-text transition-all hover:bg-white/[0.1] hover:scale-[1.03]"
          >
            <House className="h-4 w-4" />
          </Link>
          <div className="ml-3 min-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-200 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
            <p className="text-[0.68rem] uppercase tracking-[0.45em] text-muted">HisArchives</p>
            <p className="mt-1 text-sm uppercase tracking-[0.3em] text-text">Archive Index</p>
          </div>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col justify-between px-1.5 py-2">
          <div className="space-y-0.5">
            {archiveNavItems.map((item) => {
              const isActive = item.href === activePath;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  title={item.label}
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
                  <span className="min-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-200 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
                    <span className={`block text-sm font-light tracking-wide ${isActive ? "text-text" : "text-text/92"}`}>
                      {item.label}
                    </span>
                    <span className="block text-[0.6rem] leading-4 text-muted">{item.description}</span>
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="px-1 pb-1">
            <div className="rounded-[1rem] bg-white/[0.03] px-3 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <p className="text-[0.68rem] uppercase tracking-[0.45em] text-muted">◎</p>
              <p className="mt-2 overflow-hidden whitespace-nowrap text-[0.68rem] uppercase tracking-[0.3em] text-text opacity-0 transition-opacity duration-200 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
                {timestamp ?? "Archive State"}
              </p>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
