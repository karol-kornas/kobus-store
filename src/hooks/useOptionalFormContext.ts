import { useFormContext, FieldValues } from "react-hook-form";

export function useOptionalFormContext<T extends FieldValues>() {
  return useFormContext<T>() ?? null;
}
