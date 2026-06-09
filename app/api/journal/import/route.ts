import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { importLocalJournalEntries } from "@/lib/journal/repository";

export async function POST(request: Request) {
  try {
    const session = (await auth()) as { user?: { isOwner?: boolean } } | null;

    if (!session?.user?.isOwner) {
      console.log("Journal import API failure", { reason: "unauthorized" });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = (await request.json()) as { entries?: unknown };
    const entries = Array.isArray(payload.entries) ? payload.entries : [];
    console.log("Journal import API trigger", { entryCount: entries.length });

    if (entries.length === 0) {
      console.log("Journal import API success", { entryCount: 0, importedCount: 0 });
      return NextResponse.json({ ok: true, imported: [], importedCount: 0 });
    }

    const imported = await importLocalJournalEntries(entries as Parameters<typeof importLocalJournalEntries>[0]);
    console.log("Journal import API success", { entryCount: entries.length, importedCount: imported.length });
    return NextResponse.json({ ok: true, imported, importedCount: imported.length });
  } catch (error) {
    console.log("Journal import API failure", {
      reason: error instanceof Error ? error.message : "unknown error",
    });
    return NextResponse.json({ error: "Journal import failed" }, { status: 500 });
  }
}
