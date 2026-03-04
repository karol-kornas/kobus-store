import { CheckoutFormWrap } from "@/components/checkout/checkoutForm/CheckoutFormWrap";
import { CheckoutProvider } from "@/context/CheckoutProvider";
import { getCheckoutServer } from "@/features/checkout/checkout.server";
import { getCountriesStatesServer } from "@/features/countriesStates/countriesStates";

export default async function CheckoutPage() {
  const [checkout, countriesStates] = await Promise.all([getCheckoutServer(), getCountriesStatesServer()]);

  return (
    <CheckoutProvider initialCheckout={checkout} countriesStates={countriesStates}>
      <CheckoutFormWrap />
    </CheckoutProvider>
  );
}
