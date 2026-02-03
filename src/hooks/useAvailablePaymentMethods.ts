import { PAYMENT_METHODS_BY_SHIPPING } from "@/components/cart/shippingMethods/payment-per-shipping";
import { useFormContext } from "react-hook-form";

export function useAvailablePaymentMethods() {
  const { watch } = useFormContext();

  const shippingMethod = watch("shippingRateId");

  if (!shippingMethod) return [];

  return PAYMENT_METHODS_BY_SHIPPING[shippingMethod] ?? [];
}
