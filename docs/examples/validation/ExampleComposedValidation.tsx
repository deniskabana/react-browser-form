import React from "react";
import { useDumbForm, ValidationError, ValidationSchema } from "react-dumb-form";

// UI for documentation only
import { Button, Stack } from "react-bootstrap";
import { FormGroup, FormGroupTitle, FormTextarea, FormTextInput } from "ui/forms";

// FORM SETUP
// --------------------------------------------------------------------------------

const defaultValues = {
  firstName: "",
  lastName: "",
  jobTitle: "",
  jobDescription: "",
};
type Form = typeof defaultValues;

// VALIDATION
// --------------------------------------------------------------------------------

function validateLengthRange(stringField: string) {
  if (stringField.length < 6) throw new ValidationError("Value must be at least 6 characters long.");
  if (stringField.length > 12) throw new ValidationError("Value must not be longer than 12 characters.");
}
function validateNoSpaces(stringField: string) {
  if (stringField.match(/\s/)) throw new ValidationError("Can not contain spaces.");
}

const validationSchema: ValidationSchema<Form> = {
  validators: {
    firstName: [validateLengthRange, validateNoSpaces],
    lastName: [validateLengthRange, validateNoSpaces],
    jobTitle: validateLengthRange,
  },
};

// COMPONENT
// --------------------------------------------------------------------------------

export function ExampleComposedValidation() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names, errorData } = useDumbForm<Form>({
    name: "example-composed-validation-form",
    defaultValues,
    onSubmit: setData,
    validationSchema,
  });

  const { errors } = errorData;

  return (
    <form {...formProps}>
      <FormGroupTitle>Submit an application</FormGroupTitle>
      <FormGroup>
        <FormTextInput label="First name (6-12 chars)" requiredMark name={names.firstName} error={errors.firstName} />
        <FormTextInput label="Last name (6-12 chars)" requiredMark name={names.lastName} error={errors.lastName} />
      </FormGroup>
      <FormTextInput label="Job title (6-12 chars)" requiredMark name={names.jobTitle} error={errors.jobTitle} />

      <FormTextarea label="Job description (not validated)" name={names.jobDescription} />

      <Stack direction="horizontal" className="justify-content-end">
        <Button type="submit" disabled={errorData.count > 0}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
