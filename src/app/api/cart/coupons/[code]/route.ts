import { NextRequest, NextResponse } from "next/server";
import { wooFetchWithNonce } from "@/lib/wooFetchWithNonce";

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ code: string }> }) {
  try {
    const { code } = await ctx.params;

    if (!code) {
      return NextResponse.json({ error: "Missing coupon code" }, { status: 400 });
    }

    const cookies = _req.headers.get("cookie") ?? undefined;

    const { headers } = await wooFetchWithNonce(`/cart/coupons/${encodeURIComponent(code)}`, {
      method: "DELETE",
      cookies,
    });

    const res = NextResponse.json({ success: true });

    const setCookie = headers.get("set-cookie");
    if (setCookie) res.headers.set("set-cookie", setCookie);

    const newNonce = headers.get("nonce");
    if (newNonce) res.headers.set("nonce", newNonce);

    return res;
  } catch (err) {
    console.error("DELETE /api/cart/coupons error:", err);
    return NextResponse.json({ error: "Failed to remove coupon" }, { status: 500 });
  }
}
