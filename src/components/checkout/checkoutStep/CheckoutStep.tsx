type Props = {
  title: string;
  children?: React.ReactNode;
};

export function CheckoutStep({ title, children }: Props) {
  return (
    <div className="checkout-step rounded-lg bg-white px-3 py-6 sm:px-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.025),0_4px_6px_-4px_rgba(0,0,0,0.025)]">
      <h3
        className="before:content-[counter(order)] before:bg-cream before:font-bold  before:mr-3
                before:size-8 before:rounded-full before:inline-flex before:justify-center before:items-center
                font-semibold text-lg"
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
