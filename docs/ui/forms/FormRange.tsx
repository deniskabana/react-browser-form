import { Form } from "react-bootstrap";

interface FormRangeProps {
  name: string;
  requiredMark?: boolean;
  label?: string | React.ReactNode;
  error?: string;
  disabled?: boolean;
  value?: any;
}

export function FormRange({ name, requiredMark, label, error, disabled, value }: FormRangeProps) {
  return (
    <Form.Group className="mb-2 flex-fill">
      {label ? (
        <Form.Label className="mb-1 fw-bold" style={{ fontSize: "0.8em" }}>
          {label}
          {requiredMark ? <span className="fw-bold text-danger">*</span> : null}
        </Form.Label>
      ) : null}
      <Form.Range
        id={`range-${name}-${label}`}
        name={name}
        value={value}
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
