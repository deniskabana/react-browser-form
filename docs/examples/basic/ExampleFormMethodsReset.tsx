import React from "react";
import { useBrowserForm } from "react-browser-form";

// UI for documentation only
import { FormTextInput } from "ui/forms";

const defaultValues = {
  name: "Steve",
};
type Form = typeof defaultValues;

export function ExampleFormMethodsReset() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names, reset } = useBrowserForm<Form>({
    name: "example-form-methods-reset",
    mode: "onChange",
    defaultValues,
    onSubmit: setData,
    onChange: ({ name }) => {
      if (name === "Adam") reset();
    },
  });

  return (
    <form {...formProps}>
      <FormTextInput label="Your name" name={names.name} />
    </form>
  );
}
