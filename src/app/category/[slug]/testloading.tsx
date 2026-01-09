import { ProductCardSkeleton } from "@/components/ui/productCard/ProductCardSkeleton";

export default function LoadingCategory() {
  return (
    <div className="container py-8">
      <div className="h-6 w-64 bg-neutral-200 animate-pulse" />

      <div className="grid xl:grid-cols-[18.625rem_1fr] 2xl:grid-cols-[22.625rem_1fr] gap-4 md:gap-10 mt-8">
        <div className="hidden xl:block">
          <div className="h-full w-full bg-neutral-200 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
