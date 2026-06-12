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

  const body = await req.json() as { type: string; data: unknown };
  const { type, data } = body;
  if (!type || data === undefined) return new Response("Bad Request", { status: 400 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = getSupabaseAdminClient() as any;
  const { error } = await db.from("now_records").insert({ type, data });

  if (error) return new Response(String(error.message), { status: 500 });
  return NextResponse.json({ ok: true });
}
