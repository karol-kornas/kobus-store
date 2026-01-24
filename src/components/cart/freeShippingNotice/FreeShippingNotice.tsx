"use client";

import { useEffect, useState } from "react";
import { getShopConfigClient } from "@/features/shop/shop.client";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { formatPrice } from "@/utils/formatPrice";

export function FreeShippingNotice() {
  const { cart } = useCart();
  const [threshold, setThreshold] = useState<number | null>(null);
  const isLoading = threshold === null;

  useEffect(() => {
    getShopConfigClient().then((data) => {
      setThreshold(data.free_shipping_threshold);
    });
  }, []);

  if (!cart) return null;

  if (isLoading) {
    return (
      <div className="px-6 pb-4 flex flex-col gap-2 bg-cream text-sm">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-2 w-full" />
      </div>
    );
  }

  const total = (cart.totals.total_items || 0) + (cart.totals.total_items_tax || 0);
  const missing = Math.max(0, threshold - total);
  const progress = Math.min(1, total / threshold);

  return (
    <div className="px-6 pb-4 flex flex-col gap-2 bg-cream text-sm">
      {missing === 0 ? (
        <p>🎉 Masz darmową dostawę!</p>
      ) : (
        <p>
          Brakuje <strong>{formatPrice(missing)} </strong> do <strong className="uppercase">darmowej</strong>{" "}
          🎁 <strong>dostawy!</strong>
        </p>
      )}

      <div className="h-2 bg-neutral-200 rounded">
        <div className="h-2 bg-[#956e50] rounded transition-all" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}
