import React, { useEffect } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserFormOptionsInput, ErrorsObject, useBrowserForm } from "../src/index";

interface FormSchema {
  testField1: string;
  testField2: string;
}
const DEFAULT_FORM_STATE: FormSchema = {
  testField1: "",
  testField2: "",
};

function TestComponent({
  options,
  onErrorChange,
}: {
  options: Omit<BrowserFormOptionsInput<FormSchema>, "name">;
  onErrorChange?: (errorData: ErrorsObject<FormSchema>) => void;
}) {
  const { formProps, errorData } = useBrowserForm({ name: "test-form", ...options });

  useEffect(() => {
    onErrorChange && onErrorChange(errorData);
  }, [errorData, errorData.count, errorData.errors]);

  return (
    <form data-testid="testForm" {...formProps}>
      <input type="text" name="testField1" data-testid="testField1" />
      <input type="text" name="testField2" data-testid="testField2" />
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
    let formState: FormSchema = { ...DEFAULT_FORM_STATE };

    const options: BrowserFormOptionsInput<FormSchema> = {
      name: "test-form",
      defaultValues: formState,
      mode: "onSubmit",
      onChange: () => new Error(),
      onSubmit: data => {
        formState = { ...formState, ...data };
      },
    };

    render(<TestComponent options={options} />);
    const testForm = await screen.findByTestId("testForm");
    const testField1 = await screen.findByTestId("testField1");

    fireEvent.change(testField1, { target: { value: testValue } });
    fireEvent.blur(testField1, { target: { value: testValue } });
    // Change should not mutate state
    expect(formState.testField1).toEqual(DEFAULT_FORM_STATE.testField1);
    fireEvent.submit(testForm);
    // Submit should mutate state
    expect(formState.testField1).toEqual(testValue);
  });

  it("should update mode: 'onSubmitUnlessError' correctly", async () => {
    let formState: FormSchema = { ...DEFAULT_FORM_STATE };
    let errorState: ErrorsObject<FormSchema> = {
      count: 0,
      errors: {},
    };

    const options: BrowserFormOptionsInput<FormSchema> = {
      name: "test-form",
      defaultValues: formState,
      mode: "onSubmitUnlessError",
      validationSchema: {
        required: { fields: ["testField2"], message: testValidationError },
      },
      onChange: () => new Error(),
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
  });

  it("should update mode: 'onBlur' correctly", async () => {
    let formState: FormSchema = { ...DEFAULT_FORM_STATE };

    const options: BrowserFormOptionsInput<FormSchema> = {
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
    let formState: FormSchema = { ...DEFAULT_FORM_STATE };
    let errorState: ErrorsObject<FormSchema> = {
      count: 0,
      errors: {},
    };

    const options: BrowserFormOptionsInput<FormSchema> = {
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
    let formState: FormSchema = { ...DEFAULT_FORM_STATE };

    const options: BrowserFormOptionsInput<FormSchema> = {
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
