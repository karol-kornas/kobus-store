"use client";

import { useState } from "react";
import { CheckoutForm } from "./CheckoutForm";

export function CheckoutFormWrap() {
  const [cartFormKey, setCartFormKey] = useState(0);

  return <CheckoutForm key={cartFormKey} setCartFormKey={setCartFormKey} />;
}
