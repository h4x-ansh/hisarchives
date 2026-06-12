import { NextResponse } from "next/server";
import { getOwnerSession } from "@/lib/auth/owner";
import { getSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  if (!type) return NextResponse.json({ records: [] }, { status: 400 });

  if (!hasSupabaseAdminEnv()) return NextResponse.json({ records: [] });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = getSupabaseAdminClient() as any;
  const { data } = await db
    .from("now_records")
    .select("data, created_at")
    .eq("type", type)
    .order("created_at", { ascending: true });

  const records = ((data ?? []) as { data: unknown }[]).map((row) => row.data);
  return NextResponse.json({ records });
}

export async function POST(req: Request) {
  const { isOwner } = await getOwnerSession();
  if (!isOwner) return new Response("Forbidden", { status: 403 });
  if (!hasSupabaseAdminEnv()) return new Response("No DB", { status: 503 });

  const VALID_TYPES = new Set(["mocktest", "pr", "portfolio"]);
  const MAX_PAYLOAD = 4096;

  let body: unknown;
  try { body = await req.json(); } catch { return new Response("Bad Request", { status: 400 }); }
  const { type, data } = body as { type: unknown; data: unknown };
  if (typeof type !== "string" || !VALID_TYPES.has(type) || data === undefined || data === null) {
    return new Response("Bad Request", { status: 400 });
  }
  if (JSON.stringify(data).length > MAX_PAYLOAD) {
    return new Response("Payload Too Large", { status: 413 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = getSupabaseAdminClient() as any;
  const { error } = await db.from("now_records").insert({ type, data });

  if (error) return new Response(String(error.message), { status: 500 });
  return NextResponse.json({ ok: true });
}
