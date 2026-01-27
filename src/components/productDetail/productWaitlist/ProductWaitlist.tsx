"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/context/AuthContext";
import { useWaitlist } from "@/features/waitlist/waitlist.hook";

import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { FormField } from "@/components/ui/formField/FormField";
import { FormError } from "@/components/ui/form/formError/FormError";
import { WaitlistFormValues, waitlistSchema } from "@/features/waitlist/waitlist.schema";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";

type ProductWaitlistProps = {
  productId: number;
  disabled?: boolean;
};

export function ProductWaitlist({ productId, disabled }: ProductWaitlistProps) {
  const { isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
  });

  const { registered, loading, error, info, join, remove, statusLoading } = useWaitlist({
    productId,
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    await join(data.email);
  };

  if (statusLoading) {
    return <Skeleton className="w-full h-14" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {!isAuthenticated && (
        <FormField label="Adres e-mail" htmlFor="email" required error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            placeholder="Twój e-mail"
            disabled={loading || isSubmitting}
            {...register("email")}
          />
        </FormField>
      )}

      {registered && isAuthenticated ? (
        <Button
          type="button"
          size="lg"
          variant="secondary"
          onClick={remove}
          isLoading={loading}
          disabled={disabled || statusLoading}
        >
          {disabled || statusLoading ? "Wybierz wariant" : "Wypisz z listy oczekujących"}
        </Button>
      ) : isAuthenticated ? (
        <Button
          onClick={() => join()}
          size="lg"
          isLoading={loading || isSubmitting}
          disabled={disabled || statusLoading}
        >
          {disabled || statusLoading ? "Wybierz wariant" : "Powiadom mnie o dostępności"}
        </Button>
      ) : (
        <Button
          type="submit"
          size="lg"
          isLoading={loading || isSubmitting}
          disabled={disabled || statusLoading}
        >
          {disabled || statusLoading ? "Wybierz wariant" : "Powiadom mnie o dostępności"}
        </Button>
      )}

      <FormError message={error} />

      {info && <p className="text-sm text-green-600">{info}</p>}
    </form>
  );
}
