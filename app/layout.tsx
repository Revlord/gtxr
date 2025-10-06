import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GTXR - Georgia Tech Extended Reality",
  description: "The future of extended reality, at Georgia Tech",
  metadataBase: new URL("https://www.gtxr.club/"),
  manifest: "/manifest.webmanifest",
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Works whether you set XR_ENV or NEXT_PUBLIC_XR_ENV in Vercel
  const isSpatial =
    process.env.NEXT_PUBLIC_XR_ENV === "avp" || process.env.XR_ENV === "avp";

  const XR_BASE = process.env.NEXT_PUBLIC_XR_BASE || "/";

  return (
    <html
      lang="en"
      className={isSpatial ? "is-spatial" : undefined}
      suppressHydrationWarning
    >
      <head>
        {/* Make the base available before any client code runs */}
        <Script id="xr-env" strategy="beforeInteractive">
          {`window.__XR_ENV_BASE__ = ${JSON.stringify(XR_BASE)};`}
        </Script>
      </head>
      <body className={inter.className}>
        {/* If you use Providers, keep this. Otherwise you can remove it. */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
