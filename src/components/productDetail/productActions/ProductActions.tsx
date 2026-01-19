"use client";

import { Button } from "@/components/ui/button/Button";
import QuantitySelector from "@/components/ui/quantitySelector/QuantitySelector";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { Product } from "@/types/product";
import { ShoppingBag } from "lucide-react";

type Props = {
  product: Product;
};

export function ProductActions({ product }: Props) {
  const { addItem, isMutating } = useCart();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
      <QuantitySelector max={product.stock_quantity ?? Infinity} />
      <Button
        size={"lg"}
        variant="special"
        className="w-full gap-3 uppercase"
        isLoading={isMutating}
        onClick={() => addItem(product.id, 1)}
      >
        <ShoppingBag size={18} />
        Dodaj do koszyka
      </Button>
    </div>
  );
}
