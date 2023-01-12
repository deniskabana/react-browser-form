import { Icon } from "@iconify/react";
import Head from "next/head";
import Link from "next/link";
import { Badge } from "react-bootstrap";
import Separator from "ui/Separator";
import Tip from "ui/Tip";

export default function Page() {
  return (
    <>
      <Head>
        <title>Introduction - React Browser Form Docs</title>
      </Head>

      <main>
        <Tip variant="danger">
          <strong>React Browser Form is not officially ready for production use yet.</strong> Some breaking changes
          might still come before a public release statement.
        </Tip>

        <Separator />

        <div>
          <h1 className="mb-4">Philosophy &amp; values</h1>
          <ol className="motivation-and-values">
            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="mdi:clock-fast" width={36} className="me-2" />
                Super fast. Written with performance in mind.
              </h5>
              <span className="text-muted">
                React Browser Form takes performance very seriously and aims to outperform other libraries by only ever
                doing what it needs to. No data transformation, validation or collecting unless required. Read more at
                How it works section in <Link href="/documentation">Documentation</Link>.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="mdi:user-heart-outline" width={36} className="me-2" />
                Developer-first experience. Minimal and junior-friendly.
              </h5>
              <span className="text-muted">
                Minimal, effective and easy to learn - anyone regardless of their skill level can start using React
                Browser Form now. Visit <Link href="/examples/basic/minimal-form">Minimal form example</Link> to see
                what we mean by minimal. A big part of our developer experience philosophy is maintaining a very verbose
                documentation.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="tabler:brand-typescript" width={36} className="me-2" />
                TypeScript-first. Type safety, hints and checks.
              </h5>
              <span className="text-muted">
                Written entirely in TypeScript with a heavy emphasis on type safety. Fully documented. With examples,
                inline documentation and types to help you prevent errors and improve developer experience.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="mdi:package-variant" height={36} className="me-2" />
                Small bundle size and a no dependencies.
              </h5>
              <span className="text-muted">
                React Browser Form stricly uses React hooks and has a very small bundle size. This is a core part of the
                project philosophy - let the browser handle what it can for us - developers.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="ant-design:control-outlined" height={36} className="me-2" />
                Flexible, with full control. Handle any complexity.
              </h5>
              <span className="text-muted">
                Take control with live fields, different modes and error revalidation strategies. See{" "}
                <Link href="/examples/real-world-usage">Real world usage examples</Link> to see what you can do. Even
                our current limitations can be overcome with a simple workaround.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="mdi:file-document-error-outline" height={36} className="me-2" />
                Validation and transformation - simple, minimal, powerful.
              </h5>
              <span className="text-muted">
                React Browser Form transform data types automatically, but you can also transform values or not
                transform anything at all. Or validate - use required fields, write one-line validators, write chainable
                and composable validators for complex logic. See{" "}
                <Link href="/documentation/validation-and-transformation">Validation and transformation</Link> for more
                info.
              </span>
            </li>
          </ol>
        </div>

        <Separator />

        <div>
          <h1 className="mb-4">Limitations & known issues</h1>
          <p>
            This is a list of all the current limitations and known issues you need to be aware of when working with
            React Browser Form. As adoption rate grows, we will keep this list up-to-date.
          </p>
          <ol>
            <li className="mb-3">
              <strong>Publish docs and update inline docs and add links to the docs.</strong>
              <Badge bg="danger" className="ms-1" pill>
                Critical
              </Badge>
              <p className="text-muted">
                Once the documentation is public, provide new JSDoc comments (update them to reflect the docs) and
                include links to docs and examples.
              </p>
              <p className="text-muted">
                Also make sure the documentation is on-par with React Hook Form with some performance measurements.
              </p>
            </li>

            <li className="mb-3">
              <strong>Publish the library on npm</strong>
              <Badge bg="danger" className="ms-1" pill>
                Critical
              </Badge>
              <p className="text-muted">
                As soon as README.md is finished, publish the library even though it's not stable or production-ready.
              </p>
            </li>

            <li className="mb-3">
              <strong>Measure the amount of times each internal function ran.</strong>
              <Badge bg="danger" className="ms-1" pill>
                Critical
              </Badge>
              <p className="text-muted">
                Verify that the performance is top-notch and we still only rely on browsers to do what they need to do.
                Optimize if necessary before public release. Also document this and provide all that in "How it works"
                separate docs page with screenshots and examples.
              </p>
            </li>

            <li className="mb-3">
              <strong>Only works within browsers</strong>
              <Badge bg="info" className="ms-1" pill>
                Will not change
              </Badge>
              <p className="text-muted">
                React Browser Form is <strong>optimized for SSR</strong>, however it will only work in browser
                environemnt. It utilizes and incentivizes the use of{" "}
                <a href="https://developer.mozilla.org/en-US/docs/Learn/Forms">Web Forms</a>, which is a web browser
                standard. It doesn't work with inputs, but with DOM form reference by name.
              </p>
            </li>

            <li className="mb-3">
              <strong>No field array API</strong>
              <Badge bg="secondary" className="ms-1" pill>
                Next minor release
              </Badge>
              <p className="text-muted">
                As shown in the example{" "}
                <Link href="/examples/real-world-usage/invoice-array-fields">Invoice array fields</Link>, there is no
                first-class support for using field arrays <strong>yet</strong>. While it is possible (and quite easy)
                to do without a supported API, it goes against point 2 of the philosophy.
              </p>
            </li>

            <li className="mb-3">
              <strong>Weak i18n support</strong>
              <Badge bg="success" className="ms-1" pill>
                In the future
              </Badge>
              <p className="text-muted">
                If you change strings inside validation schema for validation feedback, React Browser Form will ignore
                those as options are considered immutable right now.{" "}
                <strong>For the time being, you can re-render the whole component to re-initialize.</strong>
              </p>
            </li>

            <li className="mb-3">
              <strong>No 3rd party validator library support yet.</strong>
              <Badge bg="success" className="ms-1" pill>
                In the future
              </Badge>
              <p className="text-muted">
                There is already a support added for transformation and validation, but no current first-class API for
                3rd party libraries, like <code>Zod</code>, <code>Yup</code> or <code>Joi</code>. Implementing these
                might set up a need to overwrite the current behavior and possibly modify the data flow so it still
                makes sense.
              </p>
            </li>
          </ol>
        </div>

        <Separator />

        <div>
          <h1>Next steps</h1>
          <br />
          <div>
            <h5>Convinced already?</h5>
            <p className="text-muted">
              Check out the <Link href="/getting-started">Getting started</Link> guide, which also contains the{" "}
              <Link href="/getting-started/usage-guide">Usage guide</Link> or jump straight into the{" "}
              <Link href="/examples">Examples</Link> if you prefer learning by code.
            </p>
          </div>

          <div>
            <h5>Still hesitating?</h5>
            <p className="text-muted">
              That is understandable. Seeing the <Link href="/examples/performance-showcase">Performance examples</Link>{" "}
              in action might change your mind quickly.
            </p>
          </div>

          <div>
            <h5>Have suggestions?</h5>
            <p className="text-muted">
              Raise an issue in the <a href="https://github.com/deniskabana/react-browser-form">GitHub repository</a> to
              spark a discussion or open a pull request to suggest changes.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
