import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TransformationSchema, useBrowserForm } from "../src/index";

/**
 * Test automatic transformations
 */
describe("Automatic value transformation", () => {
  const defaultValues = {
    // String types
    typeText: null as string | null,
    typeEmail: null as string | null,
    typePassword: null as string | null,
    typeUrl: null as string | null,
    typeTel: null as string | null,
    typeRadio: null as string | null,
    // Number types
    typeNumber: null as number | null,
    typeRange: null as number | null,
    // Date types
    typeDate: null as Date | null,
    typeMonth: null as Date | null,
    typeWeek: null as Date | null,
    typeTime: null as Date | null,
    typeDatetimeLocal: null as Date | null,
    // Boolean types
    typeCheckbox: null as boolean | null,
  };
  type Schema = typeof defaultValues;

  function TestComponent({ onChange }: any) {
    const { formProps, names } = useBrowserForm<Schema>({
      name: "test-form",
      mode: "onChange",
      onChange,
      defaultValues,
    });

    return (
      <form {...formProps}>
        <input type="text" name={names.typeText} data-testid={names.typeText} />
        <input type="email" name={names.typeEmail} data-testid={names.typeEmail} />
        <input type="password" name={names.typePassword} data-testid={names.typePassword} />
        <input type="url" name={names.typeUrl} data-testid={names.typeUrl} />
        <input type="tel" name={names.typeTel} data-testid={names.typeTel} />
        <input type="radio" value="option 1" name={names.typeRadio} data-testid={names.typeRadio + "1"} />
        <input type="radio" value="option 2" name={names.typeRadio} data-testid={names.typeRadio + "2"} />
        <input type="number" name={names.typeNumber} data-testid={names.typeNumber} />
        <input type="range" name={names.typeRange} data-testid={names.typeRange} />
        <input type="date" name={names.typeDate} data-testid={names.typeDate} />
        <input type="month" name={names.typeMonth} data-testid={names.typeMonth} />
        <input type="week" name={names.typeWeek} data-testid={names.typeWeek} />
        <input type="time" name={names.typeTime} data-testid={names.typeTime} />
        <input type="datetime-local" name={names.typeDatetimeLocal} data-testid={names.typeDatetimeLocal} />
        <input type="checkbox" name={names.typeCheckbox} data-testid={names.typeCheckbox} />
      </form>
    );
  }

  it("should convert all value types based on input.type", async () => {
    let formState: Schema = { ...defaultValues };
    const onChange = (data: Schema) => {
      formState = { ...formState, ...data };
    };
    render(<TestComponent onChange={onChange} />);

    // Fields
    const typeText = await screen.findByTestId("typeText");
    fireEvent.change(typeText, { target: { value: "test" } });
    expect(typeof formState.typeText).toEqual("string");

    const typeEmail = await screen.findByTestId("typeEmail");
    fireEvent.change(typeEmail, { target: { value: "test@test.com" } });
    expect(typeof formState.typeEmail).toEqual("string");

    const typePassword = await screen.findByTestId("typePassword");
    fireEvent.change(typePassword, { target: { value: "test" } });
    expect(typeof formState.typePassword).toEqual("string");

    const typeUrl = await screen.findByTestId("typeUrl");
    fireEvent.change(typeUrl, { target: { value: "test" } });
    expect(typeof formState.typeUrl).toEqual("string");

    const typeTel = await screen.findByTestId("typeTel");
    fireEvent.change(typeTel, { target: { value: "test" } });
    expect(typeof formState.typeTel).toEqual("string");

    const typeRadio1 = await screen.findByTestId("typeRadio1");
    fireEvent.click(typeRadio1);
    expect(typeof formState.typeRadio).toEqual("string");

    const typeRadio2 = await screen.findByTestId("typeRadio2");
    fireEvent.click(typeRadio2);
    expect(typeof formState.typeRadio).toEqual("string");

    const typeNumber = await screen.findByTestId("typeNumber");
    fireEvent.change(typeNumber, { target: { value: "123" } });
    expect(typeof formState.typeNumber).toEqual("number");

    const typeRange = await screen.findByTestId("typeRange");
    fireEvent.change(typeRange, { target: { value: "123" } });
    expect(typeof formState.typeRange).toEqual("number");

    const typeDate = await screen.findByTestId("typeDate");
    fireEvent.change(typeDate, { target: { value: "2023-01-01" } });
    expect("getUTCMilliseconds" in (formState.typeDate as any)).toEqual(true);

    const typeMonth = await screen.findByTestId("typeMonth");
    fireEvent.change(typeMonth, { target: { value: "2023-01" } });
    expect("getUTCMilliseconds" in (formState.typeMonth as any)).toEqual(true);

    const typeWeek = await screen.findByTestId("typeWeek");
    fireEvent.change(typeWeek, { target: { value: "2023-W01" } });
    expect("getUTCMilliseconds" in (formState.typeWeek as any)).toEqual(true);

    const typeTime = await screen.findByTestId("typeTime");
    fireEvent.change(typeTime, { target: { value: "12:00" } });
    expect("getUTCMilliseconds" in (formState.typeTime as any)).toEqual(true);

    const typeDatetimeLocal = await screen.findByTestId("typeDatetimeLocal");
    fireEvent.change(typeDatetimeLocal, { target: { value: "2023-01-01T12:00" } });
    expect("getUTCMilliseconds" in (formState.typeDatetimeLocal as any)).toEqual(true);

    const typeCheckbox = await screen.findByTestId("typeCheckbox");
    fireEvent.click(typeCheckbox);
    expect(typeof formState.typeCheckbox).toEqual("boolean");
  });
});

