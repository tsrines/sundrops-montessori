import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
