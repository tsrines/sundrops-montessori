import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [70, 80, 85],
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
