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
        <div className="container max-sm:px-0 max-w-5xl ">
          <CheckoutHeader />

          <main id="main-content">{children}</main>

          <CartFooter />
        </div>
      </div>
    </>
  );
}
