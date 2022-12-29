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
        <title>Introduction - React Dumb Form Docs</title>
      </Head>

      <main>
        <Tip variant="danger">
          <strong>React Dumb Form is not officially ready for production use yet.</strong> Some breaking changes might
          still come before a public release statement.
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
                React Dumb Form takes performance very seriously and aims to outperform other libraries by only ever
                doing what it needs to. No data transformation, validation or collecting unless required. Read more at{" "}
                <Link href="/getting-started/how-it-works">How it works?</Link>.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="mdi:user-heart-outline" width={36} className="me-2" />
                Developer-first experience. No learning curve. Junior-friendly.
              </h5>
              <span className="text-muted">
                Minimal, effective and easy to learn - anyone regardless of skill level can start using React Dumb Form
                now. Visit <Link href="/examples/basic/minimal-form">Minimal form example</Link> to see what we mean by
                minimal. A big part of our developer experience philosophy is maintaining very verbose documentation.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="tabler:brand-typescript" width={36} className="me-2" />
                TypeScript at the core. Type safety and informationon your side.
              </h5>
              <span className="text-muted">
                Written entirely in TypeScript with heavy emphasis on type safety. Fully documented. With examples,
                inline documentation and types to help you prevent errors.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="mdi:package-variant" height={36} className="me-2" />
                Small bundle size and a single dependency - React.
              </h5>
              <span className="text-muted">
                React Dumb Form stricly uses a single dependency (React) and has a small bundle size. This is a core
                part of the project philosophy - let the browser handle the interactions for you.
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
                Validation and transformation support - the simplest you have seen in React forms.
              </h5>
              <span className="text-muted">
                React Dumb Form transform data types automatically, but you can also transform values or not transform
                anything at all. Or validate - use required fields, write one-line validators, write chainable and
                composable validators for complex logic. See{" "}
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
            React Dumb Form. As adoption rate grows, we will keep this list up-to-date.
          </p>
          <ol>
            <li className="mb-3">
              <strong>Measure the amount of times each internal function ran.</strong>
              <Badge bg="danger" className="ms-1" pill>
                Critical
              </Badge>
              <p className="text-muted">
                Verify that the performance is top-notch and we still only rely on browsers to do what they need to do.
                Optimize if necessary before public release.
              </p>
            </li>

            <li className="mb-3">
              <strong>Reassess ALL examples.</strong>
              <Badge bg="danger" className="ms-1" pill>
                Critical
              </Badge>
              <p className="text-muted">
                While writing the examples, a lot has changed since the first to last one. We need to go through all the
                examples, clean them, remove redundant pieces and ideally split some forms into multiple examples, like
                I have done with <Link href="/examples/basic/form-methods">Form methods exmaple</Link> for better
                clarity.
              </p>
            </li>

            <li className="mb-3">
              <strong>No field array API.</strong>
              <Badge bg="secondary" className="ms-1" pill>
                Next minor release
              </Badge>
              <p className="text-muted">
                As shown in the example{" "}
                <Link href="/examples/real-world-usage/invoice-array-fields">Invoice array fields</Link>, there is no
                first-class support for using field arrays. While it is possible (and quite easy) to do without a
                supported API, it goes against point 2 of philosophy.
              </p>
            </li>

            <li className="mb-3">
              <strong>No input masking support</strong>
              <Badge bg="success" className="ms-1" pill>
                In the future
              </Badge>
              <p className="text-muted">
                We can implement an input mask that will be used by the library internally that will handle implicit
                data mutation. Though this needs to be thought through EXTENSIVELY for it to remain performant, flexible
                and transparent to fit the project philosophy.
              </p>
            </li>

            <li className="mb-3">
              <strong>Weak i18n support</strong>
              <Badge bg="success" className="ms-1" pill>
                In the future
              </Badge>
              <p className="text-muted">
                If you change strings inside validation schema for validation feedback, React Dumb Form will ignore
                those as options are considered immutable right now.{" "}
                <strong>For the time being, you can re-render the whole component to re-initialize.</strong>
              </p>
            </li>

            <li className="mb-3">
              <strong>No 3rd party validator library support.</strong>
              <Badge bg="success" className="ms-1" pill>
                In the future
              </Badge>
              <p className="text-muted">
                There is already a support added for transformation and validation, but no current first-class API for
                3rd party libraries, like <code>Zod</code>, <code>Yup</code> or <code>Joi</code>.
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
              Raise an issue in the <a href="https://github.com/deniskabana/react-dumb-form">GitHub repository</a> to
              spark a discussion or open a pull request to suggest changes.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
