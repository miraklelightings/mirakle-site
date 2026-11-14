"use client";
import { useMemo, useState } from "react";
import { PROFILES, SENSORS, RULES } from "@/lib/quiklit";
import { buildBoq, type Run } from "@/lib/boq";
import { MANAGERS } from "@/lib/site";

const blank = (id: number): Run => ({ id, location: "", profile: "QUIKLIT-1707", lengthMm: 1200, qty: 1, cct: "3000K", sensor: "" });
const PRESETS: { label: string; runs: Omit<Run, "id">[] }[] = [
  { label: "Wardrobe, 2 door", runs: [
    { location: "Wardrobe — top shelf", profile: "QUIKLIT-1707", lengthMm: 1100, qty: 1, cct: "3000K", sensor: "QUIKSENS-TWIN DOOR" },
    { location: "Wardrobe — hanging rail", profile: "QUIKLIT-0618 DUAL SIDE", lengthMm: 1050, qty: 1, cct: "3000K", sensor: "" } ] },
  { label: "Kitchen, under-cabinet", runs: [
    { location: "Kitchen — wall units", profile: "QUIKLIT-ASYMMETRIC 1010", lengthMm: 2400, qty: 1, cct: "4000K", sensor: "QUIKSENS-HANDSWEEP" } ] },
  { label: "Walk-in closet", runs: [
    { location: "Walk-in — shelves", profile: "QUIKLIT-1010", lengthMm: 900, qty: 6, cct: "3000K", sensor: "QUIKSENS-HUMAN" } ] },
];

export default function Calculator() {
  const [runs, setRuns] = useState<Run[]>([blank(1)]);
  const [nextId, setNextId] = useState(2);
  const boq = useMemo(() => buildBoq(runs), [runs]);
  const set = (id: number, patch: Partial<Run>) => setRuns((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const add = () => { setRuns((rs) => [...rs, blank(nextId)]); setNextId(nextId + 1); };
  const load = (i: number) => { const rs = PRESETS[i].runs.map((r, k) => ({ ...r, id: nextId + k })); setRuns(rs); setNextId(nextId + rs.length); };

  const text = ["MIRAKLE QuikLit — BOQ request", ...boq.lines.map((l) => `${l.code} — ${l.qty} ${l.unit}`), `Total load ${boq.watts.toFixed(0)} W`].join("\n");
  const m = MANAGERS.ql;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div className="no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span className="cap grey" style={{ marginRight: 8 }}>Start from</span>
        {PRESETS.map((p, i) => <button key={p.label} type="button" className="btn ghost" onClick={() => load(i)}>{p.label}</button>)}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {runs.map((r, i) => (
          <fieldset key={r.id} style={{ border: 0, margin: 0, padding: 20, background: "var(--stone)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, alignItems: "end" }}>
            <div className="cap grey" style={{ gridColumn: "1 / -1" }}>Run {i + 1}</div>
            <label className="field" style={{ gridColumn: "span 2" }}>Where<input value={r.location} placeholder="e.g. Master wardrobe, top shelf" onChange={(e) => set(r.id, { location: e.target.value })} /></label>
            <label className="field" style={{ gridColumn: "span 2" }}>Profile
              <select value={r.profile} onChange={(e) => set(r.id, { profile: e.target.value })}>
                {PROFILES.map((p) => <option key={p.code} value={p.code}>{p.code} · {p.size} · {p.wpm} W/m</option>)}
              </select></label>
            <label className="field">Length (mm)<input type="number" min={50} step={10} value={r.lengthMm || ""} onChange={(e) => set(r.id, { lengthMm: Number(e.target.value) })} /></label>
            <label className="field">How many<input type="number" min={1} value={r.qty || ""} onChange={(e) => set(r.id, { qty: Number(e.target.value) })} /></label>
            <label className="field">Colour
              <select value={r.cct} onChange={(e) => set(r.id, { cct: e.target.value as Run["cct"] })}><option>3000K</option><option>4000K</option></select></label>
            <label className="field" style={{ gridColumn: "span 2" }}>Switching
              <select value={r.sensor} onChange={(e) => set(r.id, { sensor: e.target.value })}>
                {SENSORS.map((s) => <option key={s.code} value={s.code}>{s.label}</option>)}
              </select></label>
            {runs.length > 1 && <button type="button" className="btn ghost no-print" onClick={() => setRuns((rs) => rs.filter((x) => x.id !== r.id))}>Remove</button>}
          </fieldset>
        ))}
        <button type="button" className="btn ghost no-print" onClick={add} style={{ alignSelf: "flex-start", marginTop: 12 }}>+ Add a run</button>
      </div>

      <section aria-live="polite" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
          <h2 className="h40">Your BOQ</h2>
          <span className="t14 grey">{boq.metres.toFixed(2)} m of light · {boq.watts.toFixed(0)} W total load</span>
        </div>
        <table>
          <thead><tr><th>Code</th><th>Description</th><th style={{ textAlign: "right" }}>Qty</th><th>Unit</th></tr></thead>
          <tbody>{boq.lines.map((l) => <tr key={l.code + l.desc}><td style={{ whiteSpace: "nowrap", fontWeight: 500 }}>{l.code}</td><td className="grey">{l.desc}</td><td style={{ textAlign: "right" }}>{l.qty}</td><td className="grey">{l.unit}</td></tr>)}</tbody>
        </table>
        {boq.warnings.map((w) => <p key={w} className="t14" style={{ margin: 0, color: "#B42318" }}>{w}</p>)}
        <p className="t14 grey" style={{ margin: 0 }}>Profiles come in {RULES.stockMm} mm lengths and are cut to size; the count above allows {RULES.cutAllowanceMm} mm per cut. Supplies are sized to {Math.round(RULES.supplyLoad * 100)}% of their rating. Prices on enquiry — our team confirms the BOQ before quoting.</p>
        <div className="no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a className="btn" href={`https://wa.me/${m.wa}?text=${encodeURIComponent(text)}`}>Send to QuikLit team on WhatsApp</a>
          <a className="btn ghost" href={`mailto:${m.email}?subject=${encodeURIComponent("QuikLit BOQ request")}&body=${encodeURIComponent(text)}`}>Email it</a>
          <button type="button" className="btn ghost" onClick={() => window.print()}>Save as PDF</button>
        </div>
      </section>
    </div>
  );
}
