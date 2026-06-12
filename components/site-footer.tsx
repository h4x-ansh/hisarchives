"use client";

import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname === "/gallery" || pathname.startsWith("/test")) {
    return null;
  }

  return (
    <footer className="border-t border-white/5 px-5 py-8 text-[0.72rem] uppercase tracking-[0.35em] text-muted sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-7xl space-y-2">
        <p>hisarchives.xyz</p>
        <p>A living archive.</p>
        <p>Established {currentYear}.</p>
      </div>
    </footer>
  );
}
