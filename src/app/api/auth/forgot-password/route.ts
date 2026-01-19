import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { forgotPasswordSchema } from "@/features/auth/schemas/forgotPassword.schema";
import { z } from "zod";
import { wpAuthFetchRaw } from "@/lib/wpAuthFetchRaw";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = forgotPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid input",
        issues: z.treeifyError(parsed.error),
      },
      { status: 400 },
    );
  }

  const incomingHeaders = await headers();
  const origin = incomingHeaders.get("origin");

  const res = await wpAuthFetchRaw("/headless/v1/auth/forgot-password", {
    method: "POST",
    body: parsed.data,
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

  return response;
}
