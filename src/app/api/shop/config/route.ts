import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.WP_API_URL}/headless/v1/shop/config`, {
    cache: "force-cache",
    next: { revalidate: 600 },
  });

  const data = await res.json();

  return NextResponse.json(data);
}
