import type { Metadata, Viewport } from "next";
import "@fontsource/archivo/300.css";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/500.css";
import "./globals.css";
import WorldDock from "@/components/WorldDock";
import Motion from "@/components/Motion";
import { JsonLd, SITE_URL } from "@/lib/seo";
import { INSTAGRAM, MANAGERS, SHOWROOM } from "@/lib/site";

const TITLE = "MIRAKLE | Architectural, furniture and decorative lighting";
const DESC = "Lighting for architecture, furniture and interiors. Architectural lighting, QuikLit solderless furniture lighting and decorative lights, from Ahmedabad, India.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | MIRAKLE" },
  description: DESC,
  applicationName: "MIRAKLE",
  openGraph: { type: "website", siteName: "MIRAKLE", locale: "en_IN", title: TITLE, description: DESC, url: "/", images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "MIRAKLE. Light, thought through." }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/home.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
  // Google Search Console: paste the verification code here once the property is added, e.g. verification: { google: "CODE" }
};
export const viewport: Viewport = { themeColor: "#1A1918", width: "device-width", initialScale: 1 };

// Who MIRAKLE is, for search engines. Every fact here is printed on the site.
const ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": SITE_URL + "/#organization",
  name: "MIRAKLE",
  alternateName: ["MIRAKLE Lightings", "Mirakle Lighting"],
  url: SITE_URL,
  logo: SITE_URL + "/icon-512.png",
  image: SITE_URL + "/og/home.jpg",
  slogan: "Light, thought through.",
  description: "Lighting for architecture, furniture and interiors.",
  parentOrganization: { "@type": "Organization", name: "Hrisha Lighting Projects LLP" },
  address: { "@type": "PostalAddress", streetAddress: "101–103 Maruti Crystal, Nr. Gordhan Thal, Opp. Rajpath Club, Bodakdev", addressLocality: "Ahmedabad", addressRegion: "Gujarat", postalCode: "380054", addressCountry: "IN" },
  sameAs: [INSTAGRAM.url],
  contactPoint: Object.values(MANAGERS).map((m) => ({ "@type": "ContactPoint", contactType: m.name, telephone: m.tel, areaServed: "IN", availableLanguage: ["en", "hi", "gu"] })),
};
const SITE = { "@context": "https://schema.org", "@type": "WebSite", "@id": SITE_URL + "/#website", url: SITE_URL, name: "MIRAKLE", alternateName: "MIRAKLE Lightings", publisher: { "@id": SITE_URL + "/#organization" }, inLanguage: "en-IN" };
void SHOWROOM;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <JsonLd data={ORG} />
        <JsonLd data={SITE} />
        {children}
        <WorldDock />
        <Motion />
      </body>
    </html>
  );
}
