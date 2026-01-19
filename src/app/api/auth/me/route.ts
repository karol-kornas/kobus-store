import { NextResponse } from "next/server";
import { wpAuthFetch, WpAuthError } from "@/lib/wpAuthFetch";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie");

    const data = await wpAuthFetch("/headless/v1/auth/me", { method: "GET" }, cookie);

    return NextResponse.json(data);
  } catch (err: unknown) {
    if (err instanceof WpAuthError && err.status === 401) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json({ error: "Auth service error" }, { status: 500 });
  }
}
