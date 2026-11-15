import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Calculator from "./Calculator";

export const metadata: Metadata = { title: "QuikLit BOQ calculator", description: "Enter each line of light and get the full QuikLit order list: profiles, accessory sets, connectors, sensors and 24V supplies, with order codes." };

export default function Page() {
  return (
    <>
      <Header world="ql" nav={[{ label: "Profiles", href: "/quiklit/#profiles" }, { label: "Sensors", href: "/quiklit/#sensors" }, { label: "Supplies", href: "/quiklit/#supplies" }]} />
      <main className="wrap" style={{ paddingTop: 64, paddingBottom: 96, display: "flex", flexDirection: "column", gap: 40 }}>
        <div className="no-print" style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 800 }}>
          <span style={{ display: "block", width: 96, height: 2, background: "var(--ql)" }} />
          <span className="cap grey">QuikLit · BOQ calculator</span>
          <h1 className="h56">Your furniture, counted to the last end cap.</h1>
          <p className="t20 grey" style={{ margin: 0 }}>Tell us where the light goes and how long each line is. The order list builds itself: profile packs, accessory sets, connectors, sensors and 24V supplies, each with its order code.</p>
        </div>
        <div className="calc-facts no-print">
          <div><b>3 <span className="u">m</span> lengths</b><span className="t14 grey">Every profile, packed two to a pack.</span></div>
          <div><b>One set for each light</b><span className="t14 grey">Wired end cap, end cap and clamps.</span></div>
          <div><b>85% supply load</b><span className="t14 grey">51 W, 85 W or 127 W, as the catalogue says.</span></div>
          <div><b>No prices here</b><span className="t14 grey">Send the list; the QuikLit team quotes it.</span></div>
        </div>
        <Calculator />
      </main>
      <Footer />
    </>
  );
}
