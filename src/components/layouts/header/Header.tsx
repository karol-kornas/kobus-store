"use client";

import Image from "next/image";
import Link from "next/link";
import { HeaderActions } from "./HeaderActions";
import { Hamburger } from "@/components/icons/Hamburger";
import { useState } from "react";
import { HeaderFeatures } from "./HeaderFeatures";
import { MenuItem } from "@/types/menu";
import { Navigation } from "../navigation/Navigation";
import { MobileMenuContext } from "@/context/MobileMenuContext";
import dynamic from "next/dynamic";

const MobileMenu = dynamic(() => import("../mobileMenu/MobileMenu"), {
  ssr: false,
});

interface Props {
  menu: MenuItem[];
}

export function Header({ menu }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MobileMenuContext.Provider
      value={{
        isOpenMobileMenu: isOpen,
        closeMobileMenu: () => {
          document.body.style.overflow = "";
          setIsOpen(false);
        },
      }}
    >
      <header className="relative z-10 border-b-2 dark:border-neutral-800 border-neutral-200 text-black dark:text-white">
        <HeaderFeatures />
        <div className="bg-white dark:bg-black">
          <div className="container flex items-center justify-between py-4 xl:py-7 gap-4">
            <button
              className="size-10 flex items-center justify-center xl:hidden"
              onClick={() => {
                document.body.style.overflow = "hidden";
                setIsOpen(true);
              }}
            >
              <Hamburger size="28" />
              <span className="sr-only">Otwórz menu</span>
            </button>

            <Link href="/">
              <img className="max-xl:w-40" src="/logo.svg" alt="Kobus Store" width={200} height={82} />
            </Link>

            <Navigation classNav="hidden xl:flex" items={menu} />

            <HeaderActions />
          </div>
        </div>
      </header>

      <MobileMenu items={menu} />
    </MobileMenuContext.Provider>
  );
}
