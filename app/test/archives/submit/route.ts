import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isOwnerSession } from "@/lib/auth/owner";
import { createArchiveEntry, deleteArchiveEntry, parseArchiveSubmission, updateArchiveEntry } from "@/lib/archive/admin";

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
      await deleteArchiveEntry(id);
    }

    return NextResponse.redirect(new URL("/test/archives", request.url), 303);
  }

  const mode = String(formData.get("mode") ?? "create");
  const submission = parseArchiveSubmission(formData);

  if (mode === "update") {
    const id = String(formData.get("id") ?? "");

    if (!id) {
      console.error("[archives] update redirect blocked: missing id");
      return NextResponse.redirect(new URL("/test/archives", request.url), 303);
    }

    const record = await updateArchiveEntry(id, submission);
    return NextResponse.redirect(new URL(`/test/archives/edit/${record.id}?saved=1`, request.url), 303);
  }

  const record = await createArchiveEntry(submission);
  return NextResponse.redirect(new URL(`/test/archives/edit/${record.id}?saved=1`, request.url), 303);
}
