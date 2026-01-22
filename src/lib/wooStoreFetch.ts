const WC_STORE_API_URL = process.env.WC_STORE_API_URL!;

export async function wooStoreFetch<T>(
  endpoint: string,
  options: RequestInit & { cookies?: string } = {},
): Promise<{ data: T; headers: Headers }> {
  const res = await fetch(`${WC_STORE_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.cookies ? { Cookie: options.cookies } : {}),
      ...options.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Woo Store API error: ${res.status} ${text}`);
  }

  return {
    data: await res.json(),
    headers: res.headers,
  };
}
