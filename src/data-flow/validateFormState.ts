import { DEFAULT_REQUIRED_ERROR_MESSAGE, DEFAULT_VALIDATION_ERROR_MESSAGE } from "../constants";
import { DataFlowState } from "../types";
import { ValidationError } from "../errors/ValidationError";

/** Validate **changed** data only. */
export function validateFormState<Schema>(dataFlowState: DataFlowState<Schema>): void {
  if (!dataFlowState.options.validationSchema) return;

  const {
    changedData,
    formState,
    fieldsData: { required, validated },
  } = dataFlowState;
  const data = changedData ?? formState;
  const oldErrors = { ...dataFlowState.errorData.errors };
  const newErrors: Partial<Record<keyof Schema, string>> = {};

  for (let key in data) {
    // Clear this from the old errors
    delete oldErrors[key];

    // Check required
    if (required.includes(key)) {
      const newValue = data[key] as unknown;

      if (newValue === null || newValue === undefined || newValue === false || String(newValue).length === 0) {
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
          validator(data[key] as Schema[Extract<keyof Schema, string>], { ...formState, ...data });
        } else if (Array.isArray(validator)) {
          for (let validatorFn of validator) {
            validatorFn(data[key], { ...formState, ...data });
          }
        } else {
          throw new Error("react-browser-form: Invalid validators provided!");
        }
      } catch (error) {
        if (!(error instanceof ValidationError)) throw error;
        newErrors[key] = (error as any)?.message ?? DEFAULT_VALIDATION_ERROR_MESSAGE;
        dataFlowState.hasErrors = true;
      }
    }
  }

  dataFlowState.setErrors({ ...oldErrors, ...newErrors });
}
