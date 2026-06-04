import type { Metadata } from "next";
import { DashboardPage } from "@/components/dashboard-page";

export const metadata: Metadata = {
  title: "dashboard | hisarchives.xyz",
  description: "Private control room placeholder for hisarchives.xyz.",
};

export default function DashboardRoute() {
  return <DashboardPage />;
}
