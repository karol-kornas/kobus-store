import { cookies } from "next/headers";
import { wooStoreFetch } from "@/lib/wooStoreFetch";
import { Cart } from "@/types/cart/cart";
import { ApiCart } from "@/types/cart/apiCart";

export async function getCartServer() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const { data } = await wooStoreFetch<ApiCart>("/cart", {
    method: "GET",
    cookies: cookieHeader,
  });

  return data;
}
