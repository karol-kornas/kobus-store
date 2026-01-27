"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FormField } from "@/components/ui/formField/FormField";
import { FormError } from "@/components/ui/form/formError/FormError";
import { SetPasswordFormValues, setPasswordSchema } from "@/features/auth/schemas/setPassword.schema";

export function SetPasswordForm({
  defaultValues,
}: {
  defaultValues: Pick<SetPasswordFormValues, "login" | "key">;
}) {
  const router = useRouter();
  const { setPassword } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues,
  });

  const onSubmit = async (data: SetPasswordFormValues) => {
    try {
      await setPassword(data);
      router.push("/set-password/success");
    } catch (err) {
      setError("root", {
        message: (err as Error).message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormField label="Nowe hasło" htmlFor="password" required error={errors.password?.message}>
        <Input id="password" type="password" required {...register("password")} />
      </FormField>

      <FormField
        label="Powtórz hasło"
        htmlFor="confirmPassword"
        required
        error={errors.confirmPassword?.message}
      >
        <Input id="confirmPassword" type="password" required {...register("confirmPassword")} />
      </FormField>

      <FormError message={errors.root?.message} variant="auth" />

      <Button isLoading={isSubmitting}>Ustaw hasło</Button>
    </form>
  );
}
