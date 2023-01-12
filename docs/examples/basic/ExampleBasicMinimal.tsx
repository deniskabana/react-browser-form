import React from "react";
import { useBrowserForm } from "react-browser-form";

// UI for documentation only
import { Button } from "react-bootstrap";
import { FormGroup, FormTextInput } from "ui/forms";

const defaultValues = {
  email: null as string | null,
};
type Form = typeof defaultValues;

export function ExampleBasicMinimal() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names } = useBrowserForm<Form>({
    name: "example-basic-minimal-form",
    defaultValues,
    onSubmit: setData,
  });

  return (
    <form {...formProps}>
      <FormGroup>
        <FormTextInput label="E-mail address" name={names.email} />
      </FormGroup>
      <Button type="submit" size="sm">
        Subscribe
      </Button>
    </form>
  );
}
