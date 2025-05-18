/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Portofolio',
  assetPrefix: '/Portofolio/',
  images: {
    unoptimized: true,
  },
  // Disable server-side features since we're doing static export
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig 