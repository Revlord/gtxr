import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import { SpatialScene, SpatialContainer, useGaze } from "@webspatial/react-sdk";

export default function Home() {
  // Example gaze highlight for AboutUs panel
  const { isGazed } = useGaze();
  return (
    <main>
      <SpatialScene background="clear">
        <div className="min-h-screen flex flex-col">
          <Hero />
          <SpatialContainer>
            <div
              style={{
                transform: isGazed ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.2s",
              }}
            >
              <AboutUs spatial />
            </div>
          </SpatialContainer>
          <Footer />
        </div>
      </SpatialScene>
    </main>
  );
}
