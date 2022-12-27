import { Icon } from "@iconify/react";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

interface FormPasswordProps {
  name: string;
  requiredMark?: boolean;
  label?: string | React.ReactNode;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  small?: boolean;
}

export function FormPassword({ name, requiredMark, label, error, placeholder, disabled, small }: FormPasswordProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Form.Group className="mb-3 flex-grow-1 flex-shrink-0">
      {label ? (
        <Form.Label className="mb-1 fw-bold" style={{ fontSize: "0.8em" }}>
          {label}
          {requiredMark ? <span className="fw-bold text-danger">*</span> : null}
        </Form.Label>
      ) : null}
      <InputGroup>
        <Form.Control
          name={name}
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
          className={error ? "is-invalid" : ""}
          size={small ? "sm" : undefined}
        />
        <Button
          variant="dark"
          size={small ? "sm" : undefined}
          disabled={disabled}
          className={error ? "is-invalid" : ""}
          onClick={() => setIsVisible(!isVisible)}
        >
          <Icon icon={isVisible ? "mdi:eye-off-outline" : "mdi:eye-outline"} />
        </Button>
        {error ? (
          <Form.Control.Feedback type="invalid" style={{ fontSize: "0.7em" }}>
            {error}
          </Form.Control.Feedback>
        ) : null}
      </InputGroup>
    </Form.Group>
  );
}
