import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";

// Credits:
// https://dev.to/dan_starner/building-dynamic-breadcrumbs-in-nextjs-17oa

const prettify = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`.replaceAll("-", " ");

export default function Breadcrumbs() {
  const router = useRouter();
  const breadcrumbs = useMemo(
    function generateBreadcrumbs() {
      const asPathWithoutQuery = router.asPath.split("?")[0];
      const asPathNestedRoutes = asPathWithoutQuery.split("/").filter((v) => v.length > 0);

      const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
        return { href, text: prettify(subpath) };
      });

      return [{ href: "/", text: "Home" }, ...crumblist];
    },
    [router.asPath]
  );

  return (
    <Container className="mt-4 mb-3">
      <Row>
        <Col md={{ span: 9, offset: 3 }}>
          <small className="text-muted">Navigation</small>
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
