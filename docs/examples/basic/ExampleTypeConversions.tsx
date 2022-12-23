import React from "react";
import { useDumbForm } from "react-dumb-form";

const defaultValues: Form = {
  // String types
  typeText: null,
  typeEmail: null,
  typeFile: null,
  typePassword: null,
  typeUrl: null,
  typeTel: null,
  typeRadio: null,
  // Number types
  typeNumber: null,
  typeRange: null,
  // Date types
  typeDate: null,
  typeDatetimeLocal: null,
  typeMonth: null,
  typeTime: null,
  typeWeek: null,
  // Boolean types
  typeCheckbox: null,
};

interface Form {
  // String types
  typeText: string | null;
  typeEmail: string | null;
  typeFile: string | null;
  typePassword: string | null;
  typeUrl: string | null;
  typeTel: string | null;
  typeRadio: string | null;
  // Number types
  typeNumber: number | null;
  typeRange: number | null;
  // Date types
  typeDate: Date | null;
  typeDatetimeLocal: number | null;
  typeMonth: Date | null;
  typeTime: Date | null;
  typeWeek: Date | null;
  // Boolean types
  typeCheckbox: boolean | null;
}

export function ExampleTypeConversions() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names } = useDumbForm<Form>({
    name: "example-type-conversions-form",
    mode: "onChange",
    onSubmit: setData,
    onChange: setData,
    defaultValues,
  });

  return (
    <form {...formProps}>
      <input type="text" />
    </form>
  );
}
