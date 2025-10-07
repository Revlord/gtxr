// next.config.mjs
import withWebSpatial from './next-plugin/withWebspatial.mjs';

/** @type {import('next').NextConfig} */
const base = {
  reactStrictMode: true,
  // Do NOT set basePath; the plugin sets it in XR builds.
};

// Check if we're in web mode (for Vercel) or XR mode
const isWebMode = process.env.NEXT_CONFIG_MODE === 'web';
const isXRMode = process.env.XR_ENV === 'avp';

// Only apply Web Spatial plugin if in XR mode, not in web mode
const nextConfig = isXRMode && !isWebMode
  ? withWebSpatial()(base)
  : base;

export default nextConfig;
