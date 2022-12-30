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

export function ExampleLiveFields() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names } = useDumbForm<Form>({
    name: "example-live-fields-form",
    defaultValues,
    onSubmit: setData,
    onChange: setData, // Because we use live fields
    liveChangeFields: ["name", "rememberMe"],
  });

  return (
    <form {...formProps}>
      <FormGroupTitle>Leave a comment</FormGroupTitle>
      <FormGroup>
        <FormTextInput label="Your name (live)" name={names.name} />
        <FormTextInput label="Comment title" name={names.commentTitle} />
      </FormGroup>
      <FormTextarea placeholder="What's on your mind?" name={names.commentBody} rows={3} />
      <FormCheckbox label="Remember me next time (live)" name={names.rememberMe} />

      <Stack direction="horizontal" className="justify-content-end">
        <Button type="submit" size="sm">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
