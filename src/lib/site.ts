export type World = "arch" | "ql" | "deco";
export const WORLDS: { id: World; label: string; href: string }[] = [
  { id: "arch", label: "Architectural", href: "/architectural/" },
  { id: "ql", label: "QuikLit", href: "/quiklit/" },
  { id: "deco", label: "Decorative", href: "/decorative/" },
];
export const MANAGERS: Record<World, { name: string; role: string; phone: string; tel: string; wa: string; email: string }> = {
  arch: { name: "Roopesh Tripathi", role: "Architectural & Technical", phone: "+91 92657 33457", tel: "+919265733457", wa: "919265733457", email: "roopesh@hrishalightings.com" },
  ql: { name: "Awadhesh Pal", role: "QuikLit", phone: "+91 92279 96634", tel: "+919227996634", wa: "919227996634", email: "quiklit@hrishalightings.com" },
  deco: { name: "Preksha Shah", role: "Decorative", phone: "+91 93168 88316", tel: "+919316888316", wa: "919316888316", email: "luce@hrishalightings.com" },
};
export const SHOWROOM = {
  address: "101–103 Maruti Crystal, Nr. Gordhan Thal, Opp. Rajpath Club, Bodakdev, Ahmedabad 380054",
  hours: "Open 10:30 am – 7:30 pm",
};
