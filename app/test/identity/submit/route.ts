import { NextResponse } from "next/server";
import { parseIdentitySubmission, upsertIdentityRecord } from "@/lib/identity/admin";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const submission = parseIdentitySubmission(formData);
    const record = await upsertIdentityRecord(submission);
    console.log("updatedIdentity.id", record.id);
    return NextResponse.redirect(new URL("/test/identity", request.url));
  } catch (error) {
    console.error("Identity submit failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process identity record." },
      { status: 500 },
    );
  }
}
