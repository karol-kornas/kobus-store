import { Skeleton } from "../skeleton/Skeleton";

export function PaginationSkeleton() {
  const linkClass = "h-10 w-10 bg-gray-200 animate-pulse";

  return (
    <nav className="flex items-center justify-center gap-2 mt-12 flex-wrap">
      {/* Prev */}
      <Skeleton className={linkClass} />

      {/* Pages */}
      <Skeleton className={linkClass} />
      <Skeleton className={linkClass} />
      <Skeleton className="h-10 w-6" />
      <Skeleton className={linkClass} />
      <Skeleton className={linkClass} />

      {/* Next */}
      <Skeleton className={linkClass} />
    </nav>
  );
}
