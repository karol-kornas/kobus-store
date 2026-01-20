import { apiClient } from "@/lib/apiClient";
import { ApiCart } from "@/types/cart/apiCart";
import { CartMergeItem } from "@/types/cart/cartMergeItem";

export async function getCart(): Promise<ApiCart> {
  const res = await apiClient.get<ApiCart>("/api/cart");
  return res.data;
}

export async function addToCart(id: number, quantity = 1): Promise<ApiCart> {
  const res = await apiClient.post<ApiCart>("/api/cart/add", {
    id,
    quantity,
  });

  return res.data;
}

export async function removeFromCart(key: string): Promise<ApiCart> {
  const res = await apiClient.post<ApiCart>("/api/cart/remove", { key });
  return res.data;
}

export async function updateCartItem(key: string, quantity: number): Promise<ApiCart> {
  const res = await apiClient.post<ApiCart>("/api/cart/update", {
    key,
    quantity,
  });

  return res.data;
}

export async function bootstrapCart(): Promise<ApiCart> {
  const res = await apiClient.post<ApiCart>("/api/cart/bootstrap");
  return res.data;
}

export async function mergeCartApi(items: CartMergeItem[]): Promise<ApiCart> {
  const payload = {
    merge_id: crypto.randomUUID(),
    items,
  };

  const res = await apiClient.post<ApiCart>("/api/cart/merge", payload);
  return res.data;
}
