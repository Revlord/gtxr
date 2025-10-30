import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <section className="bg-black min-h-screen flex flex-col">{children}</section>;
}
