import { useProductsByCategoryLite } from "@/features/products/products.client";
import { AdditionalServicesItem } from "./AdditionalServicesItem";
import { AdditionalServicesItemSkeleton } from "./AdditionalServicesItemSkeleton";

export function AdditionalServices() {
  const { data, isLoading } = useProductsByCategoryLite({ categoryId: 120 });
  return (
    <div className="flex gap-2 mt-4 flex-wrap xl:flex-nowrap">
      {isLoading && Array.from({ length: 5 }).map((_, i) => <AdditionalServicesItemSkeleton key={i} />)}
      {data?.products?.map((item, i) => (
        <AdditionalServicesItem key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}
