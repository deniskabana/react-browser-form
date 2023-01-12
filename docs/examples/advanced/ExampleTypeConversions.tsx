import React from "react";
import { useBrowserForm } from "react-browser-form";

// UI for documentation only
import { FormCheckbox, FormGroup, FormGroupTitle, FormRange, FormTextInput } from "ui/forms";
import Separator from "ui/Separator";

const defaultValues = {
  // String types
  typeText: null as string | null,
  typeEmail: null as string | null,
  typeFile: null as string | null,
  typePassword: null as string | null,
  typeUrl: null as string | null,
  typeTel: null as string | null,
  typeRadio: null as string | null,
  // Number types
  typeNumber: null as number | null,
  typeRange: null as number | null,
  typeDatetimeLocal: null as number | null,
  // Date types
  typeDate: null as Date | null,
  typeMonth: null as Date | null,
  typeWeek: null as Date | null,
  typeTime: null as Date | null,
  // Boolean types
  typeCheckbox: null as boolean | null,
};
type Form = typeof defaultValues;

export function ExampleAutomaticTypes() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names } = useBrowserForm<Form>({
    name: "example-type-conversions-form",
    mode: "onChange",
    onSubmit: setData,
    onChange: setData,
    defaultValues,
  });

  return (
    <form {...formProps}>
      <FormGroupTitle>String types</FormGroupTitle>
      <FormGroup>
        <FormTextInput label="text" type="text" name={names.typeText} small />
        <FormTextInput label="email" type="email" name={names.typeEmail} small />
      </FormGroup>
      <FormGroup>
        <FormTextInput label="file" type="file" name={names.typeFile} small />
        <FormTextInput label="password" type="password" name={names.typePassword} small />
      </FormGroup>
      <FormGroup>
        <FormTextInput label="url" type="url" name={names.typeUrl} small />
        <FormTextInput label="tel" type="tel" name={names.typeTel} small />
      </FormGroup>
      <FormGroup>
        <FormCheckbox label="option 1" type="radio" value="option 1" name={names.typeRadio} />
        <FormCheckbox label="option 2" type="radio" value="option 2" name={names.typeRadio} />
      </FormGroup>

      <Separator small dashed />

      <FormGroupTitle>Number types</FormGroupTitle>
      <FormGroup>
        <FormTextInput label="number" type="number" name={names.typeNumber} small />
        <FormRange label="range" name={names.typeRange} />
      </FormGroup>
      <FormGroup>
        <FormTextInput label="datetime-local" type="datetime-local" name={names.typeDatetimeLocal} small />
      </FormGroup>

      <Separator small dashed />

      <FormGroupTitle>Date types</FormGroupTitle>
      <FormGroup>
        <FormTextInput label="date" type="date" name={names.typeDate} small />
        <FormTextInput label="month" type="month" name={names.typeMonth} small />
      </FormGroup>
      <FormGroup>
        <FormTextInput label="week" type="week" name={names.typeWeek} small />
        <FormTextInput label="time" type="time" name={names.typeTime} small />
      </FormGroup>

      <Separator small dashed />

      <FormGroupTitle>Boolean types</FormGroupTitle>
      <FormCheckbox label="checkbox" name={names.typeCheckbox} />
    </form>
  );
}
