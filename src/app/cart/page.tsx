import CartView from "@/components/cart/cartView/CartView";
import { FreeShippingNotice } from "@/components/cart/freeShippingNotice/FreeShippingNotice";
import { FormField } from "@/components/ui/formField/FormField";
import { Input } from "@/components/ui/input/Input";
import Link from "next/link";

export default function CartPage() {
  return (
    <div className="container max-w-5xl grid lg:grid-cols-[540fr_325fr] gap-8 mt-2">
      <div className="flex flex-col gap-8 max-lg:order-2">
        <div className="checkout-step rounded-lg bg-white p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.025),0_4px_6px_-4px_rgba(0,0,0,0.025)]">
          <h3
            className="before:content-[counter(order)] before:bg-cream before:font-bold  before:mr-3
           before:size-8 before:rounded-full before:inline-flex before:justify-center before:items-center
           font-semibold text-lg"
          >
            Podaj adres e-mail
          </h3>
          <p className="text-sm text-neutral-500 ml-11.5">
            Masz już konto?{" "}
            <Link href="#" className="text-neutral-800 underline font-semibold hover:opacity-85">
              Zaloguj się
            </Link>
          </p>
          <div className="mt-5">
            <FormField label="Adres e-mail" htmlFor="email" required>
              <Input id="email" type="email" required />
            </FormField>
          </div>
        </div>
        <div className="checkout-step rounded-lg bg-white p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.025),0_4px_6px_-4px_rgba(0,0,0,0.025)]">
          <h3
            className="before:content-[counter(order)] before:bg-cream before:font-bold  before:mr-3
           before:size-8 before:rounded-full before:inline-flex before:justify-center before:items-center
           font-semibold text-lg"
          >
            Adres dostawy
          </h3>
          <div className="mt-6 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-6">
              <FormField label="Imię" htmlFor="name" required>
                <Input id="name" type="text" required />
              </FormField>
              <FormField label="Nazwisko" htmlFor="surname" required>
                <Input id="surname" type="text" required />
              </FormField>
            </div>
            <FormField label="Numer telefonu" htmlFor="phone" required>
              <Input id="phone" type="text" required />
            </FormField>
          </div>
        </div>
      </div>
      <div>
        <div className="lg:sticky lg:top-10 bg-white rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.025),0_4px_6px_-4px_rgba(0,0,0,0.025)] p-6">
          <CartView />
        </div>
      </div>
    </div>
  );
}
