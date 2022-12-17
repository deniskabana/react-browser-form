// import { ExampleMinimalForm } from "examples/basic/ExampleMinimalForm";
import { Icon } from "@iconify/react";
import Head from "next/head";
import Link from "next/link";
import { Alert, Button, Card, Col, Form, InputGroup, Nav, Row, Stack, Table } from "react-bootstrap";
import Separator from "ui/Separator";

// TODO: Create basic components (decouple) from this example to use in other examples

export default function Home() {
  return (
    <>
      <Head>
        <title>Minimal form example - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1 className="fw-bold">Minimal form example</h1>
        <p className="text-muted">This is the most basic usage example you can use.</p>

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

        <Row className="mt-5">
          <Col md="8">
            <Card className="shadow-sm">
              <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#first" style={{ fontSize: "0.8rem" }}>
                  <Nav.Item>
                    <Nav.Link href="#first">Form</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#link">Source code</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body className="p3">
                <InputGroup>
                  <Form.Control placeholder="E-mail address" />
                  <Button type="submit">Subscribe</Button>
                </InputGroup>
                {/* <ExampleMinimalForm /> */}
              </Card.Body>
            </Card>
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
