import { apiClient } from "@/lib/apiClient";

export async function getCart() {
  const res = await apiClient.get("/api/cart");
  return res.data;
}

export async function addToCart(id: number, quantity = 1) {
  const res = await apiClient.post("/api/cart/add", {
    id,
    quantity,
  });

  return res.data;
}

export async function removeFromCart(key: string) {
  const res = await apiClient.post("/api/cart/remove", { key });
  return res.data;
}

export async function updateCartItem(key: string, quantity: number) {
  const res = await apiClient.post("/api/cart/update", {
    key,
    quantity,
  });

  return res.data;
}
