import Head from "next/head";
import Separator from "ui/Separator";
import { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleBasicValidation } from "examples/validation/ExampleBasicValidation";
import { ExampleBasicValidationOnInit } from "examples/validation/ExampleBasicValidationOnInit";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";

export default function Page({
  basicSourceCode,
  onInitSourceCode,
}: {
  basicSourceCode: string;
  onInitSourceCode: string;
}) {
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
          is valid, the revalidation will not happen again unless submitted or otherwise requested.
        </p>
        <TipReactBootstrapDocs />

        <Separator />

        <h4>Basic validation</h4>
        <p>Basic validation with custom validator functions for different fields.</p>
        <FormAndCodeTabs sourceCode={basicSourceCode} name="example-basic-validation-form">
          <ExampleBasicValidation />
        </FormAndCodeTabs>

        <Separator />

        <h4>Validation after init</h4>
        <p>
          This form is exactly the same as the first one, except for having <code>validateAfterInit</code> set to true.
        </p>
        <FormAndCodeTabs sourceCode={onInitSourceCode} name="example-basic-validation-on-init-form">
          <ExampleBasicValidationOnInit />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getStaticProps() {
  const basicSourceCode = await fs.readFile("examples/validation/ExampleBasicValidation.tsx", "utf8");
  const onInitSourceCode = await fs.readFile("examples/validation/ExampleBasicValidationOnInit.tsx", "utf8");
  return { props: { basicSourceCode, onInitSourceCode } };
}
