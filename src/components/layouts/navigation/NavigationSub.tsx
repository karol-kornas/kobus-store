import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";
import { normalizeWpUrl } from "@/utils/normalizeWpUrl";
import { MenuItem } from "@/types/menu";

interface Props {
  item: MenuItem;
  openId: number | null;
}

export function NavigationSub({ item, openId }: Props) {
  return (
    <AnimatePresence>
      {openId === item.id && (
        <motion.div
          initial={{ opacity: 0, height: 0, pointerEvents: "none" }}
          animate={{ opacity: 1, height: "auto", pointerEvents: "auto" }}
          exit={{ opacity: 0, height: 0, pointerEvents: "none" }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{ originY: 0 }}
          className="
            bg-neutral-50
              dark:bg-neutral-900
              xl:bg-background
              overflow-hidden
              xl:overflow-visible
              xl:h-auto!
              xl:opacity-100
              xl:absolute
              top-full
              left-0
              w-full
              mt-0.5
            "
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05, delayChildren: 0.3 },
              },
            }}
            className="container mx-auto max-xl:px-6 py-4 xl:py-6 "
          >
            <ul className="grid divide-y dark:divide-neutral-700 divide-neutral-200 xl:divide-y-0 grid-cols-1 xl:grid-cols-6 gap-4 xl:gap-14">
              {item.children.map((el, i) => (
                <motion.li
                  key={el.id}
                  variants={{
                    hidden: { opacity: 0, y: -25 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  exit={{ opacity: 0 }}
                >
                  <span className="font-medium uppercase">{el.title}</span>
                  {el.children.length > 0 && (
                    <ul
                      className={`${
                        el.title == "Polecane"
                          ? "flex flex-col gap-2 mt-3 xl:mb-0 max-xl:pb-6 "
                          : ++i != item.children.length && "max-xl:pb-3"
                      }`}
                    >
                      {el.children.map((subEl) => (
                        <li key={subEl.id}>
                          <Link
                            href={normalizeWpUrl(subEl.url)}
                            className={`${
                              el.title == "Polecane"
                                ? "bg-cream hover:bg-black hover:text-white dark:bg-neutral-800 dark:hover:bg-white dark:hover:text-black px-4 py-3 transition-colors"
                                : "py-2 hover:opacity-60 transition-opacity"
                            } block`}
                          >
                            {subEl.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
