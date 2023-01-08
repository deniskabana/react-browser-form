import Head from "next/head";
import Separator from "ui/Separator";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";
import fs from "fs/promises";

// Form component
import { ExampleUserRegistration } from "examples/real-world-usage/ExampleUserRegistration";
import { TipReactBootstrapDocs } from "ui/Tip";

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>User registration example - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>User registration example</h1>
        <p className="text-muted">
          A real world example of how you could handle user registration with avatar upload and a password criteria
          helper.
        </p>
        <TipReactBootstrapDocs />

        <Separator />

        <FormAndCodeTabs sourceCode={sourceCode} name="example-user-registration-form">
          <ExampleUserRegistration />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getStaticProps() {
  const sourceCode = await fs.readFile("examples/real-world-usage/ExampleUserRegistration.tsx", "utf8");
  return { props: { sourceCode } };
}
