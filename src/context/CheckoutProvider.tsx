"use client";

import { Checkout } from "@/types/checkout/checkout";
import { CountriesStates } from "@/types/countriesStates/countriesStates";
import { createContext, useContext } from "react";

type CheckoutContextType = {
  initialCheckout: Checkout;
  countriesStates: CountriesStates;
};

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export const useCheckoutContext = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckoutContext must be used inside provider");
  return ctx;
};

export function CheckoutProvider({
  initialCheckout,
  countriesStates,
  children,
}: {
  initialCheckout: Checkout;
  countriesStates: CountriesStates;
  children: React.ReactNode;
}) {
  return (
    <CheckoutContext.Provider value={{ initialCheckout, countriesStates }}>
      {children}
    </CheckoutContext.Provider>
  );
}
