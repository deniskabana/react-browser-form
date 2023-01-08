import Head from "next/head";
import Separator from "ui/Separator";
import { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleRequiredFields } from "examples/basic/ExampleRequiredFields";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>Required fields example - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Required fields</h1>
        <p className="text-muted">
          Using required fields saves a lot of time. Pass <code>required</code> to the validation schema and falsy
          values (except number 0) will all be errored. You can provide a custom message, but it is not necessary.
        </p>
        <TipReactBootstrapDocs />

        <Separator />

        <FormAndCodeTabs sourceCode={sourceCode} name="example-required-fields">
          <ExampleRequiredFields />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getStaticProps() {
  const sourceCode = await fs.readFile("examples/basic/ExampleRequiredFields.tsx", "utf8");
  return { props: { sourceCode } };
}
