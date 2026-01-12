import Link from "next/link";
import { BreadcrumbItem } from "@/types/breadcrumb";

type Props = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600 pt-8">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {!isLast && item.href ? (
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-black">
                  {item.label}
                </span>
              )}

              {!isLast && <span>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
