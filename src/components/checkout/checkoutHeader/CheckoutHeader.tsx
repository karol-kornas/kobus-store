import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export function CheckoutHeader() {
  return (
    <header>
      <div className="py-8 grid lg:grid-cols-3 items-center justify-center">
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
  );
}
