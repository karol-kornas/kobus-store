import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export function ProductGallerySkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="aspect-3/4" />
      <div className="hidden lg:flex gap-2 mt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="size-20" />
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
