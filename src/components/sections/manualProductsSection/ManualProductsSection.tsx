"use client";

import { useProductsByIdsLite } from "@/features/products/products.client";
import { useInView } from "react-intersection-observer";
import { ProductSlider } from "../productSlider/ProductSlider";
import { ButtonLink } from "@/components/ui/button/Button";
import { ManualProductsSectionData } from "./manualProductsSection.type";

type Props = {
  section: ManualProductsSectionData;
};

export function ManualProductsSection({ section }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });

  const { data, isLoading, isError } = useProductsByIdsLite(
    { ids: section.products },
    {
      enabled: inView,
    }
  );
  return (
    <section ref={ref} className="pt-10">
      <div className="container">
        <h3 className="font-display text-[1.625rem] font-semibold">{section.title}</h3>

        <ProductSlider products={data?.products ?? []} isError={isError} isLoading={isLoading} />

        {section.cta?.url && (
          <div className="text-center mt-8">
            <ButtonLink href={section.cta.url} variant="secondary">
              {section.cta.label ?? "Zobacz wszystkie"}
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
