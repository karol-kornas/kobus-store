import { GuestGuard } from "@/features/auth/guards/GuestGuard";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <GuestGuard>
      <div className="container max-w-xl py-8 md:py-16">
        <h1 className="font-display text-2xl font-medium pb-2">Nie pamiętasz hasła?</h1>
        <p className="mb-6">
          Proszę wpisać nazwę użytkownika lub adres e-mail. Wyślemy w wiadomości email, odnośnik potrzebny do
          utworzenia nowego hasła.
        </p>
        <ForgotPasswordForm />
      </div>
    </GuestGuard>
  );
}
