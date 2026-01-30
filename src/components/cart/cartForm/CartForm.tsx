"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutFormValues, checkoutSchema } from "@/features/cart/schemas/checkout.schema";
import { FormProvider, useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox/Checkbox";
import { FormError } from "@/components/ui/form/formError/FormError";
import { Button } from "@/components/ui/button/Button";
import { useAuth } from "@/context/AuthContext";
import { useCartShippingRates } from "@/features/cart/hooks/cart.hooks";
import { useState } from "react";
import { ResponsiveModal } from "@/components/ui/responsiveModal/ResponsiveModal";
import { LoginForm } from "@/app/(shop)/login/LoginForm";
import { ShippingMethods } from "../shippingMethods/ShippingMethods";

import { CheckoutEmail } from "@/components/checkout/checkoutEmail/CheckoutEmail";
import { CheckoutShippingAddress } from "@/components/checkout/checkoutShippingAddress/CheckoutShippingAddress";

export function CartForm() {
  const { user } = useAuth();

  const shippingRates = useCartShippingRates();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const selectedRate = shippingRates?.find((r) => r.selected)?.rate_id;

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    defaultValues: {
      email: user ? user.email : "",
      shippingAddress: {
        phonePrefix: "+48",
        country: user?.billingAddress?.country ?? "PL",
        ...user?.billingAddress,
      },
      shippingRateId: selectedRate,
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
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
          <CheckoutEmail setIsLoginOpen={setIsLoginOpen} />
          <CheckoutShippingAddress />
          <div className="checkout-step rounded-lg bg-white p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.025),0_4px_6px_-4px_rgba(0,0,0,0.025)]">
            <h3
              className="before:content-[counter(order)] before:bg-cream before:font-bold  before:mr-3
           before:size-8 before:rounded-full before:inline-flex before:justify-center before:items-center
           font-semibold text-lg"
            >
              Dostawa
            </h3>
            <ShippingMethods />
          </div>
          <div className="checkout-step rounded-lg bg-white p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.025),0_4px_6px_-4px_rgba(0,0,0,0.025)]">
            <h3
              className="before:content-[counter(order)] before:bg-cream before:font-bold  before:mr-3
           before:size-8 before:rounded-full before:inline-flex before:justify-center before:items-center
           font-semibold text-lg"
            >
              Płatność
            </h3>
            <div className="py-2">
              <Checkbox
                id="accept_regulations"
                label="Oświadczam, że akceptuję regulamin sklepu i potwierdzam zapoznanie się z Polityką prywatności."
                required
                {...register("accept_regulations")}
              />
            </div>

            <FormError message={errors.root?.message} variant="auth" />

            <Button isLoading={isSubmitting} type="submit">
              Zamawiam i płacę
            </Button>
          </div>
        </form>
      </FormProvider>
      <ResponsiveModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} title="Logowanie">
        <LoginForm
          onSuccess={() => {
            setIsLoginOpen(false);
          }}
        />
      </ResponsiveModal>
    </>
  );
}
