import { wooStoreFetch } from "@/lib/wooStoreFetch";

type NonceCache = {
  value: string | null;
};

const nonceCache: NonceCache = {
  value: null,
};

export async function wooFetchWithNonce(
  path: string,
  options: {
    method: string;
    cookies?: string;
    body?: string;
  },
) {
  // 1️⃣ Jeśli nie mamy nonce → pobierz z /cart
  if (!nonceCache.value) {
    const { headers } = await wooStoreFetch("/cart", {
      method: "GET",
      cookies: options.cookies,
    });

    const nonce = headers.get("nonce");

    if (!nonce) {
      throw new Error("Nie udało się pobrać nonce z Woo");
    }

    nonceCache.value = nonce;
  }

  // 2️⃣ Właściwy request
  const res = await wooStoreFetch(path, {
    ...options,
    headers: {
      Nonce: nonceCache.value,
    },
  });

  // 3️⃣ Jeśli Woo zwróci nowy nonce → zapisz
  const newNonce = res.headers.get("nonce");
  if (newNonce) {
    nonceCache.value = newNonce;
  }

  return res;
}
