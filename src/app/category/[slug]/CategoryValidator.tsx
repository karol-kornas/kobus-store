import { notFound } from "next/navigation";
import { ProductCategory } from "@/types/productCategory";

type Props = {
  categoryPromise: Promise<ProductCategory | null>;
};

export async function CategoryValidator({ categoryPromise }: Props) {
  const category = await categoryPromise;

  if (!category) {
    notFound();
  }

  return null;
}
