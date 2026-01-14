import { PaginationSkeleton } from "@/components/ui/pagination/PaginationSkeleton";
import { ProductsGridSkeleton } from "../productsGrid/ProductsGridSkeleton";

export function ProductsListingSkeleton() {
  return (
    <div className="space-y-4 mt-1">
      <div className="w-32 h-5 bg-gray-200 animate-pulse"></div>
      <ProductsGridSkeleton />
      <PaginationSkeleton />
    </div>
  );
}
