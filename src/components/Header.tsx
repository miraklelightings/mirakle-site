"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { WORLDS, type World } from "@/lib/site";

const SITE_NAV = [{ label: "About", href: "/about/" }, { label: "Downloads", href: "/downloads/" }, { label: "Contact", href: "/contact/" }];

// One bar on every page: the mark, the three verticals, then the company links.
// Inside a vertical, a second row carries that vertical's own sections.
// `over` lets the bar sit clear on top of a full-screen photograph until the page scrolls.
export default function Header({ world, nav = [], cta, over = false }: { world?: World; nav?: { label: string; href: string }[]; cta?: { label: string; href: string }; over?: boolean }) {
  const [top, setTop] = useState(true);
  useEffect(() => {
    if (!over) return;
    const on = () => setTop(window.scrollY < 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [over]);
  const clear = over && top;
  const sub = world ? nav : [];
  return (
    <header className={"hdr" + (over ? " over" : "") + (clear ? " clear" : "")}>
      <div className="wrap hdr-row">
        <Link href="/" aria-label="MIRAKLE home" className="hdr-logo"><img src={clear ? "/Mirakle_Logo_White.svg" : "/Mirakle_Logo_Black.svg"} alt="MIRAKLE" width={110} height={20} /></Link>
        <nav className="hdr-worlds cap" aria-label="The three verticals">
          {WORLDS.map((w) => <Link key={w.id} href={w.href} aria-current={w.id === world ? "page" : undefined}>{w.label}</Link>)}
        </nav>
        <nav className="hdr-site cap hide-sm" aria-label="Company">
          {SITE_NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </nav>
        {cta && <Link href={cta.href} className="btn hdr-cta">{cta.label}</Link>}
      </div>
      {sub.length > 0 && (
        <div className="hdr-sub">
          <nav className="wrap cap" aria-label="In this vertical">
            {world === "ql" && <Link href="/quiklit/" aria-label="QuikLit" className="hdr-ql"><img src="/img/quiklit-black.png" alt="QuikLit" /></Link>}
            {sub.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          </nav>
        </div>
      )}
    </header>
  );
}
