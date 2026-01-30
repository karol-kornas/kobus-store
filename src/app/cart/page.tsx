import { CartForm } from "@/components/cart/cartForm/CartForm";
import CartView from "@/components/cart/cartView/CartView";

export default function CartPage() {
  return (
    <div className="container max-w-5xl grid lg:grid-cols-[540fr_325fr] gap-8">
      <div className="flex flex-col gap-8 max-lg:order-2">
        <CartForm />
      </div>
      <div>
        <div className="lg:sticky will-change-transform lg:top-10 bg-white rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.025),0_4px_6px_-4px_rgba(0,0,0,0.025)] p-6">
          <CartView />
        </div>
      </div>
    </div>
  );
}
