import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export function ProductVariantsSkeleton() {
  return (
    <div className="mt-6">
      <Skeleton className="h-5 w-1/2" />
      <div className="grid grid-cols-4 gap-2 mt-3">
        <Skeleton className="aspect-3/4" />
        <Skeleton className="aspect-3/4" />
        <Skeleton className="aspect-3/4" />
      </div>
    </div>
  );
}
