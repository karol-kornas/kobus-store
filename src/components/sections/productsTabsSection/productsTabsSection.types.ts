export type ProductsTabsSectionData = {
  id: string;
  type: "product_tabs_section";
  title: string;
  tabs: ProductsTabSectionData[];
};

export type ProductsTabSectionData = {
  categoryId: number;
  categorySlug: string;
  categoryName: string;
  productsLimit: string;
  promoSectionId: number;
};
