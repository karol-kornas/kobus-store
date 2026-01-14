import { ProductCardSkeleton } from "@/components/products/productCard/ProductCardSkeleton";

export function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
