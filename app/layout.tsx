import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GTXR - Georgia Tech Extended Reality",
  description: "The future of extended reality, at Georgia Tech",
  metadataBase: new URL('https://www.gtxr.club/'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
  
      </body>
    </html>
  );
}
