import { z } from "zod";

const PARCEL_LOCKER_RATE_ID = "flexible_shipping_single:9";

const ERRORS = {
  REQUIRED: "Pole jest wymagane",
  INVALID_POSTCODE: "Nieprawidłowy kod",
  INVALID_EMAIL: "Nieprawidłowy adres e-mail",
  INVALID_PHONE: "Nieprawidłowy numer telefonu",
};

export const baseAddressSchema = {
  country: z.string().min(2, "Wybierz kraj"),

  postcode: z
    .string()
    .trim()
    .min(1, ERRORS.REQUIRED)
    .max(10, ERRORS.INVALID_POSTCODE)
    .regex(/^[A-Za-z0-9 -]+$/, ERRORS.INVALID_POSTCODE),
};

const POSTCODE_RULES: Record<string, RegExp> = {
  PL: /^\d{2}-\d{3}$/,
  DE: /^\d{5}$/,
  FR: /^\d{5}$/,
  GB: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
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
          .refine((v) => /^\d+$/.test(v), "Nieprawidłowy numer"),
        country: baseAddressSchema.country,
        postcode: baseAddressSchema.postcode,
        street: z
          .string()
          .min(1, "Pole jest wymagane")
          .regex(/^(?=.*[A-Za-zĄąĆćĘęŁłŃńÓóŚśŻżŹź])(?=.*\d).+$/, "Brakuje ulicy lub numeru domu/mieszkania"),

        city: z.string().min(1, "Pole jest wymagane"),
      })
      .superRefine((data, ctx) => {
        const postcodeRule = POSTCODE_RULES[data.country];

        if (postcodeRule && !postcodeRule.test(data.postcode)) {
          ctx.addIssue({
            path: ["postcode"],
            message: ERRORS.INVALID_POSTCODE,
            code: "custom",
          });
        }

        if (data.phonePrefix === "+48") {
          if (data.phone.length !== 9) {
            ctx.addIssue({
              path: ["phone"],
              message: ERRORS.INVALID_PHONE,
              code: "custom",
            });
          }
        } else {
          if (data.phone.length < 9 || data.phone.length > 11) {
            ctx.addIssue({
              path: ["phone"],
              message: ERRORS.INVALID_PHONE,
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
