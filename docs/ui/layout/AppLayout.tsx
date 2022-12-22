import { Col, Container, Row } from "react-bootstrap";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }: any) {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <Container style={{ paddingBottom: "4rem" }}>
        <Row>
          <Col md="3">
            <Sidebar />
          </Col>
          <Col md="9">{children}</Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
