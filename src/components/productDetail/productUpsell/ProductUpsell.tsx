import { ManualProductsSection } from "@/components/sections/manualProductsSection/ManualProductsSection";
import { ManualProductsSectionData } from "@/components/sections/manualProductsSection/manualProductsSection.type";

type Props = {
  productIds: number[];
};

export function ProductUpsell({ productIds }: Props) {
  const section: ManualProductsSectionData = {
    title: "Inni klienci kupili także",
    titleClassName: "text-center uppercase",
    products: productIds,
  };

  return <ManualProductsSection section={section} />;
}
