import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("wakatime_stats")
      .select("stats")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    return NextResponse.json(data.stats);
  } catch (error) {
    console.error("Error fetching WakaTime stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch WakaTime stats" },
      { status: 500 },
    );
  }
}
