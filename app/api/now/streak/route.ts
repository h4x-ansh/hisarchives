import { NextResponse } from "next/server";
import { getSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";

function dateStrDaysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ streak: 0 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = getSupabaseAdminClient() as any;
  const { data } = await db
    .from("now_daily_minutes")
    .select("date, minutes")
    .gt("minutes", 0)
    .order("date", { ascending: false });

  const activeDates = new Set(
    ((data ?? []) as { date: string }[]).map((row) => row.date)
  );

  const today = dateStrDaysAgo(0);
  // If today has no entry yet, allow streak to start from yesterday
  const startOffset = activeDates.has(today) ? 0 : 1;

  let streak = 0;
  for (let i = startOffset; ; i++) {
    if (activeDates.has(dateStrDaysAgo(i))) {
      streak++;
    } else {
      break;
    }
  }

  return NextResponse.json({ streak });
}
