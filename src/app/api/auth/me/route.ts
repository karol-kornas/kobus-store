import { wpApi } from "@/lib/wordpress";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie");

    const res = await wpApi.get("/headless/v1/auth/me", {
      headers: {
        Cookie: cookie ?? "",
      },
    });

    return NextResponse.json(res.data);
  } catch (err) {
    const error = err as AxiosError;

    const status = error.response?.status;

    if (status === 401) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json({ error: "Auth service error" }, { status: 500 });
  }
}
