import { Col, Container, Row } from "react-bootstrap";
import Breadcrumbs from "./Breadcrumbs";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }: any) {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <Container className="pb-5">
        <Row>
          <Col md="3">
            <Sidebar />
          </Col>
          <Col md="9">{children}</Col>
        </Row>
      </Container>
    </>
  );
}
