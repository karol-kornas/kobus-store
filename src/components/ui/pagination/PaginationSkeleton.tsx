export function PaginationSkeleton() {
  const linkClass = "h-10 w-10 bg-gray-200 animate-pulse";

  return (
    <nav className="flex items-center justify-center gap-2 mt-12 flex-wrap">
      {/* Prev */}
      <div className={linkClass} />

      {/* Pages */}
      <div className={linkClass} />
      <div className={linkClass} />
      <div className="h-10 w-6 bg-gray-200 animate-pulse" />
      <div className={linkClass} />
      <div className={linkClass} />

      {/* Next */}
      <div className={linkClass} />
    </nav>
  );
}
