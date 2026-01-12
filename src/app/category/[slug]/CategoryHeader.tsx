import { SortSelect } from "@/components/ui/sortSelect/SortSelect";
import { ProductCategory } from "@/types/productCategory";

type Props = {
  categoryPromise: Promise<ProductCategory>;
};

export async function CategoryHeader({ categoryPromise }: Props) {
  const category = await categoryPromise;
  return (
    <div className="flex flex-col md:flex-row lg:items-center justify-between gap-3">
      <h1 className="font-display text-3xl font-medium max-md:order-1">{category.name} </h1>
      <SortSelect />
    </div>
  );
}
