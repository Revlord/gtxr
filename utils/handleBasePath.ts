import { cn } from "@/utils/cn"; // Keep your existing cn import

export function getAssetPath(path: string): string {
  // Check if we're in spatial/XR mode
  const isClient = typeof window !== 'undefined';
  
  // In client, check for XR environment
  if (isClient && (window as any).__XR_ENV_BASE__) {
    const xrBase = (window as any).__XR_ENV_BASE__;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${xrBase}${normalizedPath}`;
  }
  
  // In server or non-XR client, check environment variable
  const isAVPMode = process.env.XR_ENV === 'avp';
  const basePath = isAVPMode ? '/webspatial/avp' : '';
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${normalizedPath}`;
}

// Helper function for Next.js Link component in spatial mode
export function getLinkPath(path: string): string {
  // For internal links, we don't need to add the base path
  // Next.js handles this automatically with the basePath config
  return path;
}

export { cn }; // Re-export cn for convenience