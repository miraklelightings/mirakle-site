// QuikLit product data and working rules.
// Every code, wattage and rule below is from the QuikLit Furniture Lighting Collection 2027–28 catalogue
// (code index p.42, power p.35, wiring p.41). The 6 m pack size is the QuikLit team's packing rule.

export type Profile = {
  key: string;        // stable id used in the calculator
  code: string;       // order code, colour suffix added where the profile has one
  name: string;       // what the buyer reads
  size: string;
  wpm: number;        // watts per metre
  acc: string;        // accessory set code
  corner?: string;    // corner connector code, if the range has one
  straight?: string;  // straight jointer code, if the range has one
  rollM?: number;     // supplied as a roll of this many metres
  noCct?: boolean;    // no colour suffix (QuikMag track)
  page: string;       // product page on this site
};

export const PROFILES: Profile[] = [
  { key: "1707", code: "QUIKLIT-1707", name: "QuikLit 1707", size: "17 × 7 mm", wpm: 16, acc: "QUIKLIT-1707-ACC", corner: "QUIKLIT-1707-CORNER CONNECTOR", straight: "QUIKLIT-1707-STRAIGHT JOINTER", page: "/quiklit/1707/" },
  { key: "tilt", code: "QUIKTILT-1010-150", name: "QuikTilt 1010, tilts 150°", size: "10 × 10 mm", wpm: 14, acc: "QUIKTILT-1010-150-ACC", page: "/quiklit/" },
  { key: "0609", code: "QUIKLIT-0609", name: "QuikLit 0609", size: "6 × 9 mm", wpm: 9, acc: "QUIKLIT-0609-ACC", corner: "QUIKLIT-0609-CORNER CONNECTOR", page: "/quiklit/" },
  { key: "0809", code: "QUIKLIT-0809", name: "QuikLit 0809", size: "8 × 9 mm", wpm: 9, acc: "QUIKLIT-0809-ACC", corner: "QUIKLIT-0809-CORNER CONNECTOR", page: "/quiklit/" },
  { key: "1010", code: "QUIKLIT-1010", name: "QuikLit 1010", size: "10 × 10 mm", wpm: 14, acc: "QUIKLIT-1010-ACC", corner: "QUIKLIT-1010-PRISMATIC CORNER CONNECTOR", page: "/quiklit/" },
  { key: "asym", code: "QUIKLIT-ASYMMETRIC-1010", name: "QuikLit Asymmetric 1010", size: "10 × 10 mm", wpm: 14, acc: "QUIKLIT-1010-ACC", corner: "QUIKLIT-1010-PRISMATIC CORNER CONNECTOR", page: "/quiklit/" },
  { key: "ecoflex", code: "QUIKLIT-1010 ECOFLEX", name: "QuikLit 1010 EcoFlex", size: "10 × 10 mm", wpm: 9, acc: "QUIKLIT-1010 ECOFLEX-ACC", corner: "QUIKLIT-1010 ECOFLEX-CORNER CONNECTOR", straight: "QUIKLIT-1010 ECOFLEX-CONNECTOR", page: "/quiklit/" },
  { key: "ecomax", code: "QUIKLIT-1010 ECOMAX", name: "QuikLit 1010 EcoMax", size: "10 × 10 mm", wpm: 14, acc: "QUIKLIT-1010 ECOFLEX-ACC", corner: "QUIKLIT-1010 ECOFLEX-CORNER CONNECTOR", straight: "QUIKLIT-1010 ECOFLEX-CONNECTOR", page: "/quiklit/" },
  { key: "glass", code: "QUIKLIT-8MM-GLASS", name: "QuikLit 8 mm Glass", size: "for 8 mm glass", wpm: 9, acc: "QUIKLIT-8MM-GLASS-ACC", page: "/quiklit/" },
  { key: "0618", code: "QUIKLIT-0618", name: "QuikLit 0618 Dual Side", size: "6 × 18 mm", wpm: 9, acc: "QUIKLIT-0618-ACC", page: "/quiklit/" },
  { key: "1313", code: "QUIKLIT-1313", name: "QuikLit 1313 Corner", size: "13 × 13 mm", wpm: 9, acc: "QUIKLIT-1313-ACC", page: "/quiklit/" },
  { key: "0408", code: "QUIKLIT-0408", name: "QuikLit 0408 Neon Flex", size: "4 × 8 mm", wpm: 14, acc: "QUIKLIT-0408-ACC", rollM: 50, page: "/quiklit/" },
  { key: "mag", code: "QUIKMAG-TRACK", name: "QuikMag track (add lights below)", size: "magnetic track", wpm: 0, acc: "QUIKMAG-ACC", corner: "QUIKMAG-CORNER CONNECTOR", straight: "QUIKMAG-STRAIGHT JOINTER", noCct: true, page: "/quiklit/" },
];

