import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export function ProductHeaderSkeleton() {
  return (
    <>
      <div className="flex gap-2">
        <Skeleton className="h-6.25 w-20" />
        <Skeleton className="h-6.25 w-24" />
      </div>
      <Skeleton className="h-18 w-3/4 mt-3" />
    </>
  );
}
