const WP_API_URL = process.env.WP_API_URL!;

type WpAuthFetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
};

export async function wpAuthFetch<T>(
  endpoint: string,
  options?: WpAuthFetchOptions,
  cookie?: string | null,
): Promise<T> {
  const url = `${WP_API_URL}${endpoint}`;

  const res = await fetch(url, {
    method: options?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { Cookie: cookie } : {}),
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new WpAuthError(res.status);
  }

  return res.json();
}

export class WpAuthError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    super(message ?? `WP Auth API error: ${status}`);
    this.status = status;
  }
}
