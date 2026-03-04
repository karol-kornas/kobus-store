"use client";

import { FormField } from "@/components/ui/formField/FormField";
import { Input } from "@/components/ui/input/Input";
import { Select } from "@/components/ui/select/Select";
import { PHONE_COUNTRY_CODES } from "@/constants/phoneCodes";
import { useCheckoutContext } from "@/context/CheckoutProvider";
import { CheckoutFormValues } from "@/features/cart/schemas/checkout.schema";
import { useCheckoutController } from "@/hooks/useCheckoutController";
import { mapCountriesToOptions } from "@/utils/mapCountries";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { CheckoutShippingAddressState } from "./CheckoutShippingAddressState";
import { useHookFormMask } from "use-mask-input";

export function CheckoutShippingAddress() {
  const { changeCountry } = useCheckoutController();
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  const country = useWatch({ name: "shippingAddress.country" });
  const phonePrefix = useWatch({ name: "shippingAddress.phonePrefix" });

  const { countriesStates } = useCheckoutContext();

  const countryOptions = mapCountriesToOptions(countriesStates.countries);

  const registerWithMask = useHookFormMask(register);

  const isPL = country === "PL";
  const isPLPhone = phonePrefix === "+48";

  console.log(isPLPhone);

  return (
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
            key={phonePrefix}
            type="text"
            error={!!errors.shippingAddress?.phone}
            required
            {...(isPLPhone
              ? registerWithMask("shippingAddress.phone", ["999 999 999"], { required: true })
              : register("shippingAddress.phone", { required: true }))}
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

                changeCountry(value);
              }}
              options={countryOptions}
              error={!!errors.shippingAddress?.country}
            />
          )}
        />
      </FormField>
      <CheckoutShippingAddressState />
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
            key={country}
            id="postcode"
            inputMode="numeric"
            error={!!errors.shippingAddress?.postcode}
            required
            {...(isPL
              ? registerWithMask("shippingAddress.postcode", ["99-999"], { required: true })
              : register("shippingAddress.postcode", { required: true }))}
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
  );
}
