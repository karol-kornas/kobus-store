"use client";

import { useCart, useCartItems, useCartSummary } from "@/features/cart/hooks/cart.hooks";
import { formatPrice } from "@/utils/formatPrice";
import { CartItem } from "./CartItem";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { Button } from "@/components/ui/button/Button";
import { FormError } from "@/components/ui/form/formError/FormError";
import { useFormContext } from "react-hook-form";
import { CheckoutFormValues } from "@/features/cart/schemas/checkout.schema";
import { useState } from "react";
import { CartCoupons } from "./cartCoupons";
import { CouponForm } from "./CouponForm";

export default function CartView() {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<CheckoutFormValues>();
  const { isMutating, coupons } = useCart();
  const items = useCartItems();
  const [productsOpen, setProductsOpen] = useState(false);

  const { productsGross, shippingGross, feesGross, totalGross, currency, savings, regularProductsGross } =
    useCartSummary();

  if (!items.length) return <p>Koszyk pusty</p>;

  return (
    <div>
      <div className="">
        <div
          className="flex items-center justify-between cursor-pointer px-6 pt-4 pb-4 "
          onClick={() => setProductsOpen(!productsOpen)}
        >
          <h3 className="flex items-center gap-3 text-lg font-semibold">
            <ShoppingCart width={24} height={24} /> Koszyk ({items.length})
          </h3>
          <ChevronDown className={`${productsOpen && "rotate-180"} transition-transform`} />
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

        <CouponForm />

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
                <div>
                  {regularProductsGross > productsGross && (
                    <span className="text-xs font-normal line-through mr-1">
                      {formatPrice(regularProductsGross, currency)}
                    </span>
                  )}

                  {formatPrice(productsGross, currency)}
                </div>
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

          {coupons.length ? (
            <div className="flex justify-between items-start">
              <span>Kupon:</span>
              {isMutating ? <Skeleton className="w-12.5 h-6" /> : <CartCoupons />}
            </div>
          ) : (
            ""
          )}

          <div className="pt-3 mt-3 border-t border-neutral-300 border-dashed flex items-center justify-between text-base font-semibold">
            <span>Do zapłaty:</span>
            {isMutating ? (
              <Skeleton className="w-17 h-6" />
            ) : (
              <span className="text-lg">{formatPrice(totalGross, currency)}</span>
            )}
          </div>
          <FormError message={errors.root?.message} variant="auth" />
          <Button
            className="w-full text-lg mt-4"
            variant="green"
            disabled={isMutating}
            isLoading={isSubmitting}
            type="submit"
          >
            Zamawiam i płacę
          </Button>
        </div>
      </div>
    </div>
  );
}
