import Head from "next/head";
import Separator from "ui/Separator";
import { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleFormMethodsSubmit } from "examples/basic/ExampleFormMethodsSubmit";
import { ExampleFormMethodsReset } from "examples/basic/ExampleFormMethodsReset";
import { ExampleFormMethodsResetValues } from "examples/basic/ExampleFormMethodsResetValues";
import { ExampleFormMethodsSetValues } from "examples/basic/ExampleFormMethodsSetValues";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";

export default function Page({
  submitSourceCode,
  resetSourceCode,
  resetValuesSourceCode,
  setValuesSourceCode,
}: {
  submitSourceCode: string;
  resetSourceCode: string;
  resetValuesSourceCode: string;
  setValuesSourceCode: string;
}) {
  return (
    <>
      <Head>
        <title>Form methods example - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Form methods</h1>
        <p className="text-muted">An example that shows the usage of all form methods.</p>
        <TipReactBootstrapDocs />

        <Separator />

        <h4>
          <code>submit()</code> method
        </h4>
        <p>
          This form submits if name equals <strong>exactly</strong> <code>Adam</code>.
        </p>
        <FormAndCodeTabs sourceCode={submitSourceCode} name="example-form-methods-submit">
          <ExampleFormMethodsSubmit />
        </FormAndCodeTabs>

        <Separator />

        <h4>
          <code>reset()</code> method
        </h4>
        <p>
          This form resets if name equals <strong>exactly</strong> <code>Adam</code>.
        </p>
        <FormAndCodeTabs sourceCode={resetSourceCode} name="example-form-methods-reset">
          <ExampleFormMethodsReset />
        </FormAndCodeTabs>

        <Separator />

        <h4>
          <code>reset(values)</code> method
        </h4>
        <p>
          Compare <code>reset()</code> (to default values) and <code>reset(values)</code>. Reset method only accepts
          full schema.
        </p>
        <FormAndCodeTabs sourceCode={resetValuesSourceCode} name="example-form-methods-reset-values">
          <ExampleFormMethodsResetValues />
        </FormAndCodeTabs>

        <Separator />

        <h4>
          <code>setValues(values)</code> method
        </h4>
        <p>
          Allow setting values - any amount of data can be fed to <code>setValues(values)</code>, even the whole form.
        </p>
        <FormAndCodeTabs sourceCode={setValuesSourceCode} name="example-form-methods-set-values">
          <ExampleFormMethodsSetValues />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getStaticProps() {
  const submitSourceCode = await fs.readFile("examples/basic/ExampleFormMethodsSubmit.tsx", "utf8");
  const resetSourceCode = await fs.readFile("examples/basic/ExampleFormMethodsReset.tsx", "utf8");
  const resetValuesSourceCode = await fs.readFile("examples/basic/ExampleFormMethodsResetValues.tsx", "utf8");
  const setValuesSourceCode = await fs.readFile("examples/basic/ExampleFormMethodsSetValues.tsx", "utf8");
  return { props: { submitSourceCode, resetSourceCode, resetValuesSourceCode, setValuesSourceCode } };
}
