import Head from "next/head";
import Separator from "ui/Separator";
import React from "react";
import { useBrowserForm } from "react-browser-form";
import { Button, Card, Table } from "react-bootstrap";
import { FormGroup, FormSelect } from "ui/forms";

import { ExamplePerformanceSimpleFields } from "examples/performance/ExamplePerformanceSimpleFields";
import { ExamplePerformanceValidatedFields } from "examples/performance/ExamplePerformanceValidatedFields";
import { ExamplePerformanceOnChangeFields } from "examples/performance/ExamplePerformanceOnChangeFields";

enum FormsTypes {
  Simple = "Simple",
  Validated = "Validated",
  OnChange = "OnChange",
  Random = "Random",
}

const FORMS_TYPES_OPTIONS = [
  { value: FormsTypes.Simple, label: "Simple fields" },
  { value: FormsTypes.Validated, label: "Validated fields" },
  { value: FormsTypes.OnChange, label: "Simple onChange fields" },
  { value: FormsTypes.Random, label: "Randomize forms" },
];

const FORMS_AMOUNT_OPTIONS = [
  { value: 1, label: "1" },
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 50, label: "50" },
  { value: 1000, label: "1000" },
];

const settingsValues = {
  formsAmount: 1,
  formsTypes: FormsTypes.Simple,
};
type SettingsForm = typeof settingsValues;

export default function Page() {
  const [settings, setSettings] = React.useState<SettingsForm>(settingsValues);
  const [shouldRenderForms, setShouldRenderForms] = React.useState(false);

  const handleFormSubmit = (data: SettingsForm) => {
    setSettings(data);
    setShouldRenderForms(true);
  };

  const { formProps, names } = useBrowserForm<SettingsForm>({
    name: "performance-showcase-settings",
    defaultValues: settingsValues,
    onSubmit: handleFormSubmit,
  });

  const formsToRender = React.useMemo(() => {
    const forms: any[] = [];
    const elementList = [
      ExamplePerformanceOnChangeFields,
      ExamplePerformanceSimpleFields,
      ExamplePerformanceValidatedFields,
    ];

    for (let i = 0; i < settings.formsAmount; i++) {
      switch (settings.formsTypes) {
        case FormsTypes.Validated:
          forms.push(ExamplePerformanceValidatedFields);
          break;

        case FormsTypes.OnChange:
          forms.push(ExamplePerformanceOnChangeFields);
          break;

        case FormsTypes.Random:
          forms.push(elementList[~~(Math.random() * elementList.length)]);
          break;

        case FormsTypes.Simple:
        default:
          forms.push(ExamplePerformanceSimpleFields);
          break;
      }
    }

    return forms;
  }, [settings]);

  const handleResetClick = () => {
    setShouldRenderForms(false);
  };

  return (
    <>
      <Head>
        <title>Performance showcase example - React Browser Form Docs</title>
      </Head>

      <main>
        <h1>Performance showcase example</h1>
        <p className="text-muted">
          This section serves as a showcase of how much stress React Browser Form can handle. Feel free to experiment
          with various options to see what your device can handle when running optimized forms.
        </p>

        <Separator />

        <h4>Demo settings</h4>
        <form {...formProps}>
          <FormGroup>
            <FormSelect options={FORMS_TYPES_OPTIONS} label="Forms types" small name={names.formsTypes} />
            <FormSelect options={FORMS_AMOUNT_OPTIONS} label="Amount of forms" small name={names.formsAmount} />
          </FormGroup>
          <Button type="submit" size="sm">
            Render forms
          </Button>
          <Button size="sm" className="btn-danger ms-1" onClick={handleResetClick}>
            Clear
          </Button>
        </form>

        <Separator />

        <Card className="p-3">
          {shouldRenderForms ? (
            <>
              {formsToRender.map((Element, index) => (
                <div
                  key={index}
                  className="p-2 d-flex"
                  style={{
                    backgroundColor: index % 2 === 0 ? "white" : "#eee",
                  }}
                >
                  <h5 className="me-3 mt-2 text-center" style={{ width: "60px" }}>
                    {index + 1}
                  </h5>
                  <Element index={index} />
                </div>
              ))}
            </>
          ) : (
            <div className="text-muted text-center">
              Set demo options and press <strong>Render forms</strong> button to display forms.
            </div>
          )}
        </Card>
      </main>
    </>
  );
}
