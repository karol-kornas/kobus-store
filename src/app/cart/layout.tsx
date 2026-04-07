import { Header } from "@/components/layouts/header/Header";
import { getMenu } from "@/features/menu/menu.server";
import { CartFooter } from "@/components/cart/cartFooter/CartFooter";

export default async function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenu("headless_header");
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-background p-2 z-50"
      >
        Przejdź do treści
      </a>
      <Header menu={menu} />
      <div id="mobile-menu-portal-root"></div>
      <main id="main-content" className="bg-neutral-100">
        <div className="container max-sm:px-1 max-w-7xl">
          {children}
          <CartFooter />
        </div>
      </main>
    </>
  );
}
