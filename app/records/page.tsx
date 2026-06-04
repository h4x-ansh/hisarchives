import type { Metadata } from "next";
import { RecordsPage } from "@/components/records-page";

export const metadata: Metadata = {
  title: "records | hisarchives.xyz",
  description: "Personal records for hisarchives.xyz.",
};

export default function RecordsRoute() {
  return <RecordsPage />;
}
