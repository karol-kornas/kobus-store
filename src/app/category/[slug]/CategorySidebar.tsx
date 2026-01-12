"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/components/layout/navigation/navigation.types";
import { normalizeWpUrl } from "@/utils/normalizeWpUrl";
import { ChevronRight } from "lucide-react";

interface Props {
  categories: MenuItem[];
}

export function CategorySidebar({ categories }: Props) {
  const pathname = usePathname();

  return (
    <aside className="border-2 border-neutral-100 p-4">
      <ul className="space-y-2">
        {categories.map((cat, i) => (
          <CategoryItem key={cat.id} item={cat} pathname={pathname} level={0} index={i} />
        ))}
      </ul>
    </aside>
  );
}

function CategoryItem({
  item,
  pathname,
  level,
  index,
}: {
  item: MenuItem;
  pathname: string;
  level: number;
  index: number;
}) {
  const href = normalizeWpUrl(item.url);
  const isActive = pathname === href;
  const hasChildren = item.children.length > 0;

  return (
    <li className={`${level === 0 && index !== 0 && "border-t border-neutral-100 pt-3 mb-3"}`}>
      {level === 0 ? (
        <span className=" ">{item.title}</span>
      ) : (
        <Link
          href={href}
          className={`flex items-center py-1 gap-1 transition-colors ${
            isActive ? "font-semibold text-black" : "text-neutral-600 hover:text-black"
          }`}
          style={{ paddingLeft: `${level * 12}px` }}
        >
          {isActive && <ChevronRight size={16} />}
          {item.title}
        </Link>
      )}

      {hasChildren && (
        <ul className="mt-1 space-y-1">
          {item.children.map((child, i) => (
            <CategoryItem key={child.id} item={child} pathname={pathname} level={level + 1} index={i} />
          ))}
        </ul>
      )}
    </li>
  );
}
