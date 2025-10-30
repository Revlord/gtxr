import dynamic from "next/dynamic";
import ProjHero from "@/components/ProjHero";

const AppleCardsCarouselDemo = dynamic(
  () => import("@/components/AppleCards").then((m) => m.AppleCardsCarouselDemo),
  { ssr: false }
);

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <ProjHero />
      <AppleCardsCarouselDemo enableXr={false} />
    </div>
  );
}
