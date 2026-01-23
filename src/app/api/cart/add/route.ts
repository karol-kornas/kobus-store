import { NextRequest, NextResponse } from "next/server";
import { wooFetchWithNonce } from "@/lib/wooFetchWithNonce";
import { wooFetch } from "@/lib/wooFetch";
import { mapUpsellToCrossSell } from "@/features/cart/cart.mapper";
import { Product } from "@/types/product";
import { ApiCart } from "@/types/cart/apiCart";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, quantity = 1 } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const cookies = req.headers.get("cookie") ?? undefined;

    const { data: cart, headers } = await wooFetchWithNonce<ApiCart>("/cart/add-item", {
      method: "POST",
      cookies,
      body: JSON.stringify({ id, quantity }),
    });

    let crossSells = cart.cross_sells ?? [];

    if (crossSells.length === 0) {
      const { data: product } = await wooFetch<{
        id: number;
        parent_id?: number;
        upsell_ids?: number[];
      }>(`/products/${id}`, { method: "GET" });

      let upsellIds = product.upsell_ids ?? [];

      if (upsellIds.length === 0 && product.parent_id) {
        const { data: parent } = await wooFetch<{
          upsell_ids?: number[];
        }>(`/products/${product.parent_id}`, { method: "GET" });

        upsellIds = parent.upsell_ids ?? [];
      }

      if (upsellIds.length > 0) {
        const { data: upsells } = await wooFetch<Product[]>(`/products?include=${upsellIds.join(",")}`, {
          method: "GET",
        });

        crossSells = upsells.map(mapUpsellToCrossSell);
      }
    }

    if (crossSells.length === 0) {
      const { data: products } = await wooFetch<Product[]>("/products?per_page=20&status=publish", {
        method: "GET",
      });

      const filtered = products
        .filter((p) => p.id !== id && p.stock_status === "instock")
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

      crossSells = filtered.map(mapUpsellToCrossSell);
    }

    const cartWithRecommendations = {
      ...cart,
      cross_sells: crossSells,
    };

    const res = NextResponse.json(cartWithRecommendations);

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
