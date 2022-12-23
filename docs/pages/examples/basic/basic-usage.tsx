import Head from "next/head";
import Separator from "ui/Separator";
import { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleBasicUsage } from "examples/basic/ExampleBasicUsage";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>Basic usage example - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Basic usage</h1>
        <p className="text-muted">Lorem ipsum dolor sit amet consectetur edipiscing elit.</p>
        <TipReactBootstrapDocs />

        <Separator />

        <FormAndCodeTabs sourceCode={sourceCode} name="example-basic-usage-form">
          <ExampleBasicUsage />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getServerSideProps() {
  const sourceCode = await fs.readFile("examples/basic/ExampleBasicUsage.tsx", "utf8");
  return { props: { sourceCode } };
}
