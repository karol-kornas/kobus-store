export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-3/4 bg-neutral-200 dark:bg-neutral-700" />

      {/* Title skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-5 w-full bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-5 w-full bg-neutral-200 dark:bg-neutral-700" />
      </div>

      {/* Price skeleton */}
      <div className="h-6 w-1/3 bg-neutral-200 dark:bg-neutral-700" />
    </div>
  );
}
