import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* CHANGED: This allows free hosting on Firebase Spark Plan */
  output: 'export', 
  
  /* CHANGED: Required for static exports so Next.js doesn't try to optimize images on a server */
  images: {
    unoptimized: true, 
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'storage.googleapis.com', pathname: '/**' },
      { protocol: 'https', hostname: 'photos.app.goo.gl', pathname: '/**' },
      { protocol: 'https', hostname: 'i.imgur.com', pathname: '/**' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;