"use client";
import { QuantitySelector } from "@/components/ui/quantitySelector/QuantitySelector";
import { SmartImage } from "@/components/ui/smartImage/SmartImage";
import { Spinner } from "@/components/ui/spinner/Spinner";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { CartItem as CartItemType } from "@/types/cart/cartItem";
import { formatPrice } from "@/utils/formatPrice";
import { Trash2 } from "lucide-react";
import Link from "next/link";

type Props = {
  item: CartItemType;
};

export function CartItem({ item }: Props) {
  const { updateItem, updatingItems, removeItem } = useCart();
  const isUpdating = item && updatingItems[item.key];

  return (
    <div className="flex items-center gap-4 w-full">
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

      <div className="w-full">
        <Link href={`/product/${item.slug}`} className="font-bold leading-tight" target="_blank">
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
        <p className="flex gap-2 text-lg">
          {item.quantity} x<strong className="">{formatPrice(item.price)}</strong>
          {item.on_sale && (
            <span className="line-through text-neutral-400 text-base">{formatPrice(item.regular_price)}</span>
          )}
        </p>
        <div className="flex items-center gap-2 mt-2 w-full">
          <QuantitySelector
            value={item.quantity}
            size="sm"
            loading={isUpdating}
            onChange={(qty) => updateItem(item.key, qty)}
          />
          <button
            type="button"
            className="relative ml-auto cursor-pointer bg-neutral-100 hover:bg-neutral-200 size-9 inline-flex items-center justify-center rounded-full"
            disabled={isUpdating}
            onClick={(e) => {
              e.preventDefault();
              removeItem(item.key);
            }}
          >
            {isUpdating && (
              <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Spinner />
              </span>
            )}
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
