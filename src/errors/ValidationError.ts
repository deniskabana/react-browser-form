/** Error to throw when form field validation fails */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
