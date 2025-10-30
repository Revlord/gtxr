import { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/ui/Navbar";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <section className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </section>
  );
}
