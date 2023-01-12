import Head from "next/head";
import Link from "next/link";
import Separator from "ui/Separator";

const codeExampleInit = `const { formProps } = useBrowserForm<{}>({ name: "example", defaultValues: {} });

return <form {...formProps} />;`;

const codeExampleDefaultValues = `const defaultValues = {
  email: "roberta_warren@znation.com",
};
type Form = typeof defaultValues;

export function Component() {
  const { formProps } = useBrowserForm<Form>({ name: "example", defaultValues });

  return <form {...formProps} />;
}`;

const codeExampleInputs = `const defaultValues = {
  email: "roberta_warren@znation.com",
};
type Form = typeof defaultValues;

export function Component() {
  const { formProps, names } = useBrowserForm<Form>({ name: "example", defaultValues });

  return (
    <form {...formProps}>
      <input type="email" placeholder="E-mail address" name={names.email} />
      <button type="submit">Subscribe</button>
    </form>
  );
}`;

export default function Page() {
  return (
    <>
      <Head>
        <title>Getting started - React Browser Form Docs</title>
      </Head>

      <main>
        <h1>Getting started</h1>
        <p>A guide to get you started with React Browser Form in a few seconds.</p>

        <Separator />

        <div>
          <h4 className="mb-4">Install the library</h4>
          <pre className="language-bash" tabIndex={-1}>
            <code className="language-bash">npm install react-browser-form</code>
          </pre>
          <p className="mb-2">or</p>
          <pre className="language-bash" tabIndex={-1}>
            <code className="language-bash">yarn add react-browser-form</code>
          </pre>
        </div>

        <Separator />

        <div>
          <h4 className="mb-4">Initialize the form with a hook</h4>
          <pre className="m-0 line-numbers language-tsx" tabIndex={-1}>
            <code className="language-tsx">{codeExampleInit}</code>
          </pre>
        </div>

        <Separator />

        <div>
          <h4 className="mb-4">Add default values and schema type</h4>
          <pre className="m-0 line-numbers language-tsx" tabIndex={-1}>
            <code className="language-tsx">{codeExampleDefaultValues}</code>
          </pre>
        </div>

        <Separator />

        <div>
          <h4 className="mb-4">Add inputs with name checking</h4>
          <pre className="m-0 line-numbers language-tsx" tabIndex={-1}>
            <code className="language-tsx">{codeExampleInputs}</code>
          </pre>
        </div>

        <Separator />

        <div>
          <h4 className="mb-4">Next steps</h4>
          <p>
            Now you have a fully functional, performant and minimal setup and you are ready to create any form. If you
            are unfamiliar with React Browser Form, these are great resources to look at next:
          </p>
          <ul>
            <li>
              <Link href="/documentation">Read our documentation</Link>
            </li>
            <li>
              <Link href="/examples">Check out our exmaples</Link>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
