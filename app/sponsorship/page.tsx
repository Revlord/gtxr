
import Footer from "@/components/Footer";
import SponsorBody from "@/components/SponsorBody";
import SponsorshipHero from "@/components/SponsorshipHero";
import Navbar from "@/components/ui/Navbar";

// /app/about/page.tsx
export default function Sponsorships() {
    return (
      <main>
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar/>
        <SponsorshipHero/>
        <SponsorBody></SponsorBody>
        <Footer/>
      </div>
      </main>
    );
}