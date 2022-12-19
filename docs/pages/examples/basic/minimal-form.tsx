import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Alert, Card, Col, Row, Spinner, Stack, Tab, Table, Tabs } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Separator from "ui/Separator";
import { ExampleMinimalForm } from "examples/basic/ExampleMinimalForm";

// TODO: Create basic components (decouple) from this example to use in other examples

function FormMeta({ name }: { name: string }) {
  const [debugData, setDebugData] = useState<any>({});

  // Since debug is turned on in docs, we want to listen to this
  let formDebugData: any = null;
  if (typeof window !== "undefined") {
    formDebugData = (window as any).__rdf_debug[name];
  }
  if (formDebugData) {
    const originalObject: any = (window as any).__rdf_debug[name];
    (window as any).__rdf_debug[name] = new Proxy(originalObject, {
      set: function(target, key, value) {
        target[key] = value;
        if (key === "timestamp") {
          setDebugData(target);
        }
        return true;
      },
    });
  }

  return (
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
                {debugData?.isSubmitted ? (
                  <div className="text-success d-flex align-items-center">
                    <Icon icon="material-symbols:check-circle-rounded" className="me-1" /> Yes
                  </div>
                ) : (
                  <div className="text-warning d-flex align-items-center">
                    <Icon icon="ri:close-circle-fill" className="me-1" /> No
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>Has errors?</td>
              <td>
                {debugData?.returnData?.errors?.count > 0 ? (
                  <div className="text-danger d-flex align-items-center">
                    <Icon icon="material-symbols:check-circle-rounded" className="me-1" /> Yes
                  </div>
                ) : (
                  <div className="text-success d-flex align-items-center">
                    <Icon icon="ri:close-circle-fill" className="me-1" /> No
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>Is dirty?</td>
              <td>
                {debugData?.returnData?.isDirty ? (
                  <div className="text-success d-flex align-items-center">
                    <Icon icon="material-symbols:check-circle-rounded" className="me-1" /> Yes
                  </div>
                ) : (
                  <div className="text-warning d-flex align-items-center">
                    <Icon icon="ri:close-circle-fill" className="me-1" /> No
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th colSpan={2} className="text-center" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                Form state
              </th>
            </tr>
            <tr>
              {debugData?.formState
                ? Object.keys(debugData.formState).map(field => (
                    <React.Fragment key={field}>
                      <td className="font-monospace">{field}</td>
                      <td className="font-monospace text-white-50" style={{ lineBreak: "anywhere" }}>
                        {typeof debugData.formState[field] === "string" ? '"' : ""}
                        {String(debugData.formState[field])}
                        {typeof debugData.formState[field] === "string" ? '"' : ""}
                      </td>
                    </React.Fragment>
                  ))
                : null}
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

function ExampleForm({ name, isCodeLoading, code }: any) {
  return (
    <Row className="mt-4">
      <Col md="8">
        <Tabs defaultActiveKey="form" transition={false} id="example-minimal-form-tabs">
          <Tab eventKey="form" title="Form" className="p-3 bg-white border border-top-0 shadow-sm">
            <ExampleMinimalForm />
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
        <FormMeta name="example-minimal-form" />
      </Col>
    </Row>
  );
}

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
    }
    getCode();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "Prism" in window) {
      (window as any).Prism?.highlightAll();
    }
  }, [code]);

  return (
    <>
      <Head>
        <title>Minimal form example - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Minimal form example</h1>
        <p className="text-muted">
          This is the most basic usage example you can use. If you need a plain form, just copy and paste the code.
        </p>

        <Separator />

        <ExampleForm isCodeLoading={isCodeLoading} code={code} />

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
      </main>
    </>
  );
}
