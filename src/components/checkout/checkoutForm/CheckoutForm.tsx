"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutFormValues, checkoutSchema } from "@/features/cart/schemas/checkout.schema";
import { FormProvider, useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox/Checkbox";
import { useAuth } from "@/context/AuthContext";
import {
  useCartBillingAddress,
  useCartShippingAddress,
  useCartShippingRates,
} from "@/features/cart/hooks/cart.hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ResponsiveModal } from "@/components/ui/responsiveModal/ResponsiveModal";
import { LoginForm } from "@/app/(shop)/login/LoginForm";

import { CheckoutEmail } from "@/components/checkout/checkoutEmail/CheckoutEmail";
import { CheckoutShippingAddress } from "@/components/checkout/checkoutShippingAddress/CheckoutShippingAddress";
import { PaymentMethods } from "@/components/checkout/paymentMethods/PaymentMethods";
import { placeOrderCheckout, toCheckoutPaymentMethod } from "@/features/checkout/checkout.client";
import { useRouter } from "next/navigation";
import { ShippingMethods } from "@/components/checkout/shippingMethods/ShippingMethods";
import { useCheckoutContext } from "@/context/CheckoutProvider";
import { splitPhoneNumber } from "@/utils/phone";
import CartView from "@/components/cart/cartView/CartView";
import { CheckoutStep } from "../checkoutStep/CheckoutStep";

type Props = {
  setCartFormKey: Dispatch<SetStateAction<number>>;
};

export function CheckoutForm({ setCartFormKey }: Props) {
  const { user } = useAuth();
  const { initialCheckout } = useCheckoutContext();
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const shippingAddress = useCartShippingAddress();
  const billingAddress = useCartBillingAddress();

  const shippingRates = useCartShippingRates();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const selectedRate = shippingRates?.find((r) => r.selected)?.rate_id;

  const { phonePrefix, phone } = splitPhoneNumber(billingAddress?.phone);

  console.log(phonePrefix);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      email: user ? user.email : "",
      shippingAddress: {
        ...shippingAddress,
        phone,
        phonePrefix: phonePrefix ?? "+48",
        country: shippingAddress?.country,
      },
      shippingRateId: selectedRate,
      paymentMethod:
        initialCheckout.payment_method === "przelewy24"
          ? "przelewy24_extra_154"
          : initialCheckout.payment_method,
    },
  });

  const { register, handleSubmit, setError } = form;

  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  const onSubmit = async (data: CheckoutFormValues) => {
    const payload = {
      billing_address: {
        first_name: data.shippingAddress?.firstName || "",
        last_name: data.shippingAddress?.lastName || "",
        company: "",
        address_1: data.shippingAddress?.street || "",
        address_2: "",
        city: data.shippingAddress?.city || "",
        state: data.shippingAddress?.state || "",
        postcode: data.shippingAddress?.postcode || "",
        country: data.shippingAddress?.country || "",
        email: data.email || "",
        phone: (data.shippingAddress?.phonePrefix || "") + (data.shippingAddress?.phone || ""),
      },
      shipping_address: {
        first_name: data.shippingAddress?.firstName || "",
        last_name: data.shippingAddress?.lastName || "",
        company: "",
        address_1: data.shippingAddress?.street || "",
        address_2: "",
        city: data.shippingAddress?.city || "",
        state: data.shippingAddress?.state || "",
        postcode: data.shippingAddress?.postcode || "",
        country: data.shippingAddress?.country || "",
        phone: (data.shippingAddress?.phonePrefix || "") + (data.shippingAddress?.phone || ""),
      },
      customer_note: "",
      create_account: false,
      payment_method: toCheckoutPaymentMethod(data.paymentMethod) || "",
      payment_data: [],
      extensions: {
        "woocommerce-paczkomaty-inpost": {
          paczkomat_id: data.paczkomat_id || "",
        },
      },
    };
    console.log("data:", data);
    try {
      console.log("payload:", payload);
      const res = await placeOrderCheckout(payload);
      console.log(res);
      if (res.payment_result?.redirect_url) {
        if (res.payment_method === "cod") {
          router.push(`/checkout/order-complete?order_id=${res.order_id}&order_key=${res.order_key}`);
        } else {
          setRedirectUrl(res.payment_result.redirect_url);
        }
      }
    } catch (err) {
      setError("root", {
        message: (err as Error).message,
      });
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="container max-sm:px-0 max-w-5xl grid lg:grid-cols-[540fr_325fr] gap-8">
            <div className="flex flex-col gap-8">
              <CheckoutStep title={user ? "Jesteś zalogowany jako" : "Podaj adres e-mail"}>
                <CheckoutEmail setIsLoginOpen={setIsLoginOpen} />
              </CheckoutStep>

              <CheckoutStep title="Adres dostawy">
                <CheckoutShippingAddress />
              </CheckoutStep>

              <CheckoutStep title="Dostawa">
                <ShippingMethods />
              </CheckoutStep>

              <CheckoutStep title="Płatność">
                <PaymentMethods />
              </CheckoutStep>

              <CheckoutStep title="Zgody i oświadczenia">
                <div className="mt-4">
                  <Checkbox
                    id="accept_regulations"
                    label="Oświadczam, że akceptuję regulamin sklepu i potwierdzam zapoznanie się z Polityką prywatności."
                    required
                    {...register("accept_regulations")}
                  />
                </div>
              </CheckoutStep>
            </div>
            <div>
              <div className="lg:sticky lg:top-10 bg-white rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.025),0_4px_6px_-4px_rgba(0,0,0,0.025)]">
                <CartView />
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
      <ResponsiveModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} title="Logowanie">
        <LoginForm
          onSuccess={() => {
            setIsLoginOpen(false);
            setCartFormKey((k) => k + 1);
          }}
        />
      </ResponsiveModal>
    </>
  );
}
