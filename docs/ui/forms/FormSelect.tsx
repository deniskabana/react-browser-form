import { Form } from "react-bootstrap";

interface FormTextInputProps {
  options: Array<{ label: string; value: any }>;
  name: string;
  requiredMark?: boolean;
  label?: string | React.ReactNode;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  small?: boolean;
}

export function FormSelect({
  options,
  name,
  requiredMark,
  label,
  error,
  placeholder,
  disabled,
  small,
}: FormTextInputProps) {
  return (
    <Form.Group className="mb-3 flex-grow-1 flex-shrink-0">
      {label ? (
        <Form.Label className="mb-1 fw-bold" style={{ fontSize: "0.8em" }}>
          {label}
          {requiredMark ? <span className="fw-bold text-danger">*</span> : null}
        </Form.Label>
      ) : null}
      <Form.Select
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className={error ? "is-invalid" : ""}
        size={small ? "sm" : undefined}
      >
        {options.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </Form.Select>
      {error ? (
        <Form.Control.Feedback type="invalid" style={{ fontSize: "0.7em" }}>
          {error}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
}
