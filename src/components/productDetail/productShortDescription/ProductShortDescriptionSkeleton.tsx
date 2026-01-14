import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export function ProductShortDescriptionSkeleton() {
  return (
    <div className="mt-3 flex flex-col gap-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
