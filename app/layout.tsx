import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Cormorant_Garamond, Urbanist } from "next/font/google";
import SiteShell from "@/components/shell/SiteShell";
import "./globals.css";

const sans = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-sans", display: "swap" });
const giant = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-giant", display: "swap" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: { default: "ARK Hospitality — We build the moment. Then we make it famous.", template: "%s · ARK Hospitality" },
  description:
    "ARK Hospitality is a hospitality marketing & experience studio. We analyse every detail and trend, find your venue's USP, and build the brand, the moments and the content that sell it.",
  icons: { icon: "/img/bamboo.png" },
};

export const viewport: Viewport = { themeColor: "#FAF5EC" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${giant.variable} ${serif.variable} is-loading`} suppressHydrationWarning>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
