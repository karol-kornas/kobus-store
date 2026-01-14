import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export function ProductAdditionalServicesSkeleton() {
  return (
    <div className="mt-6 pb-6">
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-20 w-full mt-6" />
    </div>
  );
}
