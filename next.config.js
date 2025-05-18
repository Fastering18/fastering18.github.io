/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use output: 'export' for production builds
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  //basePath: '/',
  //assetPrefix: '/',
  images: {
    unoptimized: true,
  },
  // Disable server-side features since we're doing static export
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig 