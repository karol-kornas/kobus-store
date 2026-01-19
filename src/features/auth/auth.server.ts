import { cookies } from "next/headers";
import { AuthUser } from "./auth.types";
import { WpAuthError, wpAuthFetch } from "@/lib/wpAuthFetch";

export async function getMeServer(): Promise<AuthUser | null> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  try {
    const data = await wpAuthFetch<AuthUser>("/headless/v1/auth/me", { method: "GET" }, cookieHeader);

    return data;
  } catch (err: unknown) {
    if (err instanceof WpAuthError && err.status === 401) {
      return null;
    }

    throw err;
  }
}
