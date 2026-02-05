"use client";

import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { normalizePaymentMethod } from "./normalizePaymentMethod";
import Image from "next/image";
import { Check } from "lucide-react";
import { useAvailablePaymentMethods } from "@/hooks/useAvailablePaymentMethods";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { getCheckout } from "@/features/checkout/checkout.client";
import { useEffect, useRef } from "react";

export function PaymentMethods() {
  const initialized = useRef(false);
  const { watch, setValue, register } = useFormContext();
  const selected = watch("paymentMethod");
  const paymentMethods = useAvailablePaymentMethods();
  const { updatePaymentMethod, isMutating } = useCart();

  useEffect(() => {
    if (!paymentMethods?.length) return;

    // jeśli aktualna metoda jest nadal OK → nic nie rób
    if (selected && paymentMethods.includes(selected)) return;

    const nextMethod = paymentMethods[0];

    (async () => {
      try {
        await updatePaymentMethod(nextMethod);

        setValue("paymentMethod", nextMethod, {
          shouldDirty: true,
          shouldValidate: true,
        });
      } catch (err) {
        console.error("Nie udało się zsynchronizować metody płatności", err);
      }
    })();
  }, [paymentMethods, selected, updatePaymentMethod, setValue]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    (async () => {
      try {
        const checkout = await getCheckout();

        if (checkout?.payment_method && !selected) {
          setValue("paymentMethod", checkout.payment_method, {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: false,
          });
        }
      } catch (err) {
        console.error("Nie udało się pobrać checkoutu", err);
      }
    })();
  }, [setValue, selected]);

  if (!paymentMethods) return <div>Brak metod płatności dla wybranych produktów</div>;

  return (
    <div className="flex flex-col gap-3 mt-5">
      <input type="hidden" {...register("paymentMethod")} />
      {paymentMethods.map((id) => {
        const method = normalizePaymentMethod(id);

        return (
          <label
            key={id}
            className={clsx(
              "flex items-center gap-4 rounded-md border-2 p-4 cursor-pointer transition",
              selected === id ? "border-neutral-800" : "border-neutral-200 hover:border-neutral-400",
            )}
          >
            <input
              type="radio"
              className="sr-only peer"
              value={id}
              checked={selected === id}
              disabled={isMutating}
              onChange={async () => {
                setValue("paymentMethod", id);
                try {
                  await updatePaymentMethod(id);
                } catch (err) {
                  console.error("Nie udało się zaktualizować metody płatności", err);
                } finally {
                }
              }}
            />

            <div
              className="flex  flex-none h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 
            peer-checked:border-neutral-800 peer-checked:bg-neutral-800 peer-disabled:opacity-50 text-white"
            >
              {selected === id && <Check strokeWidth={3} size={14} />}
            </div>

            <div className="flex flex-col">
              <span className="font-medium">{method.label}</span>
              {method.description && <span className="text-xs text-neutral-500">{method.description}</span>}
            </div>

            <Image
              src={method.logo.src}
              alt={method.logo.alt}
              width={78}
              height={78}
              className="object-contain ml-auto"
            />
          </label>
        );
      })}
    </div>
  );
}
