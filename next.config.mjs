// next.config.mjs
import withWebSpatial from './next-plugin/withWebspatial.mjs';

/** @type {import('next').NextConfig} */
const base = {
  reactStrictMode: true,
  // Do NOT set basePath; the plugin sets it in XR builds.
};

// Only apply Web Spatial plugin if XR_ENV is set
const nextConfig = process.env.XR_ENV 
  ? withWebSpatial()(base)
  : base;

export default nextConfig;
