import { PROFILES, SUPPLIES, RULES, accFor } from "./quiklit";

export type Run = { id: number; location: string; profile: string; lengthMm: number; qty: number; cct: "3000K" | "4000K"; sensor: string };
export type Line = { code: string; desc: string; qty: number; unit: string };

// First-fit decreasing: how many stock lengths are needed to cut every piece.
export function barsNeeded(pieces: number[], stock = RULES.stockMm, kerf = RULES.cutAllowanceMm) {
  const free: number[] = [];
  let full = 0;
  const parts: number[] = [];
  for (const p of pieces) { full += Math.floor(p / stock); const rest = p % stock; if (rest) parts.push(rest); }
  for (const p of parts.sort((a, b) => b - a)) {
    const need = p + kerf;
    const i = free.findIndex((f) => f >= need);
    if (i >= 0) free[i] -= need; else free.push(stock - Math.min(need, stock));
  }
  return full + free.length;
}

// Fewest supplies that carry the load and the number of runs.
export function pickSupplies(watts: number, runs: number) {
  if (watts <= 0) return [] as { code: string; qty: number }[];
  let best: { n: Record<string, number>; count: number; cap: number } | null = null;
  for (let a = 0; a <= 12; a++) for (let b = 0; b <= 12; b++) for (let c = 0; c <= 12; c++) {
    const count = a + b + c; if (!count) continue;
    const cap = (a * 150 + b * 100 + c * 60) * RULES.supplyLoad;
    const ports = a * 10 + b * 10 + c * 7;
    if (cap < watts || ports < runs) continue;
    if (!best || count < best.count || (count === best.count && cap < best.cap)) best = { n: { "QUIKPOWER-24V-150W": a, "QUIKPOWER-24V-100W": b, "QUIKPOWER-24V-60W": c }, count, cap };
  }
  if (!best) return [{ code: "QUIKPOWER-24V-150W", qty: Math.ceil(watts / (150 * RULES.supplyLoad)) }];
  return SUPPLIES.map((s) => ({ code: s.code, qty: best!.n[s.code] })).filter((x) => x.qty > 0);
}

export function buildBoq(runs: Run[]) {
  const valid = runs.filter((r) => r.lengthMm > 0 && r.qty > 0);
  const lines: Line[] = [];
  const warnings: string[] = [];
  for (const r of valid) if (r.lengthMm > RULES.stockMm) warnings.push(`${r.location || "A run"}: ${r.lengthMm} mm is longer than one ${RULES.stockMm} mm length and needs a joint.`);
  let watts = 0;
  let pieces = 0;

  const byProfile = new Map<string, Run[]>();
  for (const r of valid) byProfile.set(`${r.profile}|${r.cct}`, [...(byProfile.get(`${r.profile}|${r.cct}`) || []), r]);
  for (const [key, rs] of byProfile) {
    const [code, cct] = key.split("|");
    const p = PROFILES.find((x) => x.code === code)!;
    const cuts = rs.flatMap((r) => Array(r.qty).fill(r.lengthMm) as number[]);
    const metres = cuts.reduce((a, b) => a + b, 0) / 1000;
    watts += metres * p.wpm;
    pieces += cuts.length;
    lines.push({ code: code, desc: `${p.size} profile, ${p.wpm} W/m, ${cct} · ${metres.toFixed(2)} m to cut into ${cuts.length} piece${cuts.length > 1 ? "s" : ""}`, qty: barsNeeded(cuts), unit: `× ${RULES.stockMm} mm` });
    lines.push({ code: accFor(code), desc: "Accessory set: wired end cap (1800 mm wire) + end cap", qty: cuts.length, unit: "sets" });
  }

  const sensors = new Map<string, number>();
  for (const r of valid) if (r.sensor) {
    sensors.set(r.sensor, (sensors.get(r.sensor) || 0) + r.qty);
    const p = PROFILES.find((x) => x.code === r.profile)!;
    const w = (r.lengthMm / 1000) * p.wpm;
    if (w > RULES.sensorMaxW) warnings.push(`${r.location || "A run"}: ${w.toFixed(0)} W on one sensor is above ${RULES.sensorMaxW} W. Split the run.`);
  }
  for (const [code, qty] of sensors) lines.push({ code, desc: "QuikSens sensor, 1800 mm wire", qty, unit: "pcs" });

  const supplies = pickSupplies(watts, pieces);
  for (const s of supplies) lines.push({ code: s.code, desc: "QuikPower 24V DC supply", qty: s.qty, unit: "pcs" });
  const sensorPorts = supplies.reduce((a, s) => a + s.qty * 2, 0);
  const sensorCount = [...sensors.values()].reduce((a, b) => a + b, 0);
  if (sensorCount > sensorPorts) warnings.push(`${sensorCount} sensors need ${sensorCount} sensor ports; the supplies give ${sensorPorts}. Our team will plan an extra supply.`);

  return { lines, watts, metres: valid.reduce((a, r) => a + (r.lengthMm * r.qty) / 1000, 0), warnings };
}
