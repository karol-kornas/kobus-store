import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { wpAuthFetchRaw } from "@/lib/wpAuthFetchRaw";

export async function POST(req: Request) {
  const body = await req.json();
  const incomingHeaders = await headers();
  const origin = incomingHeaders.get("origin");

  const res = await wpAuthFetchRaw("/headless/v1/auth/login", {
    method: "POST",
    body,
    headers: {
      Origin: origin ?? "",
    },
  });

  const data = await res.json();

  const response = NextResponse.json(data, {
    status: res.status,
  });

  const setCookie = res.headers.get("set-cookie");

  if (setCookie) {
    response.headers.set("Set-Cookie", setCookie);
  }

  return response;
}
