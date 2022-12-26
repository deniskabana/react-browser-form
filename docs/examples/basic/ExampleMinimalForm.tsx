import React from "react";
import { useDumbForm } from "react-dumb-form";

const defaultValues = {
  email: null as string | null,
};
type Form = typeof defaultValues;

export function ExampleMinimalForm() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names } = useDumbForm<Form>({
    name: "example-minimal-form",
    defaultValues,
    onSubmit: setData,
  });

  return (
    <form {...formProps}>
      <input type="text" placeholder="E-mail address" name={names.email} />
      <button type="submit">Subscribe</button>
    </form>
  );
}
