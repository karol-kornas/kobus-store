"use client";

import { Button } from "@/components/ui/button/Button";
import { QuantitySelector } from "@/components/ui/quantitySelector/QuantitySelector";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { Product, Variation } from "@/types/product";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { ProductVariations } from "../productVariations/productVariations";
import { ProductWaitlist } from "../productWaitlist/ProductWaitlist";

type Props = {
  product: Product;
};

export function ProductActions({ product }: Props) {
  const { addItem, openDrawer } = useCart();
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);
  const hasVariations = product.variations?.length > 0;

  const activeAvailability = hasVariations ? selectedVariation?.availability : product.availability;

  const canAddToCart = !!activeAvailability?.can_add_to_cart;

  const idToAdd = hasVariations && selectedVariation ? selectedVariation!.id : product.id;

  const handleAddToCart = async () => {
    setIsAdding(true);

    const addedItem = await addItem(idToAdd, quantity);
    setQuantity(1);
    setIsAdding(false);

    if (addedItem) {
      openDrawer(addedItem.key);
    }
  };

  return (
    <div className="mt-8">
      <ProductVariations
        variations={product.variations}
        selectedId={selectedVariation?.id}
        onSelect={setSelectedVariation}
      />

      {(selectedVariation && !canAddToCart) || (!canAddToCart && !hasVariations) ? (
        <div className="mt-8">
          <ProductWaitlist productId={idToAdd} />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
            <QuantitySelector
              max={product.stock_quantity ?? Infinity}
              value={quantity}
              min={1}
              disabled={!canAddToCart}
              onChange={setQuantity}
            />
            <Button
              size={"lg"}
              variant="special"
              className="w-full gap-3 uppercase"
              isLoading={isAdding}
              disabled={!canAddToCart || (hasVariations && !selectedVariation)}
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} />
              {hasVariations && !selectedVariation ? "Wybierz wariant" : "Dodaj do koszyka"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
