const WP_API_URL = process.env.WP_API_URL;

console.log("ENV:", {
  WP_API_URL: process.env.WP_API_URL,
});

if (!WP_API_URL) {
  throw new Error("WP_API_URL is missing");
}

export async function wpFetch<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | null | undefined>,
  options?: {
    revalidate?: number;
  }
): Promise<T> {
  const url = new URL(`${WP_API_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const res = await fetch(url.toString(), {
    next: {
      revalidate: options?.revalidate ?? 300, // domyślnie 5 min
    },
  });

  if (!res.ok) {
    throw new Error(`WP API error: ${res.status}`);
  }

  return res.json();
}
