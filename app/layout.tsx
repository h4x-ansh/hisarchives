import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "hisarchives.xyz",
  description: "A living archive of projects, progress, lessons, and records.",
  metadataBase: new URL("https://hisarchives.xyz"),
  openGraph: {
    title: "hisarchives.xyz",
    description: "A living archive of projects, progress, lessons, and records.",
    siteName: "hisarchives.xyz",
    url: "https://hisarchives.xyz",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "hisarchives.xyz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "hisarchives.xyz",
    description: "A living archive of projects, progress, lessons, and records.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${instrumentSerif.variable}`}>
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
