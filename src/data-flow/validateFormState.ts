import { DEFAULT_REQUIRED_ERROR_MESSAGE, DEFAULT_VALIDATION_ERROR_MESSAGE } from "../constants";
import { DataFlowState } from "../types";
import { ValidationError } from "../ValidationError";

/** Validate **changed** data. */
export function validateFormState<Schema>(dataFlowState: DataFlowState<Schema>): void {
  if (!dataFlowState.options.validationSchema) return;

  const { required, validated } = dataFlowState.fieldsData;
  const data = dataFlowState.changedData;
  const oldErrors = dataFlowState.errors.errorData;
  const newErrors: Partial<Record<keyof Schema, string>> = {};

  for (let key in data) {
    // Clear this from the old errors
    delete oldErrors[key];

    // Check required
    if (required.includes(key)) {
      if (
        dataFlowState.formState[key] === null ||
        dataFlowState.formState[key] === undefined ||
        dataFlowState.formState[key] === false ||
        (typeof dataFlowState.formState[key] === "string" && (dataFlowState.formState[key] as string).length === 0)
      ) {
        newErrors[key] = dataFlowState.options?.validationSchema?.required?.message ?? DEFAULT_REQUIRED_ERROR_MESSAGE;
        dataFlowState.hasErrors = true;
      }
    }

    // Check validated
    if (validated.includes(key)) {
      const validator = dataFlowState.options?.validationSchema?.validators
        ? dataFlowState.options?.validationSchema?.validators[key]
        : null;
      if (!validator) break;

      try {
        if (typeof validator === "function") {
          validator(dataFlowState.formState[key], { ...dataFlowState.formState });
        } else if (Array.isArray(validator)) {
          for (let validatorFn of validator) {
            validatorFn(dataFlowState.formState[key], { ...dataFlowState.formState });
          }
        } else {
          throw new Error("react-dumb-form: Invalid validators provided!");
        }
      } catch (error: any) {
        if (error?.name !== ValidationError.name) throw error;
        newErrors[key] = error.message ?? DEFAULT_VALIDATION_ERROR_MESSAGE;
        dataFlowState.hasErrors = true;
      }
    }
  }

  dataFlowState.setErrors({ ...oldErrors, ...newErrors });
}
