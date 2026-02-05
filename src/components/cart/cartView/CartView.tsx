"use client";

import { useCart, useCartItems, useCartSummary } from "@/features/cart/hooks/cart.hooks";
import { formatPrice } from "@/utils/formatPrice";
import { CartItem } from "./CartItem";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export default function CartView() {
  const { isMutating } = useCart();
  const items = useCartItems();

  const { productsGross, shippingGross, feesGross, totalGross, currency } = useCartSummary();

  const [open, setOpen] = useState(true);

  if (!items.length) return <p>Koszyk pusty</p>;

  return (
    <div>
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <h3 className="flex items-center gap-3 text-lg font-semibold">
          <ShoppingCart width={26} height={26} /> Koszyk ({items.length})
        </h3>
        <div className="flex items-center gap-2">
          {formatPrice(totalGross, currency)}
          <ChevronDown className={`${open && "rotate-180"} transition-transform`} />
        </div>
      </div>
      <div className={`${open ? "block" : "hidden"} mt-4`}>
        <ul className="">
          {items.map((item) => (
            <li key={item.key}>
              <CartItem item={item} />
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-1 mt-4 text-right border-t border-neutral-100 pt-4">
          <div className="flex justify-between">
            <span>Produkty (brutto):</span>
            {isMutating ? (
              <Skeleton className="w-17 h-6" />
            ) : (
              <span>{formatPrice(productsGross, currency)}</span>
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

          <div className="pt-3 mt-3 border-t border-neutral-100 flex justify-between text-base font-semibold">
            <span>Suma:</span>
            {isMutating ? (
              <Skeleton className="w-17 h-6" />
            ) : (
              <span>{formatPrice(totalGross, currency)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
