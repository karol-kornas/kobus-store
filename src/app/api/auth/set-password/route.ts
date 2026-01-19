import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { setPasswordSchema } from "@/features/auth/schemas/setPassword.schema";
import { wpAuthFetchRaw } from "@/lib/wpAuthFetchRaw";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = setPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid input",
        issues: z.treeifyError(parsed.error),
      },
      { status: 400 },
    );
  }

  const { login, key, password } = parsed.data;

  const incomingHeaders = await headers();
  const origin = incomingHeaders.get("origin");

  const res = await wpAuthFetchRaw("/headless/v1/auth/set-password", {
    method: "POST",
    body: {
      login,
      key,
      password,
    },
    headers: {
      Origin: origin ?? "",
    },
  });

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
