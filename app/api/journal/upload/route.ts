import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { uploadJournalPhoto } from "@/lib/journal/repository";

export async function POST(request: Request) {
  const session = (await auth()) as { user?: { isOwner?: boolean } } | null;

  if (!session?.user?.isOwner) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file." }, { status: 400 });
  }

  const result = await uploadJournalPhoto(file);
  return NextResponse.json(result);
}
