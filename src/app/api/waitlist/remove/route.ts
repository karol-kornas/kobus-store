import { NextRequest, NextResponse } from "next/server";
import { wpAuthFetch, WpAuthError } from "@/lib/wpAuthFetch";

type RemoveWaitlistBody = {
  product_id: number;
  email?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RemoveWaitlistBody;

    if (!body.product_id) {
      return NextResponse.json({ error: "Missing product_id" }, { status: 400 });
    }

    const cookie = req.headers.get("cookie");

    const result = await wpAuthFetch<{
      status: string;
      message?: string;
    }>(
      "/headless/v1/waitlist/remove",
      {
        method: "POST",
        body,
      },
      cookie,
    );

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    if (err instanceof WpAuthError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: err.status });
    }

    console.error("waitlist/remove error:", err);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
