import Head from "next/head";
import Link from "next/link";
import { introExampleCode } from "ui/layout/Header";
import Separator from "ui/Separator";

export default function Page() {
  return (
    <>
      <Head>
        <title>Getting started - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Getting started</h1>
        <p>A guide to get you started with React Dumb Form in a few seconds.</p>

        <Separator />

        <div>
          <h4 className="mb-4">Install the library</h4>
          <pre className="language-bash" tabIndex={-1}>
            <code className="language-bash">npm install react-dumb-form</code>
          </pre>
          <p className="mb-2">or</p>
          <pre className="language-bash" tabIndex={-1}>
            <code className="language-bash">yarn add react-dumb-form</code>
          </pre>
        </div>

        <Separator />

        <div>
          <h4 className="mb-4">Initialize a form with a hook</h4>
          <pre className="m-0 line-numbers language-tsx" tabIndex={-1}>
            <code className="language-tsx">{introExampleCode}</code>
          </pre>
        </div>

        <Separator />

        <div>
          <h4 className="mb-4">Next steps</h4>
          <p>
            Now you have a fully functional, performant and minimal setup and you are ready to create any form. If you
            are unfamiliar with React Dumb Form, these are great resources to look at next:
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
