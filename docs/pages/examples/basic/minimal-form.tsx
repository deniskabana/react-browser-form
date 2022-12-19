import Head from "next/head";
import Link from "next/link";
import Separator from "ui/Separator";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";
import Tip from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleMinimalForm } from "examples/basic/ExampleMinimalForm";

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>Minimal form example - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Minimal form example</h1>
        <p className="text-muted">
          This is the most basic usage example you can use. If you need a plain form, just copy and paste the code.
        </p>

        <Separator />

        <FormAndCodeTabs sourceCode={sourceCode} name="example-minimal-form">
          <ExampleMinimalForm />
        </FormAndCodeTabs>

        <Separator />

        <p className="text-muted">
          <strong>
            Object <code>names</code> is not mandatory
          </strong>
          , however it helps prevent errors so it's always included in the examples. More info about <code>names</code>{" "}
          and other return types can be found in the <Link href="/documentation">Documentation section</Link>.
        </p>

        <Tip variant="info">
          <strong>This example is only meant to show you how easy it is to start using React Dumb Form today.</strong>
          <br />
          To see what React Dumb Form can do, consider viewing{" "}
          <Link href="/examples/real-world-usage">Real-world usage examples</Link>.
        </Tip>
      </main>
    </>
  );
}

// Get component source code
export async function getServerSideProps() {
  const sourceCode = await fs.readFile("examples/basic/ExampleMinimalForm.tsx", "utf8");
  return { props: { sourceCode } };
}
