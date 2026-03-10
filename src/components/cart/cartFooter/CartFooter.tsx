import Link from "next/link";

export function CartFooter() {
  return (
    <footer className="mt-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-end gap-3 md:gap-6 py-6 border-b border-neutral-300">
        <span className="text-[1.125rem] font-bold">Masz pytania?</span>
        <a href="mailto:sklep@pankobus.pl" className="hover:opacity-90">
          sklep@pankobus.pl
        </a>
        <a href="tel:+48515734632" className="hover:opacity-90">
          +48 515 734 632
        </a>
      </div>
      <div className="flex flex-col md:flex-row gap-6 items-center py-6">
        <Link href="#" className="font-semibold hover:opacity-90">
          Regulamin sklepu
        </Link>
        <Link href="#" className="font-semibold hover:opacity-90">
          Polityka prywatności
        </Link>
        <div className="flex flex-col md:flex-row items-center gap-4 md:ml-auto">
          <span className="text-[0.75rem]">Wszystkie prawa zastrzeżone &copy; 2026</span>
          <Link href="/">
            <img className="w-29.5 shadow-xl" src="/logo.svg" alt="Kobus Store" width={150} height={61} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
