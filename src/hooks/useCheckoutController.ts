import { PAYMENT_METHODS_BY_SHIPPING } from "@/components/cart/shippingMethods/payment-per-shipping";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { CheckoutFormValues } from "@/features/cart/schemas/checkout.schema";
import { Cart } from "@/types/cart/cart";
import { useFormContext } from "react-hook-form";

export function useCheckoutController() {
  const form = useFormContext<CheckoutFormValues>();
  const { updateCustomer, selectShippingRate, updatePaymentMethod, selectedPaymentMethod } = useCart();

  const changeCountry = async (country: string) => {
    const cart = await updateCustomer({
      shipping_address: {
        country,
      },
      billing_address: {
        country,
      },
    });

    if (!cart) return;

    syncCheckoutWithCart(cart);
  };

  const changeShippingMethod = async (shippingMethod: string) => {
    const cart = await selectShippingRate(0, shippingMethod);

    if (!cart) return;

    syncCheckoutWithCart(cart);
  };

  function syncCheckoutWithCart(cart: Cart) {
    const rates = cart.shipping_rates?.[0]?.shipping_rates ?? [];
    const selectedRate = rates.find((r) => r.selected) ?? rates[0];

    if (!selectedRate) return;

    form.setValue("shippingRateId", selectedRate.rate_id);

    const backendPayments = cart.payment_methods ?? [];
    const allowed = PAYMENT_METHODS_BY_SHIPPING[selectedRate.rate_id] ?? backendPayments;

    const available = backendPayments.filter((m) => allowed.includes(m));

    if (!available.length) return;

    if (!available.includes(selectedPaymentMethod || form.getValues("paymentMethod"))) {
      form.setValue("paymentMethod", available[0]);
      updatePaymentMethod(available[0]);
    }
  }

  return {
    changeCountry,
    changeShippingMethod,
  };
}
