import Head from "next/head";
import Separator from "ui/Separator";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";
import Tip, { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleAutomaticTypes } from "examples/advanced/ExampleTypeConversions";

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>Automatic value types - React Browser Form Docs</title>
      </Head>

      <main>
        <h1>Automatic value types</h1>
        <p className="text-muted">
          React Browser Form incentivizes developers to use default browser APIs and form handling mechanisms. We use{" "}
          <code>input.type</code> to resolve the correct return types that are applied to <code>formState</code>.
        </p>
        <p className="text-muted">
          You can modify this behavior by providing a <code>transform</code> object (this also allows input masking). In
          some cases (e.g. a framework with abstractions) it might not be possible to correctly assign input types - in
          these cases, you will need to use custom <code>transform</code> object in order to receive the correct types.
        </p>
        <Tip variant="danger">
          <strong>Warning:</strong> If you rely on correct types when validating or submitting be sure to use correct
          input types or custom <code>transformation</code>.
        </Tip>
        <TipReactBootstrapDocs />

        <Separator />

        <FormAndCodeTabs sourceCode={sourceCode} name="example-type-conversions-form">
          <ExampleAutomaticTypes />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getStaticProps() {
  const sourceCode = await fs.readFile("examples/advanced/ExampleTypeConversions.tsx", "utf8");
  return { props: { sourceCode } };
}
