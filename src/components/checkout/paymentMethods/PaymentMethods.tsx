"use client";

import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { normalizePaymentMethod } from "./normalizePaymentMethod";
import Image from "next/image";
import { Check } from "lucide-react";
import { useAvailablePaymentMethods } from "@/hooks/useAvailablePaymentMethods";
import { useCart } from "@/features/cart/hooks/cart.hooks";

export function PaymentMethods() {
  const { watch, setValue } = useFormContext();
  const selected = watch("paymentMethod");
  const paymentMethods = useAvailablePaymentMethods();
  const { updatePaymentMethod, isMutating } = useCart();

  if (!paymentMethods) {
    return <div>Brak metod płatności dla wybranych produktów</div>;
  }

  return (
    <div className="flex flex-col rounded-md border border-neutral-200 mt-5">
      {paymentMethods.map((id) => {
        const method = normalizePaymentMethod(id);

        return (
          <label
            key={id}
            className={clsx(
              "flex rounded-md items-center gap-4 p-4 cursor-pointer transition",
              selected === id ? "border border-neutral-800" : "hover:bg-neutral-50",
            )}
          >
            <input
              type="radio"
              className="sr-only peer"
              value={id}
              checked={selected === id}
              disabled={isMutating}
              onChange={() => {
                setValue("paymentMethod", id, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
                updatePaymentMethod(id);
              }}
            />

            <div
              className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 flex-none
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
