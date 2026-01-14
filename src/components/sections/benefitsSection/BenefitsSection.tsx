import { RotateCcw, Gift, Plane, ClockFading } from "lucide-react";

export function BenefitsSection() {
  return (
    <section className="pt-10">
      <div className="container">
        <div className="grid grid-cols-2 xl:flex justify-center gap-12 items-center border-neutral-100 border-2 text-center xl:text-right py-8 lg:py-12 px-8">
          <div className="flex flex-col xl:flex-row items-center xl:justify-end gap-5 w-full xl:max-w-57">
            <ClockFading size={68} className="flex-none xl:order-1" />
            <div>
              <div className="text-xl">Szybka realizacja</div>
              <small>1-2 dni</small>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row items-center xl:justify-end gap-5 w-full xl:max-w-57">
            <Plane size={68} className="flex-none xl:order-1" />
            <div>
              <div className="text-xl">Wysyłamy za&nbsp;granicę</div>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row items-center xl:justify-end gap-5 w-full xl:max-w-57">
            <Gift size={68} className="flex-none xl:order-1" />
            <div>
              <div className="text-xl">Darmowa dostawa</div>
              <small>Już od 449 zł</small>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row items-center xl:justify-end gap-5 w-full xl:max-w-57">
            <RotateCcw size={68} className="flex-none xl:order-1" />
            <div>
              <div className="text-xl">Zwroty i&nbsp;reklamacje</div>
              <small>Do 14 dni</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
