import { FormField } from "@/components/ui/formField/FormField";
import { Select } from "@/components/ui/select/Select";
import { useCheckoutContext } from "@/context/CheckoutProvider";
import { CheckoutFormValues } from "@/features/cart/schemas/checkout.schema";
import { useFormContext, Controller, useWatch } from "react-hook-form";

export function CheckoutShippingAddressState() {
  const { countriesStates } = useCheckoutContext();
  const { control, formState: { errors } } = useFormContext<CheckoutFormValues>();

  const country = useWatch({ name: "shippingAddress.country" });

  const statesForCountry = country ? countriesStates.states[country] : null;
  const requiresState = statesForCountry && Object.keys(statesForCountry).length > 0;

  const stateOptions = statesForCountry
    ? Object.entries(statesForCountry).map(([key, value]) => ({ value: key, label: value }))
    : [];

  if (!requiresState) return null;

  return (
    <FormField
      label="Województwo / Region"
      htmlFor="state"
      required
      error={errors.shippingAddress?.state?.message}
    >
      <Controller
        name="shippingAddress.state"
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={field.onChange}
            options={stateOptions}
            error={!!errors.shippingAddress?.state}
          />
        )}
      />
    </FormField>
  );
}
