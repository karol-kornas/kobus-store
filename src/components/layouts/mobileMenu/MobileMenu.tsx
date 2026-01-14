import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect } from "react";
import { MobileMenuPortal } from "./MobileMenuPortal";
import { Navigation } from "../navigation/Navigation";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/types/menu";

interface Props {
  items: MenuItem[];
  isMobile: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function MobileMenu({ items, isMobile, isOpen, setIsOpen }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {isMobile && isOpen && (
        <MobileMenuPortal>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* SIDEBAR */}
          <motion.aside
            className="fixed inset-y-0 left-0 w-80 bg-background z-50 overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-center px-3 py-4">
              <Link href="/">
                <Image className="w-40" src="/logo.svg" alt="Kobus Store" width={200} height={82} />
              </Link>

              <button className="size-10 flex items-center justify-center" onClick={() => setIsOpen(false)}>
                <X size="32" />
                <span className="sr-only">Zamknij menu</span>
              </button>
            </div>

            <Navigation items={items} />
          </motion.aside>
        </MobileMenuPortal>
      )}
    </AnimatePresence>
  );
}
