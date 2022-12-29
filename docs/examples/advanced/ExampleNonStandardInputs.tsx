import React, { ChangeEvent } from "react";
import { useDumbForm, ValidationError, ValidationSchema } from "react-dumb-form";

// UI for documentation only
import { Form } from "react-bootstrap";
import { FormGroupTitle } from "ui/forms";
import { FormTextInputCustom } from "ui/forms/FormTextInputCustom";
import Separator from "ui/Separator";
import { FormMultiSelect } from "ui/forms/FormMultiSelect";

// FORM SETUP AND VALIDATION
// --------------------------------------------------------------------------------

const defaultValues = {
  controlledInput: "",
  multiSelect: [] as string[],
};
type Form = typeof defaultValues;

const validationSchema: ValidationSchema<Form> = {
  validators: {
    multiSelect: multiSelect => {
      if (multiSelect.length < 2) throw new ValidationError("Please pick at least 2 options.");
    },
  },
};

// Mock data (in a real-world scenario this should come from a backend API)
const OPTIONS = ["Australia", "Canada", "USA", "Poland", "Spain", "France"];

// COMPONENT
// --------------------------------------------------------------------------------

export function ExampleNonStandardInputs() {
  const [data, setData] = React.useState<Form>(defaultValues);

  const {
    formProps,
    names,
    errorData: { errors },
    setValues,
  } = useDumbForm<Form>({
    name: "example-non-standard-inputs-form",
    defaultValues,
    onSubmit: setData,
    onChange: setData, // Used because of reset button
    liveChangeFields: ["controlledInput", "multiSelect"],
    validationSchema,
  });

  const handleControlledInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ controlledInput: event.currentTarget.value });
  };

  const handleMultiSelectChange = (data: string[]) => {
    setValues({ multiSelect: data });
  };

  return (
    <form {...formProps}>
      <FormGroupTitle>Controlled inputs</FormGroupTitle>
      <Form.Text muted className="d-block mb-2">
        You can use controlled inputs by providing <code>value</code> and <code>onChange</code> handlers.
      </Form.Text>
      <FormTextInputCustom
        label="This is a controlled input"
        onChange={handleControlledInputChange}
        value={data.controlledInput}
        error={errors.controlledInput}
      />

      <Separator dashed />

      <FormGroupTitle>Fully custom fields</FormGroupTitle>
      <Form.Text muted className="d-block mb-2">
        This example uses multi-select as a non-standard input, but it is really applicable for anything. As long as you
        treat it as controlled.
      </Form.Text>
      <FormMultiSelect
        options={OPTIONS}
        requiredMark
        label="Multi-select"
        onChange={handleMultiSelectChange}
        name={names.multiSelect}
        error={errors.multiSelect}
      />
    </form>
  );
}
