import { ReactNode } from "react";

type Props = {
  content: ReactNode;
  side: ReactNode;
};

export function CheckoutLayout({ content, side }: Props) {
  return (
    <div className="container max-sm:px-0 max-w-5xl grid lg:grid-cols-[540fr_325fr] gap-8">
      <div className="flex flex-col gap-6">{content}</div>
      <div>{side}</div>
    </div>
  );
}
