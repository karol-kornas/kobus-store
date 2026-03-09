import { CheckoutLayout } from "@/components/layouts/checkoutLayout/CheckoutLayout";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export default function Loading() {
  return (
    <CheckoutLayout
      content={
        <>
          <Skeleton className="w-full h-44 rounded-lg" />
          <Skeleton className="w-full h-200 rounded-lg" />
        </>
      }
      side={
        <>
          <Skeleton className="w-full h-96.25 rounded-lg" />
          <Skeleton className="ml-auto mt-4 h-8.75 max-w-67.5" />
          <Skeleton className="hidden lg:block ml-auto mt-4 h-13.25 max-w-60.5" />
        </>
      }
    />
  );
}
