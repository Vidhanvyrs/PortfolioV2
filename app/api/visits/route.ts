import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COUNTER_URL =
  "https://api.counterapi.dev/v1/vidhan-solanki-portfolio/homepage-visits/up";

export async function GET() {
  try {
    const response = await fetch(COUNTER_URL, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Counter API returned ${response.status}`);
    }

    const data = (await response.json()) as { count?: unknown };
    const count = typeof data.count === "number" ? data.count : null;

    return NextResponse.json(
      { count },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch (error) {
    console.error("Unable to record portfolio visit", error);
    return NextResponse.json(
      { count: null },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }
}
