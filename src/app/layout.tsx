import type { Metadata } from "next";
import "@fontsource/hanken-grotesk/300.css";
import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/500.css";
import "./globals.css";
import WorldDock from "@/components/WorldDock";
import Motion from "@/components/Motion";

export const metadata: Metadata = {
  title: { default: "MIRAKLE — Light for architecture, furniture and living", template: "%s · MIRAKLE" },
  description: "India's most trusted name in light — for architects, furniture makers and the homes they create.",
  metadataBase: new URL("https://www.miraklelightings.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        {children}
        <WorldDock />
        <Motion />
      </body>
    </html>
  );
}
