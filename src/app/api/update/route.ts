import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
const UPDATE_STATS_SECRET = process.env.UPDATE_STATS_SECRET;

// init supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ") ||
      authHeader.split(" ")[1] !== UPDATE_STATS_SECRET
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const auth = Buffer.from(WAKATIME_API_KEY || "").toString("base64");
    const response = await fetch(
      "https://wakatime.com/api/v1/users/current/stats/last_30_days",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`WakaTime API error: ${response.statusText}`);
    }

    const data = await response.json();

    const { error } = await supabase.from("wakatime_stats").insert({
      stats: data,
      created_at: new Date().toISOString(),
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating WakaTime stats:", error);
    return NextResponse.json(
      { error: "Failed to update WakaTime stats" },
      { status: 500 },
    );
  }
}
