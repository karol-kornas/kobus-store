import { CartFooter } from "@/components/cart/cartFooter/CartFooter";
import { CheckoutHeader } from "@/components/checkout/checkoutHeader/CheckoutHeader";

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-neutral-100 min-h-screen relative">
        <CheckoutHeader />

        <main id="main-content">{children}</main>

        <CartFooter />
      </div>
    </>
  );
}
