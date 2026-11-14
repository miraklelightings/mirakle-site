import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Calculator from "./Calculator";

export const metadata: Metadata = { title: "QuikLit BOQ calculator", description: "List your furniture runs and get the full QuikLit bill of quantities — profiles, accessory sets, sensors and 24V supplies." };

export default function Page() {
  return (
    <>
      <Header world="ql" nav={[{ label: "Profiles", href: "/quiklit/#profiles" }, { label: "Sensors", href: "/quiklit/#sensors" }, { label: "Supplies", href: "/quiklit/#supplies" }]} />
      <main className="wrap" style={{ paddingTop: 64, paddingBottom: 96, display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
          <span className="cap grey">QuikLit · BOQ calculator</span>
          <h1 className="h56">Your furniture, counted to the last end cap.</h1>
          <p className="t20 grey" style={{ margin: 0 }}>Add each run of light — where it goes, which profile, how long. The bill of quantities builds itself: profile lengths, accessory sets, sensors and 24V supplies.</p>
        </div>
        <Calculator />
      </main>
      <Footer />
    </>
  );
}
