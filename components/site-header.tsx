import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/archives", label: "Archives" },
  { href: "/now", label: "Now" },
  { href: "/identity", label: "Identity" },
  { href: "/timeline", label: "Timeline" },
  { href: "/activity", label: "Activity" },
  { href: "/gallery", label: "Gallery" },
  { href: "/library", label: "Library" },
  { href: "/records", label: "Records" },
  { href: "/birthdays", label: "Birthdays" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
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
    <header className="flex items-center justify-between gap-6 border-b border-white/5 py-4 text-[0.72rem] uppercase tracking-[0.38em] text-muted">
      <Link href="/" className="shrink-0 transition-colors hover:text-text">
        hisarchives.xyz
      </Link>
      <nav aria-label="Primary" className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
        {navItems.map((item) => {
          const isActive = item.href === activePath;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`transition-colors hover:text-text ${isActive ? "text-text" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
        {timestamp ? <span className="hidden sm:inline">{timestamp}</span> : null}
      </nav>
    </header>
  );
}
