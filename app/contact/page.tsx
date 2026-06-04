import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "contact | hisarchives.xyz",
  description: "Transmission channels for hisarchives.xyz.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
