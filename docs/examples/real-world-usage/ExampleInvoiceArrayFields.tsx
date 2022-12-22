// THIS CODE IS TEMPORARY, BEFORE FIELD ARRAY IS IMPLEMENTED

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDumbForm, ValidationError, ValidationSchema } from "react-dumb-form";

// UI for documentation only
import { Button, Form, Stack, Table } from "react-bootstrap";
import { FormTextInput, FormGroup, FormGroupTitle, FormSelect, FormCheckbox } from "ui/forms";
import { Icon } from "@iconify/react";
import Separator from "ui/Separator";

// MOCK DATA & FORM SETUP
// --------------------------------------------------------------------------------

// Mock data (in a real-world scenario this should come from a backend API)
enum Types {
  Service = "service",
  Goods = "goods",
}
const TYPES = [
  { value: Types.Service, label: "Service" },
  { value: Types.Goods, label: "Goods" },
];

// Mock data (in a real-world scenario this should come from a backend API)
enum Units {
  Hours = "hours",
  Pieces = "pieces",
}
const UNITS = [
  { value: Units.Hours, label: "hrs" },
  { value: Units.Pieces, label: "pcs" },
];

const defaultValues = {
  isActive: true,
  title: "",
  type: "" as Types,
  price: 0,
  quantity: 0,
  unit: "" as Units,
};
type Form = typeof defaultValues;

// VALIDATION
// --------------------------------------------------------------------------------

function validateNumMinZero(number: number) {
  if (number < 0) throw new ValidationError("Number must be greater than 0.");
}

const validationSchema: ValidationSchema<Form> = {
  required: { fields: ["type", "price", "quantity", "unit"] },

  validators: {
    price: validateNumMinZero,
    quantity: validateNumMinZero,
    title: title => {
      if (title.length < 10) throw new ValidationError("Title must be at least 10 characters long.");
    },
  },
};

// LINE FIELDS COMPONENT WITH FORM
// --------------------------------------------------------------------------------

interface InvoiceLineFormProps {
  index: number;
  data: Form;
  setData: (data: Form) => void;
  handleRemoveLine: VoidFunction;
}

export function InvoiceLineForm({ index, data, setData, handleRemoveLine }: InvoiceLineFormProps) {
  const { formProps, names, errorData, setValues } = useDumbForm<Form>({
    name: `example-invoice-array-fields-form-${index}`,
    mode: "onBlurUnlessError",
    onSubmit: setData,
    onChange: setData,
    defaultValues: { ...defaultValues, ...data },
    validationSchema,
    liveChangeFields: ["isActive", "quantity", "price"],
  });

  const { errors } = errorData;
  const { isActive } = data;

  // Automatically set quantity unit when switching between goods and services
  useEffect(() => {
    if (data.type === Types.Service) {
      setValues({ unit: Units.Hours });
    }
    if (data.type === Types.Goods) {
      setValues({ unit: Units.Pieces });
    }
  }, [data.type]);

  // Calculate new formatted line total
  const [sumTotal, setSumTotal] = React.useState<string | null>(null);
  useLayoutEffect(() => {
    const naiveTotal = data.price * data.quantity;
    setSumTotal(`${Number(Number.isNaN(naiveTotal) ? 0 : naiveTotal).toFixed(2)} €`);
  }, [data.price, data.quantity]);

  return (
    <>
      <form {...formProps}>
        <Stack direction="horizontal" className="align-items-center">
          <div className="mt-3 me-2">
            <FormCheckbox type="switch" name={names.isActive} />
          </div>

          <FormGroup layout={[7, 5]}>
            <FormGroup layout={[8, 4]}>
              <FormTextInput label="Title" small disabled={!isActive} name={names.title} error={errors.title} />
              <FormSelect
                options={TYPES}
                label="Type"
                small
                disabled={!isActive}
                name={names.type}
                error={errors.type}
              />
            </FormGroup>

            <FormGroup>
              <FormTextInput
                label="Quantity"
                small
                disabled={!isActive}
                type="number"
                name={names.quantity}
                error={errors.quantity}
              />
              <FormSelect
                options={UNITS}
                label="Unit"
                small
                disabled={!isActive}
                name={names.unit}
                error={errors.unit}
              />
              <FormTextInput label="Price" small disabled={!isActive} name={names.price} error={errors.price} />
            </FormGroup>
          </FormGroup>
        </Stack>

        <Stack direction="horizontal" className="align-items-center justify-content-end">
          <small className="me-3" style={{ textDecorationLine: isActive ? "none" : "line-through" }}>
            <strong>Line total: </strong>
            <span className="text-muted">{sumTotal}</span>
          </small>
          <Button variant="outline-danger" size="sm" onClick={handleRemoveLine}>
            <Icon icon="tabler:trash" className="me-1" />
            Remove
          </Button>
        </Stack>
      </form>
    </>
  );
}

