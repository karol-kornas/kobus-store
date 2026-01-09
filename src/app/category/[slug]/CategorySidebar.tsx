"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/components/layout/navigation/navigation.types";
import { normalizeWpUrl } from "@/utils/normalizeWpUrl";

interface Props {
  categories: MenuItem[]; // dzieci "Produkty"
}

export function CategorySidebar({ categories }: Props) {
  const pathname = usePathname();

  return (
    <aside className="border-2 border-neutral-100 p-4">
      <ul className="space-y-2">
        {categories.map((cat) => (
          <CategoryItem key={cat.id} item={cat} pathname={pathname} level={0} />
        ))}
      </ul>
    </aside>
  );
}

function CategoryItem({ item, pathname, level }: { item: MenuItem; pathname: string; level: number }) {
  const href = normalizeWpUrl(item.url);
  const isActive = pathname === href;
  const hasChildren = item.children.length > 0;

  return (
    <li>
      <Link
        href={href}
        className={`block py-1 transition-colors ${
          isActive ? "font-semibold text-black" : "text-neutral-600 hover:text-black"
        }`}
        style={{ paddingLeft: `${level * 12}px` }}
      >
        {item.title}
      </Link>

      {hasChildren && (
        <ul className="mt-1 space-y-1">
          {item.children.map((child) => (
            <CategoryItem key={child.id} item={child} pathname={pathname} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}
