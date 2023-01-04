import React from "react";
import { useDumbForm, ValidationError, ValidationSchema } from "react-dumb-form";

// UI for documentation only
import { Button, Form, Stack } from "react-bootstrap";
import { FormTextInput, FormGroup, FormGroupTitle } from "ui/forms";
import Separator from "ui/Separator";
import { FormPassword } from "ui/forms/FormPassword";
import { Icon } from "@iconify/react";

// FORM SETUP AND VALIDATION
// --------------------------------------------------------------------------------

const defaultValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  profilePhoto: "",
};
type Form = typeof defaultValues;

const PASSWORD_FEEDBACK = {
  minLength: false,
  lowercaseChar: false,
  uppercaseChar: false,
  number: false,
  specialSymbol: false,
};

// COMPONENT
// --------------------------------------------------------------------------------

export function ExampleUserRegistration() {
  const [data, setData] = React.useState(defaultValues);
  const [isFileDraggedOver, setIsFileDraggedOver] = React.useState(false);
  const [passwordFeedback, setPasswordFeedback] = React.useState({
    ...PASSWORD_FEEDBACK,
  });

  const validationSchema: ValidationSchema<Form> = {
    required: { fields: ["firstName", "lastName", "username", "profilePhoto"] },

    validators: {
      email: email => {
        if (!email.match(/^\S{2,}@\S{2,}\.\S{2,}$/)) throw new ValidationError("Provide a valid e-mail address.");
      },

      password: password => {
        let shouldThrow = false;
        const newPasswordFeedback: typeof PASSWORD_FEEDBACK = {
          minLength: true,
          lowercaseChar: true,
          uppercaseChar: true,
          number: true,
          specialSymbol: true,
        };

        if (password.length < 6) {
          shouldThrow = true;
          newPasswordFeedback.minLength = false;
        }
        if (!password.match(/[a-z]/)) {
          shouldThrow = true;
          newPasswordFeedback.lowercaseChar = false;
        }
        if (!password.match(/[A-Z]/)) {
          shouldThrow = true;
          newPasswordFeedback.uppercaseChar = false;
        }
        if (!password.match(/[0-9]/)) {
          shouldThrow = true;
          newPasswordFeedback.number = false;
        }
        if (!password.match(/[!@#$%^&*()\[\]-_=+]/)) {
          shouldThrow = true;
          newPasswordFeedback.specialSymbol = false;
        }

        setPasswordFeedback(newPasswordFeedback);
        // Message isn't important since it isn't displayed, but it might save time on future refactor
        if (shouldThrow)
          throw new ValidationError(
            "Password needs to be 6+ characters long and include 1 lowercase, 1 uppercase letter, 1 number and 1 symbol.",
          );
      },
    },
  };

  const { formProps, names, errorData, setValues } = useDumbForm<Form>({
    name: "example-user-registration-form",
    onSubmit: setData,
    onChange: setData,
    defaultValues,
    validationSchema,
    liveFields: ["password"],
  });

  const { errors } = errorData;

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsFileDraggedOver(false);
    const file = event.dataTransfer.files[0];

    if (!file) return;

    setValues({ profilePhoto: file.name });
    const previewNode = document.getElementById("profile-photo-preview") as HTMLImageElement | undefined;
    if (!previewNode) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result;
      if (!result) return;
      previewNode.src = result as any;
      previewNode.alt = file.name;
    };
  };

  const handleDragOver = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsFileDraggedOver(true);
  };
  const handleDragLeave = () => setIsFileDraggedOver(false);

  return (
    <form {...formProps}>
      <FormGroupTitle>Profile picture</FormGroupTitle>
      <div>
        <div
          className="ms-auto me-auto my-4 d-flex text-center justify-content-center align-items-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            border: `3px dashed ${isFileDraggedOver ? "#68f" : "#aaa"}`,
            borderRadius: "50%",
            width: "200px",
            height: "200px",
          }}
        >
          <div>
            {data.profilePhoto && data.profilePhoto.length ? (
              <img
                id="profile-photo-preview"
                className="ms-auto me-auto"
                style={{ maxWidth: "80px", maxHeight: "80px", background: "#aaa" }}
              />
            ) : (
              <Icon icon="material-symbols:frame-person" height="80px" style={{ opacity: 0.3 }} />
            )}
            <div className="d-block text-muted mt-2" style={{ fontSize: "0.75em" }}>
              Drag and drop a file.
            </div>
          </div>
        </div>
      </div>

      <Separator dashed small />

      <FormGroupTitle>User details</FormGroupTitle>
      <FormGroup>
        <FormTextInput label="First name" requiredMark name={names.firstName} error={errors.firstName} />
        <FormTextInput label="Last name" requiredMark name={names.lastName} error={errors.lastName} />
      </FormGroup>
      <FormGroup>
        <FormTextInput label="Username" requiredMark name={names.username} error={errors.username} />
        <FormTextInput label="E-mail" requiredMark name={names.email} error={errors.email} />
      </FormGroup>

      <Separator dashed small />

      <FormGroupTitle>Create a password</FormGroupTitle>
      <FormPassword label="Password" requiredMark name={names.password} />
      <Form.Text style={{ fontSize: "0.75em" }}>
        Password feedback:
        <div className="fw-bold ps-3">
          <div className={passwordFeedback.minLength ? "text-success" : "text-danger"}>
            <Icon
              icon={passwordFeedback.minLength ? "material-symbols:check" : "charm:cross"}
              height="22"
              className="me-1 align-middle"
            />
            Needs to be at least 6 characters long
          </div>
          <div className={passwordFeedback.lowercaseChar ? "text-success" : "text-danger"}>
            <Icon
              icon={passwordFeedback.lowercaseChar ? "material-symbols:check" : "charm:cross"}
              height="22"
              className="me-1 align-middle"
            />
            Needs at least 1 lowercase letter
          </div>
          <div className={passwordFeedback.uppercaseChar ? "text-success" : "text-danger"}>
            <Icon
              icon={passwordFeedback.uppercaseChar ? "material-symbols:check" : "charm:cross"}
              height="22"
              className="me-1 align-middle"
            />
            Needs at least 1 uppercase letter
          </div>
          <div className={passwordFeedback.number ? "text-success" : "text-danger"}>
            <Icon
              icon={passwordFeedback.number ? "material-symbols:check" : "charm:cross"}
              height="22"
              className="me-1 align-middle"
            />
            Needs at least 1 number
          </div>
          <div className={passwordFeedback.specialSymbol ? "text-success" : "text-danger"}>
            <Icon
              icon={passwordFeedback.specialSymbol ? "material-symbols:check" : "charm:cross"}
              height="22"
              className="me-1 align-middle"
            />
            Needs at least 1 special symbol
          </div>
        </div>
      </Form.Text>

      <Separator dashed small />

      <Stack direction="horizontal" className="justify-content-end">
        <Button type="submit" disabled={errorData.count > 0}>
          Register
        </Button>
      </Stack>
    </form>
  );
}
