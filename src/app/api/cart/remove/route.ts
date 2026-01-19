import { NextRequest, NextResponse } from "next/server";
import { wooFetchWithNonce } from "@/lib/wooWithNonce";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { key } = body;

    if (!key) {
      return NextResponse.json({ error: "Missing cart item key" }, { status: 400 });
    }

    const cookies = req.headers.get("cookie") ?? undefined;

    const { data, headers } = await wooFetchWithNonce("/cart/remove-item", {
      method: "POST",
      cookies: cookies,
      body: JSON.stringify({ key }),
    });

    const res = NextResponse.json(data);

    const setCookie = headers.get("set-cookie");
    if (setCookie) {
      res.headers.set("set-cookie", setCookie);
    }

    const newNonce = headers.get("nonce");
    if (newNonce) {
      res.headers.set("nonce", newNonce);
    }

    return res;
  } catch (err: unknown) {
    console.error("POST /api/cart/remove error:", err);

    const message = err instanceof Error ? err.message : "Failed to remove item from cart";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
