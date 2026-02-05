import { apiClient } from "@/lib/apiClient";
import { ApiCartBillingAddress } from "@/types/cart/cartBillingAddress";
import { ApiCartShippingAddress } from "@/types/cart/cartShippingAddress";
import { Checkout } from "@/types/checkout/checkout";

export type UpdateCheckoutPayload = {
  payment_method?: string;
  order_notes?: string;
  additional_fields?: Record<string, unknown>;
};

export async function getCheckout(): Promise<Checkout> {
  const res = await apiClient.get("/api/checkout");
  return res.data;
}

export async function updateCheckout(payload: UpdateCheckoutPayload): Promise<Checkout> {
  const res = await apiClient.put("/api/checkout", payload);
  return res.data;
}

export const toCheckoutPaymentMethod = (uiMethod: string) => {
  if (uiMethod.startsWith("przelewy24_extra_")) {
    return "przelewy24";
  }
  return uiMethod;
};

export async function updatePaymentMethod(payment_method: string): Promise<Checkout> {
  const res = await apiClient.put("/api/checkout", {
    payment_method: toCheckoutPaymentMethod(payment_method),
  });
  return res.data;
}

export async function placeOrderCheckout(payload: {
  billing_address: ApiCartBillingAddress;
  shipping_address: ApiCartShippingAddress;
  payment_method: string;
  paczkomat_id?: string;
  customer_note?: string;
  create_account?: boolean;
}): Promise<Checkout> {
  const res = await apiClient.post("/api/checkout", payload);
  return res.data;
}
