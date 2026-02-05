import { NextRequest, NextResponse } from "next/server";
import { wooFetchWithNonce } from "@/lib/wooFetchWithNonce";
import { Checkout } from "@/types/checkout/checkout";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie") ?? "";

    const { data, headers } = await wooFetchWithNonce<Checkout>("/checkout", {
      method: "GET",
      cookies: cookie,
    });

    // Przekazujemy cookies + nonce dalej do klienta
    const response = NextResponse.json(data);

    headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        response.headers.append("set-cookie", value);
      }
    });

    return response;
  } catch (error) {
    console.error("GET /checkout error:", error);

    return NextResponse.json({ message: "Nie udało się pobrać checkoutu" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Pobieramy cookies z requestu (ważne dla sesji Woo)
    const cookie = req.headers.get("cookie") ?? "";

    // Pobieramy body JSON z frontendu
    const body = await req.json();

    // Wywołanie Woo PUT /checkout z nonce
    const { data } = await wooFetchWithNonce<Checkout>("/checkout?__experimental_calc_totals=true", {
      method: "PUT",
      cookies: cookie,
      body: JSON.stringify(body),
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error("PUT /checkout error:", err);
    return NextResponse.json({ message: "Nie udało się zaktualizować checkoutu" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie") ?? "";

    const body = await req.json();

    const { data, headers } = await wooFetchWithNonce<Checkout>("/checkout", {
      method: "POST",
      cookies: cookie,
      body: JSON.stringify(body),
    });

    const response = NextResponse.json(data);

    headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        response.headers.append("set-cookie", value);
      }
    });

    return response;
  } catch (err) {
    console.error("POST /checkout error:", err);
    return NextResponse.json({ message: "Nie udało się złożyć zamówienia" }, { status: 500 });
  }
}
