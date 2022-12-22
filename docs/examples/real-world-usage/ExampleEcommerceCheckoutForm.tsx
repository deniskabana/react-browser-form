import React from "react";
import { useDumbForm, ValidationError, ValidationSchema } from "react-dumb-form";

// UI for documentation only
import { Button, Form } from "react-bootstrap";
import { FormTextInput, FormCheckbox, FormGroup, FormGroupTitle } from "ui/forms";
import Separator from "ui/Separator";

// FORM SETUP AND VALIDATION
// --------------------------------------------------------------------------------

const defaultValues = {
  firstName: "",
  lastName: "",
  billingAddress: "",
  email: "",
  phoneNumber: "",
  hasDifferentShipping: false,
  shippingAddress: "",
  hasAgreedToTerms: false,
  hasSubscribed: false,
};
type Form = typeof defaultValues;

const validationSchema: ValidationSchema<Form> = {
  required: { fields: ["firstName", "lastName", "billingAddress", "hasAgreedToTerms"] },

  validators: {
    email: email => {
      if (!email.match(/^\S{2,}@\S{2,}\.\S{2,}$/)) throw new ValidationError("Provide a valid e-mail address.");
    },
    phoneNumber: phoneNumber => {
      if (phoneNumber.length === 0) return; // Do not validate if not set. It is not required.
      if (!phoneNumber.match(/^\+?[\d\s]+$/) || (phoneNumber.match(/\d/g) ?? []).length < 4)
        throw new ValidationError("Phone number can start with a + sign, needs 4 or more numbers and can have spaces.");
    },
    shippingAddress: (shippingAddress, { hasDifferentShipping }) => {
      // Conditional validation - only validate if `hasDifferentShipping` is checked
      if (hasDifferentShipping && shippingAddress.length < 1)
        throw new ValidationError("Shipping address is required if chosen.");
    },
  },
};

// COMPONENT
// --------------------------------------------------------------------------------

export function ExampleEcommerceCheckoutForm() {
  const [data, setData] = React.useState(defaultValues);

  const { formProps, names, errorData } = useDumbForm<Form>({
    name: "example-ecommerce-checkout-form",
    onSubmit: setData,
    onChange: setData,
    defaultValues,
    validationSchema,
    liveChangeFields: ["hasDifferentShipping"],
  });

  const { errors } = errorData;

  return (
    <form {...formProps}>
      <FormGroupTitle>Billing information</FormGroupTitle>
      <FormGroup>
        <FormTextInput label="First name" requiredMark name={names.firstName} error={errors.firstName} />
        <FormTextInput label="Last name" requiredMark name={names.lastName} error={errors.lastName} />
      </FormGroup>
      <FormGroup>
        <FormTextInput label="E-mail" requiredMark name={names.email} error={errors.email} />
        <FormTextInput label="Phone number" name={names.phoneNumber} error={errors.phoneNumber} />
      </FormGroup>
      <FormTextInput label="Billing address" requiredMark name={names.billingAddress} error={errors.billingAddress} />

      <Separator small dashed />

      <FormGroupTitle>Shipping information</FormGroupTitle>
      <FormCheckbox
        label="Different shipping address?"
        name={names.hasDifferentShipping}
        error={errors.hasDifferentShipping}
      />
      {data.hasDifferentShipping ? (
        <FormTextInput
          label="Shipping address"
          requiredMark
          name={names.shippingAddress}
          error={errors.shippingAddress}
        />
      ) : null}

      <Separator small dashed />

      <FormGroupTitle>Consent</FormGroupTitle>
      <FormCheckbox
        label={
          <span>
            I read and agree with <a href="#">Terms and conditions</a>.
          </span>
        }
        requiredMark
        name={names.hasAgreedToTerms}
        error={errors.hasAgreedToTerms}
      />
      <FormCheckbox
        label="I want to receive e-mail newsletter."
        name={names.hasSubscribed}
        error={errors.hasSubscribed}
      />

      <Separator small />

      <Button type="submit" disabled={errorData.count > 0}>
        Place order
      </Button>
    </form>
  );
}
