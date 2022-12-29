import { Form, FormControlProps } from "react-bootstrap";

interface FormTextInputCustomProps extends FormControlProps {
  name?: string;
  requiredMark?: boolean;
  label?: string | React.ReactNode;
  error?: string;
  small?: boolean;
  type?: string;
}

export function FormTextInputCustom({
  type = "text",
  requiredMark,
  label,
  error,
  small,
  ...otherProps
}: FormTextInputCustomProps) {
  return (
    <Form.Group className="mb-3 flex-grow-1 flex-shrink-0">
      {label ? (
        <Form.Label className="mb-1 fw-bold" style={{ fontSize: "0.8em" }}>
          {label}
          {requiredMark ? <span className="fw-bold text-danger">*</span> : null}
        </Form.Label>
      ) : null}
      <Form.Control {...otherProps} type={type} className={error ? "is-invalid" : ""} size={small ? "sm" : undefined} />
      {error ? (
        <Form.Control.Feedback type="invalid" style={{ fontSize: "0.7em" }}>
          {error}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
}
