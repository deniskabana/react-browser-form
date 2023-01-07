import Head from "next/head";
import Link from "next/link";
import Separator from "ui/Separator";
import Tip from "ui/Tip";

export default function Page() {
  return (
    <>
      <Head>
        <title>Contribute - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Contribute</h1>
        <p>
          Everyone is welcome to contribute to React Dumb Form in any way. Creating a good environment for passionate
          developers is one of the philosophical values we hold onto.
        </p>

        <Separator />

        <div>
          <h4 className="mb-4">Reporting bugs and issues</h4>
          <p>
            <strong>
              Before reporting a bug, please verify that it doesn't already exits in our{" "}
              <a href="https://github.com/deniskabana/react-dumb-form/issues">GitHub issues</a> and{" "}
              <Link href="/frequently-asked-questions">FAQ page</Link>.
            </strong>{" "}
          </p>
          <p>
            If the issue you found doesn't seem to be acknowledged yet, feel free to create a new issue in our GitHub
            repo. Focus on describing the issue in as much detail as you can, with a specific use-case or a reason why
            you think the issue should be investigated and/or fixed.
          </p>
        </div>

        <Separator />

        <div>
          <h4 className="mb-4">Developing new features</h4>
          <Tip variant="info">
            Always check <a href="https://github.com/deniskabana/react-dumb-form/issues">GitHub issues</a> and{" "}
            <Link href="/frequently-asked-questions">FAQ page</Link> page before you begin development to verify your
            work will not be dismissed.
          </Tip>
          <p>
            There are currently no requirements and strict guidelines for developing. At this stage, minimal to none
            entry boundaries are important to us.
          </p>
          <p>
            When you finish developing a fix or a feature, try building it, testing and running it with the following
            set of commands:
          </p>
          <pre className="language-sh" tabIndex={-1}>
            <code className="language-sh">{`yarn test
yarn build
cd docs && yarn dev
# Now open http://localhost:3000 and verify examples in docs are working as intended`}</code>
          </pre>
          <p>
            Now what is left is for you to create a pull request in our GitHub repo. Ideally, it should be tied to an
            issue, but that is not required.
          </p>
        </div>

        <Separator />

        <div>
          <h4 className="mb-4">Other ways to contribute</h4>
          <p>Found any other way to contribute? Feel free to contact the authors through our GitHub accounts.</p>
        </div>
      </main>
    </>
  );
}
