import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDumbForm } from "../../../src/index";

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
      <InputGroup>
        <Form.Control placeholder="E-mail address" name={names.email} />
        <Button type="submit">Subscribe</Button>
      </InputGroup>
    </form>
  );
}
