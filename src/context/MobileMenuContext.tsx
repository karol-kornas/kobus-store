import { createContext, useContext } from "react";

type MobileMenuContextType = {
  isOpenMobileMenu: boolean;
  closeMobileMenu: () => void;
};

export const MobileMenuContext = createContext<MobileMenuContextType | null>(null);

export const useMobileMenu = () => {
  const ctx = useContext(MobileMenuContext);
  if (!ctx) {
    throw new Error("useMobileMenu must be used within MobileMenuContext.Provider");
  }
  return ctx;
};