// MAIN COMPONENT (WRAPPER)
// --------------------------------------------------------------------------------

export function ExampleInvoiceArrayFields() {
  // Imagine this coming from an API endpoint to populate initial state
  const [data, setData] = useState<Form[]>([
    {
      isActive: true,
      title: "iPhone 13, 128GB, Blue",
      type: Types.Goods,
      quantity: 2,
      unit: Units.Pieces,
      price: 899,
    },
    {
      isActive: false,
      title: "Extended warranty (36 months)",
      type: Types.Service,
      quantity: 2,
      unit: Units.Pieces,
      price: 99,
    },
  ]);
  const [total, setTotal] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  useEffect(() => {
    const total = data.reduce((total, line) => (line.isActive ? line.price * line.quantity + total : total), 0);
    setTotal(Number.isNaN(total) ? "-" : total.toFixed(2) + " €");
  }, [data]);

  const handleSetData = (index: number, dataToSet: Form) => {
    setData(data => {
      const newData = [...data];
      newData[index] = dataToSet;
      return newData;
    });
  };

  const handleAddLine = () => {
    setData(data => [...data, defaultValues]);
  };

  const handleRemoveLine = (index: number) => {
    setData(data => {
      const newData = [...data];
      newData.splice(index, 1);
      return newData;
    });
  };

  const handleInvoiceSubmitToggle = () => setWasSubmitted(!wasSubmitted);

  return (
    <>
      <FormGroupTitle>Invoice details</FormGroupTitle>

      <Separator small />

      {wasSubmitted ? (
        <Table striped className="mb-4">
          <thead>
            <tr>
              <th>
                <small>Title</small>
              </th>
              <th>
                <small>Type</small>
              </th>
              <th>
                <small>Quantity</small>
              </th>
              <th>
                <small>Price</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((line, index) => (
              <tr key={index} style={{ textDecorationLine: line.isActive ? "none" : "line-through" }}>
                <td>
                  <small className="fw-bold">
                    {line.title || <span className="text-muted">No description provided.</span>}
                  </small>
                </td>
                <td>
                  <small>{TYPES.find(type => type.value === line.type)?.label ?? "-"}</small>
                </td>
                <td>
                  <small>
                    {line.quantity} {line.unit}
                  </small>
                </td>
                <td>
                  <small>{line.price.toFixed(2)} €</small>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>
          {/* TODO: Not the nicest hack using `key` to force re-render when length changes. Implement a better solution. */}
          {data.map((line, index) => (
            <React.Fragment key={`${index}-${data.length}`}>
              <InvoiceLineForm
                index={index}
                data={line}
                setData={data => handleSetData(index, data)}
                handleRemoveLine={() => handleRemoveLine(index)}
              />
              <Separator dashed small />
            </React.Fragment>
          ))}
          <div className="text-center">
            <Button variant="outline-primary" size="sm" onClick={handleAddLine} disabled={wasSubmitted}>
              <Icon icon="material-symbols:add-circle-outline-rounded" className="me-1" />
              Add invoice line
            </Button>
          </div>
        </div>
      )}

      {!wasSubmitted && <Separator small />}

      <div>
        <Stack direction="horizontal">
          <Stack direction="horizontal" className="ms-auto">
            <div className="me-3">
              <strong>Invoice total: </strong>
              <span className="text-muted fw-bold">{total}</span>
            </div>
            <Button size="sm" onClick={handleInvoiceSubmitToggle}>
              {wasSubmitted ? (
                <>
                  <Icon icon="mdi:pencil" className="me-1" />
                  Edit lines
                </>
              ) : (
                <>
                  <Icon icon="material-symbols:check-circle-outline-rounded" className="me-1" />
                  Finish invoice
                </>
              )}
            </Button>
          </Stack>
        </Stack>
      </div>
    </>
  );
}
