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

    return res;
  } catch (err) {
    console.error("GET /api/cart error:", err);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}
