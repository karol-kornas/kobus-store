import { z } from "zod";

const PARCEL_LOCKER_RATE_ID = "flexible_shipping_single:9";

export const baseAddressSchema = {
  country: z.string().min(2, "Wybierz kraj"),

  postcode: z
    .string()
    .trim()
    .min(1, "Pole jest wymagane")
    .min(3, "Kod pocztowy jest za krótki")
    .max(10, "Kod pocztowy jest za długi")
    .regex(/^[A-Za-z0-9 -]+$/, "Kod pocztowy zawiera niedozwolone znaki"),
};

const POSTCODE_RULES: Record<string, { regex: RegExp; message: string }> = {
  PL: {
    regex: /^\d{2}-\d{3}$/,
    message: "Kod pocztowy musi być w formacie 00-000",
  },
  DE: {
    regex: /^\d{5}$/,
    message: "Niemiecki kod pocztowy musi mieć 5 cyfr",
  },
  FR: {
    regex: /^\d{5}$/,
    message: "Francuski kod pocztowy musi mieć 5 cyfr",
  },
  GB: {
    regex: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
    message: "Nieprawidłowy kod pocztowy UK",
  },
};

export const checkoutSchema = z
  .object({
    email: z.email("Wpisz poprawny adres e-mail").transform((v) => v.toLowerCase()),

    shippingAddress: z
      .object({
        firstName: z.string().min(1, "Pole jest wymagane"),
        lastName: z.string().min(1, "Pole jest wymagane"),
        phonePrefix: z.string().optional(),
        phone: z
          .string()
          .min(1, "Pole jest wymagane")
          .transform((v) => v.replace(/\s+/g, ""))
          .refine((v) => /^\d+$/.test(v), "Numer telefonu może zawierać tylko cyfry"),
        country: baseAddressSchema.country,
        postcode: baseAddressSchema.postcode,
        street: z
          .string()
          .min(1, "Pole jest wymagane")
          .regex(
            /^(?=.*[A-Za-zĄąĆćĘęŁłŃńÓóŚśŻżŹź])(?=.*\d).+$/,
            "Brakuje nazwy ulicy lub numeru domu/mieszkania",
          ),

        city: z.string().min(1, "Pole jest wymagane"),
      })
      .superRefine((data, ctx) => {
        const rule = POSTCODE_RULES[data.country];

        if (rule && !rule.regex.test(data.postcode)) {
          ctx.addIssue({
            path: ["postcode"],
            message: rule.message,
            code: "custom",
          });
        }

        if (data.phonePrefix === "+48") {
          if (data.phone.length !== 9) {
            ctx.addIssue({
              path: ["phone"],
              message: "Numer telefonu musi mieć 9 cyfr",
              code: "custom",
            });
          }
        } else {
          if (data.phone.length < 9 || data.phone.length > 11) {
            ctx.addIssue({
              path: ["phone"],
              message: "Numer telefonu musi mieć od 9 do 11 cyfr",
              code: "custom",
            });
          }
        }
      })
      .optional(),

    shippingRateId: z.string().min(1),

    paczkomat_id: z.string().optional(),
    paymentMethod: z.string().min(1),
    accept_regulations: z.literal(true),
  })
  .refine((data) => data.shippingRateId !== PARCEL_LOCKER_RATE_ID || !!data.paczkomat_id, {
    message: "Wybierz paczkomat",
    path: ["paczkomat_id"],
  });

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
