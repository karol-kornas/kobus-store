import { Breadcrumbs } from "@/components/ui/breadcrumb/Breadcrumbs";
import { ProductCategory } from "@/types/productCategory";

type Props = {
  categorySlug?: string;
  productName: string;
  productCategories: Pick<ProductCategory, "id" | "name" | "slug">[];
};

export function ProductBreadcrumbs({ categorySlug, productName, productCategories }: Props) {
  const category = productCategories.find((el) => el.slug === categorySlug) ?? productCategories[0];

  if (!category) {
    return <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: productName }]} />;
  }

  const items = [
    { label: "Strona główna", href: "/" },
    { label: category.name, href: `/category/${encodeURIComponent(category.slug)}` },
    { label: productName },
  ];

  return <Breadcrumbs items={items} />;
}
