import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.email("Podaj poprawny adres e-mail").optional(),
});

export type WaitlistFormValues = z.infer<typeof waitlistSchema>;
