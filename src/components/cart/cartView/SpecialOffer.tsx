"use client";

import { Button } from "@/components/ui/button/Button";
import { SmartImage } from "@/components/ui/smartImage/SmartImage";
import { useReplaceCartItem } from "@/features/cart/hooks/cart.hooks";
import { useProductsByIdsLite } from "@/features/products/products.client";
import { CartItem } from "@/types/cart/cartItem";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { useState } from "react";

type Props = {
  parentItem: CartItem;
};

export function SpecialOffer({ parentItem }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data } = useProductsByIdsLite({
    ids: [parentItem.id],
  });

  const replaceCartItem = useReplaceCartItem();

  const product = data?.products?.[0];
  const specialIds = product?.special_products ?? [];

  const { data: specialData, isLoading: specialLoading } = useProductsByIdsLite(
    { ids: specialIds },
    {
      enabled: specialIds.length > 0,
    },
  );

  const isProductLoaded = !!product;
  const hasSpecialProducts = isProductLoaded && specialIds.length > 0;

  return (
    hasSpecialProducts &&
    !specialLoading &&
    (specialData?.products?.length ?? 0) > 0 &&
    specialData?.products?.map((item) => (
      <div
        key={item.id}
        className="flex items-center gap-4 w-full rounded-b-lg border-2 border-[#80bd00] bg-[#f5fedf] px-3 py-6 sm:px-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.025),0_4px_6px_-4px_rgba(0,0,0,0.025)] -mt-3"
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
        <div className="flex flex-col md:flex-row md:items-center w-full gap-3">
          <div>
            <div className="inline-flex items-center justify-center gap-2 bg-[#d4fa81] rounded-xl py-1.5 pl-2 pr-4 uppercase font-bold text-black text-[0.75rem]">
              <span className="text-[1.375rem] leading-none">🎁</span> Oferta specjalna
            </div>{" "}
            <Link
              href={`/product/${item.slug}`}
              className="block mt-2 font-bold leading-tight"
              target="_blank"
            >
              {item.name}
            </Link>
            {product.special_description && (
              <div className="mt-2 leading-tight">{product.special_description}</div>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-start md:justify-end md:items-center gap-2 md:gap-6 w-full">
            <div className="flex flex-row md:flex-col max-md:gap-2 md:text-end text-lg">
              {item.on_sale && (
                <div className="line-through text-neutral-400 text-base max-md:order-1">
                  {formatPrice(item.regular_price)}
                </div>
              )}
              <strong>{formatPrice(item.price)}</strong>
            </div>

            <Button
              variant="green"
              type="button"
              isLoading={loading}
              onClick={() => {
                setLoading(true);
                replaceCartItem(parentItem.key, item.id);
              }}
            >
              Zamień
            </Button>
          </div>
        </div>
      </div>
    ))
  );
}
