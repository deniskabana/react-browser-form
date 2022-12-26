import React from "react";
import { useDumbForm } from "react-dumb-form";

// UI for documentation only
import { FormTextInput } from "ui/forms";

const defaultValues = {
  name: "James",
};
type Form = typeof defaultValues;

export function ExampleFormMethodsSubmit() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names, submit } = useDumbForm<Form>({
    name: "example-form-methods-submit",
    mode: "onChange",
    defaultValues,
    onSubmit: setData,
    onChange: ({ name }) => {
      if (name === "Adam") submit();
    },
  });

  return (
    <form {...formProps}>
      <FormTextInput label="Your name" name={names.name} />
    </form>
  );
}
