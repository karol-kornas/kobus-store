import { Category } from "@/types/category";
import Link from "next/link";
import { CategoryCardImage } from "./CategoryCardImage";

type Props = {
  category: Category;
};

export function CategoryCard({ category }: Props) {
  return (
    <Link href={`category/${category.slug}`} className="relative hover:opacity-95 transition-opacity">
      <CategoryCardImage src={category.image.url} />
      <span className="block relative leading-tight md:text-lg font-display uppercase py-3 font-bold z-1">
        {category.name}
      </span>
    </Link>
  );
}
