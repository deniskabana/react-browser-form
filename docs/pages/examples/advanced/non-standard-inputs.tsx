import Head from "next/head";
import Separator from "ui/Separator";
import { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleNonStandardInputs } from "examples/advanced/ExampleNonStandardInputs";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>Non-standard inputs example - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Non-standard inputs usage</h1>
        <p className="text-muted">
          You can implement non-standard inputs by using live fields, <code>setValues</code> and transformations,{" "}
          <strong>you can handle any case with React Dumb Form</strong>. Also, you will not miss out on the built-in
          transformations, error handling, and all the other features.
        </p>
        <TipReactBootstrapDocs />

        <Separator />

        <FormAndCodeTabs sourceCode={sourceCode} name="example-non-standard-inputs-form">
          <ExampleNonStandardInputs />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getServerSideProps() {
  const sourceCode = await fs.readFile("examples/advanced/ExampleNonStandardInputs.tsx", "utf8");
  return { props: { sourceCode } };
}
