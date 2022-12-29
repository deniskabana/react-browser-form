import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface FormMultiSelectProps {
  options: string[];
  name: string;
  onChange?: (...args: any[]) => any;
  requiredMark?: boolean;
  label?: string | React.ReactNode;
  error?: string;
}

export const FormMultiSelect = ({ options, name, onChange, requiredMark, label, error }: FormMultiSelectProps) => {
  const [placeholder, setPlaceholder] = React.useState("Pick a few options");
  const [isOpen, setIsOpen] = React.useState(false);
  const [checked, setChecked] = React.useState<string[]>([]);
  const nodeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setPlaceholder(checked.length > 0 ? checked.join(", ") : "Pick a few options");
  }, [checked]);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return function() {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: Event) => {
    if (!isOpen && !nodeRef?.current?.contains(event.target as any)) {
      setIsOpen(false);
    }
  };

  const handleContainerClick = () => setIsOpen(!isOpen);

  const handleOptionClick = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event?.target?.checked === undefined) return;

    setChecked(checked => {
      if (event?.target?.checked === undefined) return checked;
      const newChecked = [...checked];

      if (event.target.checked) {
        newChecked.push(event.target.value);
      } else {
        newChecked.splice(
          checked.findIndex(val => val === event.target.value),
          1,
        );
      }

      // Doing this inside a state setter directly will lead to problems
      setTimeout(() => {
        if (onChange) onChange(newChecked);
      });

      return newChecked;
    });
  };

  return (
    <Form.Group className="mb-3 flex-grow-1 flex-shrink-0">
      {label ? (
        <Form.Label className="mb-1 fw-bold" style={{ fontSize: "0.8em" }}>
          {label}
          {requiredMark ? <span className="fw-bold text-danger">*</span> : null}
        </Form.Label>
      ) : null}
      <div className="dropdown form-control p-0" ref={nodeRef}>
        <button
          className="btn dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={handleContainerClick}
          style={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              paddingRight: "6px",
              marginRight: "-6px",
              float: "left",
              textAlign: "left",
            }}
          >
            {placeholder}
          </span>
        </button>
        <div className={`dropdown-menu ${isOpen ? "show" : ""}`} style={{ padding: 0, width: "100%" }}>
          {options.map((option, index) => (
            <div key={index} className="dropdown-item">
              <div className="form-check">
                <label
                  className="form-check-label"
                  style={{ userSelect: "none", width: "100%" }}
                  htmlFor={`multiselect-${name}-${index}`}
                >
                  <input
                    value={option}
                    id={`multiselect-${name}-${index}`}
                    className="form-check-input"
                    type="checkbox"
                    onChange={handleOptionClick}
                    checked={checked.includes(option)}
                  />
                  {option}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      {error ? (
        <Form.Text className="text-danger" style={{ fontSize: "0.7em" }}>
          {error}
        </Form.Text>
      ) : null}
    </Form.Group>
  );
};
