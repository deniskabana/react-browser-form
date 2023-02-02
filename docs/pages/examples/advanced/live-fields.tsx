import Head from "next/head";
import Separator from "ui/Separator";
import Tip, { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleLiveFields } from "examples/advanced/ExampleLiveFields";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>Live fields example - React Browser Form Docs</title>
      </Head>

      <main>
        <h1>Live fields</h1>
        <p className="text-muted">
          <strong>
            Avoid using <code>onChange</code> mode unless it's necessary. It is the slowest of all modes.
          </strong>{" "}
          If you need fields that act as they would with <code>onChange</code> mode, prefer using{" "}
          <code>liveFields</code> only for those fields.
        </p>
        <TipReactBootstrapDocs />
        <Tip variant="danger">
          <strong>
            Be mindful using <code>onChange</code> or live fields - every change in value triggers form hydration, type
            transformation and validation for changed fields and calls your own <code>onChange</code> callback.
          </strong>
        </Tip>

        <Separator />

        <FormAndCodeTabs sourceCode={sourceCode} name="example-live-fields-form">
          <ExampleLiveFields />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getStaticProps() {
  const sourceCode = await fs.readFile("examples/advanced/ExampleLiveFields.tsx", "utf8");
  return { props: { sourceCode } };
}
