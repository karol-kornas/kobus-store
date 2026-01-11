export function CategoryHeaderSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      {/* Title skeleton */}
      <div className="h-7 w-48 md:w-64 bg-gray-200 animate-pulse max-lg:order-1" />

      {/* Sort select skeleton */}
      <div className="h-12 lg:h-10 w-full lg:w-46 bg-gray-200 animate-pulse" />
    </div>
  );
}
