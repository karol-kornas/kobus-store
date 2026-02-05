"use client";

import { useCartItems, useCartSummary } from "@/features/cart/hooks/cart.hooks";
import { formatPrice } from "@/utils/formatPrice";
import { CartItem } from "./CartItem";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function CartView() {
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

        <div className="mt-4 text-right border-t border-neutral-100 pt-4">
          <p className="flex justify-between">
            <span>Produkty (brutto):</span>
            <span>{formatPrice(productsGross, currency)}</span>
          </p>

          <p className="flex justify-between">
            <span>Dostawa:</span>
            <span>{formatPrice(shippingGross, currency)}</span>
          </p>

          {feesGross?.map((fee) => (
            <p className="flex justify-between" key={fee.key}>
              <span>{fee.name}:</span>
              <span>{formatPrice(fee.feeGross, currency)}</span>
            </p>
          ))}

          <p className="pt-3 mt-3 border-t border-neutral-100 flex justify-between text-base font-semibold">
            <span>Suma:</span>
            <span>{formatPrice(totalGross, currency)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
