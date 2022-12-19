import { useEffect, useState } from "react";
import { Col, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import { FormMeta } from "./FormMeta";

interface FormAndCodeTabsProps {
  codeUrl: string;
  name: string;
  children: React.ReactNode;
}

export function FormAndCodeTabs({ codeUrl, children, name }: FormAndCodeTabsProps) {
  const [isCodeLoading, setIsCodeLoading] = useState(true);
  const [code, setCode] = useState("");

  useEffect(() => {
    async function getCode() {
      const response = await fetch(codeUrl);
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
    <Row className="mt-4">
      <Col md="8">
        <Tabs defaultActiveKey="form" transition={false} id="example-minimal-form-tabs">
          <Tab eventKey="form" title="Form" className="p-3 bg-white border border-top-0 shadow-sm">
            {children}
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
        <FormMeta name={name} />
      </Col>
    </Row>
  );
}
