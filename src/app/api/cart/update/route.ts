import { NextRequest, NextResponse } from "next/server";
import { wooStoreFetch } from "@/lib/wooStoreFetch";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { key, quantity } = body;

    if (!key || typeof quantity !== "number") {
      return NextResponse.json({ error: "Missing key or quantity" }, { status: 400 });
    }

    const nonce = req.headers.get("nonce");

    const { data, headers } = await wooStoreFetch("/cart/update-item", {
      method: "POST",
      cookies: req.headers.get("cookie") ?? undefined,
      headers: {
        ...(nonce ? { Nonce: nonce } : {}),
      },
      body: JSON.stringify({
        key,
        quantity,
      }),
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
    console.error("POST /api/cart/update error:", err);

    const message = err instanceof Error ? err.message : "Failed to update cart item";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
