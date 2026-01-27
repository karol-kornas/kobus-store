import { ButtonLink } from "@/components/ui/button/Button";

export default function ForgotPasswordSuccessPage() {
  return (
    <div className="container max-w-xl py-8 md:py-16">
      <h1 className="font-display text-2xl font-medium pb-8">Prawie gotowe!</h1>
      <p>
        Jeśli podany login lub e-mail jest powiązany z kontem, wysłaliśmy wiadomość z instrukcją resetu hasła.
        Sprawdź też folder SPAM.
      </p>
      <ButtonLink href="/login" className="mt-6">
        Wróc do logowania
      </ButtonLink>
    </div>
  );
}
