import { Breadcrumbs } from "@/components/ui/breadcrumb/Breadcrumbs";
import { ProductCategory } from "@/types/productCategory";

type Props = {
  categoryPromise: Promise<ProductCategory>;
};

export async function CategoryBreadcrumbs({ categoryPromise }: Props) {
  const category = await categoryPromise;

  const items = [{ label: "Strona główna", href: "/" }, { label: category.name }];

  return <Breadcrumbs items={items} />;
}
