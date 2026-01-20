import { Category } from "@/types/category";

export type CategoriesSectionData = {
  id: string;
  type: "featured_categories_section";
  title: string;
  categories: Category[];
};
