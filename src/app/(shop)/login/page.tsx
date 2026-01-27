import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export default function LoginPage() {
  return (
    <div
      className="container grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto 
        divide-y md:divide-y-0 md:divide-x dark:divide-neutral-800 divide-neutral-200 py-10 md:py-24"
    >
      <div className="pb-8 md:pb-0 md:pr-6 lg:pr-16">
        <h1 className="font-display text-xl font-medium pb-8 uppercase">Logowanie</h1>
        <LoginForm />
      </div>
      <div className="pt-8 md:pt-0 md:pl-6 lg:pl-16">
        <h2 className="font-display text-xl font-medium pb-2 uppercase">Nie masz jeszcze konta?</h2>
        <p className="font-display text-xl font-medium">Zarejestruj się i zgarnij dodatkowe korzyści</p>
        <ul className="list-disc list-inside mt-6">
          <li>Rabaty i oferty tylko dla zalogowanych</li>
          <li>Oszczędność czasu przy składaniu zamówienia</li>
          <li>Poinformujemy Cię o nowościach i promocjach</li>
          <li>Atrakcyjny system zniżek lojalnościowych</li>
        </ul>
        <h3 className="font-display text-xl font-medium mt-5 mb-3">
          Podaj e-mail, aby ukończyć proces rejestracji
        </h3>
        <RegisterForm />
      </div>
    </div>
  );
}
