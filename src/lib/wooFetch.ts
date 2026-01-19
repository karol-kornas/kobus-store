const WC_API_URL = process.env.WC_API_URL!;
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY!;
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET!;

const auth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString("base64");

export async function wooFetch<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | null | undefined>,
  options?: {
    revalidate?: number;
  },
): Promise<{
  data: T;
  headers: Headers;
}> {
  const url = new URL(`${WC_API_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    next: {
      revalidate: options?.revalidate ?? 60, // cache 60s
    },
  });

  if (!res.ok) {
    throw new Error(`Woo API error: ${res.status}`);
  }

  const data = await res.json();

  return {
    data,
    headers: res.headers,
  };
}
