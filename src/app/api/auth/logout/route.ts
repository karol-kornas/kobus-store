import { wpApi } from "@/lib/wordpress";
import { NextResponse } from "next/server";
import { AxiosError } from "axios";
import { headers } from "next/headers";

export async function POST() {
  try {
    const incomingHeaders = await headers();
    const origin = incomingHeaders.get("origin");
    const cookie = incomingHeaders.get("cookie");

    const res = await wpApi.post(
      "/headless/v1/auth/logout",
      {},
      {
        headers: {
          Origin: origin ?? "",
          Cookie: cookie ?? "",
        },
      }
    );

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

    return NextResponse.json(error.response?.data ?? { error: "Logout failed" }, {
      status: error.response?.status ?? 500,
    });
  }
}
