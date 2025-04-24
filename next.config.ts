import type { Configuration } from 'webpack';
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        module: false,
      };
    }
    return config;
  },
};

export default nextConfig;
