import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable static export only for production builds.
  // In dev, Next validates every request against generateStaticParams()
  // when output: 'export' is set, causing errors for dynamic routes.
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  distDir: 'build', // Changes the build output directory to `build`

  // Proxy /api requests to backend during development
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;
