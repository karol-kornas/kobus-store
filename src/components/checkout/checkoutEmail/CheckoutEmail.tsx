"use client";

import { useAuth } from "@/context/AuthContext";
import { useFormContext } from "react-hook-form";
import { LoggedInView } from "./LoggedInView";
import { FormField } from "@/components/ui/formField/FormField";
import { Input } from "@/components/ui/input/Input";
import { Dispatch, SetStateAction } from "react";
import { CheckoutFormValues } from "@/features/cart/schemas/checkout.schema";
import { Button } from "@/components/ui/button/Button";

type Props = {
  setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
};

export function CheckoutEmail({ setIsLoginOpen }: Props) {
  const { user } = useAuth();
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  return (
    <>
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
    </>
  );
}
