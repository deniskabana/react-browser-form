import { Container } from "react-bootstrap";

export default function Header() {
  return (
    <footer className="bg-black text-center py-5 shadow-sm mt-auto mb-0">
      <Container className="py-5">
        <p className="fs-3 text-white">
          Enjoying React dumb form?{" "}
          <a href="https://github.com/deniskabana/react-dumb-form" className="fw-bold text-secondary">
            Star us on GitHub.
          </a>
        </p>
        <p className="text-muted">
          By leaving us a star on GitHub or contributing you can support React dumb form's growth and help stabilize
          it's future.
        </p>
      </Container>
    </footer>
  );
}
