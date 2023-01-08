import Head from "next/head";
import Separator from "ui/Separator";
import { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleDependentFields } from "examples/validation/ExampleDependentFields";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>Dependent fields example - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Dependent fields</h1>
        <p className="text-muted">
          Use live fields for the field whose value you depend on and in the validation function, you can easily access
          the whole form state through the 2nd argument.
        </p>
        <p>
          There is a caveat with live fields and that is - when they are changed, the whole form has to be revalidated.
          React Dumb Form does not know how you handle dependent fields in your validator methods, so instead of
          Proxying the form data every time, it just re-validated the entire form.
        </p>
        <TipReactBootstrapDocs />

        <Separator />

        <FormAndCodeTabs sourceCode={sourceCode} name="example-dependent-fields-form">
          <ExampleDependentFields />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getStaticProps() {
  const sourceCode = await fs.readFile("examples/validation/ExampleDependentFields.tsx", "utf8");
  return { props: { sourceCode } };
}
