import Head from "next/head";
import Link from "next/link";
import Separator from "ui/Separator";

export default function Page() {
  return (
    <>
      <Head>
        <title>FAQ - React Browser Form Docs</title>
      </Head>

      <main>
        <h1>Frequently asked questions</h1>
        <p>
          This page is meant to be updated continually based on discussions, GitHub issues, denied PRs and any other
          communication with developers.
        </p>

        <Separator />

        <div>
          <ol>
            <li className="mb-5">
              <h5>How can I access the current form state directly?</h5>
              <p className="text-muted">
                <strong>You can not - by design.</strong> When React Browser Form was designed, we tried to make it as
                hard and impractical as possible to violate performance recommendations - thus building a habit for
                developers to only ever access the form state when it is required. You can use a form with{" "}
                <code>mode: "onChange"</code> or <code>liveFields</code> and store the data in a local state with an{" "}
                <code>onChange</code> handler if you need access to the data outside standard event flow.{" "}
              </p>
              <p className="text-muted">
                <strong>
                  Live fields is always the preferred way of handling form state updates - avoid using{" "}
                  <code>mode: "onChange"</code> if you can due to performance concerns.
                </strong>{" "}
                See <Link href="/examples/advanced/live-fields">live fields usage example</Link> to understand how to
                access form state.
              </p>
            </li>

            <li className="mb-5">
              <h5>Why and when should I use the built-in validation?</h5>
              <p className="text-muted">
                This is a subjective matter. The built-in transformations and validations are designed to be simple,
                pure and efficient and perform a minimum amount of operations they need (like validating fields
                individually). The aim for these options is to allow developers to use React Browser Form to it's full
                extent without relying on a 3rd party while giving a simple, declarative API for basic validation.
              </p>
              <p className="text-muted">
                Keep in mind, that you can also share your validation schemas with other projects or your backend and
                use it in the same way. See{" "}
                <Link href="/documentation/validation-and-transformation">Validation and transformation</Link> for more
                information on this matter.
              </p>
            </li>

            <li className="mb-5">
              <h5>Can React Browser Form be used in React native?</h5>
              <p className="text-muted">
                Unfortunately not. The whole point of this library is to utilize what web browsers already have
                implemented and it's performance is tied to <code>document.forms</code>. This is a design decision that
                is not a subject to change anytime soon.
              </p>
            </li>
          </ol>
        </div>
      </main>
    </>
  );
}
