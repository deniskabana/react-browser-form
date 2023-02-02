import React, { ChangeEvent } from "react";
import { useBrowserForm } from "react-browser-form";

// UI for documentation only
import { Form } from "react-bootstrap";
import { FormGroupTitle } from "ui/forms";
import { FormTextInputCustom } from "ui/forms/FormTextInputCustom";
import Separator from "ui/Separator";
import Tip from "ui/Tip";

// FORM SETUP AND TRANSFORMATION
// --------------------------------------------------------------------------------

const defaultValues = {
  valueOnlyAToF: "",
  valueWithUnderscores: "",
  valueUppercase: "",
  creditCardInput: "",
};
type Form = typeof defaultValues;

const customValueTransformations: Partial<Record<keyof Form, (value: unknown) => any>> = {
  valueOnlyAToF: value => String(value).replaceAll(/[^a-f]*/g, ""),
  valueWithUnderscores: value => String(value).replaceAll(/\s/g, "_"),
  valueUppercase: value => String(value).toUpperCase(),
};

const CREDIT_CARD_MASK = "____ ____ ____ ____";

// COMPONENT
// --------------------------------------------------------------------------------

export function ExampleMaskedInputs() {
  const [data, setData] = React.useState<Form & { [key: string]: any }>(defaultValues);

  const { formProps, names, setValues } = useBrowserForm<Form>({
    name: "example-masked-inputs-form",
    defaultValues,
    onSubmit: setData,
    onChange: setData,
  });

  const handleMaskedInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // Re-use the transformator and leave it in place in case of user error
    const transformator = customValueTransformations[name as keyof Form];
    if (!transformator) return;
    setValues({ [name]: transformator(value) });
  };

  // WARNING: In production usage, you should use a masking library or a more general-purpose function
  const handleCreditCardChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const name = names.creditCardInput;
    const previousValue = data.creditCardInput.replaceAll(/[^0-9]/g, "");
    const value = input.value.replaceAll(/[^0-9]/g, "");

    let iVal = 0;
    let iPat = 0;
    let formattedValue = "";
    let specialChars = "";
    let cursorPos = Math.min(value.length, Number(input.selectionStart));

    while (iVal < value.length && iPat < CREDIT_CARD_MASK.length) {
      const charVal = value.charAt(iVal);
      const charPat = CREDIT_CARD_MASK.charAt(iPat);
      const isSameSpecialChar = charVal === charPat && charVal !== "_";

      if (isSameSpecialChar || (charVal.match(/[0-9]/) && charPat === "_")) {
        formattedValue += specialChars + charVal;
        specialChars = "";
        iVal++;
        iPat++;
      } else if (charPat !== "_") {
        specialChars += charPat;
        iPat++;
        if (previousValue.length < value.length) cursorPos++;
      } else {
        break;
      }
    }

    // Apply formatted value
    setValues({ [name]: formattedValue });

    // Update input value - input value does not reflect value stored in form state, it includes the rest of the mask
    input.value = `${formattedValue}${
      formattedValue.length !== CREDIT_CARD_MASK.length
        ? CREDIT_CARD_MASK.slice(formattedValue.length - CREDIT_CARD_MASK.length)
        : ""
    }`;
    input.setSelectionRange(cursorPos, cursorPos);
  };

  return (
    <form {...formProps}>
      <FormGroupTitle>Transform input value (controlled)</FormGroupTitle>
      <FormTextInputCustom
        label="Only allow [a-f] characters"
        onChange={handleMaskedInputChange}
        name={names.valueOnlyAToF}
        value={data.valueOnlyAToF}
        small
      />
      <FormTextInputCustom
        label="Replace spaces with underscores"
        onChange={handleMaskedInputChange}
        name={names.valueWithUnderscores}
        value={data.valueWithUnderscores}
        small
      />
      <FormTextInputCustom
        label="Convert to uppercase"
        onChange={handleMaskedInputChange}
        name={names.valueUppercase}
        value={data.valueUppercase}
        small
      />

      <Separator dashed />

      <FormGroupTitle>Masked credit card input</FormGroupTitle>
      <FormTextInputCustom
        label="Credit card number"
        onChange={handleCreditCardChange}
        name={names.creditCardInput}
        placeholder={CREDIT_CARD_MASK}
      />
      <Tip variant="danger">
        <strong>Warning: </strong> This implementation of a masked input is <strong>very naive</strong> and should serve
        solely as a demonstration of possibility. In production, be sure to use more suitable solutions.
      </Tip>
    </form>
  );
}
