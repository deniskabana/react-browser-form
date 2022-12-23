import React from "react";
import { useDumbForm } from "react-dumb-form";

type Form = { email: string };

export function ExampleMinimalForm() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names } = useDumbForm<Form>({
    name: "example-minimal-form",
    onSubmit: setData,
  });

  return (
    <form {...formProps}>
      <input type="text" placeholder="E-mail address" name={names.email} />
      <button type="submit">Subscribe</button>
    </form>
  );
}
