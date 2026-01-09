export const AUTH_ERROR_MESSAGES = {
  default: "Wystąpił błąd. Spróbuj ponownie.",
  missing_fields: "Wszystkie pola są wymagane.",
  invalid_credentials: "Nieprawidłowy login lub hasło.",
  too_many_requests: "Zbyt wiele prób. Spróbuj ponownie za chwilę.",
  invalid_email: "Nieprawidłowy adres e-mail.",
  email_exists: "Konto z tym adresem e-mail już istnieje.",
  invalid_user: "Link do resetu hasła jest nieprawidłowy lub wygasł.",
  invalid_or_expired_key: "Link do resetu hasła jest nieprawidłowy lub wygasł.",
  weak_password: "Hasło musi mieć co najmniej 8 znaków.",
} as const;

export type AuthErrorCode = keyof typeof AUTH_ERROR_MESSAGES;
