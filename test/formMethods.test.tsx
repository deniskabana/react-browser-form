import { act, render } from "@testing-library/react";
import React from "react";
import { useBrowserForm } from "../src/index";

const defaultValues = {
  firstName: "John",
  lastName: "Wick",
  age: 43,
  occupation: "Dog carer",
};
type Schema = typeof defaultValues;

// Seriously, fuck types in tests, I'm not wasting my energy on this
function TestComponent({ onSubmit, onChange, setSubmit, setReset, setSetValues }: any) {
  const { formProps, names, submit, reset, setValues } = useBrowserForm<Schema>({
    name: "test-form",
    defaultValues,
    onSubmit,
    onChange,
  });

  // Propagate methods to test suites
  setSubmit && setSubmit(submit);
  setReset && setReset(reset);
  setSetValues && setSetValues(setValues);

  return (
    <form {...formProps}>
      <input name={names.firstName} />
      <input name={names.lastName} />
      <input name={names.age} type="number" />
      <input name={names.occupation} />
    </form>
  );
}

/**
 * Try if just basic rendering works
 */
describe("Form methods", () => {
  it("should work when using submit() method", () => {
    let submitMethod: any;
    const callback = jest.fn();
    const setSubmit = (submit: any) => (submitMethod = submit);
    render(<TestComponent onSubmit={callback} setSubmit={setSubmit} />);
    submitMethod && submitMethod();

    expect(callback).toHaveBeenCalledWith(defaultValues);
  });

  it("should work when using reset() method without values", () => {
    let resetMethod: any;
    const callback = jest.fn();
    const setReset = (reset: any) => (resetMethod = reset);
    render(<TestComponent onChange={callback} setReset={setReset} />);
    resetMethod && resetMethod();

    expect(callback).toHaveBeenCalledWith(defaultValues);
  });

  it("should work when using reset() method with values", () => {
    let resetMethod: any;
    const callback = jest.fn();
    const setReset = (reset: any) => (resetMethod = reset);
    render(<TestComponent onChange={callback} setReset={setReset} />);

    const newValues: Schema = {
      firstName: "Harry",
      lastName: "Ambrose",
      age: 59,
      occupation: "Retired",
    };

    resetMethod && resetMethod(newValues);
    expect(callback).toHaveBeenCalledWith(newValues);
  });

  it("should work when using setValues() method without values", () => {
    let setValuesMethod: any;
    const callback = jest.fn();
    const setSetValues = (reset: any) => (setValuesMethod = reset);
    render(<TestComponent onChange={callback} setSetValues={setSetValues} />);

    const newValues: Partial<Schema> = {
      occupation: "Retired contract terminator",
    };

    act(() => {
      setValuesMethod && setValuesMethod(newValues);
    });
    expect(callback).toHaveBeenCalledWith({ ...defaultValues, ...newValues });
  });
});
