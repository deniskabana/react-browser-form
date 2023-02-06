import React, { useEffect } from "react";
import { act, render } from "@testing-library/react";
import { ErrorsObject, useBrowserForm, ValidationError } from "../src/index";

const defaultValues = {
  fullName: "jozo",
  email: "",
  phone: "",
  age: 10,
};
type Schema = typeof defaultValues;

/**
 * A React component specifically set up for this test suite
 */
function TestComponent({ onErrorChange, onChange, setSetValues }: any) {
  const { formProps, errorData, names, setValues } = useBrowserForm<Schema>({
    name: "test-form",
    defaultValues,
    onChange,
    validationSchema: {
      validators: {
        fullName: fullName => {
          if (fullName.length < 10) throw new ValidationError();
        },
        email: email => {
          if (!email.match(/^\S{2,}@\S{2,}\.\S{2,}$/)) throw new ValidationError();
        },
        phone: phone => {
          if (!phone.match(/^[0-9]{6,}$/)) throw new ValidationError();
        },
        age: age => {
          if (!age || age < 18) throw new ValidationError();
        },
      },
    },
  });

  // Propagate method to test suites
  setSetValues && setSetValues(setValues);

  useEffect(() => {
    onErrorChange && onErrorChange(errorData);
  }, [errorData, errorData.count, errorData.errors]);

  return (
    <form data-testid="testForm" {...formProps}>
      <input name={names.fullName} data-testid={names.fullName} />
      <input name={names.email} data-testid={names.email} />
      <input name={names.phone} data-testid={names.phone} />
      <input type="number" name={names.age} data-testid={names.age} />
    </form>
  );
}

/**
 * Test our validation methods
 */
describe("Validation should work correctly", () => {
  it("should pass with a valid schema", async () => {
    let setValuesMethod: any;
    const callback = jest.fn();
    const setSetValues = (setValues: any) => (setValuesMethod = setValues);
    let errorState: ErrorsObject<Schema> = {
      count: 0,
      errors: {},
    };

    render(
      <TestComponent
        onChange={callback}
        setSetValues={setSetValues}
        onErrorChange={(errorData: any) => {
          errorState = { ...errorData };
        }}
      />,
    );

    const validData: Schema = {
      fullName: "At least 10 characters",
      email: "contains@correct.characters",
      phone: "123467890",
      age: 19,
    };

    act(() => {
      setValuesMethod && setValuesMethod({ ...validData });
    });
    expect(callback).toHaveBeenCalledWith({ ...validData });
    expect(errorState.count).toEqual(0);
  });

  it("should not pass with an invalid schema", () => {
    let setValuesMethod: any;
    const callback = jest.fn();
    const setSetValues = (setValues: any) => (setValuesMethod = setValues);
    let errorState: ErrorsObject<Schema> = {
      count: 0,
      errors: {},
    };

    const invalidData: Schema = {
      fullName: "No",
      email: "No",
      phone: "No",
      age: 1,
    };

    render(
      <TestComponent
        onChange={callback}
        setSetValues={setSetValues}
        onErrorChange={(errorData: any) => {
          errorState = { ...errorData };
        }}
      />,
    );

    act(() => setValuesMethod && setValuesMethod({ ...invalidData }));
    expect(callback).toHaveBeenCalledWith({ ...invalidData });
    expect(errorState.count).toEqual(4);
  });
});

/**
 * Test our validation required property
 */
describe("Required property in validation should work", () => {
  it("should pass if required fields are filled", async () => {});
  it("should fail if required fields are not filled", async () => {});
});