// Lights that are counted by the piece. `port` = takes a light port of its own.
export const PIECES = [
  { key: "flood300", group: "QuikMag lights, click onto the track", code: "QUIKMAG-FLOOD-300MM", name: "Flood bar 300 mm", w: 4, port: false },
  { key: "flood600", group: "QuikMag lights, click onto the track", code: "QUIKMAG-FLOOD-600MM", name: "Flood bar 600 mm", w: 8, port: false },
  { key: "flood900", group: "QuikMag lights, click onto the track", code: "QUIKMAG-FLOOD-900MM", name: "Flood bar 900 mm", w: 12, port: false },
  { key: "grillmini", group: "QuikMag lights, click onto the track", code: "QUIKMAG-GRILL MINI", name: "Grill mini", w: 4, port: false },
  { key: "grillmaxi", group: "QuikMag lights, click onto the track", code: "QUIKMAG-GRILL MAXI", name: "Grill maxi", w: 10, port: false },
  { key: "magspot", group: "QuikMag lights, click onto the track", code: "QUIKMAG-SPOT", name: "Spot", w: 2, port: false },
  { key: "spot", group: "QuikSpot, small recessed lights", code: "QUIKSPOT-01W", name: "QuikSpot", w: 1, port: true },
  { key: "ecodot", group: "QuikSpot, small recessed lights", code: "QUIKSPOT-ECODOT-01W", name: "EcoDot", w: 1, port: true },
] as const;

export const SENSORS = [
  { code: "", label: "No sensor", use: "" },
  { code: "QUIKSENS-SINGLE DOOR", label: "Single door", use: "Light on when the door opens. Cabinets and wardrobes with one door." },
  { code: "QUIKSENS-TWIN DOOR", label: "Twin door", use: "Light on when either door opens. Wardrobes with two doors." },
  { code: "QUIKSENS-HUMAN", label: "Human presence", use: "Light on when it detects a person. Walk-in wardrobes." },
  { code: "QUIKSENS-HANDSWEEP", label: "Hand sweep", use: "Wave a hand under it. Kitchens, no touching." },
  { code: "QUIKSENS-TOUCH", label: "Touch", use: "Tap it to switch. A minimal switch on any panel." },
] as const;

export const SUPPLIES = [
  { code: "QUIKPOWER-24V-60W", watts: 60, safe: 51, lightPorts: 7, sensorPorts: 2 },
  { code: "QUIKPOWER-24V-100W", watts: 100, safe: 85, lightPorts: 10, sensorPorts: 2 },
  { code: "QUIKPOWER-24V-150W", watts: 150, safe: 127, lightPorts: 10, sensorPorts: 2 },
] as const;

export const WIRING = {
  splitter: { code: "QUIKLIT-GLOBAL WIRE SPLITTER", ports: 6 },
  extension: { code: "QUIKLIT-EXTENSION WIRE", note: "2000 mm, supply to light" },
  sensorExtension: { code: "QUIKLIT-SENSOR EXTENSION WIRE", note: "1000 mm, supply to sensor" },
};

export const RULES = {
  stockMm: 3000,         // every profile and the QuikMag track come in 3000 mm lengths
  packPieces: 2,         // packed two lengths (6 m) to a pack
  cutMm: 3,              // saw cut allowed for each piece
  loadPct: 85,           // catalogue p.35: load a supply to no more than 85 %
  sensorMaxW: 120,       // catalogue p.35: with a sensor fitted, 120 W at most on that supply
  splitterGain: 5,       // a 6-port splitter takes one light port and gives six
};

export const UNITS: Record<string, { label: string; mm: number }> = {
  mm: { label: "mm", mm: 1 },
  cm: { label: "cm", mm: 10 },
  m: { label: "metres", mm: 1000 },
  inch: { label: "inches", mm: 25.4 },
  ft: { label: "feet", mm: 304.8 },
};

export const PLACES = [
  "Wardrobe", "Walk-in wardrobe", "Dressing table", "Bed back panel", "Study table",
  "Kitchen wall cabinet", "Kitchen under-cabinet", "Kitchen drawer", "Tall unit / pantry", "Crockery unit",
  "TV unit", "Open shelf", "Bookshelf", "Display unit", "Bar unit", "Pooja unit", "Shoe rack",
  "Shop shelf", "Showroom display", "Office cabinet", "Reception counter", "Other",
];
