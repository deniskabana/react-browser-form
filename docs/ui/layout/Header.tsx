import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Nav, Navbar, Button, Card } from "react-bootstrap";
import Separator from "ui/Separator";

const IconGitHub = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-github me-2"
    viewBox="0 0 16 16"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export const introExampleCode = `const defaultValues = { name: "John" };
type Form = typeof defaultValues;

function Component() {
  const { formProps } = useBrowserForm<Form>({ name: "example", defaultValues });

  return <form {...formProps} />;
}`;

export default function Header() {
  const { pathname } = useRouter();

  return (
    <>
      {pathname === "/introduction" ? (
        <header className="text-white text-center">
          <div className="container">
            <div className="text-white-50 my-2">Welcome to the documentation for</div>
            <h1>🌐📝 React Browser Form</h1>
            <div className="fs-5 text-white-50 mt-4 mb-5">
              React form state management written in <strong className="text-secondary">TypeScript</strong> with{" "}
              <strong className="text-secondary">performance</strong> and{" "}
              <strong className="text-secondary">developer experience</strong> in mind.
              <br />
              <strong className="text-secondary">Flexible</strong> and with{" "}
              <strong className="text-secondary">built-in validation</strong>.
            </div>

            <Separator light />

            <small className="text-white-50 mt-5 mb-4 d-block">
              React Browser Form is a small React library designed as a hook intended to handle form usage in React
              while incentivizing the usage of{" "}
              <a href="https://developer.mozilla.org/en-US/docs/Learn/Forms" className="text-white">
                web forms
              </a>
              . It is designed to be flexible, performant, easy to learn and use and to handle even very complex forms
              while providing full type safety and an amazing developer experience.{" "}
              <Link href="/frequently-asked-questions" className="text-white">
                Read more in FAQ
              </Link>
              .
            </small>

            <Card className="my-5 mx-auto" style={{ maxWidth: "840px" }}>
              <pre className="line-numbers my-0 language-tsx" tabIndex={-1}>
                <code className="language-tsx">{introExampleCode}</code>
              </pre>
            </Card>

            <Button
              variant="light"
              className="rounded-pill"
              as="a"
              href="https://github.com/deniskabana/react-browser-form"
              size="lg"
            >
              <div className="d-flex align-items-center">
                <IconGitHub />
                <span className="small">GitHub</span>
              </div>
            </Button>
          </div>
        </header>
      ) : (
        <Navbar variant="dark" expand="lg" id="mainNav">
          <Container>
            <Navbar.Brand href="https://deniskabana.github.io/react-browser-form/" className="fw-bold">
              🌐📝 React Browser Form
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Button
                  variant="light"
                  className="rounded-pill"
                  as="a"
                  href="https://github.com/deniskabana/react-browser-form"
                >
                  <div className="d-flex align-items-center">
                    <IconGitHub />
                    <span className="small">GitHub</span>
                  </div>
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}
