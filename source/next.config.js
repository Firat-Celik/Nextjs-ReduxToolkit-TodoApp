/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [],
  },
  experimental: {
    // Enable new React features
    reactRoot: true,
  },
  webpack(config) {
    return config;
  },
};

module.exports = nextConfig;
