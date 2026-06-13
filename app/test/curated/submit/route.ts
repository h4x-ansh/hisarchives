import { NextResponse } from "next/server";
import { createCuratedEntry, deleteCuratedEntry, parseCuratedSubmission, updateCuratedEntry } from "@/lib/curated/admin";
import { getOwnerSession } from "@/lib/auth/owner";

function readTextField(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const { isOwner } = await getOwnerSession();
  if (!isOwner) return NextResponse.redirect(new URL("/test", request.url), 303);
  const formData = await request.formData();
  const intent = readTextField(formData.get("intent"));
  const id = readTextField(formData.get("id"));

  try {
    if (intent === "delete") {
      if (!id || id === "undefined" || id === "null") {
        throw new Error("Missing curated item id.");
      }

      await deleteCuratedEntry(id);
      return NextResponse.redirect(new URL("/test/curated", request.url));
    }

    const submission = parseCuratedSubmission(formData);

    if (id && id !== "undefined" && id !== "null") {
      const updatedRecord = await updateCuratedEntry(id, submission);
      return NextResponse.redirect(new URL(`/test/curated/edit/${updatedRecord.id}`, request.url));
    }

    const createdRecord = await createCuratedEntry(submission);
    return NextResponse.redirect(new URL(`/test/curated/edit/${createdRecord.id}`, request.url));
  } catch (error) {
    console.error("Curated submit failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process curated item." },
      { status: 500 },
    );
  }
}
