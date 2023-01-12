import React from "react";
import { useBrowserForm } from "react-browser-form";

// UI for documentation only
import { Button, Stack } from "react-bootstrap";
import { FormGroup, FormTextInput } from "ui/forms";

const defaultValues = {
  name: "Michael",
  age: 30,
  occupation: "Product Manager",
  email: "michael@product.com",
};
type Form = typeof defaultValues;

export function ExampleFormMethodsSetValues() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names, setValues } = useBrowserForm<Form>({
    name: "example-form-methods-set-values",
    defaultValues,
    onSubmit: setData,
    onChange: setData,
  });

  const handleSetNameClick = () => setValues({ name: "Jennifer" });

  const handleSetAgeClick = () => setValues({ age: 90 });

  const handleSetEmailClick = () => setValues({ email: "noreply@service.com" });

  const handleSetNameAndAgeClick = () => setValues({ name: "Bobby", age: 15 });

  return (
    <form {...formProps}>
      <FormGroup>
        <FormTextInput label="Name" name={names.name} />
        <FormTextInput label="Age" type="number" name={names.age} />
      </FormGroup>
      <FormGroup>
        <FormTextInput label="Occupation" name={names.occupation} />
        <FormTextInput label="E-mail" name={names.email} />
      </FormGroup>
      <Stack direction="vertical" gap={2} className="justify-content-end">
        <Button className="me-1" size="sm" onClick={handleSetNameClick}>
          Set name to Jennifer
        </Button>
        <Button className="me-1" size="sm" onClick={handleSetAgeClick}>
          Set age to 90
        </Button>
        <Button className="me-1" size="sm" onClick={handleSetEmailClick}>
          Set email to noreply@service.com
        </Button>
        <Button className="me-1" size="sm" onClick={handleSetNameAndAgeClick}>
          Set name to Bobby, Age to 15
        </Button>
      </Stack>
    </form>
  );
}
