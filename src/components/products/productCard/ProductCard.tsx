"use client";

import { Product } from "@/types/product";
import { ProductCardImage } from "./ProductCardImage";
import { ProductCardInfo } from "./ProductCardInfo";
import { getProductLabels } from "@/features/products/getProductsLabels";
import { ProductLabels } from "@/components/ui/productLabels/ProductLabels";
import { useState } from "react";
import { Button } from "@/components/ui/button/Button";
import { WaitlistModal } from "@/components/productDetail/productWaitlist/WaitlistModal";

type Props = {
  product: Product;
  categorySlug?: string;
};

export function ProductCard({ product, categorySlug }: Props) {
  const image = product.images[0];
  const labels = getProductLabels(product);
  const href = categorySlug ? `/product/${product.slug}?cat=${categorySlug}` : `/product/${product.slug}`;
  const canAddToCart = product.availability.can_add_to_cart;
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="relative">
      <article className="relative flex flex-col gap-3">
        <ProductCardImage
          href={href}
          src={image?.src}
          srcset={image?.srcset}
          alt={image?.alt || product.name}
          canAddToCart={canAddToCart}
        >
          <ProductLabels className="absolute bottom-0 left-0" labels={labels} />
          {!canAddToCart && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
              <Button
                variant="primary"
                className="text-xs uppercase w-full leading-tight"
                onClick={() => setWaitlistOpen(true)}
              >
                Powiadom mnie o dostępności
              </Button>
            </div>
          )}
        </ProductCardImage>

        <ProductCardInfo
          href={href}
          name={product.name}
          price={product.price}
          regularPrice={product.regular_price}
          isOnSale={product.on_sale}
        />
      </article>
      {!canAddToCart && (
        <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} product={product} />
      )}
    </div>
  );
}
