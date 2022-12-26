import React from "react";
import { useDumbForm } from "react-dumb-form";

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

export function ExampleBasicUsage() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names } = useDumbForm<Form>({
    name: "example-basic-usage-form",
    defaultValues,
    onSubmit: setData,
    onChange: setData, // Used because of reset button
  });

  return (
    <form {...formProps}>
      <FormGroupTitle>Leave a comment</FormGroupTitle>
      <FormGroup>
        <FormTextInput label="Your name" name={names.name} />
        <FormTextInput label="Comment title" name={names.commentTitle} />
      </FormGroup>
      <FormTextarea placeholder="What's on your mind?" name={names.commentBody} rows={3} />
      <FormCheckbox label="Remember me next time" name={names.rememberMe} />
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
