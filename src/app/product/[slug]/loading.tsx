export default function Loading() {
  return (
    <div className="container animate-pulse">
      {/* Breadcrumbs */}
      <div className="h-5 w-64 bg-gray-200 mb-6 mt-8" />

      <div className="grid grid-cols-1 lg:grid-cols-[44%_1fr] mt-8 gap-8">
        {/* Gallery */}
        <div className="w-full">
          <div className="aspect-square bg-gray-200" />
          <div className="flex gap-2 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-20 h-20 bg-gray-200" />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-125 flex-none">
          <div className="flex gap-2 mb-3">
            <div className="h-6 w-20 bg-gray-200" />
            <div className="h-6 w-24 bg-gray-200" />
          </div>

          <div className="h-8 w-3/4 bg-gray-200 mb-4" />

          <div className="h-6 w-32 bg-gray-200 mb-2" />
          <div className="h-4 w-48 bg-gray-200 mb-6" />

          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-2/3 bg-gray-200" />
          </div>

          {/* Additional services placeholder */}
          <div className="mt-8 space-y-3">
            <div className="h-5 w-40 bg-gray-200" />
            <div className="h-20 w-full bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
