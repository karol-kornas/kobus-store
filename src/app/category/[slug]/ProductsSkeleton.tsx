import { ProductCardSkeleton } from "@/components/ui/productCard/ProductCardSkeleton";

export function ProductsSkeleton() {
  return (
    <>
      <div className="w-32 h-5 bg-gray-200 animate-pulse mt-1 mb-2"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
