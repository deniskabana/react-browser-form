import React from "react";
import { useDumbForm } from "react-dumb-form";

// UI for documentation only
import { Button, Stack } from "react-bootstrap";
import { FormGroup, FormTextInput } from "ui/forms";

const defaultValues = {
  name: "Peter",
  age: 60,
};
type Form = typeof defaultValues;

export function ExampleFormMethodsResetValues() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names, reset } = useDumbForm<Form>({
    name: "example-form-methods-reset-values",
    defaultValues,
    onSubmit: setData,
  });

  const handleResetClick = () => reset({ name: "Jordan", age: 21 });

  return (
    <form {...formProps}>
      <FormGroup>
        <FormTextInput label="Name" name={names.name} />
        <FormTextInput label="Age" name={names.age} type="number" />
      </FormGroup>

      <Stack direction="horizontal">
        <Button type="reset" className="me-1" size="sm">
          reset()
        </Button>
        <Button size="sm" onClick={handleResetClick}>
          reset(values)
        </Button>
      </Stack>
    </form>
  );
}
