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
export async function getServerSideProps() {
  const sourceCode = await fs.readFile("examples/basic/ExampleRequiredFields.tsx", "utf8");
  return { props: { sourceCode } };
}
