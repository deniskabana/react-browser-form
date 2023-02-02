import { validateFormData } from "../src/utils";
import { ValidationError, ValidationSchema } from "../src/index";
import { DEFAULT_REQUIRED_ERROR_MESSAGE } from "../src/constants";

interface Schema {
  firstName: string;
  nickname: string;
}

const TEST_VALIDATION_ERR_MESSAGE = "Nickname must be at least 8 characters long.";

const validationSchema: ValidationSchema<Schema> = {
  required: { fields: ["firstName"] },
  validators: {
    nickname: nickname => {
      if (nickname.length < 8) throw new ValidationError(TEST_VALIDATION_ERR_MESSAGE);
    },
  },
};

/**
 * Try if just basic rendering works
 */
describe("Validate form data util (exported)", () => {
  it("should pass with valid schema", () => {
    const { hasErrors } = validateFormData<Schema>(
      { firstName: "test", nickname: "test more than 8 characters" },
      validationSchema,
    );
    expect(hasErrors).toBe(false);
  });

  it("should return errors with missing required key", () => {
    const { hasErrors, errors } = validateFormData<Schema>(
      { firstName: "", nickname: "test more than 8 characters" },
      validationSchema,
    );
    expect(hasErrors).toBe(true);
    expect(errors.firstName).toEqual(DEFAULT_REQUIRED_ERROR_MESSAGE);
  });

  it("should return errors when failing validation", () => {
    const { hasErrors, errors } = validateFormData<Schema>({ firstName: "test", nickname: "" }, validationSchema);
    expect(hasErrors).toBe(true);
    expect(errors.nickname).toEqual(TEST_VALIDATION_ERR_MESSAGE);
  });

  it("should throw error if requested", () => {
    expect(() => {
      validateFormData<Schema>({ firstName: "test", nickname: "" }, validationSchema, { shouldThrow: true });
    }).toThrow();
  });
});
