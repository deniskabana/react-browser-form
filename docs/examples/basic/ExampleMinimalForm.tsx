import React from "react";
import { useDumbForm } from "../../../src/index";

const defaultValues = {};
type Form = typeof defaultValues;

export function ExampleMinimalForm() {
  const [data, setData] = React.useState(defaultValues);

  const { formProps, names } = useDumbForm<Form>({
    defaultValues,
    name: "example-minimal-form",
    onSubmit: setData,
  });

  return <span>Form</span>;
}
