"use client";
import { Button } from "@/components/ui/button/Button";
import { ImageWithSkeleton } from "@/components/ui/imageWithSkeleton/ImageWithSkeleton";
import { SmartImage } from "@/components/ui/smartImage/SmartImage";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { CrossSellItem as CrossSellItemType } from "@/types/cart/crossSellItem";
import { formatPrice } from "@/utils/formatPrice";
import { useState } from "react";

type Props = {
  product: CrossSellItemType;
};

export function CrossSellItem({ product }: Props) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  return (
    <div className="flex gap-4 w-full items-center">
      {product.images?.[0]?.src && (
        <SmartImage
          src={product.images[0].src}
          srcSet={product.images[0].srcset}
          alt={product.images[0].alt || product.name}
          sizes="96px"
          wrapClassName="w-24 aspect-3/4 overflow-hidden"
          className="absolute inset-0 size-full object-cover"
        />
      )}

      <div>
        <p className="font-bold leading-tight">{product.name}</p>
        <p className="flex gap-2">
          <strong className="">{formatPrice(product.price)}</strong>
          {product.sale_price !== product.regular_price && (
            <span className="font-normal line-through text-neutral-400 text-sm">
              {product.regular_price} zł
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
