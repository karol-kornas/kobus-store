import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export function CategoryHeaderSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      <Skeleton className="h-9 w-48 md:w-64 max-lg:order-1" />
      <Skeleton className="h-12.5 lg:h-10 w-full lg:w-46" />
    </div>
  );
}
