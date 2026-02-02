"use client";

import { SmartImage } from "@/components/ui/smartImage/SmartImage";
import { AdditionalService } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { Dispatch, SetStateAction, useState } from "react";
import { PreviewImage } from "./ProductAdditionalServices";
import { Button } from "@/components/ui/button/Button";
import { useCart } from "@/features/cart/hooks/cart.hooks";

type Props = {
  product: AdditionalService;
  setPreviewImage: Dispatch<SetStateAction<PreviewImage>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function ProductAdditionalServicesItem({ product, setPreviewImage, setOpen }: Props) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  return (
    <article className="flex flex-col max-w-35 min-w-28">
      {product.thumbnail && (
        <SmartImage
          src={product.thumbnail.src}
          alt={product.name}
          className="w-10"
          wrapClassName="w-10"
          width={product.thumbnail.width ?? 40}
          height={product.thumbnail.height ?? 40}
          sizes="40px"
        />
      )}

      <h3 className="uppercase text-sm leading-tight mt-3 pr-3">{product.name}</h3>

      <div className="mt-auto pt-2">
        <div className="font-bold">+{formatPrice(product.price)}</div>
        {product.preview_image && (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (product.preview_image.src) {
                setPreviewImage({
                  src: product.preview_image.src,
                  srcset: product.preview_image.srcset,
                  alt: product.name,
                  width: product.preview_image.width ?? 800,
                  height: product.preview_image.height ?? 800,
                });
                setOpen(true);
              }
            }}
            className="block text-sm underline text-neutral-500 leading-none my-1 hover:text-neutral-700"
          >
            Jak to wygląda?
          </a>
        )}

        <Button
          size="sm"
          variant="secondary"
          className="mt-3"
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
    </article>
  );
}
