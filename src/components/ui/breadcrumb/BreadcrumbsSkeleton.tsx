export function BreadcrumbsSkeleton() {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        <SkeletonItem width="w-20" />

        <SkeletonItem width="w-28" />
        <SkeletonItem width="w-24" isLast />
      </ol>
    </nav>
  );
}

function SkeletonItem({ width, isLast = false }: { width: string; isLast?: boolean }) {
  return (
    <li className="flex items-center gap-2">
      <span className={`h-4 ${width} rounded bg-gray-200 animate-pulse`} />
      {!isLast && <Separator />}
    </li>
  );
}

function Separator() {
  return <span className="text-gray-300">/</span>;
}
