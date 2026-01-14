import { Product } from "@/types/product";

type Props = {
  product: Product;
};

export function ProductShortDescription({ product }: Props) {
  return (
    product.short_description && (
      <div
        className="mt-3 flex flex-col gap-3 leading-relaxed text-sm [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:marker:text-neutral-300"
        dangerouslySetInnerHTML={{ __html: product.short_description }}
      ></div>
    )
  );
}
