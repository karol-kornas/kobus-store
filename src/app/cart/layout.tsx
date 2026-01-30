import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 p-2 z-50"
      >
        Przejdź do treści
      </a>

      <div className="bg-cream min-h-screen relative">
        <header>
          <div className="container max-w-5xl py-8 grid lg:grid-cols-3 items-center justify-center">
            <Link href="/" className="hidden lg:inline-flex gap-0.5 font-semibold hover:opacity-90">
              <ChevronLeft />
              Wróć do sklepu
            </Link>
            <div className="m-auto">
              <Link href="/">
                <img
                  className="max-xl:w-34 shadow-xl"
                  src="/logo.svg"
                  alt="Kobus Store"
                  width={150}
                  height={61}
                />
              </Link>
            </div>
          </div>
        </header>

        <main id="main-content" className="bg-cream">
          {children}
        </main>
      </div>
    </>
  );
}
