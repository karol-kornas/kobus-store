export function ProductVariantsSkeleton() {
  return (
    <div className="mt-6">
      <div className="h-5 w-1/2 bg-gray-200" />
      <div className="grid grid-cols-4 gap-2 mt-3">
        <div className="aspect-3/4 bg-gray-200"></div>
        <div className="aspect-3/4 bg-gray-200"></div>
        <div className="aspect-3/4 bg-gray-200"></div>
      </div>
    </div>
  );
}
