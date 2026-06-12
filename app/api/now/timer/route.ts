import { NextResponse } from "next/server";
import { getOwnerSession } from "@/lib/auth/owner";
import { getSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export async function GET() {
  if (!hasSupabaseAdminEnv()) return NextResponse.json({ minutes: 0 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = getSupabaseAdminClient() as any;
  const { data } = await db
    .from("now_daily_minutes")
    .select("minutes")
    .eq("date", todayStr())
    .maybeSingle();

  return NextResponse.json({ minutes: (data as { minutes?: number } | null)?.minutes ?? 0 });
}

export async function POST(req: Request) {
  const { isOwner } = await getOwnerSession();
  if (!isOwner) return new Response("Forbidden", { status: 403 });
  if (!hasSupabaseAdminEnv()) return new Response("No DB", { status: 503 });

  let body: unknown;
  try { body = await req.json(); } catch { return new Response("Bad Request", { status: 400 }); }
  const { minutes } = body as { minutes: unknown };
  if (
    typeof minutes !== "number" ||
    !Number.isFinite(minutes) ||
    !Number.isInteger(minutes) ||
    minutes < 0 ||
    minutes > 1440
  ) return new Response("Bad Request", { status: 400 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = getSupabaseAdminClient() as any;
  const { error } = await db
    .from("now_daily_minutes")
    .upsert({ date: todayStr(), minutes }, { onConflict: "date" });

  if (error) return new Response(String(error.message), { status: 500 });
  return NextResponse.json({ ok: true });
}
