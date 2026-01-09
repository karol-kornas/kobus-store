export type ManualProductsSectionData = {
  id: string;
  type: "manual_products_section";
  title: string;
  products: number[];
  cta: {
    label: string;
    url: string;
  };
};
