'use client'

import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/Navbar";

export default function ClientNavbar() {
  const pathname = usePathname();
  const hideNavbar = pathname === '/';
  
  // Detect if running in WebSpatial mode
  const isXREnvironment = typeof window !== 'undefined' && 
    (window.location.pathname.includes('/webspatial/') || 
     process.env.XR_ENV === 'avp');

  if (hideNavbar) return null;
  
  return <Navbar spatialMode={isXREnvironment} />;
}