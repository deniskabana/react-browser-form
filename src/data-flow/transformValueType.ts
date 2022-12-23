import { DataFlowState } from "../types";

enum InputType {
  // Number types
  Number = "number",
  Range = "range",
  DatetimeLocal = "datetime-local",
  // Date types
  Date = "date",
  Month = "month",
  Week = "week",
  Time = "time",
  // Boolean types
  Checkbox = "checkbox",
  // String types
  Text = "text",
  Email = "email",
  File = "file",
  Password = "password",
  Url = "url",
  Tel = "tel",
  Radio = "radio",
}

export function transformValueType<Schema>(name: keyof Schema, value: any, dataFlowState: DataFlowState<Schema>): any {
  // 1. Get input's data type if specified
  let inputType: string;
  const domFormElem = (document.forms as any)[dataFlowState.options.name];
  const domInputElem = domFormElem.elements[name] as HTMLInputElement | undefined;
  inputType = domInputElem?.type ?? "text"; // Default to texts like browsers do

  // 2. Automatically return null values
  if (value === null || value === undefined) return null;

  // 3. Determine and return the input value with the correct type
  // NOTE: Purposefully ignore valueAsNumber - just in case the change is NOT coming from the input
  switch (inputType) {
    case InputType.Number:
    case InputType.Range:
      return Number(value); // Don't implicitly handle NaN

    case InputType.Date:
    case InputType.Month:
    case InputType.DatetimeLocal:
      if (value instanceof Date) return value;
      if (typeof value === "string") return new Date(value);
      return null; // Implicitly return null rather than a code-breaking value

    case InputType.Week:
    case InputType.Time:
      if (value instanceof Date) return value;
      return domInputElem?.valueAsDate ?? null;

    case InputType.Checkbox:
      if (typeof value === "boolean") return value;
      return Boolean(value);

    case InputType.Text:
    case InputType.Email:
    case InputType.File:
    case InputType.Password:
    case InputType.Url:
    case InputType.Tel:
    case InputType.Radio:
    default:
      if (typeof value === "string") return value;
      return String(value);
  }
}
