import { useInView } from "react-intersection-observer";
import { useProductsByCategoryLite } from "@/features/products/products.client";
import { ProductSlider } from "../productSlider/ProductSlider";
import { ProductsTabsSectionData } from "./productsTabsSection.types";
import { ButtonLink } from "@/components/ui/button/Button";

type Category = ProductsTabsSectionData["tabs"][number];

type Props = {
  category: Category;
  forceEnabled?: boolean;
};

export function ProductsByCategoryTab({ category, forceEnabled = false }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });
  const enabled = forceEnabled || inView;
  const { data, isLoading, isError } = useProductsByCategoryLite(
    { categoryId: category.categoryId },
    {
      enabled,
    }
  );
  return (
    <div ref={ref}>
      <ProductSlider products={data?.products ?? []} isError={isError} isLoading={isLoading} />
      <div className="text-center mt-8">
        <ButtonLink href={`/category/${category.categorySlug}`} variant="secondary">
          Zobacz wszystkie
          <span className="sr-only">{`produkty z kategorii ${category.categoryName}`}</span>
        </ButtonLink>
      </div>
    </div>
  );
}
