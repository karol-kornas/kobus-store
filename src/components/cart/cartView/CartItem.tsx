"use client";
import { QuantitySelector } from "@/components/ui/quantitySelector/QuantitySelector";
import { SmartImage } from "@/components/ui/smartImage/SmartImage";
import { Spinner } from "@/components/ui/spinner/Spinner";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { CartItem as CartItemType } from "@/types/cart/cartItem";
import { formatPrice } from "@/utils/formatPrice";
import clsx from "clsx";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  item: CartItemType;
  withoutPadding?: boolean;
};

export function CartItem({ item, withoutPadding }: Props) {
  const { updateItem, updatingItems, removeItem } = useCart();
  const [removeLoading, setRemoveLoading] = useState(false);
  const isUpdating = item && updatingItems[item.key];

  return (
    <>
      <div
        className={clsx(
          {
            "bg-white px-3 py-6 sm:px-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.025),0_4px_6px_-4px_rgba(0,0,0,0.025)]":
              !withoutPadding,
          },
          "flex items-center gap-4 w-full rounded-lg",
        )}
      >
        {item.images?.[0]?.src && (
          <Link href={`/product/${item.slug}`} target="_blank">
            <SmartImage
              src={item.images[0].src}
              srcSet={item.images[0].srcset}
              alt={item.images[0].alt || item.name}
              sizes="96px"
              wrapClassName="w-24 aspect-3/4 overflow-hidden flex-none"
              className="absolute inset-0 size-full object-contain"
            />
          </Link>
        )}

        <div className="flex flex-col w-full">
          <div className="w-full">
            <Link href={`/product/${item.slug}`} className="block font-bold leading-tight" target="_blank">
              {item.name}
            </Link>
            {item.variations && item.variations.length > 0 && (
              <div className="mt-1">
                {item.variations.map((v) => (
                  <p key={v.raw_attribute} className="text-sm">
                    {v.attribute}: <strong>{v.value}</strong>
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 text-lg">
            {item.quantity} x <strong className="">{formatPrice(item.price)}</strong>
            {item.on_sale && (
              <span className="line-through text-neutral-400 text-base">
                {formatPrice(item.regular_price)}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <QuantitySelector
              value={item.quantity}
              size="sm"
              loading={isUpdating}
              onChange={(qty) => updateItem(item.key, qty)}
            />
            <button
              type="button"
              className="relative ml-auto disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:bg-neutral-100 size-9 inline-flex items-center justify-center rounded-full"
              disabled={removeLoading}
              onClick={(e) => {
                e.preventDefault();
                setRemoveLoading(true);
                removeItem(item.key);
              }}
            >
              {removeLoading && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Spinner />
                </span>
              )}
              <Trash2 />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
