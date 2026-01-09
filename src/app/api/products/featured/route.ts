import { getProductsByCategoryLite } from "@/features/products/products.server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const categoryId = Number(searchParams.get("categoryId"));
  const limit = Number(searchParams.get("limit") ?? 8);

  if (!categoryId) {
    return NextResponse.json({ error: "categoryId required" }, { status: 400 });
  }

  const data = await getProductsByCategoryLite({ categoryId, limit });

  return NextResponse.json(data);
}
