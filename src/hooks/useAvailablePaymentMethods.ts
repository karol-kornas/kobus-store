import { useCart } from "@/features/cart/hooks/cart.hooks";
import { useFormContext } from "react-hook-form";
import { PAYMENT_METHODS_BY_SHIPPING } from "@/components/cart/shippingMethods/payment-per-shipping";

export function useAvailablePaymentMethods() {
  const { watch } = useFormContext();
  const { cart } = useCart();

  const shippingMethod = watch("shippingRateId");

  if (!cart) return [];

  const backendMethods = cart.payment_methods ?? [];

  if (!cart.needs_shipping) {
    return backendMethods;
  }
  if (!shippingMethod) return [];

  const allowedForShipping = PAYMENT_METHODS_BY_SHIPPING[shippingMethod];

  if (!allowedForShipping) {
    return backendMethods;
  }

  return backendMethods.filter((method) => allowedForShipping.includes(method));
}
