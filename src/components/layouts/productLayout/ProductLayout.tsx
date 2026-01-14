import { ReactNode } from "react";

type Props = {
  breadcrumbs: ReactNode;
  gallery: ReactNode;
  summary: ReactNode;
  description?: ReactNode;
};

export function ProductLayout({ breadcrumbs, gallery, summary, description }: Props) {
  return (
    <div className="container">
      {breadcrumbs}
      <div className="grid grid-cols-1 lg:grid-cols-[44%_1fr] mt-8 gap-8 md:gap-12">
        <div className="w-full">{gallery}</div>
        <div className="lg:w-125 flex-none">{summary}</div>
      </div>
      <div>{description}</div>
    </div>
  );
}
