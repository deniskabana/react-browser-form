import Head from "next/head";
import Separator from "ui/Separator";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";
import Tip, { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";
import { ExampleTypeConversions } from "examples/basic/ExampleTypeConversions";

// Form component

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>Type conversions example - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Type conversions example</h1>
        <p className="text-muted">
          React Dumb Form incentivizes developers to use default browser APIs and form handling mechanisms. We use{" "}
          <code>input.type</code> to resolve the correct return types that are applied to <code>formState</code>.
        </p>
        <p className="text-muted">
          You can modify this behavior by providing a <code>transform</code> object (this also allows input masking). In
          some cases (e.g. a framework with abstractions) it might not be possible to correctly assign input types - in
          these cases, you will need to use custom <code>transform</code> object in order to receive the correct types.
        </p>
        <Tip variant="danger">
          <strong>Tip:</strong> If you rely on correct types when validating or submitting or you don't provide default
          values, be sure to use correct input types or custom <code>transform</code>.
        </Tip>
        <TipReactBootstrapDocs />

        <Separator />

        <h2>
          Type conversions with <code>input.type</code>
        </h2>
        <FormAndCodeTabs sourceCode={sourceCode} name="example-type-conversions-form">
          <ExampleTypeConversions />
        </FormAndCodeTabs>

        <Separator />

        <h2>
          Type conversions with <code>transform</code> object
        </h2>
        <FormAndCodeTabs sourceCode={sourceCode} name="example-type-conversions-form">
          <ExampleTypeConversions />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getServerSideProps() {
  const sourceCode = await fs.readFile("examples/basic/ExampleTypeConversions.tsx", "utf8");
  return { props: { sourceCode } };
}
