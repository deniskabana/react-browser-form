import Head from "next/head";
import Separator from "ui/Separator";
import { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleComposedValidation } from "examples/validation/ExampleComposedValidation";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>Composed validation example - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Composed validation</h1>
        <p className="text-muted">You can compose (chain) validator functions to make them reusable.</p>
        <TipReactBootstrapDocs />

        <Separator />

        <FormAndCodeTabs sourceCode={sourceCode} name="example-composed-validation-form">
          <ExampleComposedValidation />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getStaticProps() {
  const sourceCode = await fs.readFile("examples/validation/ExampleComposedValidation.tsx", "utf8");
  return { props: { sourceCode } };
}
