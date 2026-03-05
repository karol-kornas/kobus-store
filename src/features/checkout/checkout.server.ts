// checkout.server.ts
import { cookies } from "next/headers";
import { wooFetchWithNonce } from "@/lib/wooFetchWithNonce";
import { Checkout } from "@/types/checkout/checkout";

export async function getCheckoutServer(): Promise<Checkout> {
  // pobieramy cookies z requestu
  const cookieStore = await cookies(); // w SC Server Components synchroniczne
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  // fetch bezpośrednio do Woo z nonce
  const { data } = await wooFetchWithNonce<Checkout>("/checkout", {
    method: "GET",
    cookies: cookieHeader,
  });

  if (!data) {
    throw new Error("Checkout is null");
  }

  return data;
}
