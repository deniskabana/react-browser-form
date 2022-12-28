import Head from "next/head";
import Separator from "ui/Separator";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";
import Tip, { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleValueTransformation } from "examples/advanced/ExampleValueTransformation";

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>Value transformation - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Value transformation</h1>
        <p className="text-muted">
          Use transformation to recast types manually or mutate values before being stored in <code>formState</code>.
        </p>
        <Tip variant="danger">
          <strong>Warning:</strong> Transformation will only change values internally.
        </Tip>
        <TipReactBootstrapDocs />

        <Separator />

        <FormAndCodeTabs sourceCode={sourceCode} name="example-value-transformation">
          <ExampleValueTransformation />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getServerSideProps() {
  const sourceCode = await fs.readFile("examples/advanced/ExampleValueTransformation.tsx", "utf8");
  return { props: { sourceCode } };
}
