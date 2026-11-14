import Link from "next/link";

// The three offerings, pinned to the bottom of every page.
const items = [
  { href: "/architectural/", small: "Light for architecture", label: "Architectural", line: "var(--arch)" },
  { href: "/quiklit/", small: "Light for furniture", label: "QuikLit", line: "var(--ql)" },
  { href: "/decorative/", small: "Light for living", label: "Decorative", line: "var(--deco)" },
];

export default function WorldDock() {
  return (
    <nav className="dock no-print" aria-label="Our three worlds">
      {items.map((i) => (
        <Link key={i.href} href={i.href} className="dock-item">
          <span className="dock-line" style={{ background: i.line }} />
          <span className="dock-small">{i.small}</span>
          <span className="dock-label">{i.label}</span>
        </Link>
      ))}
    </nav>
  );
}
