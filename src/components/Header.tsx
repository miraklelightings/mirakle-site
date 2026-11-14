import Link from "next/link";
import { WORLDS, type World } from "@/lib/site";

const accent: Record<World, string> = { arch: "var(--arch)", ql: "var(--ql)", deco: "var(--deco)" };

export default function Header({ world, nav = [], cta }: { world?: World; nav?: { label: string; href: string }[]; cta?: { label: string; href: string } }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 10, background: "var(--paper)", borderBottom: "1px solid var(--rule)" }}>
      <div className="wrap cap" style={{ display: "flex", gap: 24, height: 36, alignItems: "center", borderBottom: "1px solid var(--rule)" }}>
        {WORLDS.map((w) => (
          <Link key={w.id} href={w.href} style={{ textDecoration: "none", color: w.id === world ? "var(--ink)" : "var(--grey)", paddingBottom: 2, borderBottom: w.id === world ? "2px solid transparent" : 0, borderImage: w.id === world ? `${accent[w.id]} 1` : undefined }}>
            {w.label}
          </Link>
        ))}
        <Link href="/" className="hide-sm" style={{ marginLeft: "auto", textDecoration: "none", color: "var(--grey)" }}>MIRAKLE home</Link>
      </div>
      <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 28, height: 64 }}>
        <Link href="/" aria-label="MIRAKLE home"><img src="/Mirakle_Logo_Black.svg" alt="MIRAKLE" style={{ height: 20, width: "auto" }} /></Link>
        <nav className="cap hide-sm" style={{ display: "flex", gap: 22, marginLeft: "auto" }}>
          {nav.map((n) => <Link key={n.href} href={n.href} style={{ textDecoration: "none" }}>{n.label}</Link>)}
        </nav>
        {cta && <Link href={cta.href} className="btn" style={{ marginLeft: nav.length ? 0 : "auto" }}>{cta.label}</Link>}
      </div>
    </header>
  );
}
