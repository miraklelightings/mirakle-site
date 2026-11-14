"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

// The hero is a dark room. The visitor's cursor is the light.
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let manual = false, raf = 0;
    const set = (x: number, y: number) => { el.style.setProperty("--x", x + "%"); el.style.setProperty("--y", y + "%"); };
    const move = (e: PointerEvent) => {
      manual = true; const r = el.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100);
    };
    const drift = (t: number) => { if (!manual) set(58 + Math.sin(t / 2600) * 22, 42 + Math.cos(t / 3400) * 12); raf = requestAnimationFrame(drift); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", () => { manual = false; });
    raf = requestAnimationFrame(drift);
    return () => { el.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section ref={ref} className="hero">
      <img src="/img/home_hero.jpg" alt="Recessed spotlights washing a plaster wall at dusk" className="hero-img" />
      <div className="hero-shade" />
      <div className="wrap hero-copy">
        <span className="cap" style={{ color: "var(--on-dark-grey)" }}>MIRAKLE · Ahmedabad</span>
        <h1 className="h56" style={{ maxWidth: 820 }}>India&apos;s most trusted name in light.</h1>
        <p className="t20" style={{ margin: 0, maxWidth: 560, color: "var(--on-dark-grey)" }}>
          For architects, furniture makers and the homes they create.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          <a href="#worlds" className="btn light">Explore the three worlds</a>
          <Link href="/quiklit/boq/" className="btn ghost-light">QuikLit BOQ calculator</Link>
        </div>
        <span className="t14 hero-hint">Move your cursor. You are holding the light.</span>
      </div>
      <span className="viz-tag">Visualisation</span>
    </section>
  );
}
