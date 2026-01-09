"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { RegisterFormValues, registerSchema } from "../../features/auth/schemas/register.schema";
import { Checkbox } from "@/components/ui/checkbox/Checkbox";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthContext";
import { FormField } from "@/components/ui/formField/FormField";
import { FormError } from "@/components/ui/form/formError/FormError";

export function RegisterForm() {
  const router = useRouter();
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser({ ...data, newsletter: data.newsletter ?? false });
      router.push("/register/success");
    } catch (err) {
      setError("root", {
        message: (err as Error).message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormField
        label="Nazwa użytkownika lub adres e-mail"
        htmlFor="email"
        required
        error={errors.email?.message}
      >
        <Input id="email" type="email" required {...register("email")} />
      </FormField>

      <div className="py-2">
        <Checkbox
          id="newsletter"
          label="Dołączam do newslettera, aby otrzymać w przyszłości nowości, zniżki i ciekawe artykuły"
          {...register("newsletter")}
        />
      </div>
      <p className="text-xs">Zakładając konto potwierdzam, że zapoznałem się z polityką prywatności.</p>

      <FormError message={errors.root?.message} variant="auth" />

      <Button isLoading={isSubmitting}>Zarejestruj się</Button>
    </form>
  );
}
