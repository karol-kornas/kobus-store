import { NextRequest, NextResponse } from "next/server";
import { wooFetchWithNonce } from "@/lib/wooFetchWithNonce";
import { ApiCartCoupon } from "@/types/cart/apiCartCoupon";


export async function GET(req: NextRequest) {
  try {
    const cookies = req.headers.get("cookie") ?? undefined;

    const { data: coupons, headers } = await wooFetchWithNonce<ApiCartCoupon[]>("/cart/coupons", {
      method: "GET",
      cookies,
    });

    const res = NextResponse.json(coupons);

    const setCookie = headers.get("set-cookie");
    if (setCookie) {
      res.headers.set("set-cookie", setCookie);
    }

    const newNonce = headers.get("nonce");
    if (newNonce) {
      res.headers.set("nonce", newNonce);
    }

    return res;
  } catch (err) {
    console.error("GET /api/cart/coupons error:", err);

    return NextResponse.json({ error: "Failed to fetch cart coupons" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: "Missing coupon code" }, { status: 400 });
    }

    const cookies = req.headers.get("cookie") ?? undefined;

    const { data: coupon, headers } = await wooFetchWithNonce<ApiCartCoupon>(
      `/cart/coupons?code=${encodeURIComponent(code)}`,
      {
        method: "POST",
        cookies,
      },
    );

    const res = NextResponse.json(coupon);

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
    console.error("POST /api/cart/coupons error:", err);

    const message = err instanceof Error ? err.message : "Failed to apply coupon";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
