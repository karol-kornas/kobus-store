import CartView from "@/components/cart/cartView/CartView";
import { CheckoutFormWrap } from "@/components/checkout/checkoutForm/CheckoutFormWrap";
import { CheckoutProvider } from "@/context/CheckoutProvider";
import { getCheckoutServer } from "@/features/checkout/checkout.server";
import { getCountriesStatesServer } from "@/features/countriesStates/countriesStates";

export default async function CheckoutPage() {
  const [checkout, countriesStates] = await Promise.all([getCheckoutServer(), getCountriesStatesServer()]);

  console.log(checkout);
  console.log(countriesStates);

  return (
    <CheckoutProvider initialCheckout={checkout} countriesStates={countriesStates}>
      <div className="container max-sm:px-0 max-w-5xl grid lg:grid-cols-[540fr_325fr] gap-8">
        <div className="flex flex-col gap-8 max-lg:order-2">
          <CheckoutFormWrap />
        </div>
        <div>
          <div className="lg:sticky lg:top-10 bg-white rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.025),0_4px_6px_-4px_rgba(0,0,0,0.025)] p-6">
            <CartView />
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
}
