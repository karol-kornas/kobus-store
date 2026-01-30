"use client";

import { useCart, useCartShippingRates } from "@/features/cart/hooks/cart.hooks";
import { formatPrice } from "@/utils/formatPrice";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export function ShippingMethods() {
  const { setValue, watch } = useFormContext();
  const { selectShippingRate, isMutating } = useCart();
  const rates = useCartShippingRates();

  const selectedRate = watch("shippingRateId");

  useEffect(() => {
    if (selectedRate || !rates) return;

    const preselected = rates.find((r) => r.selected);
    if (!preselected) return;

    setValue("shippingRateId", preselected.rate_id, {
      shouldDirty: false,
      shouldTouch: false,
    });
  }, [rates, selectedRate, setValue]);

  const handleChange = (rateId: string) => {
    setValue("shippingRateId", rateId, { shouldDirty: true });
    selectShippingRate(0, rateId);
  };

  if (!rates) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-semibold">Brak metod dostawy</h3>
        <p>Dla wybranych produktów dostawa nie jest potrzebna</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 mt-5">
      {rates.map((rate) => {
        const priceBrutto = (rate.price || 0) + (rate.taxes || 0);
        return (
          <label
            key={rate.rate_id}
            className="flex items-center justify-between gap-4 rounded-md border p-4 cursor-pointer hover:border-black transition"
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                value={rate.rate_id}
                checked={selectedRate === rate.rate_id}
                disabled={isMutating}
                onChange={() => handleChange(rate.rate_id)}
              />

              <span className="font-medium">{rate.name}</span>
            </div>

            <span className="text-sm font-semibold">{formatPrice(priceBrutto)}</span>
          </label>
        );
      })}
    </div>
  );
}
