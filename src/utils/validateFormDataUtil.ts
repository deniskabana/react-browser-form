import { DEFAULT_REQUIRED_ERROR_MESSAGE, DEFAULT_VALIDATION_ERROR_MESSAGE } from "../constants";
import { ValidationError } from "../errors/ValidationError";
import { ValidationSchema } from "../types";

interface ValidatorOptions {
  /**
   * Whether a failed validation should throw error or return a meta object.
   * @default true
   */
  shouldThrow: boolean;
}

interface ValidatorReturns<Schema> {
  errors: Partial<Record<keyof Schema, string>>;
  hasErrors: boolean;
}

/**
 * This function is a utility to easily test React Browser Form validation schema against any object.
 * @param data Object that you want to test against your validation schema
 * @param validationSchema The React Browser Form validation schema to use
 *
 * - [Validation docs](https://deniskabana.github.io/react-browser-form/documentation/validation-and-transformation)
 */
export function validateFormData<Schema>(
  data: Partial<Schema>,
  validationSchema: ValidationSchema<Schema>,
  { shouldThrow }: ValidatorOptions = { shouldThrow: false },
): ValidatorReturns<Schema> {
  const result: ValidatorReturns<Schema> = {
    errors: {},
    hasErrors: false,
  };

  // Verify correctness of data
  if (!data || typeof data !== "object")
    throw new Error("validateFormData received incorrect type of data (first argument).");

  // Verify correctness of validationSchema
  if (!validationSchema || Object.keys(validationSchema).length === 0 || Object.keys(validationSchema).length > 2)
    throw new Error("validateFormData received invalid validationSchema (second argument).");

  // Validate the data
  const requiredFields = validationSchema.required?.fields;
  const validatedFields = validationSchema.validators ? Object.keys(validationSchema.validators) : undefined;

  for (let key in data) {
    // Check required
    if (requiredFields && requiredFields.includes(key)) {
      const formStateValue = data[key];

      if (
        formStateValue === null ||
        formStateValue === undefined ||
        formStateValue === false ||
        String(formStateValue).length === 0
      ) {
        result.errors[key] = DEFAULT_REQUIRED_ERROR_MESSAGE;
        result.hasErrors = true;
      }
    }

    // Check validated
    if (validatedFields && validatedFields.includes(key)) {
      const validator = validationSchema.validators?.[key];
      if (!validator) break;

      try {
        if (typeof validator === "function") {
          validator(data[key] as Schema[Extract<keyof Schema, string>], data as Schema);
        } else if (Array.isArray(validator)) {
          for (let validatorFn of validator) {
            validatorFn(data[key] as Schema[Extract<keyof Schema, string>], data as Schema);
          }
        } else {
          throw new Error("react-browser-form: Invalid validators provided!");
        }
      } catch (error) {
        if (!(error instanceof ValidationError)) throw error;
        if (shouldThrow) throw error;
        result.errors[key] = (error as any)?.message ?? DEFAULT_VALIDATION_ERROR_MESSAGE;
        result.hasErrors = true;
      }
    }
  }

  return result;
}
