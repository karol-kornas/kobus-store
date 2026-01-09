import { ButtonLink } from "@/components/ui/button/Button";

export default function SetPasswordSuccessPage() {
  return (
    <div className="container max-w-xl py-8 md:py-16">
      <h1 className="font-display text-2xl font-medium pb-8">Hasło zostało ustawione 🎉</h1>
      <p>Możesz teraz zalogować się do swojego konta, używając nowego hasła.</p>
      <ButtonLink href="/login" className="mt-6">
        Przejdź do logowania
      </ButtonLink>
    </div>
  );
}
