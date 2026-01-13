import { getProductBySlug } from "@/features/products/products.server";
import { mapSeoToMetadata } from "@/features/seo/seo.helpers";
import { getSeo } from "@/features/seo/seo.server";
import { notFound } from "next/navigation";
import { ProductBreadcrumbs } from "./ProductBreadcrumbs";
import { ProductGallery } from "./ProductGallery";
import { ProductLabels } from "@/components/ui/productLabels/ProductLabels";
import { getProductLabels } from "@/features/products/getProductsLabels";
import { ProductAdditionalServices } from "./ProductAdditionalServices";

type PageProps = {
  params: {
    slug: string;
  };
  searchParams: {
    cat?: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) return {};

  const seo = await getSeo({
    type: "product",
    id: product.id,
  });

  return mapSeoToMetadata(seo);
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { cat } = await searchParams;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const labels = getProductLabels(product);
  let lowest = product.lowest_price_30_days;

  if (!lowest && product.on_sale) {
    lowest = product.regular_price;
  }

  return (
    <div className="container">
      <ProductBreadcrumbs
        categorySlug={cat}
        productName={product.name}
        productCategories={product.categories}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[44%_1fr] mt-8 gap-8">
        <div className="w-full">
          <ProductGallery
            images={product.images.map((img) => ({
              id: img.id,
              src: img.src,
              alt: img.alt,
              width: img.width,
              height: img.height,
            }))}
            productName={product.name}
          />
        </div>
        <div className="lg:w-125 flex-none">
          <ProductLabels className="" labels={labels} />
          <h1 className="mt-3 font-display font-semibold text-3xl">{product.name}</h1>
          <div className="flex text-2xl gap-2 font-semibold mt-4">
            {product.price} zł
            {product.on_sale && product.regular_price && (
              <span className="text-lg font-normal line-through text-neutral-400">
                {product.regular_price} zł
              </span>
            )}
          </div>
          {product.on_sale && lowest && (
            <p className="text-sm text-neutral-400">Najniższa cena w okresie 30 dni: {lowest} zł.</p>
          )}
          {product.short_description && (
            <div
              className="pt-3 leading-relaxed text-sm [&_p]:mt-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-4 [&_ul]:marker:text-neutral-300"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            ></div>
          )}
          <ProductAdditionalServices additionalServices={product.additional_services} />

          <div className="py-10"></div>
        </div>
      </div>
    </div>
  );
}
