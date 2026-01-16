import { NextRequest, NextResponse } from "next/server";
import { wooStoreFetch } from "@/lib/wooStoreFetch";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, quantity = 1 } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const nonce = req.headers.get("nonce");

    const { data, headers } = await wooStoreFetch("/cart/add-item", {
      method: "POST",
      cookies: req.headers.get("cookie") ?? undefined,
      headers: {
        ...(nonce ? { Nonce: nonce } : {}),
      },
      body: JSON.stringify({
        id,
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
    console.error("POST /api/cart/add error:", err);

    const message = err instanceof Error ? err.message : "Failed to add item to cart";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
