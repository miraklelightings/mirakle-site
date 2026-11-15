import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FAMILIES } from "@/lib/deco";
import { SelectionBar } from "./Select";

export const DECO_NAV = FAMILIES.map((f) => ({ label: f.name.split(" ")[0], href: `/decorative/${f.id}/` }));

export default function DecoShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header world="deco" nav={DECO_NAV} cta={{ label: "Your selection", href: "/decorative/#selection" }} />
      <main className="deco-world">{children}</main>
      <SelectionBar />
      <Footer />
    </>
  );
}
