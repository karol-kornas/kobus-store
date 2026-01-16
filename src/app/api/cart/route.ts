import { NextRequest, NextResponse } from "next/server";
import { wooStoreFetch } from "@/lib/wooStoreFetch";

export async function GET(req: NextRequest) {
  try {
    const { data, headers } = await wooStoreFetch("/cart", {
      method: "GET",
      cookies: req.headers.get("cookie") ?? undefined,
    });

    const res = NextResponse.json(data);

    const setCookie = headers.get("set-cookie");
    if (setCookie) {
      res.headers.set("set-cookie", setCookie);
    }

    const nonce = headers.get("nonce");
    if (nonce) {
      res.headers.set("nonce", nonce);
    }

    return res;
  } catch (err: unknown) {
    console.error("GET /api/cart error:", err);

    const message = err instanceof Error ? err.message : "Failed to fetch cart";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
