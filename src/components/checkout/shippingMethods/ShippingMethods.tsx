"use client";

import { useCart, useCartShippingRates } from "@/features/cart/hooks/cart.hooks";
import { formatPrice } from "@/utils/formatPrice";
import { useFormContext } from "react-hook-form";
import { ShippingLogo } from "./ShippingLogo";
import { getShippingProvider } from "./getShippingProvider";
import clsx from "clsx";
import { Check } from "lucide-react";
import { useState } from "react";
import { ParcelLockerModal, ParcelLockerPoint } from "./ParcelLockerModal";
import { Button } from "@/components/ui/button/Button";
import { useCheckoutController } from "@/hooks/useCheckoutController";
import { PARCEL_LOCKER_RATE_ID } from "@/features/cart/schemas/checkout.schema";

export function ShippingMethods() {
  const { setValue, watch } = useFormContext();
  const { isMutating } = useCart();
  const rates = useCartShippingRates();
  const { changeShippingMethod } = useCheckoutController();

  const selectedRate = watch("shippingRateId");
  const [selectedParcelLocker, setSelectedParcelLocker] = useState<ParcelLockerPoint | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (!rates) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-semibold">Brak metod dostawy</h3>
        <p>Dla wybranych produktów dostawa nie jest potrzebna</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-md border border-neutral-200 mt-5">
      {rates.map((rate) => {
        const priceBrutto = (rate.price || 0) + (rate.taxes || 0);
        const provider = getShippingProvider(rate.rate_id);

        return (
          <label
            key={rate.rate_id}
            className={clsx(
              "flex items-center rounded-md justify-between gap-4 p-4 cursor-pointer transition",
              selectedRate === rate.rate_id ? "border border-neutral-800" : "hover:bg-neutral-50",
            )}
          >
            <div className="flex items-center gap-3 w-full">
              <input
                type="radio"
                className="sr-only peer"
                value={rate.rate_id}
                checked={selectedRate === rate.rate_id}
                disabled={isMutating}
                onChange={() => {
                  setValue("shippingRateId", rate.rate_id, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  if (rate.rate_id !== PARCEL_LOCKER_RATE_ID) {
                    setValue("paczkomat_id", undefined, {
                      shouldValidate: true,
                    });
                    setSelectedParcelLocker(null);
                  }
                  changeShippingMethod(rate.rate_id);
                }}
              />
              <div
                className={clsx(
                  "flex flex-none h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition",
                  "border-neutral-400",
                  "peer-checked:border-neutral-800 peer-checked:bg-neutral-800",
                  "peer-disabled:opacity-50 text-white",
                )}
              >
                {selectedRate === rate.rate_id && <Check strokeWidth={3} size={14} />}
              </div>
              <div className="text-sm">
                <span className="font-medium sm:text-base">{rate.name}</span> -{" "}
                <span className="text-sm font-semibold">{formatPrice(priceBrutto)}</span>
                <div className="text-xs">1-2 dni robocze</div>
                {rate.rate_id === PARCEL_LOCKER_RATE_ID && (
                  <div className="mt-2">
                    <input
                      type="text"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="sr-only"
                      {...register("paczkomat_id")}
                    />
                    {selectedParcelLocker ? (
                      <button
                        type="button"
                        className="flex w-full items-end justify-between bg-cream text-sm py-1 px-3 text-left cursor-pointer hover:opacity-85 "
                        onClick={() => setIsModalOpen(true)}
                      >
                        <div>
                          <strong>{selectedParcelLocker.name}</strong> <br />
                          <span className="text-xs">{selectedParcelLocker.address?.line1}</span> <br />
                          <span className="text-xs">{selectedParcelLocker.address?.line2}</span>
                        </div>
                        <span className="ml-6">Zmień</span>
                      </button>
                    ) : (
                      <>
                        <Button type="button" size="sm" onClick={() => setIsModalOpen(true)}>
                          Wybierz paczkomat
                        </Button>
                        {errors.paczkomat_id && (
                          <p className="mt-1 text-xs text-red-600">{errors.paczkomat_id.message as string}</p>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="ml-auto flex-none">
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
        onSelectPoint={async (point) => {
          setSelectedParcelLocker(point);
          setValue("paczkomat_id", point.name, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });
        }}
      />
    </div>
  );
}
