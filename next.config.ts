import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [70, 80, 85],
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-label',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
    ],
  },
};

export default nextConfig;
