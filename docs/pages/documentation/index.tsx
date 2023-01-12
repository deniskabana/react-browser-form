import Head from "next/head";
import Link from "next/link";
import Separator from "ui/Separator";

export default function Page() {
  return (
    <>
      <Head>
        <title>Documentation - React Browser Form Docs</title>
      </Head>

      <main>
        <h1>Documentation</h1>
        <p>Lorem ipsum dolor sit amet consectetur edipiscing elit.</p>

        <Separator />

        <div>
          <h2 className="mb-4">How it works</h2>
          <p>
            The way React Browser Form works is by utilizing a DOM <code>{"<form />"}</code> node. We attach React event
            listeners - <code>onChange</code>, <code>onBlur</code>, <code>onSubmit</code> and <code>onReset</code> and
            when any of these events is triggered, we check whether there is any operation to be performed and only then
            process any inputs.
          </p>
          <p>
            To get a better idea of how this works, feel free to read the{" "}
            <a
              href="https://github.com/deniskabana/react-browser-form/blob/main/src/useBrowserForm.tsx"
              target="_blank"
            >
              source code of <code>useBrowserForm.tsx</code> in our GitHub repo
            </a>
            .
          </p>
        </div>

        <Separator />

        <div>
          <h2 className="mb-4">Further documentation</h2>
          <p>
            The documentation here contains important next steps for you to read if you want to utilize the full
            potential of React Browser Form.
          </p>
          <ol>
            <li>
              <Link href="/documentation/options-api">Options API</Link> - be sure to check what options you can pass to
              React Browser Form
            </li>
            <li>
              <Link href="/documentation/return-types-api">Return types API</Link> - see all the provided information
              and APIs
            </li>
            <li>
              <Link href="/documentation/validation-and-transformation">Validation and transformation</Link> - read
              about our minimal, yet effective validation and transformation
            </li>
          </ol>
        </div>
      </main>
    </>
  );
}
