import { NextResponse } from "next/server";
import { getOwnerSession } from "@/lib/auth/owner";
import { getSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({}, { status: 400 });

  if (!hasSupabaseAdminEnv()) return NextResponse.json({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = getSupabaseAdminClient() as any;
  const { data } = await db
    .from("now_checklist")
    .select("item_name, checks")
    .eq("domain", domain);

  if (!data) return NextResponse.json({});

  const map: Record<string, boolean[]> = {};
  for (const row of data as { item_name: string; checks: boolean[] }[]) {
    map[row.item_name] = row.checks;
  }
  return NextResponse.json(map);
}

export async function POST(req: Request) {
  const { isOwner } = await getOwnerSession();
  if (!isOwner) return new Response("Forbidden", { status: 403 });
  if (!hasSupabaseAdminEnv()) return new Response("No DB", { status: 503 });

  const body = await req.json() as { domain: string; item_name: string; checks: boolean[] };
  const { domain, item_name, checks } = body;
  if (!domain || !item_name || !Array.isArray(checks)) {
    return new Response("Bad Request", { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = getSupabaseAdminClient() as any;
  const { error } = await db
    .from("now_checklist")
    .upsert({ domain, item_name, checks, updated_at: new Date().toISOString() }, { onConflict: "domain,item_name" });

  if (error) return new Response(String(error.message), { status: 500 });
  return NextResponse.json({ ok: true });
}
