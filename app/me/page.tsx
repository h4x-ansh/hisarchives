import type { Metadata } from "next";
import { IdentityPage } from "@/components/identity-page";

export const metadata: Metadata = {
  title: "me | hisarchives.xyz",
  description: "Identity record for hisarchives.xyz.",
};

export default function MeRoute() {
  return <IdentityPage />;
}
