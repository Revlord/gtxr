import withWebSpatial from '@webspatial/next-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        esmExternals: 'loose'
    },
};

export default withWebSpatial()(nextConfig);