import { Icon } from "@iconify/react";
import Head from "next/head";
import { Badge, Card } from "react-bootstrap";
import Separator from "ui/Separator";
import Tip from "ui/Tip";

export default function Home() {
  return (
    <>
      <Head>
        <title>Introduction - React Dumb Form Docs</title>
      </Head>

      <main>
        <div>
          <h1>📝 React Dumb Form</h1>
          <p className="text-muted">The simplest React forms handler - TypeScript and DX first.</p>

          <Tip variant="danger">
            <strong>React Dumb Form is not ready for production use yet.</strong> We need to write unit tests, check
            code coverage, implement automatic CI tests and test adoption ourselves before cofidently recommending
            production adoption.
          </Tip>
        </div>

        <Separator />

        <div>
          <p>
            React Dumb Form is a small<strong>*</strong> library intended to handle form usage in React. It is designed
            to be framework agnostic, performant, easy to learn and to handle even very complex forms easily while
            providing full type safety and an amazing developer experience.
          </p>
          <Card className="my-3">
            <pre className="line-numbers my-0 language-tsx" tabIndex={-1}>
              <code className="language-tsx">{`const defaultValues = {};
type Form = typeof defaultValues;

export function Example() {
  const [data, setData] = React.useState(defaultValues);

  const { formProps } = useDumbForm<Form>({
    name: "example-intro-form",
    onSubmit: setData,
    defaultValues,
  });

  return <form {...formProps} />;
}`}</code>
            </pre>
          </Card>

          <small className="text-muted">
            <strong>*</strong>: Small means a package size of <span className="text-danger fw-bold">TO-DO</span> and the
            whole source code sitting in under 1,000 lines of code.
          </small>
        </div>

        <Separator />

        <div>
          <h2>Motivation &amp; values</h2>
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
                Developer-first experience. No learning curve.
              </h5>
              <span className="text-muted">
                Minimal, effective and easy to learn - anyone from a junior to a senior engineer can start using RDF
                with just 7 lines of code. See this <a href="#">Minimal form example</a> to see how easy it is to use.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="tabler:brand-typescript" width={36} className="me-2" />
                TypeScript at the core.
              </h5>
              <span className="text-muted">
                Written completely in TypeScript with a heavy emphasis on type safety. Fully documented.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="mdi:package-variant" height={36} className="me-2" />
                Small bundle size &amp; one dependency - React.
              </h5>
              <span className="text-muted">
                Minimal dependency code, small bundle size. This is core part of the project philosophy.
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
                Simple and complex validation support.
              </h5>
              <span className="text-muted">
                Use required fields for simple checks. Write one-line validators for your fields. Write chainable,
                composable validators for complex logic. Explore <a href="#">Validation examples</a> to find out all the
                options.
              </span>
            </li>

            <li className="mb-4">
              <h5 className="text-secondary d-flex align-items-center">
                <Icon icon="uil:book-open" height={36} className="me-2" />
                Developer-friendly documentation.
              </h5>
              <span className="text-muted">
                Covering all of the APIs, options and providing dozens of examples will get you and your team started
                right away. As a cherry on top, you can rely on JSDoc hints while writing code - providing links to the
                docs as well.
              </span>
            </li>
          </ol>
        </div>

        <Separator />

        <div>
          <h2>Limitations & known issues</h2>
          <br />
          <p>
            As the adoption rate grows, more issues might be discovered. This section will reflect issues important for
            developers to understand.
          </p>
          <ol>
            <li>
              <strong>No 3rd party validator library support.</strong>
              <Badge bg="secondary" className="ms-1" pill>
                Upcoming
              </Badge>
              <br />
              The plan is to implement this in the future.
            </li>
            <li>
              <strong>No support for non-standard form data.</strong>
              <Badge bg="secondary" className="ms-1" pill>
                Upcoming
              </Badge>
              <br />
              Currently supports primitive types - <code>string</code>, <code>number</code> and <code>boolean</code>.
              This disqualifies fields like multiselect. There are future plans to add support for other types, like
              arrays. Check <a href="#">Roadmap</a> to get a better idea.
            </li>
          </ol>
        </div>

        <Separator />

        <div>
          <h2>Next steps</h2>
          <br />
          <p>
            <strong>Convinced yet?</strong> Check out <a href="#">Getting started</a>, which also contains{" "}
            <a href="#">Basic usage guide</a> or jump straight into our <a href="#">Examples</a> if you prefer learning
            by trying.
          </p>
          <p>
            <strong>Still not convinced?</strong> That is understandable. Seeing our{" "}
            <a href="#">Performance examples</a> in action might change your mind quickly.
          </p>
          <p>
            <strong>Have any suggestions?</strong> Raise an issue in our{" "}
            <a href="https://github.com/deniskabana/react-dumb-form">GitHub repository</a> to spark a discussion or open
            a Pull Request to suggest changes.
          </p>
        </div>
      </main>
    </>
  );
}
