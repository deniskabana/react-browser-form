import { Container } from "react-bootstrap";

export default function Header() {
  return (
    <footer className="text-center py-5 shadow-sm mt-auto mb-0">
      <Container className="py-5 my-4">
        <p className="fs-3 text-white">
          Enjoying React Dumb Form?{" "}
          <a href="https://github.com/deniskabana/react-dumb-form" className="fw-bold text-secondary">
            Star us on GitHub.
          </a>
        </p>
        <p className="text-white-50">
          By leaving us a star on GitHub or contributing you can support React Dumb Form's growth and help stabilize
          it's future.
        </p>
      </Container>
    </footer>
  );
}
