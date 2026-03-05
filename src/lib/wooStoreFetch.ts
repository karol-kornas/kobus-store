const WC_STORE_API_URL = process.env.WC_STORE_API_URL!;

export async function wooStoreFetch<T>(
  endpoint: string,
  options: RequestInit & { cookies?: string } = {},
): Promise<{ data: T | null; headers: Headers }> {
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

  let data: T | null = null;

  try {
    const text = await res.text(); // pobieramy raw text
    data = text ? JSON.parse(text) : null; // jeśli pusty string → null
  } catch (err) {
    console.warn("WooStoreFetch: response nie jest JSON:", err);
  }

  return {
    data,
    headers: res.headers,
  };
}
