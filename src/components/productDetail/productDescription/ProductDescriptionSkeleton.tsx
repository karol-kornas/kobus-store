import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export function ProductDescriptionSkeleton() {
  return (
    <div className="mt-12 lg:mt-18 flex flex-col gap-3">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-13 w-1/2" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-13 w-1/2" />
    </div>
  );
}
