export function CategoryHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
      {/* Title skeleton */}
      <div className="h-7 w-48 md:w-64 rounded bg-gray-200 animate-pulse" />

      {/* Sort select skeleton */}
      <div className="h-10 w-40 rounded bg-gray-200 animate-pulse" />
    </div>
  );
}
