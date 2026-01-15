import { CategoriesSectionData } from "@/components/sections/categoriesSection/categoriesSection.types";
import { ProductsTabsSection } from "@/components/sections/productsTabsSection/ProductsTabsSection";
import { ProductsTabsSectionData } from "@/components/sections/productsTabsSection/productsTabsSection.types";
import { CategoriesSection } from "@/components/sections/categoriesSection/CategoriesSection";
import { ManualProductsSectionData } from "../sections/manualProductsSection/manualProductsSection.type";
import { ManualProductsSection } from "../sections/manualProductsSection/ManualProductsSection";
import { BenefitsSection } from "../sections/benefitsSection/BenefitsSection";
import { BenefitsSectionSectionData } from "../sections/benefitsSection/benefitsSection.type";

interface Props {
  sections: (
    | CategoriesSectionData
    | ProductsTabsSectionData
    | ManualProductsSectionData
    | BenefitsSectionSectionData
  )[];
}

export function SectionsRenderer({ sections }: Props) {
  return (
    <>
      {sections.map((section) => {
        switch (section.type) {
          case "product_tabs_section":
            return <ProductsTabsSection key={section.id} section={section} />;

          case "featured_categories_section":
            return <CategoriesSection key={section.id} section={section} />;

          case "manual_products_section":
            return <ManualProductsSection key={section.id} section={section} />;

          case "benefits_section":
            return <BenefitsSection key={section.id} />;

          default:
            return null;
        }
      })}
    </>
  );
}
