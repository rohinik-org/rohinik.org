import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
  // MDX added in Plan 2
};

export default nextConfig;
