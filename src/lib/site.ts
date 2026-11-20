export type World = "arch" | "ql" | "deco";
export const WORLDS: { id: World; label: string; href: string }[] = [
  { id: "arch", label: "Architectural", href: "/architectural/" },
  { id: "ql", label: "QuikLit", href: "/quiklit/" },
  { id: "deco", label: "Decorative", href: "/decorative/" },
];
export const MANAGERS: Record<World, { name: string; role: string; phone: string; tel: string; wa: string; email: string }> = {
  arch: { name: "Architectural Desk", role: "Architectural", phone: "+91 92657 33457", tel: "+919265733457", wa: "919265733457", email: "roopesh@hrishalightings.com" },
  ql: { name: "QuikLit Desk", role: "QuikLit", phone: "+91 92279 96634", tel: "+919227996634", wa: "919227996634", email: "quiklit@hrishalightings.com" },
  deco: { name: "Decorative Desk", role: "Decorative Lighting", phone: "+91 93168 88316", tel: "+919316888316", wa: "919316888316", email: "luce@hrishalightings.com" },
};
export const SHOWROOM = {
  address: "101–103 Maruti Crystal, Nr. Gordhan Thal, Opp. Rajpath Club, Bodakdev, Ahmedabad 380054",
  hours: "Open 10:30 am – 7:30 pm",
};

// Client and project names shown on the home page. Add real names only, with permission.
export const CLIENTS: string[] = [];

export const INSTAGRAM = { handle: "@hrisha_lightings", url: "https://www.instagram.com/hrisha_lightings" };
export const wa = (w: World, text: string) => `https://wa.me/${MANAGERS[w].wa}?text=${encodeURIComponent(text)}`;

// The sections of each vertical, shown as the second row of the header on every page of that vertical.
export const WORLD_NAV: Record<World, { label: string; href: string }[]> = {
  arch: [{ label: "Magnetic track", href: "/architectural/elva-5/" }, { label: "Spotlights", href: "/architectural/#spotlights" }, { label: "Linear", href: "/architectural/linear/" }, { label: "LED drivers", href: "/architectural/drivers/" }, { label: "Configurator", href: "/architectural/titan/" }, { label: "Spec support", href: "/contact/#architectural" }],
  ql: [{ label: "Profiles", href: "/quiklit/#profiles" }, { label: "QuikMag", href: "/quiklit/#families" }, { label: "Spots & sensors", href: "/quiklit/#families" }, { label: "Power", href: "/quiklit/#families" }, { label: "Install", href: "/quiklit/#install" }, { label: "BOQ calculator", href: "/quiklit/boq/" }],
  deco: [],
};
