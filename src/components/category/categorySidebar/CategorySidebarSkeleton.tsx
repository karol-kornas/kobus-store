import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export function CategorySidebarSkeleton() {
  return (
    <aside className="border-2 border-neutral-100 p-4">
      <ul className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className={i !== 0 ? "border-t border-neutral-100 pt-3 mb-3" : ""}>
            <Skeleton className="h-5 w-1/4 mb-2" />
            <ul className="mt-1 space-y-1 pl-3">
              {Array.from({ length: 4 }).map((_, j) => (
                <li key={j}>
                  <Skeleton className="h-8 w-2/3" />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
}
