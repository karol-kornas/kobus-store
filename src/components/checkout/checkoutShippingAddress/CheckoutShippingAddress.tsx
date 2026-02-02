"use client";

import { FormField } from "@/components/ui/formField/FormField";
import { Input } from "@/components/ui/input/Input";
import { Select } from "@/components/ui/select/Select";
import { COUNTRIES } from "@/constants/countries";
import { PHONE_COUNTRY_CODES } from "@/constants/phoneCodes";
import { useCart } from "@/features/cart/hooks/cart.hooks";
import { CheckoutFormValues } from "@/features/cart/schemas/checkout.schema";
import { formatPlPostcode } from "@/utils/formatPlPostcode";
import { Controller, useFormContext, useWatch } from "react-hook-form";

export function CheckoutShippingAddress() {
  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = useFormContext<CheckoutFormValues>();

  const { onChange, ...rest } = register("shippingAddress.postcode");

  const { updateCustomer } = useCart();

  const country = useWatch({ name: "shippingAddress.country" });
  return (
    <div className="checkout-step rounded-lg bg-white px-3 py-6 sm:px-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.025),0_4px_6px_-4px_rgba(0,0,0,0.025)]">
      <h3
        className="before:content-[counter(order)] before:bg-cream before:font-bold  before:mr-3
                   before:size-8 before:rounded-full before:inline-flex before:justify-center before:items-center
                   font-semibold text-lg"
      >
        Adres dostawy
      </h3>
      <div className="mt-6 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          <FormField
            label="Imię"
            htmlFor="firstName"
            required
            error={errors.shippingAddress?.firstName?.message}
          >
            <Input
              id="firstName"
              type="text"
              error={!!errors.shippingAddress?.firstName}
              required
              {...register("shippingAddress.firstName")}
            />
          </FormField>
          <FormField
            label="Nazwisko"
            htmlFor="lastName"
            required
            error={errors.shippingAddress?.lastName?.message}
          >
            <Input
              id="lastName"
              type="text"
              error={!!errors.shippingAddress?.lastName}
              required
              {...register("shippingAddress.lastName")}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
          <FormField
            label="Kierunkowy"
            htmlFor="phonePrefix"
            variant="static"
            required
            error={errors.shippingAddress?.phonePrefix?.message}
          >
            <Controller
              name="shippingAddress.phonePrefix"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  options={PHONE_COUNTRY_CODES}
                  error={!!errors.shippingAddress?.phonePrefix}
                />
              )}
            />
          </FormField>
          <FormField
            label="Numer telefonu"
            htmlFor="phone"
            className="sm:col-span-2"
            required
            error={errors.shippingAddress?.phone?.message}
          >
            <Input
              id="phone"
              type="text"
              error={!!errors.shippingAddress?.phone}
              required
              {...register("shippingAddress.phone")}
            />
          </FormField>
        </div>
        <FormField
          label="Kraj"
          htmlFor="country"
          variant="static"
          required
          error={errors.shippingAddress?.country?.message}
        >
          <Controller
            name="shippingAddress.country"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);

                  updateCustomer({
                    shipping_address: {
                      country: value,
                    },
                    billing_address: {
                      country: value,
                    },
                  });
                }}
                options={COUNTRIES}
                error={!!errors.shippingAddress?.country}
              />
            )}
          />
        </FormField>
        <FormField
          label="Ulica i numer domu/mieszkania"
          htmlFor="street"
          required
          error={errors.shippingAddress?.street?.message}
        >
          <Input
            id="street"
            type="text"
            error={!!errors.shippingAddress?.street}
            required
            {...register("shippingAddress.street")}
          />
        </FormField>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
          <FormField
            label="Kod pocztowy"
            htmlFor="postcode"
            error={errors.shippingAddress?.postcode?.message}
            required
          >
            <Input
              id="postcode"
              {...rest}
              inputMode="numeric"
              onChange={(e) => {
                if (country === "PL") {
                  setValue("shippingAddress.postcode", formatPlPostcode(e.target.value), {
                    shouldDirty: true,
                  });
                } else {
                  onChange(e);
                }
              }}
              error={!!errors.shippingAddress?.postcode}
              required
            />
          </FormField>
          <FormField
            label="Miasto"
            className="sm:col-span-2"
            htmlFor="city"
            required
            error={errors.shippingAddress?.city?.message}
          >
            <Input
              id="city"
              type="text"
              error={!!errors.shippingAddress?.city}
              required
              {...register("shippingAddress.city")}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
