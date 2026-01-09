"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TabItem } from "./tabs.types";
import { ReactNode, useId, useState } from "react";

export interface Props {
  items: TabItem[];
  initialActiveId?: number;
  children: (activeItem: TabItem, hasInteracted: boolean) => ReactNode;
}

export function Tabs({ items, initialActiveId, children }: Props) {
  const [activeId, setActiveId] = useState(initialActiveId ?? items[0]?.id);
  const [hasInteracted, setHasInteracted] = useState(false);
  const layoutId = useId();

  const activeItem = items.find((item) => item.id === activeId)!;

  function handleTabClick(id: number) {
    setActiveId(id);
    setHasInteracted(true);
  }

  return (
    <div>
      <div className="relative flex gap-6 mt-6">
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`
                relative pb-3 text-lg font-display transition-colors cursor-pointer
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                ${isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}
              `}
            >
              {item.label}

              {isActive && (
                <motion.span
                  layoutId={`tabs-underline-${layoutId}`}
                  className="absolute left-0 bottom-0 h-0.5 w-full bg-foreground"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-6"
        >
          {children(activeItem, hasInteracted)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
