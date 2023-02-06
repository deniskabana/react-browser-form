import { DEFAULT_VALIDATION_ERROR_MESSAGE } from "../constants";

/** Error to throw when form field validation fails */
export class ValidationError extends Error {
  constructor(message?: string) {
    super(message ?? DEFAULT_VALIDATION_ERROR_MESSAGE);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
