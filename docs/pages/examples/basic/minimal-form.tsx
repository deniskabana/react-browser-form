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
        <title>Minimal form - React Browser Form Docs</title>
      </Head>

      <main>
        <h1>Minimal form example</h1>
        <p className="text-muted">
          This is the most basic usage example you can use. If you need a plain form, just copy and paste the code.
        </p>
        <p className="text-muted">
          <strong>
            Object <code>names</code> is not mandatory
          </strong>
          , however it helps prevent errors so it's always included in the examples. More info about <code>names</code>{" "}
          and other return types can be found in the <Link href="/documentation">Documentation section</Link>.
        </p>

        <Tip variant="info">
          <strong>
            This example is only meant to show you how easy it is to start using React Browser Form today.
          </strong>
          <br />
          To see what React Browser Form can do, consider viewing{" "}
          <Link href="/examples/real-world-usage">Real-world usage examples</Link>.
        </Tip>

        <Separator />

        <FormAndCodeTabs sourceCode={sourceCode} name="example-minimal-form">
          {/**
           * CSS code to replicate what bootstrap classes do in other places.
           * This example does not use Bootstrap to stay truly **minimal**.
           */}
          <style jsx global>{`
            .form-code-and-tabs form {
              display: flex;
              gap: 0.5rem;
            }
            .form-code-and-tabs form input {
              width: 100%;
              display: block;
              padding: 0.375rem 0.75rem;
              border-radius: 0.25rem;
              font-weight: 500;
              line-height: 1.5;
              color: #212529;
              background-color: #fff;
              background-clip: padding-box;
              border: 1px solid #ced4da;
            }
            .form-code-and-tabs form button[type="submit"] {
              border: none;
              background: var(--bs-primary);
              color: white;
              padding: 0.375rem 0.75rem;
              border-radius: 0.25rem;
              font-weight: 500;
              line-height: 1.5;
            }
          `}</style>
          <ExampleMinimalForm />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getStaticProps() {
  const sourceCode = await fs.readFile("examples/basic/ExampleMinimalForm.tsx", "utf8");
  return { props: { sourceCode } };
}
