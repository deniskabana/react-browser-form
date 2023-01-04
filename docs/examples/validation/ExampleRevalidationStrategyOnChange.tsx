import React from "react";
import { useDumbForm, ValidationError, ValidationSchema } from "react-dumb-form";

// UI for documentation only
import { Button, Stack } from "react-bootstrap";
import { FormGroup, FormGroupTitle, FormTextInput } from "ui/forms";
import { FormPassword } from "ui/forms/FormPassword";

// FORM SETUP AND VALIDATION
// --------------------------------------------------------------------------------

const defaultValues = {
  name: "",
  email: "",
  newPassword: "",
};
type Form = typeof defaultValues;

const validationSchema: ValidationSchema<Form> = {
  validators: {
    name: name => {
      if (name.length < 5) throw new ValidationError("Name must be at least 5 characters long");
    },

    email: email => {
      if (!email.match(/^\S{2,}@\S{2,}\.\S{2,}$/)) throw new ValidationError("E-mail must match pattern xx@xx.xx");
    },

    newPassword: newPassword => {
      if (!newPassword.match(/[a-z]/))
        throw new ValidationError("Password must contain at least one lowercase letter.");
      if (!newPassword.match(/[A-Z]/))
        throw new ValidationError("Password must contain at least one UPPERCASE letter.");
      if (!newPassword.match(/[0-9]/)) throw new ValidationError("Password must contain at least one number.");
      if (newPassword.length < 8) throw new ValidationError("Password must be at least 8 characters long.");
    },
  },
};

// COMPONENT
// --------------------------------------------------------------------------------

export function ExampleRevalidationStrategyOnChange() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names, errorData } = useDumbForm<Form>({
    name: "example-revalidation-strategy-onchange",
    revalidationStrategy: "onChange",
    defaultValues,
    onSubmit: setData,
    validationSchema,
    validateAfterInit: true,
  });

  const { errors } = errorData;

  return (
    <form {...formProps}>
      <FormGroupTitle>User registration</FormGroupTitle>
      <FormGroup>
        <FormTextInput label="Name" requiredMark name={names.name} error={errors.name} />
        <FormTextInput label="E-mail" requiredMark name={names.email} error={errors.email} />
      </FormGroup>
      <FormPassword label="Password" requiredMark name={names.newPassword} error={errors.newPassword} />

      <Stack direction="horizontal" className="justify-content-end mt-5">
        <Button type="submit" disabled={errorData.count > 0}>
          Submit registration
        </Button>
      </Stack>
    </form>
  );
}
