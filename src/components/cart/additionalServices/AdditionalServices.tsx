import { SmartImage } from "@/components/ui/smartImage/SmartImage";
import { useProductsByCategoryLite } from "@/features/products/products.client";
import { formatPrice } from "@/utils/formatPrice";
import { useInView } from "react-intersection-observer";
import { AdditionalServicesItem } from "./AdditionalServicesItem";

export function AdditionalServices() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });
  const enabled = inView;
  const { data, isLoading, isError } = useProductsByCategoryLite(
    { categoryId: 120 },
    {
      enabled,
    },
  );
  console.log(data?.products);
  return (
    <div ref={ref} className="flex gap-2 mt-4 flex-wrap xl:flex-nowrap">
      {data?.products?.map((item, i) => (
        <AdditionalServicesItem key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}
