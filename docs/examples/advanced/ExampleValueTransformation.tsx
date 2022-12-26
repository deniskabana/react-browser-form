import React from "react";
import { TransformationSchema, useDumbForm } from "react-dumb-form";

// UI for documentation only
import { FormGroupTitle, FormTextInput } from "ui/forms";
import Separator from "ui/Separator";

const defaultValues = {
  // Primitive types
  primitiveString: "",
  primitiveNumber: 0 as number,
  primitiveBoolean: false,
  // Type transformations
  manualToDate: null as Date | null,
  manualToString: "",
  // Value transformations
  valuesOnlyAToF: "",
  valuesWithUnderscores: "",
  valuesUppercase: "",
};
type Form = typeof defaultValues;

const transformationSchema: TransformationSchema<Form> = {
  disableDefaultTransformation: true,
  fields: {
    primitiveString: "string",
    primitiveNumber: "number",
    primitiveBoolean: "boolean",
    manualToDate: value => new Date(Number(value)),
    manualToString: value => String(value),
    valuesOnlyAToF: value => String(value).replaceAll(/[^a-f]*/g, ""),
    valuesWithUnderscores: value => String(value).replaceAll(/\s/g, "_"),
    valuesUppercase: value => String(value).toUpperCase(),
  },
};

export function ExampleValueTransformation() {
  const [data, setData] = React.useState<Form>();

  const { formProps, names } = useDumbForm<Form>({
    name: "example-value-transformation",
    mode: "onChange",
    onSubmit: setData,
    onChange: setData,
    defaultValues,
    transformationSchema,
  });

  return (
    <form {...formProps}>
      <FormGroupTitle>Primitive transformations</FormGroupTitle>
      <FormTextInput label="Primitive: string" type="number" name={names.primitiveString} small />
      <FormTextInput label="Primitive: number" name={names.primitiveNumber} small />
      <FormTextInput label="Primitive: boolean" name={names.primitiveBoolean} small />

      <Separator small dashed />

      <FormGroupTitle>Transform types manually</FormGroupTitle>
      <FormTextInput label="Manual: to date" type="number" name={names.manualToDate} small />
      <FormTextInput label="Manual: to string" type="number" name={names.manualToString} small />

      <Separator small dashed />

      <FormGroupTitle>Transform values</FormGroupTitle>
      <FormTextInput label="Values: Only allow [a-f] characters" name={names.valuesOnlyAToF} small />
      <FormTextInput label="Values: Replace spaces with underscores" name={names.valuesWithUnderscores} small />
      <FormTextInput label="Values: Uppercase" name={names.valuesUppercase} small />
    </form>
  );
}
