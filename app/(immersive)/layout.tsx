// app/(immersive)/layout.tsx
export default function ImmersiveLayout({ children }: { children: React.ReactNode }) {
  // Only pages under (immersive) get XR visuals
  return <div className="immersive">{children}</div>;
}
