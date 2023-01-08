import Head from "next/head";
import Separator from "ui/Separator";
import { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleRevalidationStrategyOnChange } from "examples/validation/ExampleRevalidationStrategyOnChange";
import { ExampleRevalidationStrategyOnBlur } from "examples/validation/ExampleRevalidationStrategyOnBlur";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";

export default function Page({
  onChangeSourceCode,
  onBlurSourceCode,
}: {
  onChangeSourceCode: string;
  onBlurSourceCode: string;
}) {
  return (
    <>
      <Head>
        <title>Revalidation strategies example - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Revalidation strategies</h1>
        <p className="text-muted">
          Compare <code>onChange</code> and <code>onBlur</code> revalidation strategies. These can not be combined,
          however live fields might be a viable supplement depending on form and validation complexity.
        </p>
        <TipReactBootstrapDocs />

        <Separator />

        <h4>
          <code>onChange</code> strategy <strong>(default)</strong>
        </h4>
        <p>
          If there is a validation error, invalid inputs will revalidate on every change until the error is resolved.{" "}
          <strong>This does not revalidate the entire form.</strong>
        </p>
        <FormAndCodeTabs sourceCode={onChangeSourceCode} name="example-revalidation-strategy-onchange">
          <ExampleRevalidationStrategyOnChange />
        </FormAndCodeTabs>

        <Separator />

        <h4>
          <code>onBlur</code> strategy
        </h4>
        <p>
          On blur is suitable for when your validation or form is resource-heavy or complex or you do not require live
          feedback for revalidating. This makes it very fast.
        </p>
        <FormAndCodeTabs sourceCode={onBlurSourceCode} name="example-revalidation-strategy-onblur">
          <ExampleRevalidationStrategyOnBlur />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getStaticProps() {
  const onChangeSourceCode = await fs.readFile("examples/validation/ExampleRevalidationStrategyOnChange.tsx", "utf8");
  const onBlurSourceCode = await fs.readFile("examples/validation/ExampleRevalidationStrategyOnBlur.tsx", "utf8");
  return { props: { onChangeSourceCode, onBlurSourceCode } };
}
