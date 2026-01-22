"use client";

import { Button } from "@/components/ui/button/Button";
import QuantitySelector from "@/components/ui/quantitySelector/QuantitySelector";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { Product, Variation } from "@/types/product";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { ProductVariations } from "../productVariations/productVariations";

type Props = {
  product: Product;
};

export function ProductActions({ product }: Props) {
  const { addItem, openDrawer } = useCart();
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);
  const hasVariations = product.variations?.length > 0;

  const handleAddToCart = async () => {
    setIsAdding(true);
    const addedItem = await addItem(product.id, quantity);
    setQuantity(1);
    setIsAdding(false);

    if (addedItem) {
      openDrawer(addedItem);
    }
  };

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
          isLoading={isAdding}
          disabled={hasVariations && !selectedVariation}
          onClick={handleAddToCart}
        >
          <ShoppingBag size={18} />
          {hasVariations && !selectedVariation ? "Wybierz wariant" : "Dodaj do koszyka"}
        </Button>
      </div>
    </div>
  );
}
