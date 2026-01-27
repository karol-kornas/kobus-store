"use client";

import { useState } from "react";

import { Product, Variation } from "@/types/product";
import { ProductVariations } from "../productVariations/productVariations";
import { ResponsiveModal } from "@/components/ui/responsiveModal/ResponsiveModal";
import { ProductWaitlist } from "./ProductWaitlist";
import { SmartImage } from "@/components/ui/smartImage/SmartImage";

type WaitlistModalProps = {
  open: boolean;
  onClose: () => void;
  product: Product;
};

export function WaitlistModal({ open, onClose, product }: WaitlistModalProps) {
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);

  const hasVariations = product.variations?.length > 0;

  const targetProductId = hasVariations ? selectedVariation?.id : product.id;

  return (
    <ResponsiveModal open={open} onClose={onClose} title="Powiadomienie o&nbsp;dostępności">
      <div className="flex items-start gap-10">
        <SmartImage
          src={product.images[0].src}
          srcSet={product.images[0].srcset}
          alt={product.images[0].alt || product.name}
          sizes="220px"
          wrapClassName="hidden lg:block w-[13.75rem] aspect-3/4 overflow-hidden flex-none"
          className="absolute inset-0 size-full object-contain"
        />
        <div className="flex flex-col gap-6 w-full">
          <div>
            <p className="font-bold text-lg leading-tight">{product.name}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Zapisz się na listę, a damy Ci znać, gdy produkt znów będzie dostępny.
            </p>
          </div>
          {hasVariations && (
            <div>
              <ProductVariations
                variations={product.variations}
                selectedId={selectedVariation?.id}
                onSelect={setSelectedVariation}
              />
            </div>
          )}
          <ProductWaitlist productId={targetProductId!} disabled={hasVariations && !selectedVariation} />
        </div>
      </div>
      <div className="pt-6 mt-6 border-t border-neutral-200 leading-tight text-sm">
        Powyższe dane używane są jedynie do wysyłania jednorazowego powadomienia o uzupełnieniu produktu
      </div>
    </ResponsiveModal>
  );
}
