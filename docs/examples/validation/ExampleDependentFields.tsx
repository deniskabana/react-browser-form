import React from "react";
import { useDumbForm, ValidationError, ValidationSchema } from "react-dumb-form";

// UI for documentation only
import { Button, Form, Stack } from "react-bootstrap";
import { FormCheckbox, FormGroupTitle, FormTextInput } from "ui/forms";
import Separator from "ui/Separator";

// FORM SETUP AND VALIDATION
// --------------------------------------------------------------------------------

const defaultValues = {
  shouldValidateFirst: false,
  firstInput: "",
  age: 18,
  legalGuardianName: "",
};
type Form = typeof defaultValues;

const validationSchema: ValidationSchema<Form> = {
  required: { fields: ["age"] },

  validators: {
    firstInput: (firstInput, data) => {
      if (!data.shouldValidateFirst) return;
      if (firstInput.length < 6) throw new ValidationError("Please put in 6 or more characters");
    },

    legalGuardianName: (legalGuardianName, data) => {
      if (!data.age || data.age >= 18) return;
      if (legalGuardianName.length < 6) throw new ValidationError("Please put in 6 or more characters");
    },
  },
};

// COMPONENT
// --------------------------------------------------------------------------------

export function ExampleDependentFields() {
  const [data, setData] = React.useState<Form>(defaultValues);

  const { formProps, names, errorData } = useDumbForm<Form>({
    name: "example-dependent-fields-form",
    defaultValues,
    onSubmit: setData,
    onChange: setData, // Used because of reset button
    validationSchema,
    liveFields: ["age", "shouldValidateFirst"],
  });

  const { errors, count } = errorData;

  return (
    <form {...formProps}>
      <FormGroupTitle>Conditional validation</FormGroupTitle>
      <FormCheckbox label="Validate the next input?" name={names.shouldValidateFirst} />
      <FormTextInput
        label="Put in at least 6 characters"
        disabled={!data?.shouldValidateFirst}
        name={names.firstInput}
        error={errors.firstInput}
      />

      <Separator dashed />

      <FormGroupTitle>Conditional fields</FormGroupTitle>
      <Form.Text>If age below 18 is provided, legal guardian info is required and shown.</Form.Text>
      <FormTextInput label="Age" type="number" name={names.age} error={errors.age} />
      {data.age && data.age < 18 ? (
        <FormTextInput
          label="Legal guardian name (6+ characters)"
          name={names.legalGuardianName}
          error={errors.legalGuardianName}
        />
      ) : null}

      <Stack direction="horizontal" className="justify-content-end">
        <Button type="reset" variant="outline-danger" className="me-1" size="sm">
          Clear
        </Button>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
