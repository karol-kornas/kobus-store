"use client";
import { Button } from "@/components/ui/button/Button";
import { SmartImage } from "@/components/ui/smartImage/SmartImage";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { CrossSellItem as CrossSellItemType } from "@/types/cart/crossSellItem";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { useState } from "react";

type Props = {
  product: CrossSellItemType;
};

export function CrossSellItem({ product }: Props) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { closeDrawer } = useCart();

  return (
    <div className="flex gap-4 w-full items-center">
      {product.images?.[0]?.src && (
        <Link href={`/product/${product.slug}`} onClick={closeDrawer}>
          <SmartImage
            src={product.images[0].src}
            srcSet={product.images[0].srcset}
            alt={product.images[0].alt || product.name}
            sizes="96px"
            wrapClassName="w-24 aspect-3/4 overflow-hidden flex-none"
            className="absolute inset-0 size-full object-contain"
          />
        </Link>
      )}

      <div>
        <Link href={`/product/${product.slug}`} className="font-bold leading-tight" onClick={closeDrawer}>
          {product.name}
        </Link>
        <p className="flex gap-2">
          <strong className="">{formatPrice(product.price)}</strong>
          {product.on_sell && (
            <span className="font-normal line-through text-neutral-400 text-sm">
              {formatPrice(product.regular_price)}
            </span>
          )}
        </p>
        <Button
          size="xs"
          variant="primary"
          className="uppercase mt-2"
          isLoading={isAdding}
          disabled={isAdded}
          onClick={async () => {
            setIsAdding(true);
            await addItem(product.id, 1);
            setIsAdding(false);
            setIsAdded(true);
          }}
        >
          {isAdded ? "Dodano!" : "Dodaj"} <span className="sr-only">do koszyka</span>
        </Button>
      </div>
    </div>
  );
}
