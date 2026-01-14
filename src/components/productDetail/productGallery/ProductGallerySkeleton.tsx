export function ProductGallerySkeleton() {
  return (
    <div className="w-full">
      <div className="aspect-3/4 bg-gray-200" />
      <div className="hidden lg:flex gap-2 mt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-20 h-20 bg-gray-200" />
        ))}
      </div>
      <div className="flex lg:hidden justify-center gap-2 mt-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-3 w-3 rounded-full bg-gray-200" />
        ))}
      </div>
    </div>
  );
}
