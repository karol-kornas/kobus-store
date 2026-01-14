import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export function ProductPriceSkeleton() {
  return (
    <>
      <Skeleton className="h-7.5 w-1/3 mt-4" />
      <Skeleton className="h-4.5 w-1/2 mt-1" />
    </>
  );
}
