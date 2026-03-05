import { apiClient } from "@/lib/apiClient";
import { ApiCart } from "@/types/cart/apiCart";
import { ApiCartCoupon } from "@/types/cart/apiCartCoupon";
import { CartMergeItem } from "@/types/cart/cartMergeItem";
import { CartShippingAddress } from "@/types/cart/cartShippingAddress";

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

export async function selectShippingRate(packageId: number, rateId: string): Promise<ApiCart> {
  const res = await apiClient.post<ApiCart>("/api/cart/select-shipping", {
    packageId,
    rateId,
  });

  return res.data;
}

export type UpdateCustomerPayload = {
  billing_address?: Partial<CartShippingAddress>;
  shipping_address?: Partial<CartShippingAddress>;
};

export async function updateCustomer(data: UpdateCustomerPayload): Promise<ApiCart> {
  const res = await apiClient.post("/api/cart/update-customer", data);
  return res.data;
}

export async function getCartCoupons(): Promise<ApiCartCoupon> {
  const res = await apiClient.get<ApiCartCoupon>("/api/cart/coupons");
  return res.data;
}

export async function addCartCoupon(code: string): Promise<ApiCartCoupon> {
  const res = await apiClient.post<ApiCartCoupon>("/api/cart/coupons", { code });
  return res.data;
}

export async function deleteCartCoupon(code: string): Promise<ApiCartCoupon> {
  const res = await apiClient.delete<ApiCartCoupon>(`/api/cart/coupons/${code}`);
  return res.data;
}
