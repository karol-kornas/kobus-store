type Props = {
  sidebar: React.ReactNode;
  content: React.ReactNode;
};

export function SidebarLayout({ sidebar, content }: Props) {
  return (
    <div className="grid xl:grid-cols-[18.625rem_1fr] 2xl:grid-cols-[22.625rem_1fr] gap-4 md:gap-10 mt-6 lg:mt-8">
      <div className="hidden xl:block">{sidebar}</div>

      <div>{content}</div>
    </div>
  );
}
