"use client";

import { useCart, useCartItems, useCartTotals } from "@/features/cart/hooks/cart.hooks";
import { formatPrice } from "@/utils/formatPrice";
import { CartItem } from "./CartItem";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function CartView() {
  const items = useCartItems();
  const { totalPrice, currency } = useCartTotals();
  const { cart, isSyncing } = useCart();
  const [open, setOpen] = useState(true);

  if (isSyncing && !items.length) return <p>Ładowanie...</p>;
  if (!items.length) return <p>Koszyk pusty</p>;

  const productsGross = (cart!.totals.total_items ?? 0) + (cart!.totals.total_items_tax ?? 0);

  const shipping = cart!.totals.total_shipping ?? 0;
  const total = cart!.totals.total_price ?? 0;

  return (
    <div>
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <h3 className="flex items-center gap-3 text-lg font-semibold">
          <ShoppingCart width={26} height={26} /> Koszyk ({items.length})
        </h3>
        <div className="flex items-center gap-2">
          {formatPrice(totalPrice, currency)}
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
            <span>{formatPrice(shipping, currency)}</span>
          </p>

          <p className="pt-3 mt-3 border-t border-neutral-100 flex justify-between text-base font-semibold">
            <span>Suma:</span>
            <span>{formatPrice(total, currency)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
