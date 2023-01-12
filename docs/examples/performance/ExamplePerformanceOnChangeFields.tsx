import React from "react";
import { useBrowserForm } from "react-browser-form";

// UI for documentation only
import { Button, Stack } from "react-bootstrap";
import { FormGroup, FormTextInput } from "ui/forms";

const defaultValues = {
  title: "",
  description: "",
};
type Form = typeof defaultValues;

export function ExamplePerformanceOnChangeFields({ index }: { index: number }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [data, setData] = React.useState<Form>();

  const handleSubmit = (data: Form) => {
    setData(data);
    setSubmitted(true);
  };

  const { formProps, names } = useBrowserForm<Form>({
    name: `example-performance-on-change-fields-form-${index}`,
    mode: "onChange",
    defaultValues,
    onSubmit: handleSubmit,
    onChange: setData,
  });

  return submitted ? (
    <div className="text-muted">
      <strong>
        <u>Simple onChange fields</u> form was submitted!
      </strong>
      <br />
      <small>
        Form data: <code>{JSON.stringify(data)}</code>
      </small>
    </div>
  ) : (
    <form {...formProps} className="flex-grow-1">
      <small>Simple onChange fields</small>
      <Stack direction="horizontal" gap={3} className="align-items-center">
        <FormGroup className="flex-grow-1">
          <FormTextInput label="Title" name={names.title} small />
          <FormTextInput label="Description" name={names.description} small />
        </FormGroup>
        <Button type="submit" size="sm" className="mt-2">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
