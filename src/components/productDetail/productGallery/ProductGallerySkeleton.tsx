import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export function ProductGallerySkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="aspect-3/4" />
      <div className="hidden lg:grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square" />
        ))}
      </div>
      <div className="flex lg:hidden justify-center gap-2 mt-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="size-3 rounded-full" />
        ))}
      </div>
    </div>
  );
}
