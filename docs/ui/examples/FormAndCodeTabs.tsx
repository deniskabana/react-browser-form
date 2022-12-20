import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Overlay, Row, Tab, Tabs, Tooltip } from "react-bootstrap";
import { FormMeta } from "./FormMeta";

interface FormAndCodeTabsProps {
  sourceCode: string;
  name: string;
  children: React.ReactNode;
  /** This is for a few specific examples only. Do not use it unless you need to. */
  ignoreMeta?: boolean;
}

export function FormAndCodeTabs({ sourceCode, children, name, ignoreMeta }: FormAndCodeTabsProps) {
  const [showCopied, setShowCopied] = useState(false);
  const tooltipTarget = useRef(null);

  // Syntax highlighting on source code input/change
  useEffect(() => {
    if (typeof window !== "undefined" && "Prism" in window) {
      (window as any).Prism?.highlightAll();
    }
  }, [sourceCode]);

  // Copy source code to clipboard
  const handleCopyBtnClick = () => {
    setShowCopied(true);
    navigator.clipboard.writeText(sourceCode);
  };

  // Show tooltip with copy confirmation for a short time
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showCopied === true) {
      const SHOW_DELAY = 1500;
      timeout = setTimeout(() => {
        setShowCopied(false);
      }, SHOW_DELAY);
    }

    return function cleanup() {
      clearTimeout(timeout);
    };
  }, [showCopied]);

  return (
    <Row className="mt-4 form-code-and-tabs">
      <Col sm="12" md={ignoreMeta ? "12" : "7"}>
        <Tabs defaultActiveKey="form" transition={false} id="example-minimal-form-tabs">
          <Tab eventKey="form" title="Form" className="p-4 bg-white border border-top-0 shadow-sm">
            {children}
          </Tab>

          <Tab eventKey="code" title="Code" className="bg-white border border-top-0 shadow-sm position-relative">
            <div style={{ position: "absolute", bottom: "0.6rem", right: "0.6rem", zIndex: "1" }} ref={tooltipTarget}>
              <Button variant="dark" size="sm" className="shadow-sm" onClick={handleCopyBtnClick}>
                <Icon icon="material-symbols:copy-all" className="me-2" />
                Copy code
              </Button>
              <Overlay target={tooltipTarget.current} show={showCopied} placement="left">
                {props => (
                  <Tooltip {...props} style={{ ...props.style, opacity: 0.75, fontWeight: 300, fontSize: "0.7rem" }}>
                    Copied to clipboard!
                  </Tooltip>
                )}
              </Overlay>
            </div>

            <div style={{ maxHeight: "38rem", overflow: "scroll" }}>
              <pre className="m-0 line-numbers language-tsx" tabIndex={-1}>
                <code className="language-tsx">{sourceCode}</code>
              </pre>
            </div>
          </Tab>
        </Tabs>
      </Col>

      {!ignoreMeta && (
        <Col sm="12" md="5">
          <FormMeta name={name} />
        </Col>
      )}
    </Row>
  );
}
