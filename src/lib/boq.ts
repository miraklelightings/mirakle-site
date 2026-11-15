import { PROFILES, PIECES, SUPPLIES, WIRING, RULES, UNITS, PACKING, type Profile } from "./quiklit";

export type Cct = "3K" | "4K";
export type Run = {
  id: number;
  place: string;        // kind of furniture
  room: string;         // the buyer's own name for it
  profile: string;      // Profile.key
  cct: Cct;
  length: number;       // in `unit`
  unit: string;
  units: number;        // identical pieces of furniture
  linesEach: number;    // lines of light in each
  corners: number;      // 90° turns in one line
  sensor: string;       // sensor code, one per piece of furniture
};
export type Extras = Record<string, number>; // "<piece key>|<cct>" or "ext" / "sensorExt" -> quantity

export type Line = { group: string; code: string; desc: string; qty: number; unit: string; note?: string };
export type Supply = { code: string; qty: number };

const profileOf = (key: string): Profile => PROFILES.find((p) => p.key === key) || PROFILES[0];
const whole = (n: number, min = 0) => Math.max(min, Math.floor(Number(n) || 0));
export const toMm = (r: Pick<Run, "length" | "unit">) => Math.max(0, Number(r.length) || 0) * (UNITS[r.unit]?.mm || 1);
const fmtM = (m: number) => (Math.round(m * 100) / 100).toString();

// First-fit decreasing: how many 3000 mm lengths the cut pieces need, and what is left of each.
export function pack(pieces: number[]) {
  const stock = RULES.stockMm;
  const bins: number[] = [];
  for (const p of [...pieces].sort((a, b) => b - a)) {
    const need = p >= stock ? stock : p + RULES.cutMm;
    const i = bins.findIndex((used) => used + need <= stock + 0.001);
    if (i >= 0) bins[i] += need; else bins.push(need);
  }
  return bins;
}

// Fewest supplies that carry the watts, the lights and the sensors. Ties go to the smaller total rating.
export function pickSupplies(watts: number, lights: number, sensors: number) {
  if (watts <= 0 && lights <= 0) return null;
  const [s60, s100, s150] = SUPPLIES;
  let best: { n: number[]; count: number; rating: number; cap: number; splitters: number } | null = null;
  for (let a = 0; a <= 12; a++) for (let b = 0; b <= 12; b++) for (let c = 0; c <= 12; c++) {
    const count = a + b + c;
    if (!count) continue;
    if (sensors > count) continue;                           // one sensor needs a supply of its own
    const big = Math.max(0, sensors - (a + b));              // 150 W supplies that must carry a sensor
    const cap = a * s60.safe + b * s100.safe + (c - big) * s150.safe + big * Math.min(s150.safe, RULES.sensorMaxW);
    if (cap < watts - 1e-9) continue;
    const ports = a * s60.lightPorts + b * s100.lightPorts + c * s150.lightPorts;
    const splitters = lights > ports ? Math.ceil((lights - ports) / RULES.splitterGain) : 0;
    if (splitters > ports) continue;
    const rating = a * 60 + b * 100 + c * 150;
    if (!best || count < best.count || (count === best.count && rating < best.rating)) best = { n: [a, b, c], count, rating, cap, splitters };
  }
  return best;
}

