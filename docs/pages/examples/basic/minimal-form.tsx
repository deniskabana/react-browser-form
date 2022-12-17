import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Nav,
  Row,
  Spinner,
  Stack,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import Separator from "ui/Separator";
// import { ExampleMinimalForm } from "examples/basic/ExampleMinimalForm";

// TODO: Create basic components (decouple) from this example to use in other examples

export default function Home() {
  const [isCodeLoading, setIsCodeLoading] = useState(true);
  const [code, setCode] = useState("");
  const CODE_URL =
    "https://raw.githubusercontent.com/deniskabana/react-dumb-form/main/docs/examples/basic/ExampleMinimalForm.tsx";

  useEffect(() => {
    async function getCode() {
      const response = await fetch(CODE_URL);
      const data = await response.text();
      setCode(data);
      setIsCodeLoading(false);

      if (typeof window !== "undefined" && "Prism" in window) {
        (window as any).Prism.highlightAll();
      } else {
        debugger;
      }
    }
    getCode();
  }, []);

  return (
    <>
      <Head>
        <title>Minimal form example - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1 className="fw-bold">Minimal form example</h1>
        <p className="text-muted">
          This is the most basic usage example you can use. If you need a plain form, just copy and paste the code.
        </p>

        <Separator />

        <p className="text-muted">
          <strong>
            Object <code>names</code> is not mandatory
          </strong>
          , however it helps prevent errors so it's always included in the examples. More info about <code>names</code>{" "}
          and other return types can be found in the <Link href="/documentation">Documentation section</Link>.
        </p>

        <Alert variant="info" className="shadow-sm my-2 p-2" style={{ fontSize: "0.75rem" }}>
          <Stack direction="horizontal">
            <Icon icon="tabler:bulb" height={30} className="me-2" />
            <p className="mb-0">
              <strong>
                This example is only meant to show you how easy it is to start using React Dumb Form today.
              </strong>
              <br />
              To see what React Dumb Form can do, consider viewing{" "}
              <Link href="/examples/real-world-usage">Real-world usage examples</Link>.
            </p>
          </Stack>
        </Alert>

        <Row className="mt-4">
          <Col md="8">
            <Tabs defaultActiveKey="form" id="form-example-1">
              <Tab eventKey="form" title="Form" className="p-3 bg-white border border-top-0 shadow-sm">
                <InputGroup>
                  <Form.Control placeholder="E-mail address" />
                  <Button type="submit">Subscribe</Button>
                </InputGroup>
              </Tab>
              <Tab eventKey="code" title="Code" className="bg-white border border-top-0 shadow-sm">
                {isCodeLoading ? (
                  <div className="text-center">
                    <Spinner animation="border" className="mx-auto my-3" />
                  </div>
                ) : (
                  <pre className="m-0 line-numbers">
                    <code className="language-tsx">{code}</code>
                  </pre>
                )}
              </Tab>
            </Tabs>
          </Col>

          <Col md="4">
            <Card bg="dark" text="white" className="shadow-sm">
              <Card.Body className="p-0">
                <Table variant="dark" style={{ fontSize: "0.8rem" }} className="mb-0">
                  <tbody>
                    <tr>
                      <th colSpan={2} className="text-center" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                        Form meta
                      </th>
                    </tr>
                    <tr>
                      <td>Submitted?</td>
                      <td>
                        <div className="text-warning d-flex align-items-center">
                          <Icon icon="ri:close-circle-fill" className="me-1" /> No
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Has errors?</td>
                      <td>
                        <div className="text-muted">&mdash;</div>
                      </td>
                    </tr>
                    <tr>
                      <td>Is dirty?</td>
                      <td>
                        <div className="text-muted">&mdash;</div>
                      </td>
                    </tr>
                    <tr>
                      <th colSpan={2} className="text-center" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                        Form state
                      </th>
                    </tr>
                    <tr>
                      <td className="font-monospace">email</td>
                      <td className="font-monospace text-white-50">"asdf@asdf.com"</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </main>
    </>
  );
}
