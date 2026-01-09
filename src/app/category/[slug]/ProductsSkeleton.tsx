import { ProductCardSkeleton } from "@/components/ui/productCard/ProductCardSkeleton";

export function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
