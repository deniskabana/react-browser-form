import { Col, Row, Stack } from "react-bootstrap";

interface FormGroupProps {
  children?: React.ReactNode;
}

export function FormGroup({ children }: FormGroupProps) {
  if (Array.isArray(children)) {
    return (
      <Row>
        {children.map((child, index) => (
          <Col key={index}>{child}</Col>
        ))}
      </Row>
    );
  }

  return (
    <Stack direction="horizontal" gap={4} className="align-items-baseline">
      {children}
    </Stack>
  );
}
