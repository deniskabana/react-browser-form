import { useEffect } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { FormMeta } from "./FormMeta";

interface FormAndCodeTabsProps {
  sourceCode: string;
  name: string;
  children: React.ReactNode;
}

export function FormAndCodeTabs({ sourceCode, children, name }: FormAndCodeTabsProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && "Prism" in window) {
      (window as any).Prism?.highlightAll();
    }
  }, [sourceCode]);

  return (
    <Row className="mt-4 form-code-and-tabs">
      <Col md="8">
        <Tabs defaultActiveKey="form" transition={false} id="example-minimal-form-tabs">
          <Tab eventKey="form" title="Form" className="p-4 bg-white border border-top-0 shadow-sm">
            {children}
          </Tab>
          <Tab eventKey="code" title="Code" className="bg-white border border-top-0 shadow-sm">
            <pre className="m-0 line-numbers language-tsx" tabIndex={-1}>
              <code className="language-tsx">{sourceCode}</code>
            </pre>
          </Tab>
        </Tabs>
      </Col>

      <Col md="4">
        <FormMeta name={name} />
      </Col>
    </Row>
  );
}
