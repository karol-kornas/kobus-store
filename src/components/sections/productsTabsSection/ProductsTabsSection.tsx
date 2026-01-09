"use client";

import { Tabs } from "@/components/ui/tabs/Tabs";
import { ProductsTabsSectionData } from "./productsTabsSection.types";
import { ProductsByCategoryTab } from "./ProductsByCategoryTab";

interface Props {
  section: ProductsTabsSectionData;
}

export function ProductsTabsSection({ section }: Props) {
  const tabs = section.tabs.map((tab) => ({
    id: tab.categoryId,
    label: tab.categoryName,
    data: tab,
  }));
  return (
    <section className="pt-10">
      <div className="container">
        <h3 className="font-display text-[1.625rem] font-semibold">{section.title}</h3>
        <Tabs items={tabs}>
          {(activeTab, hasInteracted) => {
            return (
              <ProductsByCategoryTab
                category={activeTab.data as (typeof section.tabs)[number]}
                forceEnabled={hasInteracted}
              />
            );
          }}
        </Tabs>
      </div>
    </section>
  );
}
