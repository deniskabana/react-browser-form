import React from "react";
import { useDumbForm } from "react-dumb-form";

// UI for documentation only
import { Button, Stack } from "react-bootstrap";
import { FormCheckbox, FormGroup, FormGroupTitle, FormTextarea, FormTextInput } from "ui/forms";
import Separator from "ui/Separator";

const defaultValues = {
  name: "",
  commentTitle: "",
  commentBody: "",
  rememberMe: false,
  nameLive: "",
  commentTitleLive: "",
  commentBodyLive: "",
  rememberMeLive: false,
};
type Form = typeof defaultValues;

export function ExampleLiveFields() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names } = useDumbForm<Form>({
    name: "example-live-fields-form",
    defaultValues,
    onSubmit: setData,
    onChange: setData, // Because we use live fields
    liveChangeFields: ["nameLive", "commentTitleLive", "commentBodyLive", "rememberMeLive"],
  });

  return (
    <form {...formProps}>
      <FormGroupTitle>Classic fields</FormGroupTitle>
      <FormGroup>
        <FormTextInput label="Your name" name={names.name} />
        <FormTextInput label="Comment title" name={names.commentTitle} />
      </FormGroup>
      <FormTextarea placeholder="What's on your mind?" name={names.commentBody} rows={3} />
      <FormCheckbox label="Remember me next time" name={names.rememberMe} />

      <Separator dashed small />

      <FormGroupTitle>Live fields</FormGroupTitle>
      <FormGroup>
        <FormTextInput label="Your name (live)" name={names.nameLive} />
        <FormTextInput label="Comment title (live)" name={names.commentTitleLive} />
      </FormGroup>
      <FormTextarea placeholder="What's on your mind? (live)" name={names.commentBodyLive} rows={3} />
      <FormCheckbox label="Remember me next time (live)" name={names.rememberMeLive} />

      <Separator dashed small />

      <Stack direction="horizontal" className="justify-content-end">
        <Button type="submit" size="sm">
          Submit classic fields
        </Button>
      </Stack>
    </form>
  );
}