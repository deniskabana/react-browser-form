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
          <strong>React Dumb Form is not ready for production use yet.</strong> We need to write unit tests, check code
          coverage, implement automatic CI tests and test adoption ourselves before cofidently recommending production
          adoption.
        </Tip>

        <div>
          <h1>Philosophy &amp; values</h1>
          <br />
          <p>
            The following describes the project's philosophy and key values. React Dumb Form has some limitations and is
            currently in an early stage of adoption, but we encourage you to try it on your own.
          </p>
          <ol className="motivation-and-values">
            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="mdi:clock-fast" width={36} className="me-2" />
                Fast. Written with performance in mind.
              </h5>
              <span className="text-muted">
                React Dumb Form takes performance seriously and aims to outperform other libraries by only ever doing
                what it needs to. Read more at <a href="#">How it works?</a>.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="mdi:user-heart-outline" width={36} className="me-2" />
                Developer-first experience. No learning curve. Junior-friendly.
              </h5>
              <span className="text-muted">
                Minimal, effective and easy to learn - anyone from a junior to a senior engineer can start using RDF
                with as little as a single line of code. See this <a href="#">Minimal form example</a> to see how easy
                it is to use.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="tabler:brand-typescript" width={36} className="me-2" />
                TypeScript at the core. Type safety on your side.
              </h5>
              <span className="text-muted">
                Written in TypeScript with a heavy emphasis on type safety. Fully documented. Utilize it to catch
                errors.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="mdi:package-variant" height={36} className="me-2" />
                Small bundle size and a single dependency - React.
              </h5>
              <span className="text-muted">
                Stricly uses a single dependency (React) and has a small bundle size. This is a core part of the project
                philosophy.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="ant-design:control-outlined" height={36} className="me-2" />
                Flexible, with full control. Handle any complexity.
              </h5>
              <span className="text-muted">
                Take control with live fields, different modes and error revalidation strategies. See{" "}
                <a href="#">Real world usage examples</a> to see what you can do.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="mdi:file-document-error-outline" height={36} className="me-2" />
                Validation support - the simplest validation you have seen.
              </h5>
              <span className="text-muted">
                Use required fields for simple checks. Write one-line validators for your fields. Write chainable,
                composable validators for complex logic. Explore <a href="#">Validation examples</a> to find out all the
                options.
              </span>
            </li>
          </ol>
        </div>

        <Separator />

        <div>
          <h1>Limitations & known issues</h1>
          <br />
          <p>
            As the adoption rate grows, more issues might be discovered. This section will reflect issues important for
            developers to be aware of when starting working with React Dumb Form.
          </p>
          <ol>
            <li className="mb-3">
              <strong>No support for input masking.</strong>
              <Badge bg="success" className="ms-1" pill>
                Unknown
              </Badge>
              <Badge bg="info" className="ms-1" pill>
                In the future
              </Badge>
              <p className="text-muted">
                Since as the philosophy stated the point of React Dumb Form is to incentivize the correct usage and
                utilization of browsers' own form handling APIs, RDF uses input values to get data. This unfortunately
                means, that by masking inputs you would overwrite the internal <code>formState</code> upon form data
                hydration.
                <br />
                This doesn't disqualify the option from future uses. RDF can use dataset to store element's mask and
                real value or can store it internally. Just as we do with required, validated or live fields, we can
                distinguish whether to set or ignore the actual input's value during the hydration phase.
              </p>
            </li>

            <li className="mb-3">
              <strong>No field array support yet.</strong>
              <Badge bg="danger" className="ms-1" pill>
                Critical
              </Badge>
              <Badge bg="secondary" className="ms-1" pill>
                Next minor release
              </Badge>
              <p className="text-muted">
                As shown in the example{" "}
                <Link href="/examples/real-world-usage/invoice-array-fields">Invoice array fields</Link>, there is no
                first-class support for using field arrays. While it is possible (and quite easy) to do with code, it
                goes against point 2 of philosophy.
              </p>
            </li>

            <li className="mb-3">
              <strong>Measure the amount of times each internal function ran.</strong>
              <Badge bg="danger" className="ms-1" pill>
                Critical
              </Badge>
              <p className="text-muted">
                To ensure the performance is as amazing as the standard of quality the project hopes to achieve it's
                necessary to make the least possible amount of function executions.
              </p>
            </li>

            <li className="mb-3">
              <strong>No 3rd party validator library support.</strong>
              <Badge bg="info" className="ms-1" pill>
                In the future
              </Badge>
              <p className="text-muted">
                The plan is to implement this in the future with first class support for Zod and Yup (others maybe
                later). Make preparations for the event handlers to use a resolver functions, that can be RDF's default
                or provided for external validators/parses.
              </p>
            </li>

            <li className="mb-3">
              <strong>No support for non-standard form data.</strong>
              <Badge bg="secondary" className="ms-1" pill>
                Next minor release
              </Badge>
              <p className="text-muted">
                Currently supports primitive types - <code>string</code>, <code>number</code> and <code>boolean</code>.
                This disqualifies fields like multiselect. There are future plans to add support for other types, like
                arrays. Check <a href="#">Roadmap</a> to get a better idea.
              </p>
            </li>

            <li className="mb-3">
              <strong>Weak i18n support.</strong>
              <Badge bg="info" className="ms-1" pill>
                In the future
              </Badge>
              <p className="text-muted">
                If you change strings inside validation schema for validation feedback, React Dumb Form will ignore
                those as options are considered immutable right now.
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
              Check out the <a href="#">Getting started</a> guide, which also contains <a href="#">Basic usage guide</a>{" "}
              or jump straight into the <a href="#">Examples</a> if you prefer learning by code.
            </p>
          </div>

          <div>
            <h5>Still hesitating?</h5>
            <p className="text-muted">
              That is understandable. Seeing the <a href="#">Performance examples</a> in action might change your mind
              quickly.
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
