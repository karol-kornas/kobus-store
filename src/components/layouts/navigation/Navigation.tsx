"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { normalizeWpUrl } from "@/utils/normalizeWpUrl";
import { useClickOutside } from "@/hooks/useClickOutside";
import { NavigationSub } from "./NavigationSub";
import { MenuItem } from "@/types/menu";
import { useMobileMenu } from "@/context/MobileMenuContext";

interface Props {
  items: MenuItem[];
  classNav?: string;
}

export function Navigation({ items, classNav }: Props) {
  const [openId, setOpenId] = useState<number | null>(null);
  const { closeMobileMenu } = useMobileMenu();

  const toggleMenu = (id: number) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  const menuRef = useRef<HTMLUListElement>(null);

  useClickOutside(menuRef, () => {
    setOpenId(null);
  });

  return (
    <nav className={classNav}>
      <ul
        ref={menuRef}
        className="flex flex-col xl:flex-row divide-y divide-neutral-100 dark:divide-neutral-800 xl:divide-y-0 items-center xl:gap-8"
      >
        {items.map((item) => {
          const hasChildren = item.children.length > 0;
          return (
            <li key={item.id} className="group w-full xl:w-auto">
              <Link
                href={normalizeWpUrl(item.url)}
                onClick={(e) => {
                  if (hasChildren) {
                    e.preventDefault();
                    toggleMenu(item.id);
                  } else {
                    setOpenId(null);
                    closeMobileMenu();
                  }
                }}
                className={`relative w-full xl:w-auto justify-between px-4 xl:px-0 py-3 hover:after:scale-x-100 after:transition-transform 
                    after:scale-x-0 after:block after:w-full after:h-px after:bg-current after:absolute after:bottom-0 after:left-0 
                    flex gap-0.5 items-center text-[1.0625rem] uppercase transition-opacity hover:opacity-60 ${
                      item.title == "Sale" && "text-red-600"
                    }`}
              >
                {item.title}
                {hasChildren && (
                  <ChevronDown
                    className={`transition-transform ${openId === item.id && "rotate-180"}`}
                    width="18"
                    height="18"
                  />
                )}
              </Link>

              {hasChildren && <NavigationSub item={item} openId={openId} setOpenId={setOpenId} />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
