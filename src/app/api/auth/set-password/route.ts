import { wpApi } from "@/lib/wordpress";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { z } from "zod";
import { setPasswordSchema } from "@/features/auth/schemas/setPassword.schema";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = setPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid input",
        issues: z.treeifyError(parsed.error),
      },
      { status: 400 }
    );
  }

  const { login, key, password } = parsed.data;

  const incomingHeaders = await headers();
  const origin = incomingHeaders.get("origin");

  try {
    const res = await wpApi.post(
      "/headless/v1/auth/set-password",
      {
        login,
        key,
        password,
      },
      {
        headers: {
          Origin: origin ?? "",
        },
      }
    );

    return NextResponse.json(res.data);
  } catch (err) {
    const error = err as AxiosError;

    return NextResponse.json(error.response?.data ?? { error: "Set password failed" }, {
      status: error.response?.status ?? 500,
    });
  }
}
