import React from "react";
import { Form } from "react-bootstrap";
import { useDumbForm } from "react-dumb-form";

const defaultValues = {
  email: "",
};
type Form = typeof defaultValues;

export function ExampleMinimalForm() {
  const [data, setData] = React.useState(defaultValues);

  const { formProps, names } = useDumbForm<Form>({
    name: "example-minimal-form",
    onSubmit: setData,
    defaultValues,
  });

  return (
    <form {...formProps}>
      <input type="text" placeholder="E-mail address" name={names.email} />
      <button type="submit">Subscribe</button>
    </form>
  );
}
