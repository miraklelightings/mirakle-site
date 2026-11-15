"use client";
import Link from "next/link";
import { useState } from "react";

const MODES = [
  { id: "medium", tab: "36° · Medium", line: "Defined pools of light. The standard beam." },
  { id: "narrow", tab: "24° · Narrow", line: "Tight, bright accents. High contrast." },
  { id: "wide", tab: "60° · Wide", line: "Soft, even general light." },
  { id: "wash", tab: "Wall wash", line: "The wall becomes the brightest surface." },
  { id: "accent", tab: "Accent", line: "Adjustable beams, aimed at the objects that matter." },
] as const;
const cctName = (k: number) => (k < 3300 ? "Warm white" : k < 4500 ? "Neutral white" : k < 5600 ? "Cool white" : "Daylight");

// One room, one set of small recessed fittings. Change the beam, then the colour.
export default function RoomLab() {
  const [mode, setMode] = useState<(typeof MODES)[number]["id"]>("medium");
  const [k, setK] = useState(3000);
  const t = (k - 2700) / (6500 - 2700);
  const warm = Math.max(0, 0.2 - t * 0.9), cool = Math.max(0, t - 0.1);
  const active = MODES.find((m) => m.id === mode)!;
  return (
    <section className="lab" id="room">
      <div className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: "flex", flexDirection: "column", gap: 32 }}>
        <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 640 }}>
            <span className="cap" style={{ color: "var(--on-dark-grey)" }}>Same room · same ceiling</span>
            <h2 className="h40">One room. Five ways to light it.</h2>
          </div>
          <p className="t14" style={{ margin: 0, maxWidth: 360, color: "var(--on-dark-grey)" }}>{active.line}</p>
        </div>
        <div className="tabs" role="tablist" aria-label="Light distribution">
          {MODES.map((m) => (
            <button key={m.id} role="tab" aria-selected={m.id === mode} className={"tab" + (m.id === mode ? " on" : "")} onClick={() => setMode(m.id)}>{m.tab}</button>
          ))}
        </div>
        <figure className="lab-stage" style={{ margin: 0 }}>
          {MODES.map((m) => (
            <img key={m.id} className={"room" + (m.id === mode ? " on" : "")} src={`/img/room_${m.id}.jpg`} alt={`Living room, ${m.tab} light`} loading={m.id === "medium" ? "eager" : "lazy"} style={{ filter: `saturate(${1 - cool * 0.55})` }} />
          ))}
          <div className="lab-tint" style={{ background: "#ff9a3c", opacity: warm, mixBlendMode: "soft-light" }} />
          <div className="lab-tint" style={{ background: "#9cc4ff", opacity: cool * 0.62, mixBlendMode: "color" }} />
          <div className="lab-tint" style={{ background: "#dfeaff", opacity: cool * 0.18, mixBlendMode: "screen" }} />
          <figcaption className="viz-tag">Visualisation</figcaption>
        </figure>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 32, alignItems: "end" }}>
          <label className="lab-field">
            <span className="cap">Colour temperature · <b>{k}K</b> · {cctName(k)}</span>
            <input type="range" min={2700} max={6500} step={100} value={k} onChange={(e) => setK(Number(e.target.value))} className="lab-range cct" aria-label="Colour temperature in kelvin" />
          </label>
          <p className="t14" style={{ margin: 0, color: "var(--on-dark-grey)" }}>
            The fittings are drawn as small as they are: TITAN 12 W needs a Ø60 mm cut-out. Beams of 24°, 36° and 60°. <Link href="/architectural/titan/#configure" style={{ color: "var(--on-dark)" }}>Configure TITAN →</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
