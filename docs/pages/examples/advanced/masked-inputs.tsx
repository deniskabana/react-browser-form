import Head from "next/head";
import Separator from "ui/Separator";
import { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleMaskedInputs } from "examples/advanced/ExampleMaskedInputs";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>Masked inputs example - React Browser Form Docs</title>
      </Head>

      <main>
        <h1>Masked inputs usage</h1>
        <p className="text-muted">
          Use controlled inputs optionally with transformations to make masked inputs or transform even the input value.
          Always use live fields for controlled inputs, or use the <code>onChange</code> mode if all are controlled.
        </p>
        <TipReactBootstrapDocs />

        <Separator />

        <FormAndCodeTabs sourceCode={sourceCode} name="example-masked-inputs-form">
          <ExampleMaskedInputs />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getStaticProps() {
  const sourceCode = await fs.readFile("examples/advanced/ExampleMaskedInputs.tsx", "utf8");
  return { props: { sourceCode } };
}
