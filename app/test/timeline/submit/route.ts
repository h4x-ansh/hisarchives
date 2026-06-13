import { NextResponse } from "next/server";
import { getOwnerSession } from "@/lib/auth/owner";
import { isOwnerSession } from "@/lib/auth/owner";
import { createTimelineEntry, deleteTimelineEntry, parseTimelineSubmission, updateTimelineEntry } from "@/lib/timeline/admin";

export async function POST(request: Request) {
  const { session } = await getOwnerSession();
  if (!isOwnerSession(session)) return NextResponse.redirect(new URL("/test", request.url), 303);

  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");

  if (intent === "delete") {
    const id = String(formData.get("id") ?? "");
    if (id) await deleteTimelineEntry(id);
    return NextResponse.redirect(new URL("/test/timeline", request.url), 303);
  }

  const mode = String(formData.get("mode") ?? "create");
  const submission = parseTimelineSubmission(formData);

  if (mode === "update") {
    const id = String(formData.get("id") ?? "");
    if (!id) return NextResponse.redirect(new URL("/test/timeline", request.url), 303);
    await updateTimelineEntry(id, submission);
    return NextResponse.redirect(new URL(`/test/timeline/edit/${id}?saved=1`, request.url), 303);
  }

  const record = await createTimelineEntry(submission);
  return NextResponse.redirect(new URL(`/test/timeline/edit/${record.id}?saved=1`, request.url), 303);
}
