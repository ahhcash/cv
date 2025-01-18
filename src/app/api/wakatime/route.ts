import { NextResponse } from "next/server";

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;

export async function GET() {
  try {
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
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching WakaTime stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch WakaTime stats" },
      { status: 500 },
    );
  }
}
