import { Form } from "react-bootstrap";

interface FormCheckboxProps {
  name: string;
  requiredMark?: boolean;
  label?: string | React.ReactNode;
  error?: string;
  disabled?: boolean;
}

export function FormCheckbox({ name, requiredMark, label, error, disabled }: FormCheckboxProps) {
  return (
    <Form.Group className="mb-2 flex-fill">
      <Form.Check
        id={`checkbox-${name}-${label}`}
        name={name}
        label={
          <span style={{ fontSize: "0.8em", userSelect: "none" }}>
            {label}
            {requiredMark ? <span className="fw-bold text-danger">*</span> : null}
          </span>
        }
        type="checkbox"
        disabled={disabled}
        isInvalid={!!error}
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
