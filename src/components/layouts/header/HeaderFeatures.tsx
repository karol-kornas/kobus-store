import { ShoppingCart, CreditCard, Heart } from "lucide-react";
import Link from "next/link";

export function HeaderFeatures() {
  return (
    <div className="hidden xl:block bg-white dark:bg-black">
      <div className="container flex justify-between items-center py-4 border-b border-neutral-200 dark:border-neutral-800 text-xs uppercase">
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <ShoppingCart size="16" />
            Darmowa dostawa od 449 zł
          </div>
          <div className="flex items-center gap-2">
            <CreditCard size="16" />
            14 dni na zwrot
          </div>
          <div className="flex items-center gap-2">
            <Heart size="16" />
            100% zadowolonych klientów
          </div>
        </div>
        <div className="flex gap-8">
          <a href="mailto:kontakt@pankobus.pl" className="opacity-65 hover:opacity-100 transition-opacity">
            Napisz: sklep@pankobus.pl
          </a>
          <Link href="/#pomoc-i-kontakt" className="opacity-65 hover:opacity-100 transition-opacity">
            Pomoc i kontakt
          </Link>
        </div>
      </div>
    </div>
  );
}
