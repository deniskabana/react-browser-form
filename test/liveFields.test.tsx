import React, { useEffect } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserFormOptionsInput, ErrorsObject, useBrowserForm, ValidationError } from "../src/index";

const DEFAULT_FORM_STATE = {
  testField: "default value",
  liveField: "",
};
type FormSchema = typeof DEFAULT_FORM_STATE;

/**
 * A React component specifically set up for this test suite
 */
function TestComponent({
  options,
  onErrorChange,
}: {
  options: Omit<BrowserFormOptionsInput<FormSchema>, "name">;
  onErrorChange?: (errorData: ErrorsObject<FormSchema>) => void;
}) {
  const { formProps, names, errorData } = useBrowserForm({ name: "test-form", ...options });

  useEffect(() => {
    onErrorChange && onErrorChange(errorData);
  }, [errorData, errorData.count, errorData.errors]);

  return (
    <form data-testid="testForm" {...formProps}>
      <input type="text" name={names.testField} data-testid={names.testField} />
      <input type="text" name={names.liveField} data-testid={names.liveField} />
    </form>
  );
}

/**
 * Verify that liveFields work as expected
 */
describe("Live fields work correctly and produce expected results", () => {
  let formState: FormSchema;
  const testValue = "test new value";

  beforeEach(() => {
    formState = { ...DEFAULT_FORM_STATE };
  });

  it("should update values when changing fields", async () => {
    let onChangeCallback = jest.fn();

    const options: Omit<BrowserFormOptionsInput<FormSchema>, "name"> = {
      defaultValues: formState,
      mode: "onSubmit",
      onChange: onChangeCallback,
      liveFields: ["liveField"],
    };

    render(<TestComponent options={options} />);
    const testField = await screen.findByTestId("testField");
    const liveField = await screen.findByTestId("liveField");

    // Changing both a static and live field should only yield 1 change
    fireEvent.change(testField, { target: { value: testValue } });
    expect(onChangeCallback).toBeCalledTimes(0);
    fireEvent.change(liveField, { target: { value: testValue } });
    expect(onChangeCallback).toBeCalledTimes(1);
    expect(onChangeCallback).toBeCalledWith({ ...DEFAULT_FORM_STATE, liveField: testValue });
  });

  it("should trigger validation when live fields change", async () => {
    let errorState: ErrorsObject<FormSchema> = {
      count: 0,
      errors: {},
    };

    const options: Omit<BrowserFormOptionsInput<FormSchema>, "name"> = {
      defaultValues: formState,
      mode: "onSubmit",
      onChange: jest.fn(), // Prevent console warning
      liveFields: ["liveField"],
      validationSchema: {
        validators: {
          liveField: liveField => {
            if (liveField !== "EXACT_MATCH") throw new ValidationError("test error");
          },
          testField: testField => {
            if (testField !== "EXACT_MATCH") throw new ValidationError("test error");
          },
        },
      },
    };

    render(
      <TestComponent
        options={options}
        onErrorChange={errorData => {
          errorState = { ...errorData };
        }}
      />,
    );
    const testField = await screen.findByTestId("testField");
    const liveField = await screen.findByTestId("liveField");

    // Changing both a static and live field should only yield 1 change
    fireEvent.change(testField, { target: { value: testValue } });
    expect(errorState.count).toEqual(0);
    fireEvent.change(liveField, { target: { value: testValue } });
    expect(errorState.count).toEqual(1);
    expect(errorState.errors.liveField).toBeDefined();
  });
});
