import { getProductsByCategoryLite, getProductsByIdsLite } from "@/features/products/products.server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const categoryId = Number(searchParams.get("categoryId"));
  const idsParam = searchParams.get("ids");
  const limit = Number(searchParams.get("limit") ?? 8);

  if (idsParam) {
    const ids = idsParam
      .split(",")
      .map((id) => Number(id))
      .filter(Boolean);

    if (ids.length === 0) {
      return NextResponse.json({ products: [] });
    }

    const data = await getProductsByIdsLite({
      ids,
      limit,
    });

    return NextResponse.json(data);
  }

  if (categoryId) {
    const data = await getProductsByCategoryLite({
      categoryId,
      limit,
    });

    return NextResponse.json(data);
  }

  return NextResponse.json({ error: "categoryId or ids required" }, { status: 400 });
}
