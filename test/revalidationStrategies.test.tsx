import React, { useEffect } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ErrorsObject, useBrowserForm, ValidationError } from "../src/index";

const defaultValues = {
  fullName: "",
  email: "",
  phone: "",
  age: 10,
};
type Schema = typeof defaultValues;

/**
 * A React component specifically set up for this test suite
 */
function TestComponent({ onErrorChange, revalidationStrategy, validationSchema }: any) {
  const { formProps, errorData, names } = useBrowserForm<Schema>({
    name: "test-form",
    defaultValues,
    revalidationStrategy,
    validateAfterInit: true,
    validationSchema: validationSchema ?? {
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
 * Test onBlur and onChange revalidation strategies
 */
describe("Revalidating onBlur should clear code on blur event", () => {
  const validData: Schema = {
    fullName: "At least 10 characters",
    email: "contains@correct.characters",
    phone: "123467890",
    age: 19,
  };

  it("should correctly revalidate on blur event", async () => {
    let errorState: ErrorsObject<Schema> = {
      count: 0,
      errors: {},
    };

    render(
      <TestComponent
        revalidationStrategy="onBlur"
        onErrorChange={(errorData: any) => {
          errorState = { ...errorData };
        }}
      />,
    );

    expect(errorState.count).toEqual(4);

    const fullName = await screen.findByTestId("fullName");
    const email = await screen.findByTestId("email");
    const phone = await screen.findByTestId("phone");
    const age = await screen.findByTestId("age");

    fireEvent.change(fullName, { target: { value: validData.fullName } });
    fireEvent.change(email, { target: { value: validData.email } });
    fireEvent.change(phone, { target: { value: validData.phone } });
    fireEvent.change(age, { target: { value: validData.age } });

    expect(errorState.count).toEqual(4);

    fireEvent.blur(fullName, { target: { value: validData.fullName } });
    expect(errorState.count).toEqual(3);
    expect(errorState.errors?.fullName).not.toBeDefined();

    fireEvent.blur(email, { target: { value: validData.email } });
    expect(errorState.count).toEqual(2);
    expect(errorState.errors?.email).not.toBeDefined();

    fireEvent.blur(phone, { target: { value: validData.phone } });
    expect(errorState.count).toEqual(1);
    expect(errorState.errors?.phone).not.toBeDefined();

    fireEvent.blur(age, { target: { value: validData.age } });
    expect(errorState.count).toEqual(0);
    expect(errorState.errors?.age).not.toBeDefined();
  });

  it("should correctly revalidate on change event", async () => {
    let errorState: ErrorsObject<Schema> = {
      count: 0,
      errors: {},
    };

    render(
      <TestComponent
        revalidationStrategy="onChange"
        onErrorChange={(errorData: any) => {
          errorState = { ...errorData };
        }}
      />,
    );

    expect(errorState.count).toEqual(4);

    const fullName = await screen.findByTestId("fullName");
    const email = await screen.findByTestId("email");
    const phone = await screen.findByTestId("phone");
    const age = await screen.findByTestId("age");

    fireEvent.change(fullName, { target: { value: validData.fullName } });
    expect(errorState.count).toEqual(3);
    expect(errorState.errors?.fullName).not.toBeDefined();

    fireEvent.change(email, { target: { value: validData.email } });
    expect(errorState.count).toEqual(2);
    expect(errorState.errors?.email).not.toBeDefined();

    fireEvent.change(phone, { target: { value: validData.phone } });
    expect(errorState.count).toEqual(1);
    expect(errorState.errors?.phone).not.toBeDefined();

    fireEvent.change(age, { target: { value: validData.age } });
    expect(errorState.count).toEqual(0);
    expect(errorState.errors?.age).not.toBeDefined();
  });
});
