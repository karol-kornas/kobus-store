"use client";
import { useCart } from "@/features/cart/hooks/cart.hooks";

import { formatPrice } from "@/utils/formatPrice";
import { X } from "lucide-react";

export function CartCoupons() {
  const { cart, coupons, deleteCoupon, isMutating } = useCart();
  console.log(cart);
  return (
    <div className="flex flex-col gap-1">
      {coupons.map((coupon) => {
        const total = (coupon.totals.total_discount || 0) + (coupon.totals.total_discount_tax || 0);
        return (
          <div key={coupon.code} className="flex justify-end items-center gap-2">
            <div className="flex gap-1 border border-dashed text-sm">
              <div className="px-1">{coupon.code}</div>

              <button
                type="button"
                className="bg-[#262626] text-white font-bold disabled:opacity-50 cursor-pointer px-1"
                disabled={isMutating}
                onClick={() => deleteCoupon(coupon.code)}
              >
                <X size="14" />
              </button>
            </div>
            {total ? <span className="font-semibold text-[#956e50]">-{formatPrice(total)}</span> : null}
          </div>
        );
      })}
    </div>
  );
}
