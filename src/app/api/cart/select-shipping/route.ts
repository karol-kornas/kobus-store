import { NextRequest, NextResponse } from "next/server";
import { wooFetchWithNonce } from "@/lib/wooFetchWithNonce";

export async function POST(req: NextRequest) {
  try {
    const { packageId, rateId } = await req.json();

    if (typeof packageId !== "number" || !rateId) {
      return NextResponse.json({ message: "Brak packageId lub rateId" }, { status: 400 });
    }

    const cookieHeader = req.headers.get("cookie") ?? undefined;

    const { data } = await wooFetchWithNonce(
      `/cart/select-shipping-rate?package_id=${packageId}&rate_id=${rateId}`,
      {
        method: "POST",
        cookies: cookieHeader,
      },
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("SELECT SHIPPING RATE ERROR", error);

    return NextResponse.json({ message: "Nie udało się zmienić metody dostawy" }, { status: 500 });
  }
}
