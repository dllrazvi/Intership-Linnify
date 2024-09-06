/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  swcMinify: true,
  output: 'standalone',
  experimental: {
    serverMinification: false
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Till Google Gax fix the request issue
      config.resolve.fallback = { request: false };
    }
    
    return config;
  },
  headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public,max-age=3600,smax-age=31536000'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
