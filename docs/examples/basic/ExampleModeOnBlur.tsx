import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useBrowserForm, ValidationError, ValidationSchema } from "react-browser-form";

// UI for documentation only
import { FormCheckbox, FormGroup, FormGroupTitle, FormTextarea, FormTextInput } from "ui/forms";

const defaultValues = {
  name: "",
  commentTitle: "",
  commentBody: "",
  rememberMe: true,
};
type Form = typeof defaultValues;

function validateLength(stringField: string) {
  if (stringField.length < 6) throw new ValidationError("Value must be at least 6 characters long.");
}

const validationSchema: ValidationSchema<Form> = {
  required: { fields: ["name", "commentTitle", "commentBody", "rememberMe"] },

  validators: {
    name: validateLength,
    commentTitle: validateLength,
    commentBody: validateLength,
  },
};

export function ExampleModeOnBlur() {
  const [data, setData] = React.useState<Form>();

  const {
    formProps,
    names,
    errorData: { errors },
  } = useBrowserForm<Form>({
    name: "example-mode-onBlur",
    mode: "onBlur",
    defaultValues,
    validationSchema,
    onSubmit: setData,
    onChange: setData,
  });

  return (
    <form {...formProps}>
      <FormGroupTitle>Leave a comment</FormGroupTitle>
      <FormGroup>
        <FormTextInput label="Your name" name={names.name} error={errors.name} />
        <FormTextInput label="Comment title" name={names.commentTitle} error={errors.commentTitle} />
      </FormGroup>
      <FormTextarea placeholder="What's on your mind?" name={names.commentBody} error={errors.commentBody} rows={3} />
      <FormCheckbox label="Remember me next time" name={names.rememberMe} error={errors.rememberMe} />

      <Stack direction="horizontal" className="justify-content-end">
        <Button type="reset" variant="outline-danger" className="me-1" size="sm">
          Clear
        </Button>
        <Button type="submit" size="sm">
          Post comment
        </Button>
      </Stack>
    </form>
  );
}
