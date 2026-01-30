"use client";

import { useAuth } from "@/context/AuthContext";
import { useFormContext } from "react-hook-form";
import { LoggedInView } from "./LoggedInView";
import { FormField } from "@/components/ui/formField/FormField";
import { Input } from "@/components/ui/input/Input";
import { Dispatch, SetStateAction, useEffect } from "react";
import { CheckoutFormValues } from "@/features/cart/schemas/checkout.schema";
import { Button } from "@/components/ui/button/Button";

type Props = {
  setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
};

export function CheckoutEmail({ setIsLoginOpen }: Props) {
  const { user } = useAuth();
  const {
    setValue,
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  useEffect(() => {
    if (!user?.email) return;

    setValue("email", user.email, {
      shouldDirty: false,
      shouldTouch: false,
    });
    setValue("shippingAddress", user.billingAddress, {
      shouldDirty: false,
      shouldTouch: false,
    });
    clearErrors(["email", "shippingAddress"]);
  }, [user?.email, user?.billingAddress, setValue, clearErrors]);

  return (
    <div className="checkout-step rounded-lg bg-white p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.025),0_4px_6px_-4px_rgba(0,0,0,0.025)]">
      <h3
        className="before:content-[counter(order)] before:bg-cream before:font-bold  before:mr-3
           before:size-8 before:rounded-full before:inline-flex before:justify-center before:items-center
           font-semibold text-lg"
      >
        {user ? "Jesteś zalogowany jako" : "Podaj adres e-mail"}
      </h3>
      {user ? (
        <LoggedInView email={user.email} />
      ) : (
        <>
          <p className="flex gap-2 items-center text-sm text-neutral-500 ml-11.5">
            Masz już konto?{" "}
            <Button
              size="xs"
              variant={"secondary"}
              onClick={(e) => {
                e.preventDefault();
                setIsLoginOpen(true);
              }}
            >
              Zaloguj się
            </Button>
          </p>
          <div className="mt-5">
            <FormField label="Adres e-mail" htmlFor="email" required error={errors.email?.message}>
              <Input id="email" type="email" error={!!errors.email} required {...register("email")} />
            </FormField>
          </div>
        </>
      )}
    </div>
  );
}
