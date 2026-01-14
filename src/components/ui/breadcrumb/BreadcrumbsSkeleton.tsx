import { Skeleton } from "../skeleton/Skeleton";

export function BreadcrumbsSkeleton() {
  return (
    <nav>
      <ol className="flex flex-wrap items-center gap-2 text-sm pt-8">
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
      <Skeleton className={`h-4 ${width}`} />
      {!isLast && <Separator />}
    </li>
  );
}

function Separator() {
  return <span className="text-gray-200">/</span>;
}
