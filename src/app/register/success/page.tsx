import { ButtonLink } from "@/components/ui/button/Button";

export default function RegisterSuccessPage() {
  return (
    <div className="container max-w-xl py-8 md:py-16">
      <h1 className="font-display text-2xl font-medium pb-8">Konto zostało utworzone 🎉</h1>
      <p className="text-lg">Jesteś już zalogowany i możesz korzystać ze sklepu.</p>
      <p className="mt-3">
        Aby dokończyć konfigurację konta i móc logować się w przyszłości, wysłaliśmy do Ciebie wiadomość
        e-mail z linkiem do ustawienia hasła. Sprawdź też folder SPAM.
      </p>

      <ButtonLink href="/" className="mt-6">
        Przejdź do strony głównej
      </ButtonLink>
    </div>
  );
}
