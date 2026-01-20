"use client";

import { Button } from "@/components/ui/button/Button";
import QuantitySelector from "@/components/ui/quantitySelector/QuantitySelector";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { Product } from "@/types/product";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { ProductVariations, Variation } from "../productVariations/productVariations";

type Props = {
  product: Product;
};

export function ProductActions({ product }: Props) {
  const { addItem, isMutating } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);
  const hasVariations = product.variations?.length > 0;

  return (
    <div className="mt-8">
      <ProductVariations
        variations={product.variations}
        selectedId={selectedVariation?.id}
        onSelect={setSelectedVariation}
      />
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
        <QuantitySelector
          max={product.stock_quantity ?? Infinity}
          quantity={quantity}
          setQuantity={setQuantity}
        />
        <Button
          size={"lg"}
          variant="special"
          className="w-full gap-3 uppercase"
          isLoading={isMutating}
          disabled={hasVariations && !selectedVariation}
          onClick={async () => {
            const idToAdd = hasVariations ? selectedVariation!.id : product.id;
            await addItem(idToAdd, quantity);
            setQuantity(1);
          }}
        >
          <ShoppingBag size={18} />
          {hasVariations && !selectedVariation ? "Wybierz wariant" : "Dodaj do koszyka"}
        </Button>
      </div>
    </div>
  );
}
