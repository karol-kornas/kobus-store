import { SetPasswordForm } from "./SetPasswordForm";

type PageProps = {
  searchParams: {
    key?: string;
    login?: string;
  };
};

export default async function SetPasswordPage({ searchParams }: PageProps) {
  const { key, login } = await searchParams;

  if (!key || !login) {
    return <p>Nieprawidłowy link resetu hasła</p>;
  }
  return (
    <div className="container max-w-xl py-8 md:py-16">
      <h1 className="font-display text-2xl font-medium pb-8">Ustaw hasło do swojego konta</h1>
      <SetPasswordForm
        defaultValues={{
          key,
          login,
        }}
      />
    </div>
  );
}
