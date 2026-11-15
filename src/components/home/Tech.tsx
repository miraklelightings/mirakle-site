"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { MANAGERS, wa } from "@/lib/site";

// Technical Lighting chapter. The room is dark; the visitor's cursor is the light.
export default function Tech() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let manual = false, raf = 0;
    const set = (x: number, y: number) => { el.style.setProperty("--x", x + "%"); el.style.setProperty("--y", y + "%"); };
    const move = (e: PointerEvent) => { manual = true; const r = el.getBoundingClientRect(); set(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100); };
    const leave = () => { manual = false; };
    const drift = (t: number) => { if (!manual) set(60 + Math.sin(t / 2600) * 22, 42 + Math.cos(t / 3400) * 12); raf = requestAnimationFrame(drift); };
    el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(drift);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section ref={ref} className="tech chapter" id="technical">
      <img src="/img/home_hero.jpg" alt="Recessed spotlights washing a plaster wall at dusk" />
      <div className="tech-shade" />
      <div className="wrap tech-copy">
        <span className="chapter-num" style={{ color: "var(--on-dark-grey)" }}><span style={{ display: "inline-block", width: 56, height: 2, background: "var(--arch)", verticalAlign: "middle", marginRight: 14 }} />01 · Architectural &amp; Technical</span>
        <h2 className="h56" style={{ maxWidth: 760 }}>Light that serves the architecture.</h2>
        <p className="t20" style={{ margin: 0, maxWidth: 560, color: "rgba(246,244,240,.82)" }}>
          Architectural lighting solutions for professional projects, architects and interior designers.
        </p>
        <span className="h28">1000+ SKUs. Locally assembled.</span>
        <div className="pills">
          <Link className="pill" href="/architectural/#magnetic">Magnetic track</Link>
          <Link className="pill" href="/architectural/#spotlights">COB spotlights</Link>
          <Link className="pill" href="/architectural/#linear">LED strips and linear</Link>
          <Link className="pill" href="/architectural/#drivers">LED drivers</Link>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          <Link href="/architectural/" className="btn light">Explore the full range</Link>
          <a href={wa("arch", "Hello MIRAKLE, I have an Architectural & Technical lighting enquiry.")} className="btn ghost-light">WhatsApp {MANAGERS.arch.name}</a>
        </div>
      </div>
      <span className="viz-tag">Visualisation · move your cursor</span>
    </section>
  );
}
