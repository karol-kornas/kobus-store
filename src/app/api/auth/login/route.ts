import { wpApi } from "@/lib/wordpress";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const incomingHeaders = await headers();
  const origin = incomingHeaders.get("origin");

  try {
    const res = await wpApi.post("/headless/v1/auth/login", body, {
      headers: {
        Origin: origin ?? "",
      },
    });

    const response = NextResponse.json(res.data);

    const setCookies = res.headers["set-cookie"];

    if (Array.isArray(setCookies)) {
      setCookies.forEach((cookie) => {
        response.headers.append("Set-Cookie", cookie);
      });
    } else if (typeof setCookies === "string") {
      response.headers.append("Set-Cookie", setCookies);
    }

    return response;
  } catch (err) {
    const error = err as AxiosError;

    return NextResponse.json(error.response?.data ?? { error: "Login failed" }, {
      status: error.response?.status ?? 500,
    });
  }
}
