import { Icon } from "@iconify/react";
import { Alert, Stack } from "react-bootstrap";

function getIcon(variant: "info" | "danger" | "success") {
  switch (variant) {
    case "danger":
      return "jam:triangle-danger";

    case "success":
      return "material-symbols:check-circle-outline-rounded";

    case "info":
    default:
      return "tabler:bulb";
  }
}

export default function Tip({
  children,
  variant = "info",
  small = false,
}: {
  children: React.ReactNode | React.ReactNode[];
  variant?: "info" | "danger" | "success";
  small?: boolean;
}) {
  return (
    <Alert variant={variant} className={`shadow-sm my-3 p-${small ? "1" : "2"}`} style={{ fontSize: "0.75rem" }}>
      <Stack direction="horizontal">
        <div>
          <Icon icon={getIcon(variant)} width={small ? 20 : 30} className={`me-${small ? "1" : "2"}`} />
        </div>
        <div>
          <p className="mb-0">{children}</p>
        </div>
      </Stack>
    </Alert>
  );
}
