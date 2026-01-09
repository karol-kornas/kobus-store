import { wpApi } from "@/lib/wordpress";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { forgotPasswordSchema } from "@/features/auth/schemas/forgotPassword.schema";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = forgotPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid input",
        issues: z.treeifyError(parsed.error),
      },
      { status: 400 }
    );
  }

  const incomingHeaders = await headers();
  const origin = incomingHeaders.get("origin");

  try {
    const res = await wpApi.post("/headless/v1/auth/forgot-password", parsed.data, {
      headers: {
        Origin: origin ?? "",
      },
      timeout: 8000,
    });

    const response = NextResponse.json(res.data);

    return response;
  } catch (err) {
    const error = err as AxiosError;

    return NextResponse.json(error.response?.data ?? { error: "Forgot password failed" }, {
      status: error.response?.status ?? 500,
    });
  }
}
