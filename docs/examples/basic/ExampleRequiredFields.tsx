import React from "react";
import { useDumbForm } from "react-dumb-form";

// UI for documentation only
import { Button } from "react-bootstrap";
import { FormGroup, FormTextarea, FormTextInput } from "ui/forms";

const defaultValues = {
  name: "",
  age: 18,
  jobTitle: "",
  jobDescription: "",
};
type Form = typeof defaultValues;

export function ExampleRequiredFields() {
  const [data, setData] = React.useState<Form>();

  const {
    formProps,
    names,
    errorData: { errors },
  } = useDumbForm<Form>({
    name: "example-required-fields",
    defaultValues,
    onSubmit: setData,
    validationSchema: {
      required: { fields: ["name", "age", "jobTitle"], message: "An optional custom error message" },
    },
  });

  return (
    <form {...formProps}>
      <FormGroup>
        <FormTextInput label="Full name" name={names.name} error={errors.name} requiredMark />
        <FormTextInput label="Age" type="number" name={names.age} error={errors.age} requiredMark />
      </FormGroup>
      <FormTextInput label="Job title" name={names.jobTitle} error={errors.jobTitle} requiredMark />
      <FormTextarea label="Job description" rows={3} name={names.jobDescription} error={errors.jobDescription} />

      <Button type="submit" size="sm">
        Submit
      </Button>
    </form>
  );
}
