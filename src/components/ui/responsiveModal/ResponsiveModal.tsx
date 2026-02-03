"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import clsx from "clsx";

type ResponsiveModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function ResponsiveModal({ open, onClose, title, children, className }: ResponsiveModalProps) {
  // ESC zamyka modal
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useLockBodyScroll(open);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* modal / drawer */}
          <motion.div
            className={clsx(
              `
              fixed z-50 bg-white w-full
              bottom-0 left-0 right-0 rounded-t-2xl
              md:top-1/2 md:left-1/2 md:bottom-auto md:right-auto
              md:-translate-x-1/2 md:-translate-y-1/2
              `,
              !className && "md:w-4xl",
              className,
            )}
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "100%",
              opacity: 0,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
          >
            {/* header */}
            <div className="flex items-center justify-between px-6 xl:px-10 pt-4">
              {title && <h2 className="text-lg font-semibold uppercase">{title}</h2>}

              <button
                type="button"
                onClick={onClose}
                className=" hover:text-neutral-500 cursor-pointer"
                aria-label="Zamknij"
              >
                <X size={32} />
              </button>
            </div>

            {/* content */}
            <div className="px-6 xl:px-10 py-6 max-h-[80vh] overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
