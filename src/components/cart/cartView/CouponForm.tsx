"use client";

import { Button } from "@/components/ui/button/Button";
import { FormField } from "@/components/ui/formField/FormField";
import { Input } from "@/components/ui/input/Input";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { ChevronDown, Tags } from "lucide-react";
import { useState } from "react";

export function CouponForm() {
  const { isMutating, addCoupon } = useCart();
  const [couponValue, setCouponValue] = useState<string>("");
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [couponOpen, setCouponOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponValue.trim()) {
      setFeedback({ type: "error", message: "Wprowadź kod kuponu" });
      return;
    }

    setIsLoading(true);

    try {
      await addCoupon(couponValue.trim());
      setCouponValue("");
      setCouponOpen(false);
    } catch {
      setFeedback({ type: "error", message: "Kupon jest niepoprawny." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t border-neutral-200">
      <button
        type="button"
        onClick={() => setCouponOpen(!couponOpen)}
        className="flex items-center gap-3 px-6 py-4 w-full cursor-pointer transition-colors"
      >
        <Tags /> {couponOpen ? "Wpisz kod promocyjny" : "Masz kod promocyjny?"}
        <ChevronDown className={`${couponOpen && "rotate-180"} transition-transform ml-auto`} />
      </button>
      <div className={`${couponOpen ? "flex" : "hidden"} px-6 py-4 gap-1 items-center`}>
        <FormField label="Kod promocyjny" htmlFor="couponCode" className="w-full" error={feedback?.message}>
          <Input
            id="couponCode"
            type="text"
            onChange={(e) => {
              setCouponValue(e.target.value);
              setFeedback(null);
            }}
            value={couponValue}
            disabled={isMutating}
          />
        </FormField>
        <Button type="button" isLoading={isLoading} onClick={handleApplyCoupon}>
          Użyj
        </Button>
      </div>
      {/* {feedback && (
        <p className={`text-sm ${feedback.type === "error" ? "text-red-500" : "text-green-500"}`}>
          {feedback.message}
        </p>
      )} */}
    </div>
  );
}
