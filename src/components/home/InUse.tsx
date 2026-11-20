"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Photographs from the Architectural Lighting Catalogue 2027–28, one per way of using a line of light.
const SCENES = [
  { id: "cove", label: "Cove", range: "OPTIPRO", href: "/architectural/linear/", img: "/img/cat/cove.jpg", alt: "A living room ceiling lit from a concealed cove" },
  { id: "shelves", label: "Shelves", range: "OPTIPRO", href: "/architectural/linear/", img: "/img/cat/shelves.jpg", alt: "Display shelves lit from within" },
  { id: "wall", label: "Wall", range: "OPTIPRO", href: "/architectural/linear/", img: "/img/cat/graze.jpg", alt: "A slatted wall grazed by a line of light on a terrace" },
  { id: "line", label: "Line", range: "CURVA", href: "/architectural/linear/", img: "/img/cat/curva.jpg", alt: "A continuous line of light crossing a wall and ceiling" },
  { id: "facade", label: "Facade", range: "CURVA", href: "/architectural/linear/", img: "/img/cat/villa.jpg", alt: "A villa outlined in light at dusk" },
  { id: "graze", label: "Graze", range: "ARCUS", href: "/architectural/linear/", img: "/img/cat/arcus.jpg", alt: "A brick wall grazed with light" },
  { id: "sky", label: "Ceiling", range: "SKYLIT", href: "/architectural/linear/", img: "/img/cat/skylit.jpg", alt: "A stretch ceiling glowing like a skylight" },
];
const HOLD = 5000;

export default function InUse() {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (held || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setI((x) => (x + 1) % SCENES.length), HOLD);
    return () => window.clearTimeout(t);
  }, [i, held]);
  const s = SCENES[i];
  return (
    <section className="inuse" onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)}>
      <div className="inuse-stage">
        {SCENES.map((x, k) => <img key={x.id} src={x.img} alt={k === i ? x.alt : ""} className={k === i ? "on" : ""} loading="lazy" />)}
        <div className="inuse-shade" />
        <div className="wrap inuse-copy">
          <span className="cap dim">One line of light · Seven places</span>
          <h2 className="h88">{s.label}.</h2>
          <Link href={s.href} className="cap inuse-range">{s.range} →</Link>
        </div>
      </div>
      <div className="inuse-tabs" role="tablist" aria-label="Ways to use a line of light">
        {SCENES.map((x, k) => (
          <button key={x.id} type="button" role="tab" aria-selected={k === i} className={"inuse-tab" + (k === i ? " on" : "")} onClick={() => { setI(k); setHeld(true); }}>
            <span className="inuse-bar"><span key={`${k}-${i}-${held}`} className={k === i && !held ? "run" : k === i ? "full" : ""} /></span>
            <span className="cap">0{k + 1}</span>
            <span className="inuse-name">{x.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
