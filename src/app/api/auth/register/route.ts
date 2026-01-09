import { wpApi } from "@/lib/wordpress";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { registerSchema } from "@/features/auth/schemas/register.schema";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = registerSchema.safeParse(body);

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
    const res = await wpApi.post("/headless/v1/auth/register", parsed.data, {
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

    return NextResponse.json(error.response?.data ?? { error: "Register failed" }, {
      status: error.response?.status ?? 500,
    });
  }
}
