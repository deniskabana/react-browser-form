import { Icon } from "@iconify/react";
import Head from "next/head";
import Link from "next/link";
import { Badge, Card } from "react-bootstrap";
import Separator from "ui/Separator";
import Tip from "ui/Tip";
import fs from "fs/promises";
import path from "path";

const introExampleCode = `type Form = { name: string };

export function DumbForm() {
  const { formProps } = useDumbForm<Form>({ name: "example-dumb-form", onSubmit: console.log });

  return <form {...formProps} />;
}`;

type PageProps = {
  pkgsize: string;
  pkgloc: string;
  pkgfilecount: string;
};

export default function Page({ pkgsize, pkgloc, pkgfilecount }: PageProps) {
  return (
    <>
      <Head>
        <title>Introduction - React Dumb Form Docs</title>
      </Head>

      <main>
        <div>
          <h1>📝 React Dumb Form</h1>
          <p className="text-muted">
            The simplest React forms handler - with primary focus on TypeScript, performance and developer experience.
          </p>

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
          <Card className="my-3 shadow-sm">
            <pre className="line-numbers my-0 language-tsx" tabIndex={-1}>
              <code className="language-tsx">{introExampleCode}</code>
            </pre>
          </Card>

          <small className="text-muted">
            <strong>*</strong>: Small means a package size of{" "}
            <strong>{pkgsize ? (Number(pkgsize) / 1000).toFixed(2) : "-"} kB</strong> with{" "}
            <strong>{pkgloc ? Number(pkgloc).toLocaleString() : "-"}</strong> lines of code (empty lines included)
            across <strong>{pkgfilecount}</strong> files.
          </small>
        </div>

        <Separator />

        <div>
          <h2>Philosophy &amp; values</h2>
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
          <h2>Limitations & known issues</h2>
          <br />
          <p>
            As the adoption rate grows, more issues might be discovered. This section will reflect issues important for
            developers to be aware of when starting working with React Dumb Form.
          </p>
          <ol>
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
              <strong>Default values need to be relied upon less. Reliable type converison.</strong>
              <Badge bg="danger" className="ms-1" pill>
                Critical
              </Badge>
              <p className="text-muted text-decoration-line-through">
                With the current approach, <code>defaultValues</code> is treated as mandatory, with all fields required
                and is used internally to infer form field types, traverse objects, etc.
                <br />A much better suited approach was be to use <code>formState</code> for iteration, no type
                transformation on single values (closer to native browser behavior) and making defaultValues optional
                and partial. Take inspiration from <code>react-hook-form</code>.
              </p>
              <p className="text-muted">
                Implementing a type conversion mechanism based on <code>input.type</code> and a custom{" "}
                <code>transform</code> object in options with support for input masking (treating the input like a
                controlled input) would be a great way to solve this.
                <br />
                Afterwards, mark <code>defaultValues</code> as optional.
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

// Package meta data
export async function getServerSideProps() {
  const pkgsize = await fs.readFile("../dist/meta_pkgsize", "utf8");
  const pkgloc = await fs.readFile("../dist/meta_pkgloc", "utf8");
  const pkgfilecount = await fs.readFile("../dist/meta_pkgfilecount", "utf8");
  return { props: { pkgsize, pkgloc, pkgfilecount } as PageProps };
}
