import { AppleCardsCarouselDemo } from "@/components/AppleCards";
import Footer from "@/components/Footer";
import ProjHero from "@/components/ProjHero";
import Head from "next/head";


// /app/about/page.tsx
export default function Projects() {
  const isSpatialMode = process.env.XR_ENV === 'avp';
    return (
      <main>
        <div className="min-h-screen flex flex-col bg-black">
          <ProjHero/>
          <AppleCardsCarouselDemo spatialMode={isSpatialMode}/>
          <Footer/>
        </div>
      </main>
    );
  }