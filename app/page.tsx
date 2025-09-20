import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs-Enhanced";
import ClientNavbar from "@/components/client-navbar";
import WebSpatialTest from "@/components/webspatial-test";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen flex flex-col bg-black">
        <ClientNavbar />
        <WebSpatialTest />
        <Hero/>
        <AboutUs/>
        <Footer />
      </div>
    </main>
  );
}