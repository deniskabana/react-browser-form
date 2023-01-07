import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Breadcrumb, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Icon } from "@iconify/react";

// Inspiration:
// https://dev.to/dan_starner/building-dynamic-breadcrumbs-in-nextjs-17oa

export const prettifyLink = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`.replaceAll("-", " ").replaceAll(/api/g, "API");

export default function Breadcrumbs() {
  const router = useRouter();
  const breadcrumbs = useMemo(
    function generateBreadcrumbs() {
      const asPathWithoutQuery = router.asPath.split("?")[0];
      const asPathNestedRoutes = asPathWithoutQuery
        .replace(/#.*$/, "")
        .split("/")
        .filter(v => v.length > 0);

      const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
        return { href, text: prettifyLink(subpath) };
      });

      return [{ href: "/", text: "Home" }, ...crumblist];
    },
    [router.asPath],
  );

  return (
    <Container className="my-4 py-2">
      <Row>
        {/* <Col md="3" className="d-flex align-items-center">
          <InputGroup className="shadow-sm">
            <Form.Control placeholder="Quick search" />
            <InputGroup.Text className="bg-light">
              <Icon icon="mingcute:search-2-fill" />
            </InputGroup.Text>
          </InputGroup>
        </Col> */}
        {/* <Col md="9" className="d-flex align-items-center"> */}
        <Col className="d-flex align-items-center">
          <Breadcrumb>
            {breadcrumbs.map((crumb, idx) => (
              <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
            ))}
          </Breadcrumb>
        </Col>
      </Row>
    </Container>
  );
}

function Crumb({ text, href, last = false }: { text: string; href: string; last: boolean }) {
  if (last)
    return (
      <Breadcrumb.Item active linkAs="span">
        <strong>{text}</strong>
      </Breadcrumb.Item>
    );

  return (
    <>
      <Breadcrumb.Item linkAs="span">
        <Link href={href}>{text}</Link>
      </Breadcrumb.Item>
    </>
  );
}
