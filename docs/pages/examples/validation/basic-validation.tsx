import Head from "next/head";
import Separator from "ui/Separator";
import { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleBasicValidation } from "examples/validation/ExampleBasicValidation";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>Basic validation example - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Basic validation</h1>
        <p className="text-muted">A very basic form validation.</p>
        <p className="text-muted">
          This example uses the default mode - <code>onSubmitUnlessError</code>. The whole form is validated upon
          submit. If there are errors, the invalid inputs are revalidated based on <code>revalidationStrategy</code> -
          the default used in this example is <code>onChange</code>. This will{" "}
          <strong>only revalidate invalid inputs when they change</strong>, never the whole form. As soon as the input
          is valid, the revalidation will not happen again unless submitted with errors.
        </p>
        <TipReactBootstrapDocs />

        <Separator />

        <FormAndCodeTabs sourceCode={sourceCode} name="example-basic-validation-form">
          <ExampleBasicValidation />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getServerSideProps() {
  const sourceCode = await fs.readFile("examples/validation/ExampleBasicValidation.tsx", "utf8");
  return { props: { sourceCode } };
}
