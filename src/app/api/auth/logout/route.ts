import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { wpAuthFetchRaw } from "@/lib/wpAuthFetchRaw";

export async function POST() {
  const incomingHeaders = await headers();
  const origin = incomingHeaders.get("origin");
  const cookie = incomingHeaders.get("cookie");

  const res = await wpAuthFetchRaw(
    "/headless/v1/auth/logout",
    {
      method: "POST",
      headers: {
        Origin: origin ?? "",
      },
    },
    cookie,
  );

  let data = null;

  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    data = await res.json();
  }

  const response = NextResponse.json(data, {
    status: res.status,
  });

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("Set-Cookie", setCookie);
  }

  return response;
}
