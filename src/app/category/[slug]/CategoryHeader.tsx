import { SortSelect } from "@/components/ui/sortSelect/SortSelect";
import { ProductCategory } from "@/types/productCategory";

type Props = {
  categoryPromise: Promise<ProductCategory>;
};

export async function CategoryHeader({ categoryPromise }: Props) {
  const category = await categoryPromise;
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
      <h1 className="font-display text-2xl font-medium">
        {category.name}{" "}
        {/* <span className="text-neutral-400 text-sm uppercase font-sans">
                        ({products.totalItems}&nbsp;produktów)
                      </span> */}
      </h1>
      <SortSelect />
    </div>
  );
}
