import { NextRequest, NextResponse } from "next/server";
import { wpAuthFetch } from "@/lib/wpAuthFetch";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const productId = searchParams.get("product_id");
    const email = searchParams.get("email");

    if (!productId || !email) {
      return NextResponse.json({ registered: false });
    }

    const data = await wpAuthFetch<{ registered: boolean }>(
      `/headless/v1/waitlist/status?product_id=${productId}&email=${encodeURIComponent(email)}`,
    );

    return NextResponse.json(data);
  } catch (err) {
    console.error("waitlist/status error:", err);
    return NextResponse.json({ registered: false });
  }
}
