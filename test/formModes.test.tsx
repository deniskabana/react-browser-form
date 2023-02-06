import React, { useEffect } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserFormOptionsInput, ErrorsObject, useBrowserForm } from "../src/index";

const DEFAULT_FORM_STATE = {
  testField1: "",
  testField2: "",
};
type Schema = typeof DEFAULT_FORM_STATE;

/**
 * A React component specifically set up for this test suite
 */
function TestComponent({
  options,
  onErrorChange,
}: {
  options: Omit<BrowserFormOptionsInput<Schema>, "name">;
  onErrorChange?: (errorData: ErrorsObject<Schema>) => void;
}) {
  const { formProps, errorData, names } = useBrowserForm({ name: "test-form", ...options });

  useEffect(() => {
    onErrorChange && onErrorChange(errorData);
  }, [errorData, errorData.count, errorData.errors]);

  return (
    <form data-testid="testForm" {...formProps}>
      <input type="text" name={names.testField1} data-testid={names.testField1} />
      <input type="text" name={names.testField2} data-testid={names.testField2} />
    </form>
  );
}

/**
 * Test that every mode works as intended
 */
describe("Form modes are working correctly", () => {
  const testValue = "test value";
  const testValidationError = "test error";

  it("should update mode: 'onSubmit' correctly", async () => {
    let formState: Schema = { ...DEFAULT_FORM_STATE };
    const onChangeCallback = jest.fn();

    const options: Omit<BrowserFormOptionsInput<Schema>, "name"> = {
      defaultValues: formState,
      mode: "onSubmit",
      onChange: onChangeCallback,
      onSubmit: data => {
        formState = { ...formState, ...data };
      },
    };

    render(<TestComponent options={options} />);
    const testForm = await screen.findByTestId("testForm");
    const testField1 = await screen.findByTestId("testField1");

    // Change should not mutate state
    fireEvent.change(testField1, { target: { value: testValue } });
    fireEvent.blur(testField1, { target: { value: testValue } });
    expect(formState.testField1).toEqual(DEFAULT_FORM_STATE.testField1);
    // Submit should mutate state
    fireEvent.submit(testForm);
    expect(formState.testField1).toEqual(testValue);
    expect(onChangeCallback).not.toBeCalled();
  });

  it("should update mode: 'onSubmitUnlessError' correctly", async () => {
    let formState: Schema = { ...DEFAULT_FORM_STATE };
    let errorState: ErrorsObject<Schema> = {
      count: 0,
      errors: {},
    };
    const onChangeCallback = jest.fn();

    const options: BrowserFormOptionsInput<Schema> = {
      name: "test-form",
      defaultValues: formState,
      mode: "onSubmitUnlessError",
      validationSchema: {
        required: { fields: ["testField2"], message: testValidationError },
      },
      onChange: onChangeCallback,
      onSubmit: data => {
        formState = { ...formState, ...data };
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
    const testForm = await screen.findByTestId("testForm");
    const testField1 = await screen.findByTestId("testField1");
    const testField2 = await screen.findByTestId("testField2");

    // Change should not mutate state
    fireEvent.change(testField1, { target: { value: testValue } });
    fireEvent.blur(testField1, { target: { value: testValue } });
    expect(formState.testField1).toEqual(DEFAULT_FORM_STATE.testField1);
    // Submit should not mutate state if there are errors on testField2
    fireEvent.submit(testForm);
    expect(formState.testField1).toEqual(DEFAULT_FORM_STATE.testField1);
    expect(errorState.errors.testField2).toEqual(testValidationError);
    // Fix error (testField2 is required) and submit again
    fireEvent.change(testField2, { target: { value: testValue } });
    expect(errorState.count).toEqual(0);
    fireEvent.submit(testForm);
    expect(formState.testField1).toEqual(testValue);
    expect(onChangeCallback).not.toBeCalled();
  });

  it("should update mode: 'onBlur' correctly", async () => {
    let formState: Schema = { ...DEFAULT_FORM_STATE };

    const options: BrowserFormOptionsInput<Schema> = {
      name: "test-form",
      defaultValues: formState,
      mode: "onBlur",
      onChange: data => {
        formState = { ...formState, ...data };
      },
      onSubmit: data => {
        formState = { ...formState, ...data };
      },
    };

    render(<TestComponent options={options} />);
    const testField1 = await screen.findByTestId("testField1");

    // Change should not mutate state
    fireEvent.change(testField1, { target: { value: testValue } });
    expect(formState.testField1).toEqual(DEFAULT_FORM_STATE.testField1);
    // Blur should mutate state
    fireEvent.blur(testField1, { target: { value: testValue } });
    expect(formState.testField1).toEqual(testValue);
  });

  it("should update mode: 'onBlurUnlessError' correctly", async () => {
    let formState: Schema = { ...DEFAULT_FORM_STATE };
    let errorState: ErrorsObject<Schema> = {
      count: 0,
      errors: {},
    };

    const options: BrowserFormOptionsInput<Schema> = {
      name: "test-form",
      defaultValues: formState,
      mode: "onBlurUnlessError",
      validationSchema: {
        required: { fields: ["testField2"], message: testValidationError },
      },
      onChange: data => {
        formState = { ...formState, ...data };
      },
      onSubmit: data => {
        formState = { ...formState, ...data };
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
    const testForm = await screen.findByTestId("testForm");
    const testField1 = await screen.findByTestId("testField1");
    const testField2 = await screen.findByTestId("testField2");

    // Change should not mutate state
    fireEvent.change(testField1, { target: { value: testValue } });
    expect(formState.testField1).toEqual(DEFAULT_FORM_STATE.testField1);
    // Submit should not mutate state if there are errors on testField2
    fireEvent.submit(testForm);
    expect(formState.testField1).toEqual(DEFAULT_FORM_STATE.testField1);
    expect(errorState.errors.testField2).toEqual(testValidationError);
    // Blur should change state
    fireEvent.blur(testField1, { target: { value: testValue } });
    expect(formState.testField1).toEqual(testValue);
    // Fix error (testField2 is required) and submit again
    fireEvent.blur(testField2, { target: { value: testValue } });
    expect(errorState.count).toEqual(0);
    fireEvent.submit(testForm);
    expect(formState.testField1).toEqual(testValue);
  });

  it("should update mode: 'onChange' correctly", async () => {
    let formState: Schema = { ...DEFAULT_FORM_STATE };

    const options: BrowserFormOptionsInput<Schema> = {
      name: "test-form",
      defaultValues: formState,
      mode: "onChange",
      onSubmit: data => {
        formState = { ...formState, ...data };
      },
      onChange: data => {
        formState = { ...formState, ...data };
      },
    };

    render(<TestComponent options={options} />);
    const testField1 = await screen.findByTestId("testField1");

    // Blur should not mutate state
    fireEvent.blur(testField1, { target: { value: testValue } });
    expect(formState.testField1).toEqual(DEFAULT_FORM_STATE.testField1);
    // Change should mutate state
    fireEvent.change(testField1, { target: { value: testValue } });
    expect(formState.testField1).toEqual(testValue);
  });
});
