/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
    return [
      {
        source: '/api/v1/confluence-local-marketing/.well-known/ai-manifest.json',
        destination: '/.well-known/ai-manifest.json',
        permanent: true, // 301
      },
      {
        source: '/api/v1/confluence-local-marketing/openapi.json',
        destination: '/openapi.json',
        permanent: true, // 301
      },
      {
        source: '/api/v1/confluence-local-marketing/ai-sitemap.xml',
        destination: '/ai-sitemap.xml',
        permanent: true, // 301
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ancient-crown-9dfaf5bb18.media.strapiapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;


export default nextConfig;