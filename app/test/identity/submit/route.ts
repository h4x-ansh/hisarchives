import { NextResponse } from "next/server";
import { parseIdentitySubmission, upsertIdentityRecord } from "@/lib/identity/admin";
import { getOwnerSession } from "@/lib/auth/owner";

export async function POST(request: Request) {
  const { isOwner } = await getOwnerSession();
  if (!isOwner) return NextResponse.redirect(new URL("/test", request.url), 303);
  try {
    const formData = await request.formData();
    const submission = parseIdentitySubmission(formData);
    const record = await upsertIdentityRecord(submission);
    return NextResponse.redirect(new URL("/test/identity", request.url));
  } catch (error) {
    console.error("Identity submit failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process identity record." },
      { status: 500 },
    );
  }
}
