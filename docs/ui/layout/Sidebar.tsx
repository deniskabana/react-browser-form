import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface SubMenuItem {
  title: string;
  href: string;
  icon?: string;
  children?: SubMenuItem[];
}

interface MenuItem {
  title: string;
  href: string;
  icon: string;
  children?: SubMenuItem[];
}

const MENU: MenuItem[] = [
  { title: "Introduction", href: "/introduction", icon: "tabler:bulb" },
  { title: "Getting started", href: "/getting-started", icon: "tabler:terminal-2" },
  { title: "FAQ", href: "/frequently-asked-questions", icon: "ph:question-bold" },
  { title: "Documentation", href: "/documentation", icon: "ph:tree-structure-bold" },
  {
    title: "Examples",
    href: "/examples",
    icon: "ph:presentation-chart-bold",
    children: [
      {
        title: "Basic",
        href: "/examples/basic",
        children: [
          { title: "Minimal form", href: "/examples/basic/minimal-form" },
          { title: "Basic usage", href: "/examples/basic/basic-usage" },
        ],
      },
      {
        title: "Validation",
        href: "/examples/validation",
      },
      {
        title: "Modes",
        href: "/examples/modes",
      },
      {
        title: "Real-world usage",
        href: "/examples/real-world-usage",
      },
      {
        title: "Performance showcase",
        href: "/examples/performance-showcase",
      },
    ],
  },
  { title: "Contribute", href: "/contribute", icon: "ion:people-circle-outline" },
];

const NEST_BACKGROUNDS = ["#ffffff", "#fff3f2", "#fee8e6", "#fadcd9"];

export default function Sidebar() {
  const router = useRouter();

  return (
    <Card>
      <ListGroup variant="flush" className="shadow-sm">
        {MENU.map((menuItem) => (
          <SidebarMenu menuItem={menuItem} pathname={router.pathname} key={menuItem.href} />
        ))}
      </ListGroup>
    </Card>
  );
}

function SidebarMenu({
  pathname,
  menuItem,
  nestLevel = 1,
}: {
  pathname: string;
  menuItem: MenuItem | SubMenuItem;
  nestLevel?: number;
}) {
  const active = pathname.startsWith(menuItem.href);
  const [isExpanded, setIsExpanded] = useState(active);

  useEffect(() => {
    setIsExpanded(active);
  }, [active]);

  return (
    <>
      <ListGroup.Item
        className="d-flex align-items-center"
        style={{
          height: "3rem",
          paddingLeft: `${0.5 + nestLevel / 3}rem`,
          fontSize: `${1 - nestLevel / 25}em`,
          backgroundColor: NEST_BACKGROUNDS[nestLevel - 1],
        }}
      >
        <Link
          href={menuItem.href}
          className={`text-decoration-none d-flex align-items-center ${
            active ? "text-secondary fw-bold" : "text-body"
          }`}
        >
          {menuItem.icon ? <Icon icon={menuItem.icon} className="me-2" height={22} /> : null}
          {nestLevel > 1 && !menuItem.icon ? <Icon icon="pajamas:level-up" className="me-2" height={12} /> : null}
          {menuItem.title}
        </Link>

        {menuItem.children ? (
          <Button variant="light" className="ms-auto border" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            <Icon
              icon={
                isExpanded
                  ? "material-symbols:keyboard-arrow-up-rounded"
                  : "material-symbols:keyboard-arrow-down-rounded"
              }
            />
          </Button>
        ) : null}
      </ListGroup.Item>

      {menuItem.children && isExpanded ? (
        <ListGroup variant="flush" className="border-bottom" style={{ backgroundColor: "#380fa71a" }}>
          {menuItem.children.map((submenuItem) => (
            <SidebarMenu menuItem={submenuItem} pathname={pathname} key={submenuItem.href} nestLevel={nestLevel + 1} />
          ))}
        </ListGroup>
      ) : null}
    </>
  );
}
