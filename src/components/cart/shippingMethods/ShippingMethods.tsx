"use client";

import { useCart, useCartShippingRates } from "@/features/cart/hooks/cart.hooks";
import { formatPrice } from "@/utils/formatPrice";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ShippingLogo } from "./ShippingLogo";
import { getShippingProvider } from "./getShippingProvider";
import clsx from "clsx";
import { Check } from "lucide-react";
import { useState } from "react";
import { ParcelLockerModal } from "./ParcelLockerModal";

export function ShippingMethods() {
  const { setValue, watch } = useFormContext();
  const { selectShippingRate, isMutating } = useCart();
  const rates = useCartShippingRates();

  const selectedRate = watch("shippingRateId");
  const selectedParcelLocker = watch("paczkomat_id");

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        const provider = getShippingProvider(rate.rate_id);

        return (
          <label
            key={rate.rate_id}
            className={clsx(
              "flex items-center justify-between border-2 b gap-4 rounded-lg p-4 cursor-pointer transition",
              selectedRate === rate.rate_id
                ? "border-neutral-800"
                : "border-neutral-200 hover:border-neutral-400",
            )}
          >
            <div className="flex items-center gap-3 w-full">
              <input
                type="radio"
                className="sr-only peer"
                value={rate.rate_id}
                checked={selectedRate === rate.rate_id}
                disabled={isMutating}
                onChange={() => handleChange(rate.rate_id)}
              />
              <div
                className={clsx(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition",
                  "border-neutral-400",
                  "peer-checked:border-neutral-800 peer-checked:bg-neutral-800",
                  "peer-disabled:opacity-50 text-white",
                )}
              >
                {selectedRate === rate.rate_id && <Check strokeWidth={3} size={14} />}
              </div>
              <div className="text-sm">
                <span className="font-medium">{rate.name}</span> -{" "}
                <span className="text-sm font-semibold">{formatPrice(priceBrutto)}</span>
                <div className="text-xs">1-2 dni robocze</div>
                {rate.rate_id === "flexible_shipping_single:9" && (
                  <div className="mt-2 ml-8">
                    <button
                      type="button"
                      className="border rounded px-3 py-1 text-sm hover:bg-gray-100"
                      onClick={() => setIsModalOpen(true)}
                    >
                      {selectedParcelLocker
                        ? `Wybrany paczkomat: ${selectedParcelLocker}`
                        : "Wybierz paczkomat"}
                    </button>
                  </div>
                )}
              </div>
              <div className="ml-auto">
                <ShippingLogo provider={provider} />
              </div>
            </div>
          </label>
        );
      })}

      <ParcelLockerModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        token={process.env.NEXT_PUBLIC_GEOWIDGET_API!}
        onSelectPoint={(point) => {
          setValue("paczkomat_id", point.id);
          setValue("paczkomat_name", point.name); // opcjonalnie
        }}
      />
    </div>
  );
}
