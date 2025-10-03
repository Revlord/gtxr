import { cn } from "@/utils/cn"; // Keep your existing cn import

export function getAssetPath(path: string): string {
  // Check if we're in AVP mode
  const isAVPMode = process.env.XR_ENV === 'avp' || process.env.NODE_ENV === 'production';
  const basePath = isAVPMode ? '/webspatial/avp' : '';
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${normalizedPath}`;
}

export { cn }; // Re-export cn for convenience