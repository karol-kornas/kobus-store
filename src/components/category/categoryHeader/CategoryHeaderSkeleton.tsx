export function CategoryHeaderSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      <div className="h-9 w-48 md:w-64 bg-gray-200 animate-pulse max-lg:order-1" />
      <div className="h-12.5 lg:h-10 w-full lg:w-46 bg-gray-200 animate-pulse" />
    </div>
  );
}
