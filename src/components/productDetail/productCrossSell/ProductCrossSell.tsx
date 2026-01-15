import { ManualProductsSection } from "@/components/sections/manualProductsSection/ManualProductsSection";
import { ManualProductsSectionData } from "@/components/sections/manualProductsSection/manualProductsSection.type";

type Props = {
  productIds: number[];
};

export function ProductCrossSell({ productIds }: Props) {
  const section: ManualProductsSectionData = {
    title: "Dobierz do kompletu",
    titleClassName: "text-center uppercase",
    products: productIds,
  };

  return <ManualProductsSection section={section} />;
}
