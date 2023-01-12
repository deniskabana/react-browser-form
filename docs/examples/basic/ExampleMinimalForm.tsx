import React from "react";
import { useBrowserForm } from "react-browser-form";

const defaultValues = {
  email: "",
};
type Form = typeof defaultValues;

export function ExampleMinimalForm() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names } = useBrowserForm<Form>({
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