export function buildBoq(runs: Run[], extras: Extras = {}) {
  const lines: Line[] = [];
  const warnings: string[] = [];
  const cuts = new Map<string, number[]>();      // "<profile key>|<cct>" -> cut pieces in mm
  const rollM = new Map<string, number>();       // same key -> metres off a roll
  const acc = new Map<string, number>();
  const conn = new Map<string, { qty: number; kind: string }>();
  const sensors = new Map<string, number>();
  let watts = 0, lights = 0, metres = 0;

  for (const r of runs) {
    const p = profileOf(r.profile);
    const len = toMm(r);
    if (len <= 0) continue;
    const n = whole(r.units, 1) * whole(r.linesEach, 1);
    const name = r.room || r.place || "A line";
    const key = `${p.key}|${p.noCct ? "" : r.cct}`;
    watts += (len / 1000) * p.wpm * n;
    metres += (len / 1000) * n;
    if (r.sensor) sensors.set(r.sensor, (sensors.get(r.sensor) || 0) + whole(r.units, 1));

    if (p.rollM) {
      rollM.set(key, (rollM.get(key) || 0) + (len / 1000) * n);
      acc.set(p.acc, (acc.get(p.acc) || 0) + n);
      lights += n;
      continue;
    }
    const corners = p.corner ? whole(r.corners) : 0;
    const segs = corners + 1;
    const segLen = len / segs;
    const full = Math.floor(segLen / RULES.stockMm + 1e-9);
    const rem = segLen - full * RULES.stockMm;
    const piecesPerSeg = full + (rem > 0.5 ? 1 : 0);
    const joins = (piecesPerSeg - 1) * segs;
    // No straight jointer in the range: every extra 3 m length is a light of its own.
    const perLine = p.straight ? 1 : 1 + joins;
    const list = cuts.get(key) || [];
    for (let i = 0; i < n * segs; i++) { for (let k = 0; k < full; k++) list.push(RULES.stockMm); if (rem > 0.5) list.push(rem); }
    cuts.set(key, list);
    acc.set(p.acc, (acc.get(p.acc) || 0) + perLine * n);
    lights += perLine * n;
    if (corners && p.corner) conn.set(p.corner, { qty: (conn.get(p.corner)?.qty || 0) + corners * n, kind: "Corner connector, one for each 90° turn" });
    if (joins && p.straight) conn.set(p.straight, { qty: (conn.get(p.straight)?.qty || 0) + joins * n, kind: "Straight connector, joins two 3 m lengths in one line" });
    if (joins && !p.straight) warnings.push(`${name}: ${fmtM(segLen / 1000)} m is longer than one 3 m length and ${p.name} has no straight jointer, so each length is fitted as a light of its own with its own accessory set and light port. For one unbroken line choose a profile with a straight connector: ${PROFILES.filter((x) => x.straight && !x.noCct).map((x) => x.name.replace("QuikLit ", "")).join(", ")}.`);
    if (!p.corner && whole(r.corners) > 0) warnings.push(`${name}: ${p.name} has no corner connector. Enter each side as its own line.`);
  }

  // ---- profiles
  const spare: { code: string; needM: number; orderM: number; offcuts: number[] }[] = [];
  let packsTotal = 0;
  for (const p of PROFILES) for (const cct of p.noCct ? [""] : ["3K", "4K"]) {
    const key = `${p.key}|${cct}`;
    const code = p.code + (cct ? `-${cct}` : "");
    if (rollM.has(key)) {
      const need = rollM.get(key)!;
      const rolls = Math.ceil(need / p.rollM! - 1e-9);
      lines.push({ group: "Profiles", code, desc: `${p.name}, ${p.wpm} W/m${cct ? `, ${cct === "3K" ? "3000K" : "4000K"}` : ""}`, qty: rolls * p.rollM!, unit: "m", note: `${rolls} roll${rolls > 1 ? "s" : ""} of ${p.rollM} m. You need ${fmtM(need)} m; it cuts anywhere.` });
    }
    const list = cuts.get(key);
    if (!list?.length) continue;
    const need = list.reduce((a, b) => a + b, 0) / 1000;
    const bins = pack(list);
    const packs = Math.ceil(bins.length / RULES.packPieces);
    const lengths = packs * RULES.packPieces;
    packsTotal += packs;
    const orderM = (lengths * RULES.stockMm) / 1000;
    const offcuts = [...bins.map((used) => Math.round(RULES.stockMm - used)), ...Array(lengths - bins.length).fill(RULES.stockMm)].filter((x) => x >= 50).sort((a, b) => b - a);
    spare.push({ code, needM: need, orderM, offcuts });
    lines.push({ group: "Profiles", code, desc: p.noCct ? "Magnetic track, 3000 mm lengths" : `${p.name}, ${p.size}, ${p.wpm} W/m, ${cct === "3K" ? "3000K" : "4000K"}`, qty: orderM, unit: "m", note: `${packs} pack${packs > 1 ? "s" : ""} of 6 m = ${lengths} lengths of 3 m. You need ${fmtM(need)} m.` });
  }
  for (const [code, qty] of acc) lines.push({ group: "Accessory sets", code, desc: "Wired end cap with 1800 mm wire, end cap and clamps. One set for each light.", qty, unit: "sets" });
  for (const [code, c] of conn) lines.push({ group: "Connectors", code, desc: c.kind, qty: c.qty, unit: "pcs" });

  // ---- lights counted by the piece
  for (const it of PIECES) for (const cct of ["3K", "4K"]) {
    const q = whole(extras[`${it.key}|${cct}`]);
    if (!q) continue;
    watts += q * it.w;
    if (it.port) lights += q;
    lines.push({ group: it.group.split(",")[0], code: `${it.code}-${cct}`, desc: `${it.name}, ${it.w} W, ${cct === "3K" ? "3000K" : "4000K"}`, qty: q, unit: "pcs" });
  }
  const hasMagLight = PIECES.some((it) => !it.port && (whole(extras[`${it.key}|3K`]) || whole(extras[`${it.key}|4K`])));
  if (hasMagLight && !cuts.has("mag|")) warnings.push("QuikMag lights click onto the QuikMag track. Add a line of QuikMag track for them.");

  // ---- sensors
  let sensorQty = 0;
  for (const [code, qty] of sensors) { sensorQty += qty; lines.push({ group: "Sensors", code, desc: "QuikSens sensor, one to a supply", qty, unit: "pcs" }); }

  // ---- power
  const plan = pickSupplies(watts, lights, sensorQty);
  const supplies: Supply[] = [];
  if (plan) {
    SUPPLIES.forEach((s, i) => { if (plan.n[i]) { supplies.push({ code: s.code, qty: plan.n[i] }); lines.push({ group: "Power and wiring", code: s.code, desc: `24V DC supply, ${s.watts} W, ${s.lightPorts} light ports. Carries up to ${s.safe} W.`, qty: plan.n[i], unit: "pcs" }); } });
    if (plan.splitters) lines.push({ group: "Power and wiring", code: WIRING.splitter.code, desc: `${WIRING.splitter.ports}-port splitter, for more lights than the supply has ports`, qty: plan.splitters, unit: "pcs" });
  } else if (watts > 0) warnings.push(`A load of ${Math.round(watts)} W is beyond what this calculator plans. Send it to us and we will plan the supplies.`);
  const ext = whole(extras.ext), sExt = whole(extras.sensorExt);
  if (ext) lines.push({ group: "Power and wiring", code: WIRING.extension.code, desc: `Extension wire, ${WIRING.extension.note}`, qty: ext, unit: "pcs" });
  if (sExt) lines.push({ group: "Power and wiring", code: WIRING.sensorExtension.code, desc: `Sensor extension wire, ${WIRING.sensorExtension.note}`, qty: sExt, unit: "pcs" });
  if (sensorQty) warnings.push(`Each sensor needs a supply of its own. It switches every light on that supply, ${RULES.sensorMaxW} W at most. Our team will confirm which lights each sensor controls.`);
  const tubes = Math.ceil((packsTotal * RULES.packPieces * RULES.stockMm) / 1000 / RULES.tubeM - 1e-9);
  if (tubes) lines.push({ group: "Packing", code: PACKING.code, desc: `Round tube, compulsory. It protects the profiles in transit; one tube holds ${RULES.tubeM} m.`, qty: tubes, unit: "pcs" });

  return { lines, warnings, watts, lights, metres, sensors: sensorQty, plan, supplies, spare };
}

export function boqText(b: ReturnType<typeof buildBoq>, who?: { name?: string; project?: string; city?: string }) {
  const out = ["MIRAKLE QuikLit: BOQ request"];
  if (who?.name) out.push(`From: ${who.name}`);
  if (who?.project) out.push(`Project: ${who.project}`);
  if (who?.city) out.push(`City: ${who.city}`);
  out.push("");
  let g = "";
  for (const l of b.lines) { if (l.group !== g) { g = l.group; out.push(`${g.toUpperCase()}`); } out.push(`${l.code}: ${l.qty} ${l.unit}`); }
  out.push("", `${b.lights} lights, ${fmtM(b.metres)} m, ${Math.round(b.watts)} W`);
  return out.join("\n");
}
