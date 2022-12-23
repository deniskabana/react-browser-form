import { Form } from "react-bootstrap";

interface FormTextInputProps {
  name: string;
  requiredMark?: boolean;
  label?: string | React.ReactNode;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  small?: boolean;
  rows?: number;
}

export function FormTextarea({
  name,
  requiredMark,
  label,
  error,
  placeholder,
  disabled,
  small,
  rows,
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
        rows={rows}
        as="textarea"
        placeholder={placeholder}
        disabled={disabled}
        className={error ? "is-invalid" : ""}
        size={small ? "sm" : undefined}
      />
      {error ? (
        <Form.Control.Feedback type="invalid" style={{ fontSize: "0.7em" }}>
          {error}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
}
