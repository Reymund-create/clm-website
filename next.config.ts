import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() { // Use rewrites instead of redirects
    return [
      {
        source: '/ai-sitemap.xml',
        destination: 'https://app.promptgraph.ai/api/v1/confluence-local-marketing/ai-sitemap.xml',
      },
      // You can keep the others as redirects or move them here too
      {
        source: '/openapi.json',
        destination: 'https://app.promptgraph.ai/api/v1/confluence-local-marketing/openapi.json',
      },
      {
        source: '/.well-known/ai-manifest.json',
        destination: 'https://app.promptgraph.ai/api/v1/confluence-local-marketing/.well-known/ai-manifest.json',
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ancient-crown-9dfaf5bb18.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;