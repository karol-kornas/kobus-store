import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import Link from "next/link";
import { MobileMenuPortal } from "./MobileMenuPortal";
import { Navigation } from "../navigation/Navigation";
import { MenuItem } from "@/types/menu";
import { useMobileMenu } from "@/context/MobileMenuContext";

interface Props {
  items: MenuItem[];
}

export function MobileMenu({ items }: Props) {
  const { isOpenMobileMenu, closeMobileMenu } = useMobileMenu();

  return (
    <MobileMenuPortal>
      {/* BACKDROP */}
      <motion.div
        className="fixed inset-0 bg-black/40 z-40 xl:hidden"
        initial={false}
        animate={isOpenMobileMenu ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto" },
          closed: { opacity: 0, pointerEvents: "none" },
        }}
        onClick={() => closeMobileMenu()}
      />

      {/* SIDEBAR */}
      <motion.aside
        className="fixed inset-y-0 left-0 w-80 bg-background z-50 xl:hidden"
        initial={false}
        animate={isOpenMobileMenu ? "open" : "closed"}
        variants={{
          open: { x: 0 },
          closed: { x: "-100%" },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="h-full overflow-y-auto">
          <div className="flex justify-between items-center px-3 py-4">
            <Link href="/" onClick={() => closeMobileMenu()}>
              <Image className="w-40" src="/logo.svg" alt="Kobus Store" width={200} height={82} />
            </Link>

            <button className="size-10 flex items-center justify-center" onClick={() => closeMobileMenu()}>
              <X size="32" />
              <span className="sr-only">Zamknij menu</span>
            </button>
          </div>

          <Navigation items={items} />
        </div>
      </motion.aside>
    </MobileMenuPortal>
  );
}
