// QuikLit product data — from the QuikLit Furniture Lighting Collection 2027–28 catalogue.
export const PROFILES = [
  { code: "QUIKLIT-1707", size: "17 × 7 mm", wpm: 16, mount: "Recessed" },
  { code: "QUIKTILT-1010-150", size: "10 × 10 mm", wpm: 14, mount: "Recessed, tilting 150°" },
  { code: "QUIKLIT-0609", size: "6 × 9 mm", wpm: 9, mount: "Recessed" },
  { code: "QUIKLIT-0809", size: "8 × 9 mm", wpm: 9, mount: "Recessed" },
  { code: "QUIKLIT-1010", size: "10 × 10 mm", wpm: 14, mount: "Recessed" },
  { code: "QUIKLIT-ASYMMETRIC 1010", size: "10 × 10 mm", wpm: 14, mount: "Recessed, asymmetric" },
  { code: "QUIKLIT-1010 ECOFLEX", size: "10 × 10 mm", wpm: 9, mount: "Recessed" },
  { code: "QUIKLIT-1010 ECOMAX", size: "10 × 10 mm", wpm: 14, mount: "Recessed", acc: "QUIKLIT-1010 ECOFLEX-ACC" },
  { code: "QUIKLIT-8MM GLASS", size: "8 mm glass", wpm: 9, mount: "Glass side panels", acc: "QUIKLIT-8MM-GLASS-ACC" },
  { code: "QUIKLIT-0618 DUAL SIDE", size: "6 × 18 mm", wpm: 9, mount: "Shelf edge", acc: "QUIKLIT-0618-ACC" },
  { code: "QUIKLIT-1313 CORNER", size: "13 × 13 mm", wpm: 9, mount: "Corner", acc: "QUIKLIT-1313-ACC" },
  { code: "QUIKLIT-0408 NEON FLEX", size: "4 × 8 mm", wpm: 14, mount: "Groove", acc: "QUIKLIT-0408-ACC" },
] as const;

export const SENSORS = [
  { code: "", label: "No sensor (always on with the supply)" },
  { code: "QUIKSENS-SINGLE DOOR", label: "Door sensor — single shutter" },
  { code: "QUIKSENS-TWIN DOOR", label: "Door sensor — double door wardrobe" },
  { code: "QUIKSENS-HUMAN", label: "Human presence — walk-in wardrobe" },
  { code: "QUIKSENS-HANDSWEEP", label: "Hand sweep — touchless" },
  { code: "QUIKSENS-TOUCH", label: "Touch — tap on/off" },
] as const;

export const SUPPLIES = [
  { code: "QUIKPOWER-24V-150W", watts: 150, lightPorts: 10, sensorPorts: 2 },
  { code: "QUIKPOWER-24V-100W", watts: 100, lightPorts: 10, sensorPorts: 2 },
  { code: "QUIKPOWER-24V-60W", watts: 60, lightPorts: 7, sensorPorts: 2 },
] as const;

// Working rules. Confirm with the QuikLit team; change here only.
export const RULES = {
  stockMm: 3000,          // profiles supplied in 3000 mm lengths
  cutAllowanceMm: 10,     // saw kerf + end-cap trim per cut
  supplyLoad: 0.8,        // load a supply to 80% of its rating
  sensorMaxW: 100,        // catalogue: sensors take 100–120 W; use the lower figure
};

export const accFor = (code: string) => {
  const p = PROFILES.find((x) => x.code === code);
  return (p && "acc" in p && p.acc) || `${code}-ACC`;
};
