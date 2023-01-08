import Head from "next/head";
import Separator from "ui/Separator";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";
import fs from "fs/promises";

// Form component
import { ExampleEcommerceCheckoutForm } from "examples/real-world-usage/ExampleEcommerceCheckoutForm";
import { TipReactBootstrapDocs } from "ui/Tip";

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>Ecommerce checkout - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Ecommerce checkout example</h1>
        <p className="text-muted">
          A real world example of how you can easily compose a checkout form common to ecommerce sites.
        </p>
        <TipReactBootstrapDocs />

        <Separator />

        <FormAndCodeTabs sourceCode={sourceCode} name="example-ecommerce-checkout-form">
          <ExampleEcommerceCheckoutForm />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getStaticProps() {
  const sourceCode = await fs.readFile("examples/real-world-usage/ExampleEcommerceCheckoutForm.tsx", "utf8");
  return { props: { sourceCode } };
}
