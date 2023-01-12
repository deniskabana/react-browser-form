import Head from "next/head";
import Separator from "ui/Separator";
import { TipReactBootstrapDocs } from "ui/Tip";
import fs from "fs/promises";

// Form component
import { ExampleModeOnSubmitUnlessError } from "examples/basic/ExampleModeOnSubmitUnlessError";
import { ExampleModeOnSubmit } from "examples/basic/ExampleModeOnSubmit";
import { ExampleModeOnBlurUnlessError } from "examples/basic/ExampleModeOnBlurUnlessError";
import { ExampleModeOnBlur } from "examples/basic/ExampleModeOnBlur";
import { ExampleModeOnChange } from "examples/basic/ExampleModeOnChange";
import { FormAndCodeTabs } from "ui/examples/FormAndCodeTabs";

export default function Page({
  onSubmitUnlessErrorSourceCode,
  onSubmitSourceCode,
  onBlurUnlessErrorSourceCode,
  onBlurSourceCode,
  onChangeSourceCode,
}: {
  onSubmitUnlessErrorSourceCode: string;
  onSubmitSourceCode: string;
  onBlurUnlessErrorSourceCode: string;
  onBlurSourceCode: string;
  onChangeSourceCode: string;
}) {
  return (
    <>
      <Head>
        <title>Form modes example - React Browser Form Docs</title>
      </Head>

      <main>
        <h1>Form modes</h1>
        <p className="text-muted">
          All the following examples use simple validation - length of 6 characters or more. This gives you an option to
          play around with these examples.
        </p>
        <TipReactBootstrapDocs />

        <Separator />

        <h4>
          <code>onSubmitUnlessError</code> mode <strong>(default)</strong>
        </h4>
        <p>
          The default mode - performant and convenient. Only hydrate and validate forms on submit and revalidate errors
          on every change by default. Suitable for most forms.
        </p>
        <FormAndCodeTabs sourceCode={onSubmitUnlessErrorSourceCode} name="example-mode-onSubmitUnlessError">
          <ExampleModeOnSubmitUnlessError />
        </FormAndCodeTabs>

        <Separator />

        <h4>
          <code>onSubmit</code> mode
        </h4>
        <p>This mode is suitable for simpler forms, that do not require validation, feedback, etc.</p>
        <FormAndCodeTabs sourceCode={onSubmitSourceCode} name="example-mode-onSubmit">
          <ExampleModeOnSubmit />
        </FormAndCodeTabs>

        <Separator />

        <h4>
          <code>onBlurUnlessError</code> mode
        </h4>
        <p>
          In some cases, you might want to hydrate and propagate data changes more often than on submit, but still do
          not need live fields or <code>onChange</code> mode to save system resources for your users. This is where blur
          modes can be very handy. For checkboxes, selects and other input types that lose focus less transparently, you
          might want to consider live fields.
        </p>
        <FormAndCodeTabs sourceCode={onBlurUnlessErrorSourceCode} name="example-mode-onBlurUnlessError">
          <ExampleModeOnBlurUnlessError />
        </FormAndCodeTabs>

        <Separator />

        <h4>
          <code>onBlur</code> mode
        </h4>
        <p>A more simplified blur mode for very basic forms.</p>
        <FormAndCodeTabs sourceCode={onBlurSourceCode} name="example-mode-onBlur">
          <ExampleModeOnBlur />
        </FormAndCodeTabs>

        <Separator />

        <h4>
          <code>onChange</code> mode
        </h4>
        <p>A more simplified blur mode for very basic forms.</p>
        <FormAndCodeTabs sourceCode={onChangeSourceCode} name="example-mode-onChange">
          <ExampleModeOnChange />
        </FormAndCodeTabs>
      </main>
    </>
  );
}

// Get component source code
export async function getStaticProps() {
  const onSubmitUnlessErrorSourceCode = await fs.readFile("examples/basic/ExampleModeOnSubmitUnlessError.tsx", "utf8");
  const onSubmitSourceCode = await fs.readFile("examples/basic/ExampleModeOnSubmit.tsx", "utf8");
  const onBlurUnlessErrorSourceCode = await fs.readFile("examples/basic/ExampleModeOnBlurUnlessError.tsx", "utf8");
  const onBlurSourceCode = await fs.readFile("examples/basic/ExampleModeOnBlur.tsx", "utf8");
  const onChangeSourceCode = await fs.readFile("examples/basic/ExampleModeOnChange.tsx", "utf8");
  return {
    props: {
      onSubmitUnlessErrorSourceCode,
      onSubmitSourceCode,
      onBlurUnlessErrorSourceCode,
      onBlurSourceCode,
      onChangeSourceCode,
    },
  };
}
