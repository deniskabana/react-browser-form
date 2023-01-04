import React from "react";
import { useDumbForm, ValidationError, ValidationSchema } from "react-dumb-form";

// UI for documentation only
import { Button, Stack } from "react-bootstrap";
import { FormGroup, FormTextInput } from "ui/forms";

const defaultValues = {
  email: "",
  password: "",
};
type Form = typeof defaultValues;

const validationSchema: ValidationSchema<Form> = {
  validators: {
    email: email => {
      if (!email.match(/^\S{2,}@\S{2,}\.\S{2,}$/)) throw new ValidationError("E-mail must match pattern xx@xx.xx");
    },

    password: password => {
      if (!password.match(/[a-z]/)) throw new ValidationError("Password must contain at least one lowercase letter.");
      if (!password.match(/[A-Z]/)) throw new ValidationError("Password must contain at least one UPPERCASE letter.");
      if (!password.match(/[0-9]/)) throw new ValidationError("Password must contain at least one number.");
      if (password.length < 8) throw new ValidationError("Password must be at least 8 characters long.");
    },
  },
};

export function ExamplePerformanceValidatedFields({ index }: { index: number }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [data, setData] = React.useState<Form>();

  const handleSubmit = (data: Form) => {
    setData(data);
    setSubmitted(true);
  };

  const {
    formProps,
    names,
    errorData: { errors },
  } = useDumbForm<Form>({
    name: `example-performance-validated-fields-form-${index}`,
    defaultValues,
    onSubmit: handleSubmit,
    onChange: setData,
    validationSchema,
  });

  return submitted ? (
    <div className="text-muted">
      <strong>
        <u>Validated fields</u> form was submitted!
      </strong>
      <br />
      <small>
        Form data: <code>{JSON.stringify(data)}</code>
      </small>
    </div>
  ) : (
    <form {...formProps} className="flex-grow-1">
      <small>Validated fields</small>
      <Stack direction="horizontal" gap={3} className="align-items-center">
        <FormGroup className="flex-grow-1">
          <FormTextInput label="E-mail" name={names.email} error={errors.email} small />
          <FormTextInput label="Password" name={names.password} error={errors.password} small />
        </FormGroup>
        <Button type="submit" size="sm" className="mt-2">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
