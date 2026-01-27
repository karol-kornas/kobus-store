import { NextRequest, NextResponse } from "next/server";
import { wpAuthFetch } from "@/lib/wpAuthFetch";

type JoinWaitlistBody = {
  product_id: number;
  email?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as JoinWaitlistBody;

    if (!body.product_id) {
      return NextResponse.json({ error: "Missing product_id" }, { status: 400 });
    }

    const cookie = req.headers.get("cookie");

    let result;

    if (cookie) {
      result = await wpAuthFetch<{ status: string; message?: string }>(
        "/headless/v1/waitlist/join",
        { method: "POST", body },
        cookie,
      );
    } else {
      const res = await fetch(`${process.env.WP_API_URL}/headless/v1/waitlist/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`WP error ${res.status}`);
      }

      result = await res.json();
    }

    return NextResponse.json(result, {
      status: result.status === "already_registered" ? 200 : 201,
    });
  } catch (err) {
    console.error("waitlist/join error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
