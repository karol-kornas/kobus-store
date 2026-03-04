"use client";

import { useCart, useCartItems, useCartSummary } from "@/features/cart/hooks/cart.hooks";
import { formatPrice } from "@/utils/formatPrice";
import { CartItem } from "./CartItem";
import { ChevronDown, ShoppingCart, Tags } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { Button } from "@/components/ui/button/Button";
import { FormError } from "@/components/ui/form/formError/FormError";
import { useFormContext } from "react-hook-form";
import { CheckoutFormValues } from "@/features/cart/schemas/checkout.schema";
import { useState } from "react";
import { Input } from "@/components/ui/input/Input";
import { FormField } from "@/components/ui/formField/FormField";

export default function CartView() {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<CheckoutFormValues>();
  const { isMutating } = useCart();
  const items = useCartItems();
  const [productsOpen, setProductsOpen] = useState(true);
  const [couponOpen, setCouponOpen] = useState(false);

  const { productsGross, shippingGross, feesGross, totalGross, currency, savings } = useCartSummary();

  if (!items.length) return <p>Koszyk pusty</p>;

  return (
    <div>
      <div className="">
        <div
          className="flex items-center justify-between cursor-pointer px-6 pt-4 pb-4 "
          onClick={() => setProductsOpen(!productsOpen)}
        >
          <h3 className="flex items-center gap-3 text-lg font-semibold">
            <ShoppingCart width={26} height={26} /> Koszyk ({items.length})
          </h3>
          <div className="flex items-center gap-2">
            {formatPrice(totalGross, currency)}
            <ChevronDown className={`${productsOpen && "rotate-180"} transition-transform`} />
          </div>
        </div>
        <div
          className={`${productsOpen ? "block" : "hidden"} overflow-y-auto max-h-60.75 px-6 py-4 border-t border-neutral-200`}
        >
          <ul className="">
            {items.map((item) => (
              <li key={item.key}>
                <CartItem item={item} />
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-neutral-200">
          <button
            type="button"
            onClick={() => setCouponOpen(!couponOpen)}
            className="flex items-center gap-2 px-6 py-4 w-full cursor-pointer transition-colors"
          >
            <Tags /> {couponOpen ? "Wpisz kod promocyjny" : "Masz kod promocyjny?"}
            <ChevronDown className={`${couponOpen && "rotate-180"} transition-transform ml-auto`} />
          </button>
          <div className={`${couponOpen ? "flex" : "hidden"} px-6 py-4 gap-1 items-center`}>
            <FormField label="Kod promocyjny" htmlFor="couponCode">
              <Input id="couponCode" type="text" />
            </FormField>
            <Button type="button" disabled={isMutating} isLoading={isMutating}>
              Użyj
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-right border-t border-neutral-200 py-4 px-6">
          <div className="flex justify-between items-end">
            <span>Koszyk:</span>
            {isMutating ? (
              <Skeleton className="w-17 h-6" />
            ) : (
              <div className="flex flex-col gap-1">
                {savings > 0 && (
                  <div className="text-sm  px-2 bg-[#e6f2ca] text-[#00941c]">
                    <span>Oszczędzasz </span>
                    <span className="text-base">{formatPrice(savings, currency)}</span>
                  </div>
                )}
                <span>{formatPrice(productsGross, currency)}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <span>Dostawa:</span>
            {isMutating ? (
              <Skeleton className="w-12.5 h-6" />
            ) : (
              <span>{formatPrice(shippingGross, currency)}</span>
            )}
          </div>

          {feesGross?.map((fee) => (
            <div className="flex justify-between" key={fee.key}>
              <span>{fee.name}:</span>
              {isMutating ? (
                <Skeleton className="w-12.5 h-6" />
              ) : (
                <span>{formatPrice(fee.feeGross, currency)}</span>
              )}
            </div>
          ))}

          <div className="pt-3 mt-3 border-t border-neutral-200 border-dashed flex justify-between text-base font-semibold">
            <span>Do zapłaty:</span>
            {isMutating ? (
              <Skeleton className="w-17 h-6" />
            ) : (
              <span>{formatPrice(totalGross, currency)}</span>
            )}
          </div>
          <FormError message={errors.root?.message} variant="auth" />
          <Button className="w-full mt-4" disabled={isMutating} isLoading={isSubmitting} type="submit">
            Zamawiam i płacę
          </Button>
        </div>
      </div>
    </div>
  );
}
