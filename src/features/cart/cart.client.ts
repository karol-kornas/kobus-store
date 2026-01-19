import { apiClient } from "@/lib/apiClient";
import { Cart } from "@/types/cart/cart";
import { CartMergeItem } from "@/types/cart/cartMergeItem";

export async function getCart(): Promise<Cart> {
  const res = await apiClient.get<Cart>("/api/cart");
  return res.data;
}

export async function addToCart(id: number, quantity = 1): Promise<Cart> {
  const res = await apiClient.post<Cart>("/api/cart/add", {
    id,
    quantity,
  });

  return res.data;
}

export async function removeFromCart(key: string): Promise<Cart> {
  const res = await apiClient.post<Cart>("/api/cart/remove", { key });
  return res.data;
}

export async function updateCartItem(key: string, quantity: number): Promise<Cart> {
  const res = await apiClient.post<Cart>("/api/cart/update", {
    key,
    quantity,
  });

  return res.data;
}

export async function bootstrapCart(): Promise<Cart> {
  const res = await apiClient.post<Cart>("/api/cart/bootstrap");
  return res.data;
}

export async function mergeCartApi(items: CartMergeItem[]): Promise<Cart> {
  const payload = {
    merge_id: crypto.randomUUID(),
    items,
  };

  const res = await apiClient.post<Cart>("/api/cart/merge", payload);
  return res.data;
}