/**
 * Primitive type transformations - check if RDF coerces types correctly
 */
describe("Primitive type transformations", () => {
  const defaultValues = {
    name: "",
    age: null as number | null,
    isOfLegalAge: false,
  };
  type Schema = typeof defaultValues;

  function TestComponent({ onChange, transformationSchema }: any) {
    const { formProps, names } = useBrowserForm<Schema>({
      name: "test-form",
      mode: "onChange",
      onChange,
      defaultValues,
      transformationSchema,
    });

    return (
      <form {...formProps}>
        <input name={names.name} data-testid={names.name} />
        <input name={names.age} data-testid={names.age} />
        <input type="checkbox" name={names.isOfLegalAge} data-testid={names.isOfLegalAge} />
      </form>
    );
  }

  it("should convert all types with default transformations enabled", async () => {
    let formState: Schema = { ...defaultValues };
    const onChange = (data: Schema) => {
      formState = { ...formState, ...data };
    };
    const transformationSchema: TransformationSchema<Schema> = {
      disableDefaultTransformation: true,
      fields: {
        name: "string",
        age: "number",
        isOfLegalAge: "boolean",
      },
    };

    render(<TestComponent onChange={onChange} transformationSchema={transformationSchema} />);

    const name = await screen.findByTestId("name");
    fireEvent.change(name, { target: { value: "john" } });
    expect(typeof formState.name).toEqual("string");

    const age = await screen.findByTestId("age");
    fireEvent.change(age, { target: { value: "21" } });
    expect(typeof formState.age).toEqual("number");

    const isOfLegalAge = await screen.findByTestId("isOfLegalAge");
    fireEvent.click(isOfLegalAge);
    expect(typeof formState.isOfLegalAge).toEqual("boolean");
  });

  it("should convert all types with default transformations disabled", async () => {
    let formState: Schema = { ...defaultValues };
    const onChange = (data: Schema) => {
      formState = { ...formState, ...data };
    };
    const transformationSchema: TransformationSchema<Schema> = {
      disableDefaultTransformation: false,
      fields: {
        name: "string",
        age: "number",
        isOfLegalAge: "boolean",
      },
    };

    render(<TestComponent onChange={onChange} transformationSchema={transformationSchema} />);

    const name = await screen.findByTestId("name");
    fireEvent.change(name, { target: { value: "john" } });
    expect(typeof formState.name).toEqual("string");

    const age = await screen.findByTestId("age");
    fireEvent.change(age, { target: { value: "21" } });
    expect(typeof formState.age).toEqual("number");

    const isOfLegalAge = await screen.findByTestId("isOfLegalAge");
    fireEvent.click(isOfLegalAge);
    expect(typeof formState.isOfLegalAge).toEqual("boolean");
  });
});

/**
 * Value transformations - test whether user value manipulation works correctly
 */
describe("Manual value transformations", () => {
  const defaultValues = {
    testNull: null,
    testNumber: null as number | null,
    testString: "",
    testInterface: null as { value: string } | null,
    testDate: null as Date | null,
  };
  type Schema = typeof defaultValues;

  function TestComponent({ onChange, transformationSchema }: any) {
    const { formProps, names } = useBrowserForm<Schema>({
      name: "test-form",
      mode: "onChange",
      onChange,
      defaultValues,
      transformationSchema,
    });

    return (
      <form {...formProps}>
        <input name={names.testNull} data-testid={names.testNull} />
        <input name={names.testNumber} data-testid={names.testNumber} />
        <input name={names.testString} data-testid={names.testString} />
        <input name={names.testInterface} data-testid={names.testInterface} />
        <input name={names.testDate} data-testid={names.testDate} />
      </form>
    );
  }

  it("should work with any transformations", async () => {
    let formState: Schema = { ...defaultValues };
    const onChange = (data: Schema) => {
      formState = { ...formState, ...data };
    };
    const transformationSchema: TransformationSchema<Schema> = {
      disableDefaultTransformation: true,
      fields: {
        testNull: () => null,
        testNumber: testNumber => Number(testNumber),
        testString: testString => String(testString).replace(/[a-f]/g, ""),
        testInterface: testInterface =>
          typeof testInterface === "string" ? { value: testInterface } : (testInterface as any),
        testDate: () => new Date(),
      },
    };

    render(<TestComponent onChange={onChange} transformationSchema={transformationSchema} />);

    const testNull = await screen.findByTestId("testNull");
    fireEvent.change(testNull, { target: { value: "john" } });
    expect(formState.testNull).toEqual(null);

    const testNumber = await screen.findByTestId("testNumber");
    fireEvent.change(testNumber, { target: { value: "123" } });
    expect(formState.testNumber).toEqual(123);

    const testString = await screen.findByTestId("testString");
    fireEvent.change(testString, { target: { value: "abcdef" } });
    expect(formState.testString).toEqual("");
    fireEvent.change(testString, { target: { value: "abcdefghjkl" } });
    expect(formState.testString).toEqual("ghjkl");

    const testInterface = await screen.findByTestId("testInterface");
    fireEvent.change(testInterface, { target: { value: "john" } });
    expect(typeof formState.testInterface).toEqual("object");
    expect(formState.testInterface?.value).toEqual("john");

    const testDate = await screen.findByTestId("testDate");
    fireEvent.change(testDate, { target: { value: "john" } });
    expect(typeof formState.testDate).toEqual("object");
    expect("getUTCMilliseconds" in (formState?.testDate as Date)).toEqual(true);
  });
});
