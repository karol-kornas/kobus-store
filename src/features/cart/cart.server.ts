import { cookies } from "next/headers";
import { wooStoreFetch } from "@/lib/wooStoreFetch";
import { Cart } from "@/types/cart/cart";

export async function getCartServer() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const { data } = await wooStoreFetch<Cart>("/cart", {
    method: "GET",
    cookies: cookieHeader,
  });

  return data;
}
