import { useCart } from "@/features/cart/hooks/cart.hooks";
import { useFormContext } from "react-hook-form";
import { PAYMENT_METHODS_BY_SHIPPING } from "@/components/checkout/shippingMethods/payment-per-shipping";

export function useAvailablePaymentMethods() {
  const { watch } = useFormContext();
  const { cart } = useCart();

  const shippingMethod = watch("shippingRateId");

  if (!cart) return [];

  let backendMethods = cart.payment_methods ?? [];

  if (!cart.needs_shipping) {
    backendMethods = [...backendMethods];
  } else if (!shippingMethod) {
    backendMethods = [];
  } else {
    const allowedForShipping = PAYMENT_METHODS_BY_SHIPPING[shippingMethod];
    if (!allowedForShipping) {
      backendMethods = [...backendMethods];
    } else {
      backendMethods = backendMethods.filter((method) => allowedForShipping.includes(method));
    }
  }

  const blikIndex = backendMethods.indexOf("przelewy24_extra_154");
  if (blikIndex > 0) {
    const blik = backendMethods.splice(blikIndex, 1)[0];
    backendMethods.unshift(blik);
  }

  return backendMethods;
}
