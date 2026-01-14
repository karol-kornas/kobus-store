import { MenuItem } from "@/types/menu";

export function extractCategoriesTree(menu: MenuItem[]) {
  const productsItem = menu.find((item) => item.title === "Produkty");
  return productsItem?.children ?? [];
}
