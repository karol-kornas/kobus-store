import { PaginationSkeleton } from "@/components/ui/pagination/PaginationSkeleton";
import { ProductsGridSkeleton } from "../productsGrid/ProductsGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export function ProductsListingSkeleton() {
  return (
    <div className="space-y-4 mt-1">
      <Skeleton className="w-32 h-5" />
      <ProductsGridSkeleton />
      <PaginationSkeleton />
    </div>
  );
}
