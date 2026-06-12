import { NextResponse } from "next/server";
import { createCuratedEntry, deleteCuratedEntry, parseCuratedSubmission, updateCuratedEntry } from "@/lib/curated/admin";

function readTextField(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
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
      console.log("updatedCurated.id", updatedRecord.id);
      console.log("redirectTarget", `/test/curated/edit/${updatedRecord.id}`);
      return NextResponse.redirect(new URL(`/test/curated/edit/${updatedRecord.id}`, request.url));
    }

    const createdRecord = await createCuratedEntry(submission);
    console.log("createdCurated.id", createdRecord.id);
    console.log("redirectTarget", `/test/curated/edit/${createdRecord.id}`);
    return NextResponse.redirect(new URL(`/test/curated/edit/${createdRecord.id}`, request.url));
  } catch (error) {
    console.error("Curated submit failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process curated item." },
      { status: 500 },
    );
  }
}
