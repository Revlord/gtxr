// next.config.mjs
import withWebSpatial from './next-plugin/withWebspatial.mjs';

/** @type {import('next').NextConfig} */
const base = {
  reactStrictMode: true,
  // Do NOT set basePath; the plugin sets it in XR builds.
};

// The plugin is *curried* per docs: withWebSpatial()(config)
const nextConfig = withWebSpatial()(base);

export default nextConfig;
