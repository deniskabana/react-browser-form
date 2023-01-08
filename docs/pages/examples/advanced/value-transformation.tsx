import Head from "next/head";
import Separator from "ui/Separator";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";
import Tip, { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleValueTransformation } from "examples/advanced/ExampleValueTransformation";
import Link from "next/link";

export default function Page({ sourceCode }: { sourceCode: string }) {
  return (
    <>
      <Head>
        <title>Value transformation - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Value transformation</h1>
        <p className="text-muted">
          Use transformation to recast types manually or mutate values before being stored in <code>formState</code>.
          Transformations only change the internal state, they don't mutate the values in inputs. You can do that
          yourself by converting the input to controller as shown in the example{" "}
          <Link href="/examples/advanced/masked-inputs">Masked inputs</Link>.
        </p>
        <TipReactBootstrapDocs />

        <Separator />

        <FormAndCodeTabs sourceCode={sourceCode} name="example-value-transformation">
          <ExampleValueTransformation />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getStaticProps() {
  const sourceCode = await fs.readFile("examples/advanced/ExampleValueTransformation.tsx", "utf8");
  return { props: { sourceCode } };
}
