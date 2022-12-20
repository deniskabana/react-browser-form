import Head from "next/head";
import Separator from "ui/Separator";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";
import fs from "fs/promises";

// Form component
import { ExampleInvoiceArrayFields } from "examples/real-world-usage/ExampleInvoiceArrayFields";
import Tip, { TipReactBootstrapDocs } from "ui/Tip";

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>Invoice array fields - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Invoice array fields</h1>
        <p className="text-muted">
          An invoice creation example. This is a real-world example of how to approach array fields before there is any
          higher level API with abstractions implemented.
        </p>
        <TipReactBootstrapDocs />

        <Separator />

        <Tip variant="danger">
          <strong>This example is non-standard!</strong> It does not use the form meta and state table since it uses
          more underlying forms.
        </Tip>

        <FormAndCodeTabs sourceCode={sourceCode} ignoreMeta name="example-invoice-array-fields-form">
          <ExampleInvoiceArrayFields />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getServerSideProps() {
  const sourceCode = await fs.readFile("examples/real-world-usage/ExampleInvoiceArrayFields.tsx", "utf8");
  return { props: { sourceCode } };
}
