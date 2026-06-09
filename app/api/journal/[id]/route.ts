import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { deleteJournalEntry, updateJournalEntry } from "@/lib/journal/repository";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = (await auth()) as { user?: { isOwner?: boolean } } | null;

  if (!session?.user?.isOwner) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const payload = (await request.json()) as {
    title?: string;
    content?: string;
    photo_url?: string | null;
    photo_caption?: string | null;
    tags?: string[];
    mood?: string;
    entry_date?: string;
    published?: boolean;
  };

  if (!payload.title || !payload.content || !payload.entry_date || !payload.mood) {
    return NextResponse.json({ error: "Missing journal fields." }, { status: 400 });
  }

  const entry = await updateJournalEntry(id, {
    title: payload.title,
    content: payload.content,
    photo_url: payload.photo_url ?? null,
    photo_caption: payload.photo_caption ?? null,
    tags: payload.tags ?? [],
    mood: payload.mood,
    entry_date: payload.entry_date,
    published: Boolean(payload.published),
  });

  return NextResponse.json({ entry });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = (await auth()) as { user?: { isOwner?: boolean } } | null;

  if (!session?.user?.isOwner) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteJournalEntry(id);
  return NextResponse.json({ ok: true });
}
