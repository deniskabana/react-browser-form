import Head from "next/head";
import Link from "next/link";
import { Card, Table } from "react-bootstrap";
import Separator from "ui/Separator";
import Tip from "ui/Tip";

export default function Page() {
  return (
    <>
      <Head>
        <title>Options API - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Options API</h1>
        <p>Here is a full list of options you can use with React Dumb Form.</p>
        <p>
          Options combinations that could potentially break your application or might be severe oversights are also
          verified at runtime.{" "}
          <strong>
            Errors are thrown from the hook if problematic setup occurs, so pay attention to this document.
          </strong>
        </p>

        <Tip>
          You can find all of these explanations as inline comments (JSDoc) when using React Dumb Form in your code.
        </Tip>

        <Separator />

        <Card className="p-3">
          <Table bordered>
            <thead>
              <tr>
                <th>Key</th>
                <th>Type</th>
                <th>Explanation</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "rgba(0,0,0,0.1)" }}>
                <td colSpan={4}>
                  <h6 className="my-2">Required</h6>
                </td>
              </tr>

              {/* name */}
              <tr>
                <td className="font-monospace fw-bold">
                  name
                  <strong className="text-danger text-small d-block">(required)</strong>
                </td>
                <td className="font-monospace text-secondary text-small">string</td>
                <td>
                  Form DOM name attribute - <strong>must be unique</strong>. Used to access inputs through{" "}
                  <code>document.forms</code>, to read all events and hydrate the form data and the DOM inputs.
                </td>
              </tr>

              {/* defaultValues */}
              <tr>
                <td className="font-monospace fw-bold">
                  defaultValues
                  <strong className="text-danger text-small d-block">(required)</strong>
                </td>
                <td className="font-monospace text-secondary text-small">Schema</td>
                <td>Default values need to match your schema. These are used for a lot of the iteration.</td>
              </tr>

              <tr style={{ background: "rgba(0,0,0,0.1)" }}>
                <td colSpan={4}>
                  <h6 className="my-2">Optional</h6>
                </td>
              </tr>

              {/* onSubmit */}
              <tr>
                <td className="font-monospace fw-bold">onSubmit</td>
                <td className="font-monospace text-secondary text-small">{`(data: Schema) => void`}</td>
                <td>
                  A callback for when the form is submitted.{" "}
                  <strong>Will not trigger if there are errors during validation!</strong>
                </td>
              </tr>

              {/* onChange */}
              <tr>
                <td className="font-monospace fw-bold">onChange</td>
                <td className="font-monospace text-secondary text-small">{`(data: Schema) => void`}</td>
                <td>
                  This method is useful when using <code>onChange</code> mode, live fields, setting or resetting values,
                  etc.
                </td>
              </tr>

              {/* mode */}
              <tr>
                <td className="font-monospace fw-bold">mode</td>
                <td className="font-monospace text-secondary text-small">
                  "onSubmitUnlessError" | "onSubmit" | "onBlurUnlessError" | "onBlur" | "onChange"
                </td>
                <td>
                  <ul>
                    <li>
                      <code>onSubmitUnlessError</code>: Hydrate and validate upon form submit event. Inputs with errors
                      re-validate on input change until the error is resolved.
                    </li>
                    <li>
                      <code>onSubmit</code>: Hydrate and validate upon form submit event. The fastest option if not
                      validating, reliant on browser handling and keeping inputs mounted .
                    </li>
                    <li>
                      <code>onBlurUnlessError</code>: Hydrate and validate the form on every input blur. Inputs with
                      errors re-validate on input change until the error is resolved.
                    </li>
                    <li>
                      <code>onBlur</code>: Hydrate and validate the form on every input blur. Recommended for forms with
                      more complex validation logic.
                    </li>
                    <li>
                      <code>onChange</code>: The React way of handling forms. - <strong>the slowest method.</strong>{" "}
                      Only good for live data handling. It is recommended to use live fields instead.
                    </li>
                  </ul>
                  <ul className="mt-2">
                    <li>
                      <Link href="/examples/basic/form-modes">Example</Link>
                    </li>
                  </ul>
                  <strong>
                    Default: <code>onSubmitUnlessError</code>
                  </strong>
                </td>
              </tr>

              {/* liveFields */}
              <tr>
                <td className="font-monospace fw-bold">liveFields</td>
                <td className="font-monospace text-secondary text-small">{"Array<keyof Schema>"}</td>
                <td>
                  A subset of fields that will trigger update <strong>and validation of fields with errors</strong> on
                  every input change. Useful for conditional operations within forms, dependent fields, etc.
                  <ul className="mt-2">
                    <li>
                      <Link href="/examples/advanced/live-fields">Example</Link>
                    </li>
                  </ul>
                </td>
              </tr>

              {/* validationSchema */}
              <tr>
                <td className="font-monospace fw-bold">validationSchema</td>
                <td className="font-monospace text-secondary text-small">{`ValidationSchema<Schema>`}</td>
                <td>
                  A dead-simple validation with a validator schema that has access to all the data. Throw{" "}
                  <code>ValidationError</code> if field validation fails.
                  <ul className="mt-2">
                    <li>
                      <Link href="/documentation/validation-schema">Documentation</Link>
                    </li>
                    <li>
                      <Link href="/examples/validation">Example</Link>
                    </li>
                  </ul>
                </td>
              </tr>

              {/* revalidationStrategy */}
              <tr>
                <td className="font-monospace fw-bold">revalidationStrategy</td>
                <td className="font-monospace text-secondary text-small">"onChange" | "onBlur"</td>
                <td>
                  A revalidation strategy for inputs with errors. To be used with any _unlessError mode. Choose{" "}
                  <code>onBlur</code> if your validation is demanding.
                  <ul className="mt-2">
                    <li>
                      <Link href="/examples/validation/revalidation-strategies">Example</Link>
                    </li>
                  </ul>
                  <strong>
                    Default: <code>onChange</code>
                  </strong>
                </td>
              </tr>

              {/* transformationSchema */}
              <tr>
                <td className="font-monospace fw-bold">transformationSchema</td>
                <td className="font-monospace text-secondary text-small">{`TransformationSchema<Schema>`}</td>
                <td>
                  A dead-simple type and value transformation schema. Useful when you need easy data processing, input
                  masking or just recast types.
                  <ul className="mt-2">
                    <li>
                      <Link href="/documentation/transformation-schema">Documentation</Link>
                    </li>
                    <li>
                      <Link href="/examples/advanced/value-transformation">Example</Link>
                    </li>
                  </ul>
                </td>
              </tr>

              {/* validateAfterInit */}
              <tr>
                <td className="font-monospace fw-bold">validateAfterInit</td>
                <td className="font-monospace text-secondary text-small">boolean</td>
                <td>Whether to perform validation right after mounting the form - before the first render.</td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </main>
    </>
  );
}
