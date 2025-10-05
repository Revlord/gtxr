interface AboutUsCardProps {
  title: string;
  content: string;
  variant: number;
}

const materialByVariant: Record<number, "thin"|"regular"|"thick"> = {
  0:"thin",1:"regular",2:"thick",3:"thin",4:"regular",5:"thin",
};

export default function AboutUsCard({ title, content, variant }: AboutUsCardProps) {
  const mat = materialByVariant[variant] ?? "thin";

  // lightweight 3D tilt
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width/2)) / r.width;
    const dy = (e.clientY - (r.top + r.height/2)) / r.height;
    el.style.transform = `translateZ(24px) rotateX(${-dy*6}deg) rotateY(${dx*8}deg)`;
  };
  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translateZ(24px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      className={`__enableXr__ xr-card rounded-3xl max-w-md w-full p-8 sm:p-12 transform transition duration-300 hover:scale-[103%] ${
        variant==0?"card-gradient":variant==1?"card-gradient2":variant==2?"card-gradient3":variant==3?"card-gradient4":"card-gradient5"
      }`}
      style={{ ["--xr-background-material" as any]: mat, ["--xr-back" as any]: 40, transform:"translateZ(24px)" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{title}</h3>
      <p className="text-md sm:text-lg text-zinc-200 leading-relaxed">{content}</p>
    </div>
  );
}
