import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isOwnerSession } from "@/lib/auth/owner";
import { createJournalEntry, deleteJournalEntry, parseJournalSubmission, updateJournalEntry } from "@/lib/journal/admin";

export async function POST(request: Request) {
  const session = (await auth()) as { user?: { email?: string | null; isOwner?: boolean } } | null;

  if (!isOwnerSession(session)) {
    return NextResponse.redirect(new URL("/test", request.url), 303);
  }

  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");

  if (intent === "delete") {
    const id = String(formData.get("id") ?? "");

    if (id) {
      await deleteJournalEntry(id);
    }

    return NextResponse.redirect(new URL("/test/journal", request.url), 303);
  }

  const mode = String(formData.get("mode") ?? "create");
  const submission = parseJournalSubmission(formData);

  if (mode === "update") {
    const id = String(formData.get("id") ?? "");

    if (!id) {
      console.error("[journal] update redirect blocked: missing id");
      return NextResponse.redirect(new URL("/test/journal", request.url), 303);
    }

    const entry = await updateJournalEntry(id, submission);
    const redirectTarget = `/test/journal/edit/${entry.id}`;
    console.info("[journal] updatedEntry.id", entry.id, "redirectTarget", redirectTarget);
    return NextResponse.redirect(new URL(redirectTarget, request.url), 303);
  }

  const entry = await createJournalEntry(submission);
  const redirectTarget = `/test/journal/edit/${entry.id}`;
  console.info("[journal] createdEntry.id", entry.id, "redirectTarget", redirectTarget);
  return NextResponse.redirect(new URL(redirectTarget, request.url), 303);
}
