"use client";
import { QuantitySelector } from "@/components/ui/quantitySelector/QuantitySelector";
import { SmartImage } from "@/components/ui/smartImage/SmartImage";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { CartItem as CartItemType } from "@/types/cart/cartItem";
import { formatPrice } from "@/utils/formatPrice";

type Props = {
  item: CartItemType;
};

export function CartItem({ item }: Props) {
  const { updateItem, updatingItems } = useCart();
  const isUpdating = item && updatingItems[item.key];

  return (
    <div className="flex items-center gap-4">
      {item.images?.[0]?.src && (
        <SmartImage
          src={item.images[0].src}
          srcSet={item.images[0].srcset}
          alt={item.images[0].alt || item.name}
          sizes="96px"
          wrapClassName="w-24 aspect-3/4 overflow-hidden flex-none"
          className="absolute inset-0 size-full object-contain"
        />
      )}

      <div>
        <p className="font-bold leading-tight">{item.name}</p>
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
        <div className="mt-2">
          <QuantitySelector
            value={item.quantity}
            size="sm"
            loading={isUpdating}
            onChange={(qty) => updateItem(item.key, qty)}
          />
        </div>
      </div>
    </div>
  );
}
