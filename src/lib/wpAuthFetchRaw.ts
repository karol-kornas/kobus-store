const WP_API_URL = process.env.WP_API_URL!;

type WpAuthFetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
};

export async function wpAuthFetchRaw(
  endpoint: string,
  options?: WpAuthFetchOptions,
  cookie?: string | null,
): Promise<Response> {
  const url = `${WP_API_URL}${endpoint}`;

  const res = await fetch(url, {
    method: options?.method ?? "GET",
    headers: {
      ...(options?.body ? { "Content-Type": "application/json" } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  return res;
}
