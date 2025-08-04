import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    appDir: true, // 👈 habilita App Router
  },
};

export default nextConfig;
