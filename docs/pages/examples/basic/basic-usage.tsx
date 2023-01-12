import Head from "next/head";
import Separator from "ui/Separator";
import { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleBasicMinimal } from "examples/basic/ExampleBasicMinimal";
import { ExampleBasicUsage } from "examples/basic/ExampleBasicUsage";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";
import Link from "next/link";

export default function Page({
  minimalSourceCode,
  realisticSourceCode,
}: {
  minimalSourceCode: string;
  realisticSourceCode: string;
}) {
  return (
    <>
      <Head>
        <title>Basic usage example - React Browser Form Docs</title>
      </Head>

      <main>
        <h1>Basic usage</h1>
        <p className="text-muted">
          A very basic form example with a reset button.{" "}
          <strong>
            This form uses an <code>onChange</code> handler to get cleared data.
          </strong>
        </p>
        <TipReactBootstrapDocs />

        <Separator />

        <h4>Very simple form example</h4>
        <p>
          This form is the same as <Link href="/examples/basic/minimal-form">Minimal form example</Link>, however it
          uses everything that you normally would want to.
        </p>
        <FormAndCodeTabs sourceCode={minimalSourceCode} name="example-basic-minimal-form">
          <ExampleBasicMinimal />
        </FormAndCodeTabs>

        <Separator />

        <h4>Realistic basic usage</h4>
        <p>
          This form includes some extras - a reset button, 1 field with default value and more fields to provide a more
          realistic demonstration.
        </p>
        <FormAndCodeTabs sourceCode={realisticSourceCode} name="example-basic-usage-form">
          <ExampleBasicUsage />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getStaticProps() {
  const minimalSourceCode = await fs.readFile("examples/basic/ExampleBasicMinimal.tsx", "utf8");
  const realisticSourceCode = await fs.readFile("examples/basic/ExampleBasicUsage.tsx", "utf8");
  return { props: { minimalSourceCode, realisticSourceCode } };
}
