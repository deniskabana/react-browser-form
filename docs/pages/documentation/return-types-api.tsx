import Head from "next/head";
import Link from "next/link";
import { Card, Table } from "react-bootstrap";
import Separator from "ui/Separator";
import Tip from "ui/Tip";

export default function Page() {
  return (
    <>
      <Head>
        <title>Return types API - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Return types API</h1>
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
                  <h6 className="my-2">Required to function</h6>
                </td>
              </tr>

              {/* formProps */}
              <tr>
                <td className="font-monospace fw-bold">
                  formProps
                  <strong className="text-danger text-small d-block">(required)</strong>
                </td>
                <td className="font-monospace text-secondary text-small">boolean</td>
                <td>
                  Props that will attach to the DOM form you provide - <code>{"<form {...formProps} />"}</code>. This is
                  necessary for React Dumb Form to function as it uses the built-in browser form management mechanisms
                  an React events.
                </td>
              </tr>

              <tr style={{ background: "rgba(0,0,0,0.1)" }}>
                <td colSpan={4}>
                  <h6 className="my-2">Optional</h6>
                </td>
              </tr>

              {/* names */}
              <tr>
                <td className="font-monospace fw-bold">names</td>
                <td className="font-monospace text-secondary text-small">{"Record<keyof Schema, string>"}</td>
                <td>
                  <strong>Optional but recommended.</strong> Names object prevents errors during development. You can
                  pass <code>name</code> as a string to inputs optionally, but will lose out on compile-time errors.
                </td>
              </tr>

              {/* errorData */}
              <tr>
                <td className="font-monospace fw-bold">errorData</td>
                <td className="font-monospace text-secondary text-small">
                  {"{ count: number; errors: Partial<Record<keyof Schema, string>> }"}
                </td>
                <td>
                  Errors object that keeps tracks of errors and their count.
                  <br />
                  <br />
                  <strong>
                    Example: <code className="text-small">{'{ count: 1, errors: { password: "Error" } }'}</code>
                  </strong>
                </td>
              </tr>

              {/* isDirty */}
              <tr>
                <td className="font-monospace fw-bold">isDirty</td>
                <td className="font-monospace text-secondary text-small">boolean</td>
                <td>
                  Whether the form has been touched by the user. Be mindful, this only reacts to the first change and
                  will <strong>not</strong> reset afterwards. No deep comparisons happen internally.
                </td>
              </tr>

              <tr style={{ background: "rgba(0,0,0,0.1)" }}>
                <td colSpan={4}>
                  <h6 className="my-2">Methods</h6>
                </td>
              </tr>

              {/* submit */}
              <tr>
                <td className="font-monospace fw-bold">submit</td>
                <td className="font-monospace text-secondary text-small">{"() => void"}</td>
                <td>
                  Lets you programatically submit the form. Useful when using non-standard or controlled inputs.
                  <ul className="mt-2">
                    <li>
                      <Link href="/examples/basic/form-methods">Example</Link>
                    </li>
                  </ul>
                </td>
              </tr>

              {/* reset */}
              <tr>
                <td className="font-monospace fw-bold">reset</td>
                <td className="font-monospace text-secondary text-small">{"(values?: Schema) => void"}</td>
                <td>
                  Programatically reset the form. If no values are provided, <code>defaultValues</code> are used. If
                  values are provided, they need to cover the entire Schema. Triggers the <code>onChange</code> event
                  and validation.
                  <ul className="mt-2">
                    <li>
                      <Link href="/examples/basic/form-methods">Example</Link>
                    </li>
                  </ul>
                </td>
              </tr>

              {/* setValues */}
              <tr>
                <td className="font-monospace fw-bold">setValues</td>
                <td className="font-monospace text-secondary text-small">{"(values: Partial<Schema>) => void"}</td>
                <td>
                  Allows to set a subset of values programmatically (this gets merged with the current form state). It
                  will trigger an <code>onChange</code> event and validation.
                  <ul className="mt-2">
                    <li>
                      <Link href="/examples/basic/form-methods">Example</Link>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </main>
    </>
  );
}
