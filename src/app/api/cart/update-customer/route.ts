import { NextRequest, NextResponse } from "next/server";
import { wooFetchWithNonce } from "@/lib/wooFetchWithNonce";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const cookieHeader = req.headers.get("cookie") ?? undefined;

    /**
     * body example:
     * {
     *   shipping_address: {
     *     country: "DE",
     *     postcode: "10115",
     *     city: "Berlin"
     *   }
     * }
     */
    const { data } = await wooFetchWithNonce("/cart/update-customer", {
      method: "POST",
      cookies: cookieHeader,
      body: JSON.stringify(body),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("UPDATE CUSTOMER ERROR", error);

    return NextResponse.json({ message: "Nie udało się zaktualizować adresu" }, { status: 500 });
  }
}
