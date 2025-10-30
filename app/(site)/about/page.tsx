import Exec from "@/components/Exec";
import Mission from "@/components/Mission";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="pt-16">
        <Mission />
        <Exec />
      </div>
    </div>
  );
}
