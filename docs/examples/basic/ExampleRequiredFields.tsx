import React from "react";
import { useBrowserForm } from "react-browser-form";

// UI for documentation only
import { Button, Stack } from "react-bootstrap";
import { FormCheckbox, FormGroup, FormGroupTitle, FormTextarea, FormTextInput } from "ui/forms";

const defaultValues = {
  name: "",
  commentTitle: "",
  commentBody: "",
  rememberMe: false,
};
type Form = typeof defaultValues;

export function ExampleRequiredFields() {
  const [data, setData] = React.useState<Form>();

  const {
    formProps,
    names,
    errorData: { errors },
  } = useBrowserForm<Form>({
    name: "example-required-fields",
    defaultValues,
    onSubmit: setData,
    validationSchema: {
      required: { fields: ["name", "rememberMe"], message: "An optional custom error message" },
    },
  });

  return (
    <form {...formProps}>
      <FormGroupTitle>Leave a comment</FormGroupTitle>
      <FormGroup>
        <FormTextInput label="Your name" requiredMark name={names.name} error={errors.name} />
        <FormTextInput label="Comment title" name={names.commentTitle} />
      </FormGroup>
      <FormTextarea placeholder="What's on your mind?" name={names.commentBody} rows={3} />
      <FormCheckbox label="Remember me next time" requiredMark name={names.rememberMe} error={errors.rememberMe} />

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
