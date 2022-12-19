import { Form } from "react-bootstrap";

interface FormTextInputProps {
  name: string;
  requiredMark?: boolean;
  type?: string;
  label?: string | React.ReactNode;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function FormTextInput({
  name,
  requiredMark,
  type = "text",
  label,
  error,
  placeholder,
  disabled,
}: FormTextInputProps) {
  return (
    <Form.Group className="mb-3 flex-grow-1 flex-shrink-0">
      {label ? (
        <Form.Label className="mb-1 fw-bold" style={{ fontSize: "0.8em" }}>
          {label}
          {requiredMark ? <span className="fw-bold text-danger">*</span> : null}
        </Form.Label>
      ) : null}
      <Form.Control
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={error ? "is-invalid" : ""}
      />
      {error ? (
        <Form.Control.Feedback type="invalid" style={{ fontSize: "0.7em" }}>
          {error}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
}
