import SponsorBody from "@/components/SponsorBody";
import SponsorshipHero from "@/components/SponsorshipHero";

export default function Sponsorships() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <SponsorshipHero />
      <SponsorBody />
    </div>
  );
}
