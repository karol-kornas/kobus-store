import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Wpisz poprawny adres e-mail").transform((v) => v.toLowerCase()),
  newsletter: z.boolean().optional(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
