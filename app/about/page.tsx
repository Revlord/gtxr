import Exec from "@/components/Exec";
import Footer from "@/components/Footer";

import Mission from "@/components/Mission";
import Navbar from "@/components/ui/Navbar";

// /app/about/page.tsx
export default function About() {
    return (
      <main>
        <div className="min-h-screen flex flex-col bg-black">
          <Navbar/>
          <div className="pt-16">
            <Mission/>
            <Exec/>
          </div>
          <Footer/>
        </div>
      </main>
    );
}