import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export function AdditionalServicesItemSkeleton() {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col items-center gap-3 w-[calc(50%-0.25rem)] sm:w-[calc(33.33%-0.35rem)] xl:w-full">
      <Skeleton className="size-10" />
      <Skeleton className="h-[3.28125rem] w-full max-w-27.5" />
      <div className="flex flex-col items-center">
        <Skeleton className="h-5 w-12.5" />
        <Skeleton className="h-6 w-16.25 mt-2" />
      </div>
    </div>
  );
}
