"use client";

import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { normalizePaymentMethod } from "./normalizePaymentMethod";
import { useCartPaymentMethods } from "@/features/cart/hooks/cart.hooks";

export function PaymentMethods() {
  const { watch, setValue } = useFormContext();
  const selected = watch("paymentMethod");
  const paymentMethods = useCartPaymentMethods();

  if (!paymentMethods) return <div>Brak metod płatności dla wybranych produktów</div>;

  return (
    <div className="flex flex-col gap-3 mt-5">
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
              onChange={async () => {
                setValue("paymentMethod", id);
              }}
            />

            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 peer-checked:border-neutral-800 peer-checked:bg-neutral-800">
              <div className="h-2 w-2 rounded-full bg-white scale-0 peer-checked:scale-100 transition" />
            </div>

            <div className="flex flex-col">
              <span className="font-medium">{method.label}</span>
              {method.description && <span className="text-xs text-neutral-500">{method.description}</span>}
            </div>
          </label>
        );
      })}
    </div>
  );
}
