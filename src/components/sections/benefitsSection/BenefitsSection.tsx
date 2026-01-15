import { RotateCcw, Gift, Plane, ClockFading } from "lucide-react";

const benefits = [
  {
    title: "Szybka realizacja",
    subtitle: "1-2 dni",
    Icon: ClockFading,
  },
  {
    title: "Wysyłamy za granicę",
    Icon: Plane,
  },
  {
    title: "Darmowa dostawa",
    subtitle: "Już od 449 zł",
    Icon: Gift,
  },
  {
    title: "Zwroty i reklamacje",
    subtitle: "Do 14 dni",
    Icon: RotateCcw,
  },
];

export function BenefitsSection() {
  return (
    <section className="mt-14 lg:mt-18">
      <div className="container">
        <div className="grid grid-cols-2 xl:flex justify-center gap-12 items-center border-neutral-100 border-2 text-center xl:text-right py-8 lg:py-12 px-8">
          {benefits.map(({ title, subtitle, Icon }) => (
            <div
              key={title}
              className="flex flex-col xl:flex-row items-center xl:justify-end gap-5 w-full xl:max-w-57"
            >
              <Icon size={68} className="flex-none xl:order-1" />
              <div>
                <div className="text-xl">{title}</div>
                {subtitle && <small className="text-neutral-500">{subtitle}</small>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
