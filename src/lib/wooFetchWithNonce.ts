import { wooStoreFetch } from "@/lib/wooStoreFetch";

export async function wooFetchWithNonce(
  path: string,
  options: {
    method: string;
    cookies?: string;
    body?: string;
    _retry?: boolean;
  },
) {
  const { headers: cartHeaders } = await wooStoreFetch("/cart", {
    method: "GET",
    cookies: options.cookies,
  });

  const nonce = cartHeaders.get("nonce");

  if (!nonce) {
    throw new Error("Nie udało się pobrać nonce z Woo");
  }

  try {
    return await wooStoreFetch(path, {
      ...options,
      headers: {
        Nonce: nonce,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("woocommerce_rest_invalid_nonce") && !options._retry) {
      return wooFetchWithNonce(path, {
        ...options,
        _retry: true,
      });
    }

    throw err;
  }
}
