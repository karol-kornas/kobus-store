export type ManualProductsSectionData = {
  id?: string;
  type?: "manual_products_section";
  title: string;
  titleClassName?: string;
  products: number[];
  cta?: {
    label: string;
    url: string;
  };
};
