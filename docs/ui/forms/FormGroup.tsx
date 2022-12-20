import { Col, Row, Stack } from "react-bootstrap";

interface FormGroupProps {
  layout?: number[];
  children?: React.ReactNode;
  className?: string;
}

export function FormGroup({ layout, children, className }: FormGroupProps) {
  if (Array.isArray(children)) {
    return (
      <Row>
        {children.map((child, index) => (
          <Col md={layout ? layout[index] : undefined} key={index}>
            {child}
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Stack direction="horizontal" gap={4} className={`align-items-baseline ${className}`}>
      {children}
    </Stack>
  );
}
