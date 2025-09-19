'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/ui/Navbar";
import Head from "next/head";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Detect if running in WebSpatial mode
  const isXREnvironment = process.env.XR_ENV === 'avp';
  const pathname = usePathname();
  
  // Hide navbar on home page (where Hero component is used)
  const hideNavbar = pathname === '/';
  
  return (
    <html lang="en" className={isXREnvironment ? 'is-spatial' : ''}>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {!hideNavbar && <Navbar spatialMode={isXREnvironment} />}
          <div enable-xr-monitor>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}