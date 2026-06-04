import type { Metadata } from "next";
import { BirthdaysPage } from "@/components/birthdays-page";

export const metadata: Metadata = {
  title: "birthdays | hisarchives.xyz",
  description: "Important dates for hisarchives.xyz.",
};

export default function BirthdaysRoute() {
  return <BirthdaysPage />;
}
