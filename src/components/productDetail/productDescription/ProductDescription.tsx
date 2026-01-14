import { Product } from "@/types/product";

type Props = {
  product: Product;
};

export function ProductDescription({ product }: Props) {
  return (
    product.description && (
      <div
        className="mt-12 lg:mt-18 flex flex-col gap-3 leading-relaxed [&_ol]:list-decimal [&_ol]:pl-5 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:marker:text-neutral-300"
        dangerouslySetInnerHTML={{ __html: product.description }}
      ></div>
    )
  );
}
